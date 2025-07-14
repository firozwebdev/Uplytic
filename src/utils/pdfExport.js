import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Uplytic logo SVG as string (from DashboardLayout.vue)
const UPLYTIC_LOGO_SVG = `M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z`;

export class PDFExporter {
  constructor() {
    this.options = {
      filename: 'api-monitoring-report.pdf',
    };
  }

  exportApiReport(api, logs, insights, costImpact = {}) {
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const margin = 18;
    const safeBottom = 20;        // footer-এর আগে বাফার
    let y = 28;                   // header-এর নিচে শুরু

    // --- Color palette ---
    const c = {
      primary: [37, 99, 235],
      accent:  [16, 185, 129],
      warn:    [245, 158, 11],
      danger:  [239, 68, 68],
      gray:    [107, 114, 128],
      bg:      [249, 250, 251]
    };

    // --- Header (fixed height 22 mm) ---
    (() => {
      doc.setFillColor(...c.primary);
      doc.rect(0, 0, 210, 22, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text('Uplytic', margin, 13);
      doc.setFontSize(10);
      doc.text('API Health Report', margin, 18);
      doc.text(new Date().toLocaleString(), 210 - margin, 13, { align: 'right' });
    })();

    // --- Safe Y check ---
    const ensureSpace = h => {
      if (y + h > 297 - safeBottom) {
        doc.addPage();
        y = margin;
      }
    };

    // --- API Overview Card ---
    ensureSpace(16);
    doc.setFillColor(...c.bg);
    doc.roundedRect(margin, y, 210 - 2 * margin, 14, 3, 3, 'F');
    doc.setFontSize(10);
    doc.setTextColor(...c.gray);
    doc.text(`API: ${api.name}`, margin + 3, y + 5);
    doc.text(`URL: ${api.url}`, margin + 3, y + 10);
    y += 20;

    // --- KPI cards 2×3 grid ---
    const stats = (() => {
      const total = logs.length;
      const ok = logs.filter(l => l.status_code < 400).length;
      const up = total ? Math.round((ok / total) * 1000) / 10 : 0;
      const avg = total ? Math.round(logs.reduce((s, l) => s + l.latency_ms, 0) / total) : 0;
      return [
        { label: 'Uptime', value: `${up}%`, color: c.accent },
        { label: 'Avg Latency', value: `${avg} ms`, color: c.accent },
        { label: 'Checks', value: total, color: c.primary },
        { label: '4xx', value: logs.filter(l => l.status_code >= 400 && l.status_code < 500).length, color: c.warn },
        { label: '5xx', value: logs.filter(l => l.status_code >= 500).length, color: c.danger },
        { label: 'Network', value: logs.filter(l => l.status_code === 0).length, color: c.danger }
      ];
    })();
    const cardW = 27, cardH = 17, gap = 4;
    stats.forEach((s, i) => {
      const col = i % 3;
      if (col === 0 && i !== 0) { y += cardH + gap; }
      ensureSpace(cardH);
      const cardX = margin + col * (cardW + gap);
      doc.setFillColor(...s.color);
      doc.roundedRect(cardX, y, cardW, cardH, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.text(String(s.value), cardX + cardW / 2, y + 7, { align: 'center' });
      doc.setFontSize(7);
      doc.text(String(s.label), cardX + cardW / 2, y + 12, { align: 'center' });
    });
    y += cardH + gap + 4;

    // --- Cost Analysis ---
    ensureSpace(16);
    doc.setFontSize(12);
    doc.setTextColor(...c.warn);
    doc.text('Cost Impact (24 h)', margin, y);
    y += 5;
    const loss = costImpact.totalLoss || 0;
    const downMin = costImpact.downtimeMinutes || 0;
    doc.setFillColor(...c.bg);
    doc.roundedRect(margin, y, 210 - 2 * margin, 12, 2, 2, 'F');
    doc.setTextColor(...c.gray);
    doc.text(`Loss: $${loss.toFixed(2)}   Downtime: ${downMin} min`, margin + 3, y + 7);
    y += 18;

    // --- Recent Activity Table ---
    ensureSpace(30);
    doc.setFontSize(12);
    doc.setTextColor(...c.primary);
    doc.text('Recent Checks', margin, y);
    y += 5;
    autoTable(doc, {
      startY: y,
      head: [['Time', 'Status', 'Latency (ms)']],
      body: logs.slice(0, 10).map(l => [
        new Date(l.created_at).toLocaleTimeString(),
        l.status_code,
        l.latency_ms
      ]),
      margin: { left: margin, right: margin },
      styles: { fontSize: 9, cellPadding: 2.5 },
      headStyles: { fillColor: c.primary, textColor: 255 },
      alternateRowStyles: { fillColor: c.bg },
      tableLineColor: c.gray,
      tableLineWidth: 0.2
    });
    y = doc.lastAutoTable.finalY + 8;

    // --- AI Insights ---
// --- AI Insights as a compact table ---
if (insights?.insights?.length) {
  ensureSpace(30);

  doc.setFontSize(12);
  doc.setTextColor(...c.accent);
  doc.text('AI Insights', margin, y);
  y += 5;

  
  const insightRows = insights.insights.map(ins => [
    String(ins.severity || 'info').toUpperCase(),
    String(ins.title).replace(/[^\x20-\x7E]/g, '').trim(), // non-ASCII strip
    String(ins.message).replace(/[^\x20-\x7E]/g, '').trim(),
    String(ins.recommendation).replace(/[^\x20-\x7E]/g, '').trim()
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Severity', 'Issue', 'Message', 'Recommendation']],
    body: insightRows,
    margin: { left: margin, right: margin },
    styles: { fontSize: 7.5, cellPadding: 1.5, overflow: 'linebreak' },
    headStyles: { fillColor: c.accent, textColor: 255 },
    alternateRowStyles: { fillColor: c.bg },
    columnStyles: {
      0: { cellWidth: 18 },   // Severity badge width
      1: { cellWidth: 50 },   // Issue title
      2: { cellWidth: 50 },   // Message
      3: { cellWidth: 52 }    // Recommendation
    },
    tableLineColor: c.gray,
    tableLineWidth: 0.2
  });
  y = doc.lastAutoTable.finalY + 8;
}

    // --- Modern Footer ---
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(...c.gray);
      const footY = 297 - 8;
      doc.text('Generated by Uplytic — Powered by Foxit PDF SDK', margin, footY, { align: 'left' });
      doc.text(`Page ${String(i)} / ${String(pageCount)}`, 210 - margin, footY, { align: 'right' });
    }

    doc.save('Uplytic-API-Report.pdf');
  }
}

export const pdfExporter = new PDFExporter(); 
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

  async exportApiReport(api, logs, insights, costImpact = {}) {
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const margin = 15;
    let y = margin;

    // --- HEADER WITH LOGO ---
    // Draw logo background
    doc.setFillColor(37, 99, 235); // blue
    doc.roundedRect(margin, y - 2, 16, 16, 4, 4, 'F');
    // Draw SVG logo (approximate, as jsPDF can't natively render SVG, so use path)
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.7);
    doc.setFillColor(255, 255, 255);
    doc.path(UPLYTIC_LOGO_SVG, 'D', { x: margin + 2, y: y + 2, scale: 0.5 });
    // Title next to logo
    doc.setFontSize(18);
    doc.setTextColor('#2563eb');
    doc.text('Uplytic', margin + 20, y + 7);
    doc.setFontSize(10);
    doc.setTextColor('#6b7280');
    doc.text('API Health Monitoring Report', margin + 20, y + 13);
    y += 18;

    // API Info
    doc.setFontSize(12);
    doc.setTextColor('#333');
    doc.text(`API: ${api.name || ''}`, margin, y);
    y += 7;
    doc.text(`URL: ${api.url || ''}`, margin, y);
    y += 7;
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
    y += 10;

    // Key Metrics
    doc.setFontSize(14);
    doc.setTextColor('#1f2937');
    doc.text('Key Metrics', margin, y);
    y += 7;
    const stats = {
      uptime: 0,
      avgLatency: 0,
      totalChecks: logs.length,
      status: logs.length > 0 ? logs[0].status_code : 0
    };
    let clientErrors = 0, serverErrors = 0, networkErrors = 0;
    if (logs.length > 0) {
      const successfulChecks = logs.filter(log => log.status_code < 400).length;
      stats.uptime = Math.round((successfulChecks / logs.length) * 100 * 100) / 100;
      stats.avgLatency = Math.round(logs.reduce((sum, log) => sum + log.latency_ms, 0) / logs.length);
      clientErrors = logs.filter(log => log.status_code >= 400 && log.status_code < 500).length;
      serverErrors = logs.filter(log => log.status_code >= 500).length;
      networkErrors = logs.filter(log => log.status_code === 0).length;
    }
    doc.setFontSize(11);
    doc.text(`Uptime: ${stats.uptime}%`, margin, y);
    y += 6;
    doc.text(`Avg Latency: ${stats.avgLatency}ms`, margin, y);
    y += 6;
    doc.text(`Total Checks: ${stats.totalChecks}`, margin, y);
    y += 6;
    doc.text(`Status: ${stats.status < 400 ? 'Operational' : 'Issues Detected'}`, margin, y);
    y += 6;
    doc.text(`4xx Errors: ${clientErrors}   5xx Errors: ${serverErrors}   Network Errors: ${networkErrors}`, margin, y);
    y += 10;

    // --- ADVANCED COST ANALYSIS ---
    doc.setFontSize(14);
    doc.setTextColor('#92400e');
    doc.text('Advanced Cost Analysis (24h)', margin, y);
    y += 7;
    doc.setFontSize(11);
    doc.setTextColor('#333');
    // Use real cost data if available
    const totalLoss = costImpact.totalLoss ?? 0;
    const downtimeMinutes = costImpact.downtimeMinutes ?? 0;
    const costPerHour = costImpact.costPerHour ?? 0;
    const downtimeLoss = costImpact.downtimeLoss ?? 0;
    const errorLoss = costImpact.errorLoss ?? 0;
    const latencyLoss = costImpact.latencyLoss ?? 0;
    const costData = [
      { label: 'Downtime Loss', value: downtimeLoss },
      { label: 'Error Loss', value: errorLoss },
      { label: 'Latency Loss', value: latencyLoss },
      { label: 'Total', value: totalLoss },
    ];
    doc.text(`Total Loss: $${totalLoss.toFixed(2)}   Downtime: ${downtimeMinutes} min   Cost Rate: $${costPerHour}/hr`, margin, y);
    y += 8;
    // Draw a simple bar chart for cost breakdown
    const chartX = margin;
    let chartY = y;
    const barHeight = 6;
    const barMaxWidth = 60;
    const maxVal = Math.max(...costData.slice(0, 3).map(d => d.value), 1); // avoid divide by zero
    costData.slice(0, 3).forEach((d, i) => {
      const barWidth = (d.value / maxVal) * barMaxWidth;
      doc.setFillColor(255, 193, 7); // amber
      doc.rect(chartX, chartY, barWidth, barHeight, 'F');
      doc.setTextColor('#333');
      doc.text(`${d.label}: $${d.value.toFixed(2)}`, chartX + barMaxWidth + 4, chartY + barHeight - 1);
      chartY += barHeight + 3;
    });
    y = chartY + 2;

    // Recent Activity Table
    doc.setFontSize(14);
    doc.setTextColor('#1f2937');
    doc.text('Recent Activity (Last 10 Checks)', margin, y);
    y += 4;
    autoTable(doc, {
      startY: y,
      head: [['Time', 'Status', 'Response Time (ms)']],
      body: logs.slice(0, 10).map(log => [
        new Date(log.created_at).toLocaleString(),
        log.status_code,
        log.latency_ms
      ]),
      margin: { left: margin, right: margin },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [37, 99, 235] },
    });
    y = doc.lastAutoTable.finalY + 10;

    // AI Insights (if any)
    if (insights && (insights.summary || (insights.insights && insights.insights.length > 0))) {
      doc.setFontSize(14);
      doc.setTextColor('#1f2937');
      doc.text('AI Insights & Recommendations', margin, y);
      y += 7;
      doc.setFontSize(11);
      doc.setTextColor('#333');
      if (insights.summary) {
        doc.text(insights.summary, margin, y);
        y += 7;
      }
      if (insights.insights && insights.insights.length > 0) {
        insights.insights.forEach(insight => {
          doc.setFont(undefined, 'bold');
          doc.text(insight.title, margin, y);
          y += 5;
          doc.setFont(undefined, 'normal');
          doc.text(insight.message, margin, y);
          y += 5;
          doc.setTextColor('#059669');
          doc.text(`💡 ${insight.recommendation}`, margin, y);
          doc.setTextColor('#333');
          y += 7;
        });
      }
    }

    // Footer: Add to every page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(136, 136, 136); // #888888
      const footerY = doc.internal.pageSize.height - 10; // ~287 mm safe margin
      // Left: Foxit credit
      doc.text('Generated by Uplytic — Powered by Foxit PDF SDK', margin, footerY, { align: 'left' });
      // Right: page number
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - margin, footerY, { align: 'right' });
    }

    // Save the PDF
    doc.save(this.options.filename);
  }
}

export const pdfExporter = new PDFExporter(); 
import html2pdf from 'html2pdf.js';

export class PDFExporter {
  constructor() {
    this.options = {
      margin: [10, 10, 10, 10],
      filename: 'api-monitoring-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };
  }

  async exportDashboard(api, stats, logs, insights, costImpact) {
    // Debug: Log arguments
    console.log('PDF Export - api:', api);
    console.log('PDF Export - stats:', stats);
    console.log('PDF Export - logs:', logs);
    console.log('PDF Export - insights:', insights);
    console.log('PDF Export - costImpact:', costImpact);

    // Debug: Log html2pdf import
    console.log('html2pdf object:', html2pdf); // <--- Check browser console for this output

    // Create a temporary container for the PDF content
    const container = document.createElement('div');
    container.className = 'pdf-container';
    container.style.cssText = `
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20px;
      background: white;
      color: #333;
    `;

    // Generate PDF content
    // DEBUG: Always use static test content
    let html = '<div style="font-size:32px;color:red;">Hello PDF</div>';
    console.log('PDF Export - using static test HTML:', html);
    container.innerHTML = html;

    // Debug: Render container at top left for inspection
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    container.style.zIndex = '9999';
    // (Revert to left: -9999px after debugging)
    document.body.appendChild(container);

    // Wait for content to render (especially for SVG/images)
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      // Configure PDF options
      const pdfOptions = {
        ...this.options,
        filename: `api-report-${api.name}-${new Date().toISOString().split('T')[0]}.pdf`
      };

      // Generate PDF
      await html2pdf().from(container).set(pdfOptions).save();
    } finally {
      // Clean up
      document.body.removeChild(container);
    }
  }

  generatePDFContent(api, stats, logs, insights, costImpact) {
    const now = new Date().toLocaleString();
    // SVG logo as used in DashboardLayout.vue
    const logoSVG = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`;
    return `
      <div class="pdf-header">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="background: linear-gradient(135deg, #2563eb 0%, #6366f1 100%); border-radius: 12px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(59,130,246,0.15);">
              ${logoSVG}
            </div>
            <div>
              <h1 style="margin: 0; color: #3b82f6; font-size: 28px; font-weight: bold;">Uplytic</h1>
              <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">API Health Monitoring Report</p>
            </div>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; color: #6b7280; font-size: 12px;">Generated: ${now}</p>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">Built for DevNetwork Hackathon 2025</p>
          </div>
        </div>
      </div>

      <div class="api-overview" style="margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">API Overview</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px;">${api.name}</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px; word-break: break-all;">${api.url}</p>
          </div>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 18px;">Status</h3>
            <p style="margin: 0; color: ${stats.status < 400 ? '#10b981' : '#ef4444'}; font-size: 16px; font-weight: bold;">
              ${stats.status < 400 ? 'Operational' : 'Issues Detected'}
            </p>
          </div>
        </div>
      </div>

      <div class="key-metrics" style="margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Key Metrics</h2>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
          <div style="background: #eff6ff; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #3b82f6;">${stats.uptime}%</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">Uptime</div>
          </div>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #10b981;">${stats.avgLatency}ms</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">Avg Response</div>
          </div>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #f59e0b;">${stats.totalChecks}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">Total Checks</div>
          </div>
          <div style="background: #fef2f2; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #ef4444;">${logs.filter(log => log.status_code >= 400).length}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">Errors</div>
          </div>
        </div>
      </div>

      ${costImpact ? `
        <div class="cost-impact" style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Cost Impact Analysis</h2>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px;">Financial Impact (Last 24 Hours)</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
              <div>
                <div style="font-size: 20px; font-weight: bold; color: #92400e;">$${costImpact.totalLoss.toFixed(2)}</div>
                <div style="font-size: 12px; color: #6b7280;">Total Loss</div>
              </div>
              <div>
                <div style="font-size: 20px; font-weight: bold; color: #92400e;">${costImpact.downtimeMinutes}</div>
                <div style="font-size: 12px; color: #6b7280;">Downtime (min)</div>
              </div>
              <div>
                <div style="font-size: 20px; font-weight: bold; color: #92400e;">$${costImpact.costPerHour}/hr</div>
                <div style="font-size: 12px; color: #6b7280;">Cost Rate</div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      ${insights && insights.insights && insights.insights.length > 0 ? `
        <div class="ai-insights" style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">AI Insights & Recommendations</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #1f2937; font-weight: 500;">${insights.summary}</p>
            ${insights.insights.map(insight => `
              <div style="margin-bottom: 15px; padding: 15px; border-radius: 6px; border-left: 4px solid ${insight.severity === 'critical' ? '#ef4444' : '#f59e0b'}; background: white;">
                <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${insight.title}</h4>
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${insight.message}</p>
                <p style="margin: 0; color: #059669; font-size: 13px; font-weight: 500;">💡 ${insight.recommendation}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="recent-activity" style="margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Recent Activity (Last 10 Checks)</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background: #f8fafc;">
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Time</th>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Status</th>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Response Time</th>
            </tr>
          </thead>
          <tbody>
            ${logs.slice(0, 10).map(log => `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px; color: #6b7280;">${new Date(log.created_at).toLocaleString()}</td>
                <td style="padding: 12px;">
                  <span style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; background: ${log.status_code < 400 ? '#d1fae5' : '#fee2e2'}; color: ${log.status_code < 400 ? '#065f46' : '#991b1b'};">
                    ${log.status_code}
                  </span>
                </td>
                <td style="padding: 12px; color: #1f2937;">${log.latency_ms}ms</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="footer" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
        <p style="margin: 0;">Generated by Uplytic - API Health Monitoring Platform</p>
        <p style="margin: 5px 0 0 0;">Built for DevNetwork Hackathon 2025</p>
        <p style="margin: 5px 0 0 0; color: #3b82f6; font-weight: bold;">PDF generated using Uplytic PDF tools, inspired by Foxit</p>
      </div>
    `;
  }

  // Export specific API data
  async exportApiReport(api, logs, insights) {
    const stats = {
      uptime: 0,
      avgLatency: 0,
      totalChecks: logs.length,
      status: logs.length > 0 ? logs[0].status_code : 0
    };

    if (logs.length > 0) {
      const successfulChecks = logs.filter(log => log.status_code < 400).length;
      stats.uptime = Math.round((successfulChecks / logs.length) * 100 * 100) / 100;
      stats.avgLatency = Math.round(logs.reduce((sum, log) => sum + log.latency_ms, 0) / logs.length);
    }

    await this.exportDashboard(api, stats, logs, insights, null);
  }
}

export const pdfExporter = new PDFExporter(); 
// AI Insights Engine for API Monitoring
// Provides actionable insights and cost analysis based on API logs

export class InsightsEngine {
  constructor() {
    this.insightRules = [
      {
        id: 'latency_spike',
        condition: (logs, threshold = 0.4) => {
          if (logs.length < 10) return null;
          const recent = logs.slice(0, 10);
          const older = logs.slice(10, 20);
          if (older.length === 0) return null;
          
          const recentAvg = recent.reduce((sum, log) => sum + log.latency_ms, 0) / recent.length;
          const olderAvg = older.reduce((sum, log) => sum + log.latency_ms, 0) / older.length;
          
          if (olderAvg === 0) return null;
          const increase = (recentAvg - olderAvg) / olderAvg;
          
          return increase > threshold ? {
            severity: 'warning',
            title: 'Latency Spike Detected',
            message: `Response time increased by ${Math.round(increase * 100)}% over the last hour`,
            recommendation: 'Check server load, database queries, or external dependencies',
            impact: 'User experience degradation'
          } : null;
        }
      },
      {
        id: 'error_spike',
        condition: (logs) => {
          if (logs.length < 20) return null;
          const recent = logs.slice(0, 10);
          const older = logs.slice(10, 20);
          
          const recentErrors = recent.filter(log => log.status_code >= 400).length;
          const olderErrors = older.filter(log => log.status_code >= 400).length;
          
          if (recentErrors > 3 && recentErrors > olderErrors * 2) {
            return {
              severity: 'critical',
              title: 'Error Rate Spike',
              message: `${recentErrors} errors in the last 10 checks (vs ${olderErrors} previously)`,
              recommendation: 'Investigate server logs, check for recent deployments, or rate limiting issues',
              impact: 'Service reliability compromised'
            };
          }
          return null;
        }
      },
      {
        id: 'downtime_detected',
        condition: (logs) => {
          if (logs.length === 0) return null;
          const recent = logs.slice(0, 5);
          const consecutiveFailures = recent.filter(log => log.status_code >= 400).length;
          
          if (consecutiveFailures >= 3) {
            return {
              severity: 'critical',
              title: 'Potential Downtime',
              message: `${consecutiveFailures} consecutive failures detected`,
              recommendation: 'Immediate investigation required. Check server status and infrastructure',
              impact: 'Service unavailable'
            };
          }
          return null;
        }
      },
      {
        id: 'performance_degradation',
        condition: (logs, threshold = 1000) => {
          if (logs.length < 5) return null;
          const recent = logs.slice(0, 5);
          const avgLatency = recent.reduce((sum, log) => sum + log.latency_ms, 0) / recent.length;
          
          if (avgLatency > threshold) {
            return {
              severity: 'warning',
              title: 'Performance Degradation',
              message: `Average response time is ${Math.round(avgLatency)}ms (above ${threshold}ms threshold)`,
              recommendation: 'Optimize database queries, check for memory leaks, or scale resources',
              impact: 'Slow user experience'
            };
          }
          return null;
        }
      }
    ];
  }

  analyzeApi(api, logs) {
    const insights = [];
    
    // Run all insight rules
    this.insightRules.forEach(rule => {
      const insight = rule.condition(logs);
      if (insight) {
        insights.push({
          ...insight,
          ruleId: rule.id,
          timestamp: new Date().toISOString(),
          apiId: api.id,
          apiName: api.name
        });
      }
    });

    // Calculate cost impact
    const costImpact = this.calculateCostImpact(api, logs);
    
    return {
      insights,
      costImpact,
      summary: this.generateSummary(insights, costImpact)
    };
  }

  calculateCostImpact(api, logs) {
    if (!api.cost_per_hour) return null;
    
    const last24Hours = logs.filter(log => {
      const logTime = new Date(log.created_at);
      const now = new Date();
      return (now - logTime) <= 24 * 60 * 60 * 1000;
    });

    const downtimeMinutes = last24Hours.filter(log => log.status_code >= 400).length;
    const costPerMinute = api.cost_per_hour / 60;
    const totalLoss = downtimeMinutes * costPerMinute;

    return {
      downtimeMinutes,
      costPerHour: api.cost_per_hour,
      totalLoss: Math.round(totalLoss * 100) / 100,
      uptimePercentage: last24Hours.length > 0 ? 
        ((last24Hours.length - downtimeMinutes) / last24Hours.length) * 100 : 100
    };
  }

  generateSummary(insights, costImpact) {
    const criticalCount = insights.filter(i => i.severity === 'critical').length;
    const warningCount = insights.filter(i => i.severity === 'warning').length;
    
    let summary = '';
    
    if (criticalCount > 0) {
      summary += `🚨 ${criticalCount} critical issue${criticalCount > 1 ? 's' : ''} detected. `;
    }
    
    if (warningCount > 0) {
      summary += `⚠️ ${warningCount} warning${warningCount > 1 ? 's' : ''} identified. `;
    }
    
    if (costImpact && costImpact.totalLoss > 0) {
      summary += `💰 Estimated downtime cost: $${costImpact.totalLoss.toFixed(2)}. `;
    }
    
    if (insights.length === 0) {
      summary = '✅ All systems operational. No issues detected.';
    }
    
    return summary;
  }

  // Generate AI-powered recommendations
  generateRecommendations(api, logs) {
    const recommendations = [];
    
    // Analyze patterns
    const errorCodes = logs.filter(log => log.status_code >= 400)
      .reduce((acc, log) => {
        acc[log.status_code] = (acc[log.status_code] || 0) + 1;
        return acc;
      }, {});
    
    const avgLatency = logs.length > 0 ? 
      logs.reduce((sum, log) => sum + log.latency_ms, 0) / logs.length : 0;
    
    // Specific recommendations based on patterns
    if (errorCodes[500]) {
      recommendations.push({
        type: 'error',
        title: 'Server Errors (500)',
        description: `${errorCodes[500]} server errors detected`,
        action: 'Check server logs and application error handling'
      });
    }
    
    if (errorCodes[404]) {
      recommendations.push({
        type: 'warning',
        title: 'Not Found Errors (404)',
        description: `${errorCodes[404]} 404 errors detected`,
        action: 'Verify API endpoints and routing configuration'
      });
    }
    
    if (avgLatency > 1000) {
      recommendations.push({
        type: 'performance',
        title: 'High Latency',
        description: `Average response time: ${Math.round(avgLatency)}ms`,
        action: 'Consider database optimization or caching strategies'
      });
    }
    
    return recommendations;
  }
}

export const insightsEngine = new InsightsEngine(); 
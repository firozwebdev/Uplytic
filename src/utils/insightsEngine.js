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
      },
      {
        id: 'cost_impact_alert',
        condition: (logs, api) => {
          if (!api.cost_per_hour || logs.length === 0) return null;
          
          const last24Hours = logs.filter(log => {
            const logTime = new Date(log.created_at);
            const now = new Date();
            return (now - logTime) <= 24 * 60 * 60 * 1000;
          });
          
          const downtimeMinutes = last24Hours.filter(log => log.status_code >= 400).length;
          const costPerMinute = api.cost_per_hour / 60;
          const totalLoss = downtimeMinutes * costPerMinute;
          
          if (totalLoss > 50) {
            return {
              severity: 'critical',
              title: 'High Cost Impact',
              message: `Downtime cost: $${totalLoss.toFixed(2)} in the last 24 hours`,
              recommendation: 'Implement immediate fixes to reduce financial impact',
              impact: 'Significant financial loss'
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
      const insight = rule.condition(logs, api);
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

    // Calculate enhanced cost impact
    const costImpact = this.calculateEnhancedCostImpact(api, logs);
    
    return {
      insights,
      costImpact,
      summary: this.generateSummary(insights, costImpact)
    };
  }

  calculateEnhancedCostImpact(api, logs) {
    if (!api.cost_per_hour) return null;
    
    try {
      const last24Hours = logs.filter(log => {
        const logTime = new Date(log.created_at);
        const now = new Date();
        return (now - logTime) <= 24 * 60 * 60 * 1000;
      });

      const last7Days = logs.filter(log => {
        const logTime = new Date(log.created_at);
        const now = new Date();
        return (now - logTime) <= 7 * 24 * 60 * 60 * 1000;
      });

      const last30Days = logs.filter(log => {
        const logTime = new Date(log.created_at);
        const now = new Date();
        return (now - logTime) <= 30 * 24 * 60 * 60 * 1000;
      });

      // Calculate downtime metrics
      const downtime24h = last24Hours.filter(log => log.status_code >= 400).length;
      const downtime7d = last7Days.filter(log => log.status_code >= 400).length;
      const downtime30d = last30Days.filter(log => log.status_code >= 400).length;

      // Calculate costs
      const costPerMinute = api.cost_per_hour / 60;
      const totalLoss24h = downtime24h * costPerMinute;
      const totalLoss7d = downtime7d * costPerMinute;
      const totalLoss30d = downtime30d * costPerMinute;

      // Calculate uptime percentages
      const uptime24h = last24Hours.length > 0 ? 
        ((last24Hours.length - downtime24h) / last24Hours.length) * 100 : 100;
      const uptime7d = last7Days.length > 0 ? 
        ((last7Days.length - downtime7d) / last7Days.length) * 100 : 100;
      const uptime30d = last30Days.length > 0 ? 
        ((last30Days.length - downtime30d) / last30Days.length) * 100 : 100;

      // Calculate additional metrics
      const avgLatency = last24Hours.length > 0 ? 
        last24Hours.reduce((sum, log) => sum + log.latency_ms, 0) / last24Hours.length : 0;
      
      const errorRate = last24Hours.length > 0 ? 
        (last24Hours.filter(log => log.status_code >= 400).length / last24Hours.length) * 100 : 0;

      // Calculate trend analysis
      const recentTrend = this.calculateTrend(last24Hours.slice(0, 12), last24Hours.slice(12, 24));
      
      // Calculate risk score (0-100)
      const riskScore = this.calculateRiskScore({
        uptime: uptime24h,
        errorRate,
        avgLatency,
        totalLoss: totalLoss24h,
        costPerHour: api.cost_per_hour
      });

      // Calculate optimization potential
      const optimizationPotential = this.calculateOptimizationPotential({
        currentLoss: totalLoss24h,
        uptime: uptime24h,
        errorRate,
        avgLatency
      });

      return {
        // Basic metrics
        downtimeMinutes: downtime24h,
        costPerHour: api.cost_per_hour,
        totalLoss: Math.round(totalLoss24h * 100) / 100,
        uptimePercentage: Math.round(uptime24h * 100) / 100,
        
        // Enhanced metrics
        totalLoss7d: Math.round(totalLoss7d * 100) / 100,
        totalLoss30d: Math.round(totalLoss30d * 100) / 100,
        uptime7d: Math.round(uptime7d * 100) / 100,
        uptime30d: Math.round(uptime30d * 100) / 100,
        
        // Performance metrics
        avgLatency: Math.round(avgLatency),
        errorRate: Math.round(errorRate * 100) / 100,
        
        // Analysis
        trend: recentTrend,
        riskScore: Math.round(riskScore),
        optimizationPotential: Math.round(optimizationPotential * 100) / 100,
        
        // Projections
        projectedMonthlyLoss: Math.round(totalLoss24h * 30 * 100) / 100,
        projectedAnnualLoss: Math.round(totalLoss24h * 365 * 100) / 100,
        
        // ROI calculations
        potentialSavings: Math.round(optimizationPotential * 12 * 100) / 100,
        roiPotential: Math.round((optimizationPotential / (api.cost_per_hour * 0.1)) * 100),
        
        // Status indicators
        status: this.getStatusIndicator(uptime24h, errorRate, totalLoss24h),
        priority: this.getPriorityLevel(riskScore, totalLoss24h)
      };
    } catch (error) {
      console.error('Error calculating cost impact:', error);
      // Fallback to basic calculation
      return this.calculateBasicCostImpact(api, logs);
    }
  }

  calculateBasicCostImpact(api, logs) {
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

  calculateTrend(recent, older) {
    if (recent.length === 0 || older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, log) => sum + log.latency_ms, 0) / recent.length;
    const olderAvg = older.reduce((sum, log) => sum + log.latency_ms, 0) / older.length;
    
    if (olderAvg === 0) return 'stable';
    
    const change = (recentAvg - olderAvg) / olderAvg;
    
    if (change > 0.2) return 'increasing';
    if (change < -0.2) return 'decreasing';
    return 'stable';
  }

  calculateRiskScore(metrics) {
    let score = 0;
    
    // Uptime impact (40% weight)
    if (metrics.uptime < 95) score += 40;
    else if (metrics.uptime < 99) score += 20;
    else if (metrics.uptime < 99.9) score += 10;
    
    // Error rate impact (30% weight)
    if (metrics.errorRate > 10) score += 30;
    else if (metrics.errorRate > 5) score += 20;
    else if (metrics.errorRate > 1) score += 10;
    
    // Latency impact (20% weight)
    if (metrics.avgLatency > 2000) score += 20;
    else if (metrics.avgLatency > 1000) score += 15;
    else if (metrics.avgLatency > 500) score += 10;
    
    // Cost impact (10% weight)
    if (metrics.totalLoss > 100) score += 10;
    else if (metrics.totalLoss > 50) score += 5;
    
    return Math.min(score, 100);
  }

  calculateOptimizationPotential(metrics) {
    let potential = 0;
    
    // Uptime improvement potential
    if (metrics.uptime < 99.9) {
      potential += (99.9 - metrics.uptime) * 10;
    }
    
    // Error rate reduction potential
    if (metrics.errorRate > 0) {
      potential += metrics.errorRate * 5;
    }
    
    // Latency optimization potential
    if (metrics.avgLatency > 500) {
      potential += (metrics.avgLatency - 500) * 0.01;
    }
    
    return potential;
  }

  getStatusIndicator(uptime, errorRate, totalLoss) {
    if (uptime >= 99.9 && errorRate < 1 && totalLoss < 10) return 'excellent';
    if (uptime >= 99 && errorRate < 5 && totalLoss < 50) return 'good';
    if (uptime >= 95 && errorRate < 10 && totalLoss < 100) return 'fair';
    return 'poor';
  }

  getPriorityLevel(riskScore, totalLoss) {
    if (riskScore > 70 || totalLoss > 100) return 'high';
    if (riskScore > 40 || totalLoss > 50) return 'medium';
    return 'low';
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
    
    if (costImpact && costImpact.riskScore > 70) {
      summary += `⚠️ High risk score: ${costImpact.riskScore}/100. `;
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
        action: 'Check server logs and application error handling',
        priority: 'high',
        estimatedSavings: 2000
      });
    }
    
    if (errorCodes[404]) {
      recommendations.push({
        type: 'warning',
        title: 'Not Found Errors (404)',
        description: `${errorCodes[404]} 404 errors detected`,
        action: 'Verify API endpoints and routing configuration',
        priority: 'medium',
        estimatedSavings: 1000
      });
    }
    
    if (avgLatency > 1000) {
      recommendations.push({
        type: 'performance',
        title: 'High Latency',
        description: `Average response time: ${Math.round(avgLatency)}ms`,
        action: 'Consider database optimization or caching strategies',
        priority: 'high',
        estimatedSavings: 3000
      });
    }
    
    // Add cost optimization recommendations
    if (api.cost_per_hour > 50) {
      recommendations.push({
        type: 'cost',
        title: 'High Operational Cost',
        description: `Cost per hour: $${api.cost_per_hour}`,
        action: 'Consider auto-scaling and resource optimization',
        priority: 'medium',
        estimatedSavings: 5000
      });
    }
    
    return recommendations;
  }
}

export const insightsEngine = new InsightsEngine(); 
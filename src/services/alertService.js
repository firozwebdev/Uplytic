import { supabase } from './supabaseClient';
import { insightsEngine } from '../utils/insightsEngine';

export class AlertService {
  constructor() {
    this.alertThresholds = {
      consecutiveFailures: 3,
      errorRateThreshold: 0.3, // 30% error rate
      latencyThreshold: 2000, // 2 seconds
      uptimeThreshold: 95 // 95% uptime
    };
  }

  // Check if alerts should be triggered for an API
  async checkAlerts(api, logs) {
    const alerts = [];
    
    // Check for consecutive failures
    const consecutiveFailures = this.checkConsecutiveFailures(logs);
    if (consecutiveFailures >= this.alertThresholds.consecutiveFailures) {
      alerts.push({
        type: 'critical',
        title: 'Consecutive Failures Detected',
        message: `${consecutiveFailures} consecutive failures for ${api.name}`,
        api_id: api.id,
        api_name: api.name,
        severity: 'critical',
        timestamp: new Date().toISOString()
      });
    }

    // Check error rate
    const errorRate = this.calculateErrorRate(logs);
    if (errorRate > this.alertThresholds.errorRateThreshold) {
      alerts.push({
        type: 'warning',
        title: 'High Error Rate',
        message: `${Math.round(errorRate * 100)}% error rate for ${api.name}`,
        api_id: api.id,
        api_name: api.name,
        severity: 'warning',
        timestamp: new Date().toISOString()
      });
    }

    // Check latency
    const avgLatency = this.calculateAverageLatency(logs);
    if (avgLatency > this.alertThresholds.latencyThreshold) {
      alerts.push({
        type: 'warning',
        title: 'High Latency Detected',
        message: `Average response time: ${Math.round(avgLatency)}ms for ${api.name}`,
        api_id: api.id,
        api_name: api.name,
        severity: 'warning',
        timestamp: new Date().toISOString()
      });
    }

    // Check uptime
    const uptime = this.calculateUptime(logs);
    if (uptime < this.alertThresholds.uptimeThreshold) {
      alerts.push({
        type: 'critical',
        title: 'Low Uptime Alert',
        message: `${uptime.toFixed(2)}% uptime for ${api.name}`,
        api_id: api.id,
        api_name: api.name,
        severity: 'critical',
        timestamp: new Date().toISOString()
      });
    }

    // Use AI insights for additional alerts
    const insights = insightsEngine.analyzeApi(api, logs);
    insights.insights.forEach(insight => {
      if (insight.severity === 'critical') {
        alerts.push({
          type: 'ai_insight',
          title: insight.title,
          message: insight.message,
          api_id: api.id,
          api_name: api.name,
          severity: 'critical',
          recommendation: insight.recommendation,
          timestamp: new Date().toISOString()
        });
      }
    });

    return alerts;
  }

  // Save alerts to database
  async saveAlerts(alerts) {
    if (alerts.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('alerts')
        .insert(alerts)
        .select();

      if (error) {
        console.error('Failed to save alerts:', error);
        return;
      }

      // Trigger notifications for critical alerts
      const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');
      if (criticalAlerts.length > 0) {
        await this.triggerNotifications(criticalAlerts);
      }

      return data;
    } catch (error) {
      console.error('Error saving alerts:', error);
    }
  }

  // Trigger notifications (email, webhook, etc.)
  async triggerNotifications(alerts) {
    // For demo purposes, we'll log to console
    // In production, this would send emails, webhooks, or push notifications
    alerts.forEach(alert => {
      console.log(`🚨 ALERT: ${alert.title} - ${alert.message}`);
      
      // You could integrate with services like:
      // - Email service (SendGrid, Mailgun)
      // - Webhook notifications (Slack, Discord, Teams)
      // - Push notifications
      // - SMS (Twilio)
    });
  }

  // Fetch alerts for an API
  async fetchAlerts(apiId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('api_id', apiId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  }

  // Mark alert as resolved
  async resolveAlert(alertId) {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .update({ 
          resolved: true, 
          resolved_at: new Date().toISOString() 
        })
        .eq('id', alertId)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error resolving alert:', error);
      throw error;
    }
  }

  // Helper methods
  checkConsecutiveFailures(logs) {
    if (logs.length === 0) return 0;
    
    let consecutive = 0;
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].status_code >= 400) {
        consecutive++;
      } else {
        break;
      }
    }
    return consecutive;
  }

  calculateErrorRate(logs) {
    if (logs.length === 0) return 0;
    const errors = logs.filter(log => log.status_code >= 400).length;
    return errors / logs.length;
  }

  calculateAverageLatency(logs) {
    if (logs.length === 0) return 0;
    const total = logs.reduce((sum, log) => sum + log.latency_ms, 0);
    return total / logs.length;
  }

  calculateUptime(logs) {
    if (logs.length === 0) return 100;
    const successful = logs.filter(log => log.status_code < 400).length;
    return (successful / logs.length) * 100;
  }

  // Get alert statistics
  async getAlertStats(apiId) {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('severity, resolved')
        .eq('api_id', apiId);

      if (error) throw error;

      const stats = {
        total: data.length,
        critical: data.filter(a => a.severity === 'critical').length,
        warning: data.filter(a => a.severity === 'warning').length,
        resolved: data.filter(a => a.resolved).length,
        unresolved: data.filter(a => !a.resolved).length
      };

      return stats;
    } catch (error) {
      console.error('Error fetching alert stats:', error);
      return {
        total: 0,
        critical: 0,
        warning: 0,
        resolved: 0,
        unresolved: 0
      };
    }
  }
}

export const alertService = new AlertService(); 
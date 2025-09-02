import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityPanel = () => {
  const securityMetrics = [
    { label: 'Failed Logins', value: '23', status: 'warning', time: 'Last 24h' },
    { label: 'Blocked IPs', value: '8', status: 'error', time: 'This week' },
    { label: 'Active Sessions', value: '1,245', status: 'success', time: 'Current' },
    { label: 'Security Score', value: '98%', status: 'success', time: 'Overall' },
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'suspicious',
      event: 'Multiple failed login attempts',
      details: 'IP: 192.168.1.100 (5 attempts)',
      time: '10 mins ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'access',
      event: 'Admin login from new device',
      details: 'Chrome on Windows - San Francisco, CA',
      time: '25 mins ago',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'system',
      event: 'Security patch applied',
      details: 'System updated to version 2.1.5',
      time: '2 hours ago',
      severity: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'suspicious': return 'AlertTriangle';
      case 'access': return 'LogIn';
      case 'system': return 'Shield';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Security Monitor</h3>
              <p className="text-sm text-muted-foreground">Security events and metrics</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          {securityMetrics?.map((metric, index) => (
            <div key={index} className="text-center p-3 rounded-lg bg-muted/20">
              <p className={`text-xl font-bold ${getStatusColor(metric?.status)}`}>
                {metric?.value}
              </p>
              <p className="text-sm text-foreground font-medium">{metric?.label}</p>
              <p className="text-xs text-muted-foreground">{metric?.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Events */}
      <div className="p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Recent Security Events</h4>
        <div className="space-y-3">
          {securityEvents?.map((event) => (
            <div key={event?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityColor(event?.severity)}`}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground">{event?.event}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(event?.severity)}`}>
                    {event?.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{event?.details}</p>
                <p className="text-xs text-muted-foreground">{event?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Actions */}
      <div className="p-6 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" iconName="Eye" fullWidth>
            View Logs
          </Button>
          <Button variant="outline" size="sm" iconName="Lock" fullWidth>
            Security Rules
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;
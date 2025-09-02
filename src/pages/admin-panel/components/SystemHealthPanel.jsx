import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealthPanel = () => {
  const healthMetrics = [
    { name: 'Server Status', value: 'Online', status: 'healthy', icon: 'Server' },
    { name: 'Database', value: '99.9%', status: 'healthy', icon: 'Database' },
    { name: 'API Response', value: '120ms', status: 'healthy', icon: 'Zap' },
    { name: 'Storage', value: '68%', status: 'warning', icon: 'HardDrive' },
    { name: 'Memory Usage', value: '45%', status: 'healthy', icon: 'Cpu' },
    { name: 'Network', value: 'Stable', status: 'healthy', icon: 'Wifi' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">System Health</h3>
              <p className="text-sm text-muted-foreground">Real-time system monitoring</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Health Status */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-center space-x-4 p-6 bg-success/5 rounded-lg border border-success/20">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">99.8%</p>
            <p className="text-sm text-muted-foreground">System Uptime</p>
            <p className="text-xs text-success font-medium mt-1">All systems operational</p>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Component Status</h4>
        <div className="space-y-3">
          {healthMetrics?.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center">
                  <Icon name={metric?.icon} size={16} />
                </div>
                <span className="font-medium text-foreground">{metric?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground">{metric?.value}</span>
                <Icon name={getStatusIcon(metric?.status)} size={16} className={getStatusColor(metric?.status)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Actions */}
      <div className="p-6 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" iconName="RefreshCw" fullWidth>
            Refresh Status
          </Button>
          <Button variant="outline" size="sm" iconName="Settings" fullWidth>
            System Logs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPanel;
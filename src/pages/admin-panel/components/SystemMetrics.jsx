import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetrics = () => {
  const metricsData = [
    {
      title: "Total Users",
      value: "15,847",
      change: "+12.3%",
      changeType: "increase",
      icon: "Users",
      color: "primary",
      description: "Active platform users"
    },
    {
      title: "Daily Orders",
      value: "2,456",
      change: "+8.7%",
      changeType: "increase",
      icon: "ShoppingCart",
      color: "success",
      description: "Orders processed today"
    },
    {
      title: "Revenue",
      value: "$1.2M",
      change: "+15.2%",
      changeType: "increase",
      icon: "DollarSign",
      color: "success",
      description: "Monthly revenue"
    },
    {
      title: "System Health",
      value: "99.8%",
      change: "+0.1%",
      changeType: "increase",
      icon: "Activity",
      color: "primary",
      description: "Uptime percentage"
    },
    {
      title: "Active Sellers",
      value: "1,234",
      change: "+5.4%",
      changeType: "increase",
      icon: "Store",
      color: "primary",
      description: "Verified sellers"
    },
    {
      title: "Support Tickets",
      value: "89",
      change: "-12.5%",
      changeType: "decrease",
      icon: "HelpCircle",
      color: "warning",
      description: "Pending tickets"
    }
  ];

  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-success' : type === 'decrease' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">Platform Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {metricsData?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-medium transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(metric?.color)}`}>
                <Icon name={metric?.icon} size={24} />
              </div>
              {metric?.change && (
                <div className={`flex items-center space-x-1 ${getChangeColor(metric?.changeType)}`}>
                  <Icon 
                    name={metric?.changeType === 'increase' ? 'TrendingUp' : metric?.changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                  />
                  <span className="text-sm font-medium">{metric?.change}</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{metric?.value}</h3>
              <p className="text-sm font-medium text-muted-foreground mb-1">{metric?.title}</p>
              <p className="text-xs text-muted-foreground">{metric?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemMetrics;
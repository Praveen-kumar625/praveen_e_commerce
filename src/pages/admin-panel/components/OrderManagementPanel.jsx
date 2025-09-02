import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderManagementPanel = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const orderStats = [
    { label: 'Total Orders', value: '2,456', change: '+12%', icon: 'ShoppingCart' },
    { label: 'Pending Orders', value: '89', change: '-5%', icon: 'Clock' },
    { label: 'Completed', value: '2,234', change: '+15%', icon: 'CheckCircle' },
    { label: 'Cancelled', value: '133', change: '+2%', icon: 'XCircle' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '$299.99', status: 'Processing', time: '2 mins ago' },
    { id: '#ORD-002', customer: 'Sarah Wilson', amount: '$149.99', status: 'Completed', time: '5 mins ago' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '$599.99', status: 'Pending', time: '10 mins ago' },
    { id: '#ORD-004', customer: 'Emma Brown', amount: '$89.99', status: 'Processing', time: '15 mins ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-success bg-success/10';
      case 'Processing': return 'text-primary bg-primary/10';
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Cancelled': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Order Management</h3>
              <p className="text-sm text-muted-foreground">Monitor orders and transactions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e?.target?.value)}
              className="px-3 py-1.5 border border-border rounded-lg bg-background text-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStats?.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-muted/20">
              <div className="flex items-center justify-center mb-2">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
              <p className={`text-xs mt-1 ${stat?.change?.startsWith('+') ? 'text-success' : 'text-error'}`}>
                {stat?.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Recent Orders</h4>
        <div className="space-y-3">
          {recentOrders?.map((order) => (
            <div key={order?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{order?.id}</p>
                  <p className="text-sm text-muted-foreground">{order?.customer}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-foreground">{order?.amount}</p>
                  <p className="text-xs text-muted-foreground">{order?.time}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagementPanel;
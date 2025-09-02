import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrdersPanel = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const orders = {
    pending: [
      {
        id: "ORD-2025-001",
        customer: "John Smith",
        product: "iPhone 15 Pro Max",
        amount: 1199.99,
        date: "2025-01-02",
        priority: "high"
      },
      {
        id: "ORD-2025-002",
        customer: "Sarah Johnson",
        product: "MacBook Air M3",
        amount: 1299.99,
        date: "2025-01-02",
        priority: "medium"
      },
      {
        id: "ORD-2025-003",
        customer: "Mike Wilson",
        product: "Sony WH-1000XM5",
        amount: 399.99,
        date: "2025-01-01",
        priority: "low"
      }
    ],
    processing: [
      {
        id: "ORD-2025-004",
        customer: "Emily Davis",
        product: "Samsung Galaxy S24",
        amount: 1099.99,
        date: "2025-01-01",
        status: "packaging"
      },
      {
        id: "ORD-2025-005",
        customer: "David Brown",
        product: "Nike Air Max 270",
        amount: 149.99,
        date: "2024-12-31",
        status: "ready_to_ship"
      }
    ],
    returns: [
      {
        id: "RET-2025-001",
        customer: "Lisa Anderson",
        product: "iPad Pro 12.9",
        amount: 999.99,
        date: "2024-12-30",
        reason: "Defective item"
      }
    ]
  };

  const tabs = [
    { id: 'pending', label: 'Pending', count: orders?.pending?.length, icon: 'Clock' },
    { id: 'processing', label: 'Processing', count: orders?.processing?.length, icon: 'Package' },
    { id: 'returns', label: 'Returns', count: orders?.returns?.length, icon: 'RotateCcw' }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error/10 text-error',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-success/10 text-success'
    };
    return colors?.[priority] || colors?.low;
  };

  const getStatusColor = (status) => {
    const colors = {
      packaging: 'bg-warning/10 text-warning',
      ready_to_ship: 'bg-success/10 text-success'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Order Management</h3>
          <Link to="/seller-dashboard/orders">
            <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150
                ${activeTab === tab?.id 
                  ? 'bg-card text-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-medium
                ${activeTab === tab?.id ? 'bg-primary/10 text-primary' : 'bg-muted-foreground/10 text-muted-foreground'}
              `}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {orders?.[activeTab]?.map((order) => (
            <div key={order?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/20 transition-colors duration-150">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingBag" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{order?.id}</h4>
                  <p className="text-sm text-muted-foreground">{order?.customer}</p>
                  <p className="text-sm text-muted-foreground">{order?.product}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-foreground">${order?.amount}</p>
                  <p className="text-sm text-muted-foreground">{order?.date}</p>
                </div>
                
                {order?.priority && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order?.priority)}`}>
                    {order?.priority}
                  </span>
                )}
                
                {order?.status && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                    {order?.status?.replace('_', ' ')}
                  </span>
                )}
                
                {order?.reason && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
                    {order?.reason}
                  </span>
                )}
                
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon">
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {orders?.[activeTab]?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No {activeTab} orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPanel;
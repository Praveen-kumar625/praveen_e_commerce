import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStats = ({ orders }) => {
  const calculateStats = () => {
    const totalOrders = orders?.length;
    const totalSpent = orders?.reduce((sum, order) => sum + order?.totalAmount, 0);
    const deliveredOrders = orders?.filter(order => order?.status === 'delivered')?.length;
    const pendingOrders = orders?.filter(order => order?.status === 'processing' || order?.status === 'shipped')?.length;

    return {
      totalOrders,
      totalSpent,
      deliveredOrders,
      pendingOrders,
      deliveryRate: totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0
    };
  };

  const stats = calculateStats();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders,
      icon: 'ShoppingCart',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Total Spent',
      value: formatPrice(stats?.totalSpent),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Delivered',
      value: stats?.deliveredOrders,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Pending',
      value: stats?.pendingOrders,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
              <p className="text-xl font-semibold text-foreground">{stat?.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;
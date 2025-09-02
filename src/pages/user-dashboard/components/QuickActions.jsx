import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      title: 'Browse Products',
      description: 'Explore our catalog',
      icon: 'ShoppingBag',
      path: '/product-catalog',
      color: 'bg-primary/10 text-primary'
    },
    {
      title: 'Track Orders',
      description: 'Check order status',
      icon: 'Package',
      path: '/order-history',
      color: 'bg-accent/10 text-accent'
    },
    {
      title: 'My Wishlist',
      description: 'Saved items',
      icon: 'Heart',
      path: '/user-dashboard/wishlist',
      color: 'bg-error/10 text-error'
    },
    {
      title: 'Support',
      description: 'Get help',
      icon: 'MessageCircle',
      path: '/user-dashboard/support',
      color: 'bg-success/10 text-success'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {quickActions?.map((action) => (
        <Link key={action?.title} to={action?.path}>
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-medium transition-all duration-200 hover:scale-105">
            <div className={`w-12 h-12 rounded-lg ${action?.color} flex items-center justify-center mb-3`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{action?.title}</h3>
            <p className="text-sm text-muted-foreground">{action?.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
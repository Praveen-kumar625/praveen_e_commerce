import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountOverview = ({ stats }) => {
  const overviewCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders,
      icon: 'ShoppingCart',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12 this month'
    },
    {
      title: 'Wishlist Items',
      value: stats?.wishlistItems,
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: '5 new items'
    },
    {
      title: 'Loyalty Points',
      value: stats?.loyaltyPoints,
      icon: 'Star',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+250 earned'
    },
    {
      title: 'Saved Addresses',
      value: stats?.savedAddresses,
      icon: 'MapPin',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '2 active'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {overviewCards?.map((card) => (
        <div key={card?.title} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${card?.bgColor} flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{card?.value}</h3>
            <p className="text-sm font-medium text-muted-foreground mb-2">{card?.title}</p>
            <p className="text-xs text-success">{card?.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountOverview;
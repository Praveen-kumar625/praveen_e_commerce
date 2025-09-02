import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentOrders = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'shipped':
        return 'text-primary bg-primary/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
        <Link to="/order-history">
          <Button variant="ghost" size="sm">
            View All
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {orders?.slice(0, 3)?.map((order) => (
          <div key={order?.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className="w-16 h-16 bg-background rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={order?.items?.[0]?.image}
                alt={order?.items?.[0]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-foreground truncate">
                    {order?.items?.[0]?.name}
                    {order?.items?.length > 1 && (
                      <span className="text-muted-foreground ml-1">
                        +{order?.items?.length - 1} more
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Order #{order?.id} • {order?.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${order?.total}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </span>
                </div>
              </div>
              
              {order?.status === 'Shipped' && (
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Truck" size={14} color="var(--color-primary)" />
                  <span className="text-muted-foreground">
                    Expected delivery: {order?.expectedDelivery}
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="outline" size="sm">
                  Track Order
                </Button>
                {order?.status === 'Delivered' && (
                  <Button variant="ghost" size="sm">
                    Buy Again
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
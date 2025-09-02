import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: 'Sony WH-1000XM5 has only 12 units left in stock',
      time: '2 hours ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'new_order',
      title: 'New Order Received',
      message: 'Order #ORD-2025-001 for iPhone 15 Pro Max',
      time: '4 hours ago',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'customer_message',
      title: 'Customer Inquiry',
      message: 'Question about MacBook Air M3 specifications',
      time: '6 hours ago',
      priority: 'medium',
      read: true
    },
    {
      id: 4,
      type: 'policy_update',
      title: 'Policy Update',
      message: 'New return policy guidelines have been published',
      time: '1 day ago',
      priority: 'low',
      read: true
    },
    {
      id: 5,
      type: 'payment_received',
      title: 'Payment Received',
      message: 'Weekly payout of $12,450 has been processed',
      time: '2 days ago',
      priority: 'low',
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    const icons = {
      low_stock: 'AlertTriangle',
      new_order: 'ShoppingCart',
      customer_message: 'MessageSquare',
      policy_update: 'FileText',
      payment_received: 'DollarSign'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning';
    
    const colors = {
      low_stock: 'text-error',
      new_order: 'text-success',
      customer_message: 'text-primary',
      policy_update: 'text-muted-foreground',
      payment_received: 'text-success'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const markAsRead = (id) => {
    setNotifications(notifications?.map(notif => 
      notif?.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications?.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full px-2 py-1">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`
              p-4 border-b border-border last:border-b-0 cursor-pointer transition-colors duration-150
              ${notification?.read ? 'bg-card hover:bg-muted/30' : 'bg-primary/5 hover:bg-primary/10'}
            `}
            onClick={() => markAsRead(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                ${notification?.read ? 'bg-muted' : 'bg-primary/10'}
              `}>
                <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  size={16} 
                  className={getNotificationColor(notification?.type, notification?.priority)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`
                    text-sm font-medium truncate
                    ${notification?.read ? 'text-muted-foreground' : 'text-foreground'}
                  `}>
                    {notification?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {notification?.time}
                  </span>
                </div>
                <p className={`
                  text-sm
                  ${notification?.read ? 'text-muted-foreground' : 'text-foreground'}
                `}>
                  {notification?.message}
                </p>
                {notification?.priority === 'high' && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon name="AlertCircle" size={12} className="text-error" />
                    <span className="text-xs text-error font-medium">High Priority</span>
                  </div>
                )}
              </div>
              {!notification?.read && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      {notifications?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
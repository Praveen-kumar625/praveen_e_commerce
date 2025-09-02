import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'System Alert',
      message: 'High server load detected',
      time: '5 mins ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'user',
      title: 'New Seller Registration',
      message: 'TechStore Inc. pending verification',
      time: '10 mins ago',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'order',
      title: 'Large Order Alert',
      message: 'Order #12345 exceeds $5,000',
      time: '15 mins ago',
      priority: 'medium',
      read: true
    },
    {
      id: 4,
      type: 'security',
      title: 'Security Notice',
      message: 'Multiple login attempts detected',
      time: '30 mins ago',
      priority: 'high',
      read: false
    },
    {
      id: 5,
      type: 'system',
      title: 'Backup Complete',
      message: 'Daily backup completed successfully',
      time: '1 hour ago',
      priority: 'low',
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return 'AlertTriangle';
      case 'user': return 'User';
      case 'order': return 'ShoppingCart';
      case 'security': return 'Shield';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'alert': return 'text-error bg-error/10';
      case 'user': return 'text-primary bg-primary/10';
      case 'order': return 'text-success bg-success/10';
      case 'security': return 'text-warning bg-warning/10';
      case 'system': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center relative">
              <Icon name="Bell" size={20} className="text-warning" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">System alerts and updates</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" iconName="Check">
              Mark All Read
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-4 border-b border-border hover:bg-muted/50 transition-colors ${
              !notification?.read ? 'bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification?.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification?.priority)}`}>
                      {notification?.priority}
                    </span>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {notification?.message}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {notification?.time}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="xs" iconName="Eye">
                      View
                    </Button>
                    {!notification?.read && (
                      <Button variant="ghost" size="xs" iconName="Check">
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="outline" size="sm" iconName="Bell" fullWidth>
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationCenter;
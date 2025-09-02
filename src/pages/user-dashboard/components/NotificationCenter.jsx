import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return 'Package';
      case 'offer':
        return 'Tag';
      case 'account':
        return 'User';
      case 'payment':
        return 'CreditCard';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return 'text-primary bg-primary/10';
      case 'offer':
        return 'text-accent bg-accent/10';
      case 'account':
        return 'text-success bg-success/10';
      case 'payment':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const displayedNotifications = showAll ? notifications : notifications?.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {notifications?.filter(n => !n?.read)?.length} unread
          </span>
          <Button variant="ghost" size="sm">
            Mark all read
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {displayedNotifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
              !notification?.read ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/30'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
              <Icon name={getNotificationIcon(notification?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification?.time}
                  </p>
                </div>
                {!notification?.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {notifications?.length > 5 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `View All ${notifications?.length} Notifications`}
            <Icon name={showAll ? "ChevronUp" : "ChevronDown"} size={16} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
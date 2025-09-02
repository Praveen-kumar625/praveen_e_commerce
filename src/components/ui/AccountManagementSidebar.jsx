import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AccountManagementSidebar = ({ isCollapsed = false }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    {
      title: 'Order History',
      path: '/order-history',
      icon: 'Package',
      description: 'Track and manage orders'
    },
    {
      title: 'Profile Settings',
      path: '/user-dashboard/profile',
      icon: 'User',
      description: 'Personal information'
    },
    {
      title: 'Addresses',
      path: '/user-dashboard/addresses',
      icon: 'MapPin',
      description: 'Delivery addresses'
    },
    {
      title: 'Payment Methods',
      path: '/user-dashboard/payments',
      icon: 'CreditCard',
      description: 'Saved payment options'
    },
    {
      title: 'Wishlist',
      path: '/user-dashboard/wishlist',
      icon: 'Heart',
      description: 'Saved items'
    },
    {
      title: 'Notifications',
      path: '/user-dashboard/notifications',
      icon: 'Bell',
      description: 'Alerts and updates'
    }
  ];

  const isActive = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-20 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={handleMobileToggle}
          className="bg-card shadow-medium"
        >
          <Icon name={isMobileOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border z-40
        transition-transform duration-300 ease-smooth
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">My Account</h3>
                  <p className="text-sm text-muted-foreground">Manage your profile</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navigationItems?.map((item) => {
                const active = isActive(item?.path);
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-150 ease-smooth group
                      ${active 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-start'}
                    `}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      className={`
                        ${isCollapsed ? '' : 'mr-3'} 
                        ${active ? 'text-primary-foreground' : ''}
                      `}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{item?.title}</div>
                        {!active && (
                          <div className="text-xs text-muted-foreground/70 truncate group-hover:text-muted-foreground/90">
                            {item?.description}
                          </div>
                        )}
                      </div>
                    )}
                    {active && !isCollapsed && (
                      <Icon name="ChevronRight" size={14} className="text-primary-foreground/70" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Link
              to="/product-catalog"
              className={`
                flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                text-muted-foreground hover:text-foreground hover:bg-muted
                transition-all duration-150 ease-smooth
                ${isCollapsed ? 'justify-center' : 'justify-start'}
              `}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon name="ArrowLeft" size={18} className={isCollapsed ? '' : 'mr-3'} />
              {!isCollapsed && 'Back to Shopping'}
            </Link>
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.slice(0, 4)?.map((item) => {
            const active = isActive(item?.path);
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex flex-col items-center py-2 px-3 rounded-lg text-xs font-medium
                  transition-colors duration-150
                  ${active 
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={item?.icon} size={20} className="mb-1" />
                <span className="truncate max-w-[60px]">{item?.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AccountManagementSidebar;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminControlPanel = ({ isCollapsed = false }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['dashboard']);
  const location = useLocation();

  const [systemAlerts] = useState(3);
  const [pendingReviews] = useState(8);

  const navigationSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'LayoutDashboard',
      items: [
        { title: 'Overview', path: '/admin-panel', icon: 'Home' },
        { title: 'Analytics', path: '/admin-panel/analytics', icon: 'BarChart3' },
        { title: 'System Health', path: '/admin-panel/system', icon: 'Activity', badge: systemAlerts }
      ]
    },
    {
      id: 'users',
      title: 'User Management',
      icon: 'Users',
      items: [
        { title: 'All Users', path: '/admin-panel/users', icon: 'Users' },
        { title: 'Customers', path: '/admin-panel/customers', icon: 'User' },
        { title: 'Sellers', path: '/admin-panel/sellers', icon: 'Store' },
        { title: 'Administrators', path: '/admin-panel/admins', icon: 'Shield' }
      ]
    },
    {
      id: 'products',
      title: 'Product Management',
      icon: 'Package',
      items: [
        { title: 'All Products', path: '/admin-panel/products', icon: 'Package' },
        { title: 'Categories', path: '/admin-panel/categories', icon: 'Tag' },
        { title: 'Reviews', path: '/admin-panel/reviews', icon: 'Star', badge: pendingReviews },
        { title: 'Inventory', path: '/admin-panel/inventory', icon: 'Warehouse' }
      ]
    },
    {
      id: 'orders',
      title: 'Order Management',
      icon: 'ShoppingCart',
      items: [
        { title: 'All Orders', path: '/admin-panel/orders', icon: 'ShoppingCart' },
        { title: 'Payments', path: '/admin-panel/payments', icon: 'CreditCard' },
        { title: 'Refunds', path: '/admin-panel/refunds', icon: 'RotateCcw' },
        { title: 'Disputes', path: '/admin-panel/disputes', icon: 'AlertTriangle' }
      ]
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: 'FileText',
      items: [
        { title: 'Pages', path: '/admin-panel/pages', icon: 'FileText' },
        { title: 'Banners', path: '/admin-panel/banners', icon: 'Image' },
        { title: 'Notifications', path: '/admin-panel/notifications', icon: 'Bell' },
        { title: 'Email Templates', path: '/admin-panel/emails', icon: 'Mail' }
      ]
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: 'Settings',
      items: [
        { title: 'General', path: '/admin-panel/settings', icon: 'Settings' },
        { title: 'Security', path: '/admin-panel/security', icon: 'Lock' },
        { title: 'Integrations', path: '/admin-panel/integrations', icon: 'Plug' },
        { title: 'Logs', path: '/admin-panel/logs', icon: 'FileText' }
      ]
    }
  ];

  const isActive = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
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
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Admin Sidebar */}
      <aside className={`
        fixed lg:fixed top-0 left-0 h-screen bg-card border-r border-border z-50
        transition-all duration-300 ease-smooth overflow-hidden
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-72'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border bg-primary/5">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Admin Panel</h2>
                  <p className="text-sm text-muted-foreground">Praveen E-Commerce</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={16} color="white" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-2 px-3">
              {navigationSections?.map((section) => {
                const isExpanded = expandedSections?.includes(section?.id);
                const hasActiveItem = section?.items?.some(item => isActive(item?.path));
                
                return (
                  <div key={section?.id} className="space-y-1">
                    {/* Section Header */}
                    <Button
                      variant="ghost"
                      className={`
                        w-full justify-start px-3 py-2.5 h-auto font-medium
                        ${hasActiveItem ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
                        ${isCollapsed ? 'justify-center px-2' : ''}
                      `}
                      onClick={() => !isCollapsed && toggleSection(section?.id)}
                    >
                      <Icon name={section?.icon} size={18} className={isCollapsed ? '' : 'mr-3'} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{section?.title}</span>
                          <Icon 
                            name="ChevronDown" 
                            size={14} 
                            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </>
                      )}
                    </Button>
                    {/* Section Items */}
                    {(!isCollapsed && isExpanded) && (
                      <div className="space-y-1 ml-6 animate-slide-in">
                        {section?.items?.map((item) => {
                          const active = isActive(item?.path);
                          return (
                            <Link
                              key={item?.path}
                              to={item?.path}
                              onClick={() => setIsMobileOpen(false)}
                              className={`
                                flex items-center px-3 py-2 rounded-lg text-sm font-medium
                                transition-all duration-150 ease-smooth group
                                ${active 
                                  ? 'bg-primary text-primary-foreground shadow-soft' 
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }
                              `}
                            >
                              <Icon name={item?.icon} size={16} className="mr-3" />
                              <span className="flex-1">{item?.title}</span>
                              {item?.badge && (
                                <span className={`
                                  text-xs font-medium rounded-full px-2 py-0.5 min-w-[20px] text-center
                                  ${active 
                                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                                    : 'bg-accent text-accent-foreground'
                                  }
                                `}>
                                  {item?.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                    {/* Collapsed Section Items */}
                    {isCollapsed && (
                      <div className="space-y-1">
                        {section?.items?.map((item) => {
                          const active = isActive(item?.path);
                          return (
                            <Link
                              key={item?.path}
                              to={item?.path}
                              className={`
                                flex items-center justify-center px-2 py-2 rounded-lg
                                transition-all duration-150 ease-smooth relative group
                                ${active 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }
                              `}
                              title={item?.title}
                            >
                              <Icon name={item?.icon} size={16} />
                              {item?.badge && (
                                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                                  {item?.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              {!isCollapsed && (
                <>
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">admin@praveen.com</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon name="LogOut" size={14} />
                  </Button>
                </>
              )}
              {isCollapsed && (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="User" size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminControlPanel;
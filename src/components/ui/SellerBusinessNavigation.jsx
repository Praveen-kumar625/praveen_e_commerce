import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SellerBusinessNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifications] = useState(5);
  const [pendingOrders] = useState(12);
  const location = useLocation();

  const navigationSections = [
    {
      title: 'Dashboard',
      path: '/seller-dashboard',
      icon: 'LayoutDashboard',
      items: [
        { title: 'Overview', path: '/seller-dashboard' },
        { title: 'Analytics', path: '/seller-dashboard/analytics' },
        { title: 'Reports', path: '/seller-dashboard/reports' }
      ]
    },
    {
      title: 'Products',
      path: '/seller-dashboard/products',
      icon: 'Package',
      items: [
        { title: 'All Products', path: '/seller-dashboard/products' },
        { title: 'Add Product', path: '/seller-dashboard/products/add' },
        { title: 'Categories', path: '/seller-dashboard/products/categories' },
        { title: 'Inventory', path: '/seller-dashboard/inventory' }
      ]
    },
    {
      title: 'Orders',
      path: '/seller-dashboard/orders',
      icon: 'ShoppingCart',
      badge: pendingOrders,
      items: [
        { title: 'All Orders', path: '/seller-dashboard/orders' },
        { title: 'Pending', path: '/seller-dashboard/orders/pending' },
        { title: 'Processing', path: '/seller-dashboard/orders/processing' },
        { title: 'Shipped', path: '/seller-dashboard/orders/shipped' }
      ]
    },
    {
      title: 'Customers',
      path: '/seller-dashboard/customers',
      icon: 'Users',
      items: [
        { title: 'All Customers', path: '/seller-dashboard/customers' },
        { title: 'Reviews', path: '/seller-dashboard/reviews' },
        { title: 'Support', path: '/seller-dashboard/support' }
      ]
    },
    {
      title: 'Marketing',
      path: '/seller-dashboard/marketing',
      icon: 'Megaphone',
      items: [
        { title: 'Campaigns', path: '/seller-dashboard/marketing' },
        { title: 'Discounts', path: '/seller-dashboard/discounts' },
        { title: 'Promotions', path: '/seller-dashboard/promotions' }
      ]
    }
  ];

  const quickActions = [
    { title: 'Add Product', path: '/seller-dashboard/products/add', icon: 'Plus' },
    { title: 'View Orders', path: '/seller-dashboard/orders', icon: 'ShoppingCart' },
    { title: 'Messages', path: '/seller-dashboard/messages', icon: 'MessageSquare', badge: notifications }
  ];

  const isActive = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path);
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo and Brand */}
          <Link 
            to="/seller-dashboard" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Store" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-foreground">Seller Hub</span>
              <div className="text-xs text-muted-foreground">Praveen E-Commerce</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationSections?.map((section, index) => (
              <div key={section?.title} className="relative">
                <Button
                  variant="ghost"
                  className={`
                    flex items-center space-x-2 px-3 py-2 h-auto
                    ${isActive(section?.path) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}
                  `}
                  onClick={() => handleDropdownToggle(index)}
                >
                  <Icon name={section?.icon} size={18} />
                  <span className="font-medium">{section?.title}</span>
                  {section?.badge && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {section?.badge}
                    </span>
                  )}
                  <Icon name="ChevronDown" size={14} className={`transition-transform duration-150 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                </Button>

                {/* Dropdown Menu */}
                {activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-large z-50 animate-slide-in">
                    <div className="py-2">
                      {section?.items?.map((item) => (
                        <Link
                          key={item?.path}
                          to={item?.path}
                          className={`
                            flex items-center px-4 py-2 text-sm transition-colors duration-150
                            ${isActive(item?.path) 
                              ? 'text-primary bg-primary/10' :'text-popover-foreground hover:bg-muted'
                            }
                          `}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item?.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {quickActions?.map((action) => (
                <Link key={action?.path} to={action?.path}>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name={action?.icon} size={18} />
                    {action?.badge && (
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                        {action?.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-in">
            <nav className="py-4">
              {navigationSections?.map((section) => (
                <div key={section?.title} className="mb-4">
                  <div className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {section?.title}
                    {section?.badge && (
                      <span className="ml-2 bg-accent text-accent-foreground text-xs font-medium rounded-full px-2 py-0.5">
                        {section?.badge}
                      </span>
                    )}
                  </div>
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`
                        flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150
                        ${isActive(item?.path) 
                          ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-foreground hover:bg-muted'
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon name="ChevronRight" size={14} className="mr-2" />
                      {item?.title}
                    </Link>
                  ))}
                </div>
              ))}

              {/* Mobile Quick Actions */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Quick Actions
                </div>
                {quickActions?.map((action) => (
                  <Link
                    key={action?.path}
                    to={action?.path}
                    className="flex items-center px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon name={action?.icon} size={16} className="mr-3" />
                    {action?.title}
                    {action?.badge && (
                      <span className="ml-auto bg-accent text-accent-foreground text-xs font-medium rounded-full px-2 py-0.5">
                        {action?.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
      {/* Dropdown Overlay */}
      {activeDropdown !== null && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
};

export default SellerBusinessNavigation;
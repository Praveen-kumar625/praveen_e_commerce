import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      title: "Add New Product",
      description: "Create a new product listing",
      icon: "Plus",
      path: "/seller-dashboard/products/add",
      color: "primary"
    },
    {
      title: "Manage Inventory",
      description: "Update stock levels and pricing",
      icon: "Package",
      path: "/seller-dashboard/inventory",
      color: "success"
    },
    {
      title: "Process Orders",
      description: "View and fulfill pending orders",
      icon: "ShoppingCart",
      path: "/seller-dashboard/orders",
      color: "warning"
    },
    {
      title: "Update Pricing",
      description: "Adjust product prices and discounts",
      icon: "DollarSign",
      path: "/seller-dashboard/pricing",
      color: "accent"
    },
    {
      title: "View Analytics",
      description: "Check sales performance and trends",
      icon: "BarChart3",
      path: "/seller-dashboard/analytics",
      color: "secondary"
    },
    {
      title: "Customer Messages",
      description: "Respond to customer inquiries",
      icon: "MessageSquare",
      path: "/seller-dashboard/messages",
      color: "primary"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <Link key={index} to={action?.path}>
            <div className="group p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-200 hover:shadow-medium">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${getColorClasses(action?.color)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {action?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
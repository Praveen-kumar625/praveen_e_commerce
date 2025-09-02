import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const revenueData = {
    total: '$1,245,680',
    growth: '+18.2%',
    transactions: '12,456',
    avgOrder: '$99.99'
  };

  const topCategories = [
    { name: 'Electronics', revenue: '$456,789', percentage: 37, orders: 3456 },
    { name: 'Fashion', revenue: '$234,567', percentage: 19, orders: 2145 },
    { name: 'Home & Garden', revenue: '$189,234', percentage: 15, orders: 1876 },
    { name: 'Sports', revenue: '$134,567', percentage: 11, orders: 1234 },
    { name: 'Books', revenue: '$89,234', percentage: 7, orders: 892 },
  ];

  const paymentMethods = [
    { name: 'Credit Card', percentage: 65, amount: '$808,692' },
    { name: 'PayPal', percentage: 20, amount: '$249,136' },
    { name: 'Bank Transfer', percentage: 10, amount: '$124,568' },
    { name: 'Other', percentage: 5, amount: '$62,284' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Revenue Analytics</h3>
              <p className="text-sm text-muted-foreground">Financial performance overview</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e?.target?.value)}
              className="px-3 py-1.5 border border-border rounded-lg bg-background text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-success/5 border border-success/20">
            <Icon name="DollarSign" size={24} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{revenueData?.total}</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-xs text-success font-medium mt-1">{revenueData?.growth}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Icon name="CreditCard" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{revenueData?.transactions}</p>
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-xs text-primary font-medium mt-1">+12.5%</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-warning/5 border border-warning/20">
            <Icon name="ShoppingBag" size={24} className="text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{revenueData?.avgOrder}</p>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
            <p className="text-xs text-warning font-medium mt-1">+5.2%</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-error/5 border border-error/20">
            <Icon name="TrendingUp" size={24} className="text-error mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">15.8%</p>
            <p className="text-sm text-muted-foreground">Profit Margin</p>
            <p className="text-xs text-error font-medium mt-1">+2.1%</p>
          </div>
        </div>
      </div>

      {/* Top Categories & Payment Methods */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Categories */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Top Categories</h4>
            <div className="space-y-3">
              {topCategories?.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{category?.name}</p>
                      <p className="text-xs text-muted-foreground">{category?.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{category?.revenue}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${category?.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">{category?.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-4">Payment Methods</h4>
            <div className="space-y-4">
              {paymentMethods?.map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="CreditCard" size={14} />
                    </div>
                    <span className="font-medium text-foreground">{method?.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{method?.amount}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-success h-1.5 rounded-full"
                          style={{ width: `${method?.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">{method?.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
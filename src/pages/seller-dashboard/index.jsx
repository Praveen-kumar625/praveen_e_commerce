import React from 'react';
import SellerBusinessNavigation from '../../components/ui/SellerBusinessNavigation';
import MetricsCard from './components/MetricsCard';
import ProductTable from './components/ProductTable';
import QuickActions from './components/QuickActions';
import SalesChart from './components/SalesChart';
import OrdersPanel from './components/OrdersPanel';
import NotificationCenter from './components/NotificationCenter';
import FinancialSummary from './components/FinancialSummary';

const SellerDashboard = () => {
  const metricsData = [
    {
      title: "Total Sales",
      value: "$45,680",
      change: "+12.5%",
      changeType: "increase",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Active Listings",
      value: "156",
      change: "+8",
      changeType: "increase",
      icon: "Package",
      color: "primary"
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "+5",
      changeType: "increase",
      icon: "ShoppingCart",
      color: "warning"
    },
    {
      title: "Revenue This Month",
      value: "$12,450",
      change: "+18.2%",
      changeType: "increase",
      icon: "TrendingUp",
      color: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SellerBusinessNavigation />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Seller!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              color={metric?.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-8">
            <SalesChart />
            <ProductTable />
          </div>

          {/* Right Column - Quick Actions and Notifications */}
          <div className="space-y-8">
            <QuickActions />
            <NotificationCenter />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OrdersPanel />
          <FinancialSummary />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
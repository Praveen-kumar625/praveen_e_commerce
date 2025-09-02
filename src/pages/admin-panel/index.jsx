import React, { useState } from 'react';
import AdminControlPanel from '../../components/ui/AdminControlPanel';
import SystemMetrics from './components/SystemMetrics';
import UserManagementPanel from './components/UserManagementPanel';
import OrderManagementPanel from './components/OrderManagementPanel';
import SystemHealthPanel from './components/SystemHealthPanel';
import RevenueAnalytics from './components/RevenueAnalytics';
import ContentManagementPanel from './components/ContentManagementPanel';
import SecurityPanel from './components/SecurityPanel';
import NotificationCenter from './components/NotificationCenter';

const AdminPanel = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AdminControlPanel isCollapsed={sidebarCollapsed} />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive platform management and system oversight
                </p>
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <svg className={`w-5 h-5 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* System Metrics Overview */}
          <SystemMetrics />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Primary Management */}
            <div className="xl:col-span-2 space-y-8">
              <UserManagementPanel />
              <OrderManagementPanel />
              <RevenueAnalytics />
            </div>

            {/* Right Column - System Health & Notifications */}
            <div className="space-y-8">
              <SystemHealthPanel />
              <NotificationCenter />
              <SecurityPanel />
            </div>
          </div>

          {/* Bottom Section - Content Management */}
          <ContentManagementPanel />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
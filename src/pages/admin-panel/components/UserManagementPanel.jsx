import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserManagementPanel = () => {
  const [selectedTab, setSelectedTab] = useState('recent');

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Customer', status: 'Active', joinDate: '2025-01-15' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', type: 'Seller', status: 'Pending', joinDate: '2025-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', type: 'Customer', status: 'Active', joinDate: '2025-01-13' },
    { id: 4, name: 'Emma Brown', email: 'emma@example.com', type: 'Seller', status: 'Active', joinDate: '2025-01-12' },
  ];

  const pendingActions = [
    { id: 1, action: 'Seller Verification', user: 'Tech Store Co.', priority: 'High', time: '2 hours ago' },
    { id: 2, action: 'Account Recovery', user: 'alice@example.com', priority: 'Medium', time: '4 hours ago' },
    { id: 3, action: 'Business Verification', user: 'Global Electronics', priority: 'High', time: '6 hours ago' },
    { id: 4, action: 'Profile Update Review', user: 'bob@example.com', priority: 'Low', time: '8 hours ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Inactive': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error bg-error/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">User Management</h3>
              <p className="text-sm text-muted-foreground">Monitor and manage platform users</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Settings
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'recent', label: 'Recent Users', icon: 'Users' },
            { id: 'pending', label: 'Pending Actions', icon: 'Clock' },
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setSelectedTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {selectedTab === 'recent' && (
          <div className="space-y-4">
            {recentUsers?.map((user) => (
              <div key={user?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{user?.type}</p>
                    <p className="text-xs text-muted-foreground">{user?.joinDate}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'pending' && (
          <div className="space-y-4">
            {pendingActions?.map((action) => (
              <div key={action?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertCircle" size={18} className="text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{action?.action}</p>
                    <p className="text-sm text-muted-foreground">{action?.user}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(action?.priority)}`}>
                      {action?.priority}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{action?.time}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="xs">Review</Button>
                    <Button variant="default" size="xs">Approve</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPanel;
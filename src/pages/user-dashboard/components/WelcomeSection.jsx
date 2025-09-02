import React from 'react';
import Icon from '../../../components/AppIcon';


const WelcomeSection = ({ user, accountStatus }) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground mb-4">
            Manage your account and track your orders
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                accountStatus?.verified ? 'bg-success' : 'bg-warning'
              }`} />
              <span className="text-sm font-medium text-foreground">
                {accountStatus?.verified ? 'Verified Account' : 'Pending Verification'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-foreground">
                {user?.loyaltyPoints} Points
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="User" size={32} color="var(--color-primary)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
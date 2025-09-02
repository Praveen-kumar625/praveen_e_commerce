import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinancialSummary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');

  const financialData = {
    this_month: {
      totalEarnings: 45680.50,
      pendingPayouts: 12450.00,
      totalFees: 2284.03,
      netIncome: 43396.47,
      transactions: [
        { id: 1, type: 'sale', description: 'iPhone 15 Pro Max', amount: 1199.99, date: '2025-01-02', status: 'completed' },
        { id: 2, type: 'sale', description: 'MacBook Air M3', amount: 1299.99, date: '2025-01-02', status: 'completed' },
        { id: 3, type: 'fee', description: 'Platform Commission', amount: -59.99, date: '2025-01-02', status: 'completed' },
        { id: 4, type: 'payout', description: 'Weekly Payout', amount: 12450.00, date: '2025-01-01', status: 'pending' }
      ]
    },
    last_month: {
      totalEarnings: 38920.75,
      pendingPayouts: 0,
      totalFees: 1946.04,
      netIncome: 36974.71,
      transactions: []
    }
  };

  const currentData = financialData?.[selectedPeriod];

  const getTransactionIcon = (type) => {
    const icons = {
      sale: 'TrendingUp',
      fee: 'Minus',
      payout: 'DollarSign',
      refund: 'RotateCcw'
    };
    return icons?.[type] || 'DollarSign';
  };

  const getTransactionColor = (type) => {
    const colors = {
      sale: 'text-success',
      fee: 'text-error',
      payout: 'text-primary',
      refund: 'text-warning'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', text: 'Completed' },
      pending: { color: 'bg-warning/10 text-warning', text: 'Pending' },
      failed: { color: 'bg-error/10 text-error', text: 'Failed' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.completed;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.text}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Financial Summary</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={selectedPeriod === 'this_month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('this_month')}
                className="h-8"
              >
                This Month
              </Button>
              <Button
                variant={selectedPeriod === 'last_month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('last_month')}
                className="h-8"
              >
                Last Month
              </Button>
            </div>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              ${currentData?.totalEarnings?.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Pending Payouts</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              ${currentData?.pendingPayouts?.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-error/5 rounded-lg border border-error/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Minus" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Total Fees</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              ${currentData?.totalFees?.toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Net Income</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              ${currentData?.netIncome?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-medium text-foreground mb-4">Recent Transactions</h4>
        <div className="space-y-3">
          {currentData?.transactions?.length > 0 ? (
            currentData?.transactions?.map((transaction) => (
              <div key={transaction?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-muted`}>
                    <Icon 
                      name={getTransactionIcon(transaction?.type)} 
                      size={16} 
                      className={getTransactionColor(transaction?.type)}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction?.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction?.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <p className={`font-medium ${transaction?.amount > 0 ? 'text-success' : 'text-error'}`}>
                    {transaction?.amount > 0 ? '+' : ''}${Math.abs(transaction?.amount)?.toLocaleString()}
                  </p>
                  {getStatusBadge(transaction?.status)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No transactions found for this period</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
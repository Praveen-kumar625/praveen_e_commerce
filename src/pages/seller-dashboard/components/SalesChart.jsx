import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('7days');

  const salesData = [
    { name: 'Mon', sales: 4200, orders: 24 },
    { name: 'Tue', sales: 3800, orders: 18 },
    { name: 'Wed', sales: 5200, orders: 32 },
    { name: 'Thu', sales: 4600, orders: 28 },
    { name: 'Fri', sales: 6800, orders: 42 },
    { name: 'Sat', sales: 7200, orders: 48 },
    { name: 'Sun', sales: 5800, orders: 36 }
  ];

  const monthlyData = [
    { name: 'Jan', sales: 45000, orders: 280 },
    { name: 'Feb', sales: 52000, orders: 320 },
    { name: 'Mar', sales: 48000, orders: 295 },
    { name: 'Apr', sales: 61000, orders: 380 },
    { name: 'May', sales: 55000, orders: 340 },
    { name: 'Jun', sales: 67000, orders: 420 }
  ];

  const getCurrentData = () => {
    return timeRange === '7days' ? salesData : monthlyData;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-large">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Sales: ${payload?.[0]?.value?.toLocaleString()}
          </p>
          <p className="text-sm text-success">
            Orders: {payload?.[0]?.payload?.orders}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Sales Analytics</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={timeRange === '7days' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('7days')}
              className="h-8"
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === '6months' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('6months')}
              className="h-8"
            >
              6 Months
            </Button>
          </div>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setChartType('bar')}
              className="h-8 w-8"
            >
              <Icon name="BarChart3" size={16} />
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setChartType('line')}
              className="h-8 w-8"
            >
              <Icon name="TrendingUp" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={getCurrentData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="sales" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={getCurrentData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            ${getCurrentData()?.reduce((sum, item) => sum + item?.sales, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Sales</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {getCurrentData()?.reduce((sum, item) => sum + item?.orders, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            ${Math.round(getCurrentData()?.reduce((sum, item) => sum + item?.sales, 0) / getCurrentData()?.reduce((sum, item) => sum + item?.orders, 0))}
          </p>
          <p className="text-sm text-muted-foreground">Avg Order Value</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">+12.5%</p>
          <p className="text-sm text-muted-foreground">Growth Rate</p>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderFilters = ({ onFiltersChange, totalOrders }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateRange: '',
    priceRange: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-250', label: '$100 - $250' },
    { value: '250-500', label: '$250 - $500' },
    { value: '500+', label: 'Over $500' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      dateRange: '',
      priceRange: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filter Orders</h3>
            <span className="text-sm text-muted-foreground">({totalOrders} orders)</span>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden lg:block'} p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <Input
              type="search"
              placeholder="Search orders, products..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              placeholder="Order Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </div>

          {/* Date Range Filter */}
          <div>
            <Select
              placeholder="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <Select
              placeholder="Price Range"
              options={priceRangeOptions}
              value={filters?.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters?.search && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  <span>Search: "{filters?.search}"</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 hover:bg-primary/20"
                    onClick={() => handleFilterChange('search', '')}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
              {filters?.status && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  <span>Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 hover:bg-primary/20"
                    onClick={() => handleFilterChange('status', '')}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
              {filters?.dateRange && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  <span>Date: {dateRangeOptions?.find(opt => opt?.value === filters?.dateRange)?.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 hover:bg-primary/20"
                    onClick={() => handleFilterChange('dateRange', '')}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
              {filters?.priceRange && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  <span>Price: {priceRangeOptions?.find(opt => opt?.value === filters?.priceRange)?.label}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 hover:bg-primary/20"
                    onClick={() => handleFilterChange('priceRange', '')}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFilters;
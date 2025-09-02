import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, onSortChange, viewMode, onViewModeChange, onToggleFilters, resultCount }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest Arrivals', icon: 'Clock' },
    { value: 'popularity', label: 'Popularity', icon: 'TrendingUp' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Results Count and Filter Toggle */}
        <div className="flex items-center space-x-4">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="lg:hidden"
          >
            <Icon name="Filter" size={16} className="mr-2" />
            Filters
          </Button>
          
          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {resultCount?.toLocaleString()}
            </span>
            {' '}products found
          </div>
        </div>

        {/* Right Section - Sort and View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e?.target?.value)}
                className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {sortOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center border border-border rounded-md overflow-hidden">
            {viewModes?.map((mode) => (
              <Button
                key={mode?.value}
                variant={viewMode === mode?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange(mode?.value)}
                className="rounded-none border-0"
              >
                <Icon name={mode?.icon} size={16} />
                <span className="sr-only">{mode?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Active Sort Indicator */}
      <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
        <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Sorted by:{' '}
          <span className="font-medium text-foreground">
            {sortOptions?.find(option => option?.value === sortBy)?.label}
          </span>
        </span>
      </div>
    </div>
  );
};

export default SortControls;
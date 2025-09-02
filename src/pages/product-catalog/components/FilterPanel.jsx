import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle, resultCount }) => {
  const [priceRange, setPriceRange] = useState([filters?.minPrice || 0, filters?.maxPrice || 1000]);
  const [expandedSections, setExpandedSections] = useState(['category', 'price', 'brand']);

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 1250 },
    { id: 'fashion', name: 'Fashion', count: 890 },
    { id: 'home-garden', name: 'Home & Garden', count: 650 },
    { id: 'sports', name: 'Sports & Outdoors', count: 420 },
    { id: 'books', name: 'Books', count: 380 },
    { id: 'toys', name: 'Toys & Games', count: 290 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 145 },
    { id: 'samsung', name: 'Samsung', count: 132 },
    { id: 'nike', name: 'Nike', count: 98 },
    { id: 'adidas', name: 'Adidas', count: 87 },
    { id: 'sony', name: 'Sony', count: 76 },
    { id: 'lg', name: 'LG', count: 65 }
  ];

  const ratings = [
    { value: 4, label: '4 Stars & Up', count: 890 },
    { value: 3, label: '3 Stars & Up', count: 1250 },
    { value: 2, label: '2 Stars & Up', count: 1680 },
    { value: 1, label: '1 Star & Up', count: 1890 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev?.includes(section) 
        ? prev?.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
    onFilterChange('priceRange', newRange);
  };

  const handleCategoryChange = (categoryId, checked) => {
    const currentCategories = filters?.categories || [];
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories?.filter(id => id !== categoryId);
    onFilterChange('categories', newCategories);
  };

  const handleBrandChange = (brandId, checked) => {
    const currentBrands = filters?.brands || [];
    const newBrands = checked
      ? [...currentBrands, brandId]
      : currentBrands?.filter(id => id !== brandId);
    onFilterChange('brands', newBrands);
  };

  const FilterSection = ({ title, sectionKey, children }) => {
    const isExpanded = expandedSections?.includes(sectionKey);
    
    return (
      <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <Button
          variant="ghost"
          className="w-full justify-between p-0 h-auto font-medium text-left"
          onClick={() => toggleSection(sectionKey)}
        >
          <span className="text-foreground">{title}</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </Button>
        {isExpanded && (
          <div className="mt-3 animate-slide-in">
            {children}
          </div>
        )}
      </div>
    );
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-primary hover:text-primary/80"
        >
          Clear All
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultCount?.toLocaleString()} products found
      </div>

      {/* Categories */}
      <FilterSection title="Categories" sectionKey="category">
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={category?.name}
                checked={(filters?.categories || [])?.includes(category?.id)}
                onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground ml-2">
                ({category?.count})
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange?.[0]}
              onChange={(e) => handlePriceChange(0, e?.target?.value)}
              className="flex-1"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange?.[1]}
              onChange={(e) => handlePriceChange(1, e?.target?.value)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange?.[0]}</span>
            <span>${priceRange?.[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" sectionKey="brand">
        <div className="space-y-2">
          {brands?.map((brand) => (
            <div key={brand?.id} className="flex items-center justify-between">
              <Checkbox
                label={brand?.name}
                checked={(filters?.brands || [])?.includes(brand?.id)}
                onChange={(e) => handleBrandChange(brand?.id, e?.target?.checked)}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground ml-2">
                ({brand?.count})
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Customer Ratings */}
      <FilterSection title="Customer Ratings" sectionKey="rating">
        <div className="space-y-2">
          {ratings?.map((rating) => (
            <div key={rating?.value} className="flex items-center justify-between">
              <Checkbox
                label={
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < rating?.value ? 'text-amber-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span>{rating?.label}</span>
                  </div>
                }
                checked={filters?.minRating === rating?.value}
                onChange={(e) => onFilterChange('minRating', e?.target?.checked ? rating?.value : null)}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground ml-2">
                ({rating?.count})
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" sectionKey="availability">
        <div className="space-y-2">
          <Checkbox
            label="In Stock"
            checked={filters?.inStock || false}
            onChange={(e) => onFilterChange('inStock', e?.target?.checked)}
          />
          <Checkbox
            label="Free Shipping"
            checked={filters?.freeShipping || false}
            onChange={(e) => onFilterChange('freeShipping', e?.target?.checked)}
          />
          <Checkbox
            label="On Sale"
            checked={filters?.onSale || false}
            onChange={(e) => onFilterChange('onSale', e?.target?.checked)}
          />
        </div>
      </FilterSection>
    </div>
  );

  // Desktop Filter Panel
  if (!isOpen) {
    return (
      <div className="hidden lg:block w-64 bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
        {filterContent}
      </div>
    );
  }

  // Mobile Filter Drawer
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/50 z-40"
        onClick={onToggle}
      />
      
      {/* Mobile Filter Drawer */}
      <div className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-card border-l border-border z-50 overflow-y-auto animate-slide-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          {filterContent}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
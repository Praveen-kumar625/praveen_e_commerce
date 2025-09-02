import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonBar = ({ products, onRemoveProduct, onClearAll, isVisible }) => {
  if (!isVisible || !products || products?.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-large z-40 animate-slide-in">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Products */}
          <div className="flex items-center space-x-4 flex-1 overflow-x-auto">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Icon name="GitCompare" size={20} className="text-primary" />
              <span className="font-medium text-foreground">Compare ({products?.length})</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {products?.slice(0, 4)?.map((product) => (
                <div key={product?.id} className="flex items-center space-x-2 bg-muted rounded-lg p-2 relative group">
                  <div className="w-10 h-10 bg-background rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate max-w-[120px]">
                      {product?.name}
                    </p>
                    <p className="text-xs text-primary font-semibold">
                      {formatPrice(product?.salePrice)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveProduct(product?.id)}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 -right-1 bg-background hover:bg-muted"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ))}
              
              {products?.length > 4 && (
                <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-md text-sm font-medium text-muted-foreground">
                  +{products?.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Trash2" size={14} className="mr-2" />
              Clear All
            </Button>
            
            <Link to="/product-comparison">
              <Button
                variant="default"
                size="sm"
                disabled={products?.length < 2}
              >
                <Icon name="GitCompare" size={14} className="mr-2" />
                Compare Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Responsive Message */}
        <div className="sm:hidden mt-3 text-xs text-muted-foreground text-center">
          Swipe left to see more products
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
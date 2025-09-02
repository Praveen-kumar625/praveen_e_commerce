import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentlyViewedSidebar = ({ products, onClearHistory, isVisible }) => {
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
    <div className="hidden xl:block w-64 bg-card border border-border rounded-lg p-4 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Recently Viewed
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
      {/* Products List */}
      <div className="space-y-3">
        {products?.slice(0, 5)?.map((product) => (
          <Link
            key={product?.id}
            to={`/product-details?id=${product?.id}`}
            className="block group"
          >
            <div className="flex space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-150">
              {/* Product Image */}
              <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {product?.name}
                </h4>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-sm font-semibold text-foreground">
                    {formatPrice(product?.salePrice)}
                  </span>
                  {product?.originalPrice > product?.salePrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={10}
                        className={i < Math.floor(product?.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product?.reviewCount})
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* View All Link */}
      {products?.length > 5 && (
        <div className="mt-4 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-primary hover:text-primary/80"
          >
            View All ({products?.length})
            <Icon name="ArrowRight" size={14} className="ml-2" />
          </Button>
        </div>
      )}
      {/* Clear History */}
      <div className="mt-4 pt-3 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <Icon name="Trash2" size={14} className="mr-2" />
          Clear History
        </Button>
      </div>
    </div>
  );
};

export default RecentlyViewedSidebar;
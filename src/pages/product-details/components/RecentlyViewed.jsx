import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ products }) => {
  if (!products || products?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Recently Viewed</h3>
        <Button variant="ghost" size="sm" iconName="X" iconPosition="right">
          Clear All
        </Button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {products?.map((product) => (
          <Link
            key={product?.id}
            to={`/product-details?id=${product?.id}`}
            className="flex-shrink-0 w-32 group"
          >
            <div className="space-y-2">
              <div className="aspect-square relative overflow-hidden rounded-lg border border-border">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {product?.title}
                </h4>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold text-foreground">
                    ${product?.price?.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">
                      {product?.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
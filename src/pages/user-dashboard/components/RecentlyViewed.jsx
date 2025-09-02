import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentlyViewed = ({ products }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recently Viewed</h2>
        <Button variant="ghost" size="sm">
          Clear History
          <Icon name="X" size={16} className="ml-1" />
        </Button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {products?.map((product) => (
          <Link key={product?.id} to={`/product-details?id=${product?.id}`}>
            <div className="flex-shrink-0 w-32 group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-2">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {product?.name}
              </h3>
              <p className="text-sm font-semibold text-foreground mt-1">
                ${product?.price}
              </p>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={10}
                      className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  ({product?.reviews})
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
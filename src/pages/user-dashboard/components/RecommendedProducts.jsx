import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecommendedProducts = ({ products }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recommended for You</h2>
        <Link to="/product-catalog">
          <Button variant="ghost" size="sm">
            View All
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.slice(0, 6)?.map((product) => (
          <Link key={product?.id} to={`/product-details?id=${product?.id}`}>
            <div className="group bg-background border border-border rounded-lg p-4 hover:shadow-medium transition-all duration-200">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {product?.name}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product?.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-foreground">
                      ${product?.price}
                    </span>
                    {product?.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product?.originalPrice}
                      </span>
                    )}
                  </div>
                  {product?.discount && (
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">
                      {product?.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, title = "Related Products" }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={`${
          index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <Link to="/product-catalog">
          <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products?.map((product) => {
          const discountPercentage = product?.originalPrice > product?.price 
            ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
            : 0;

          return (
            <Link
              key={product?.id}
              to={`/product-details?id=${product?.id}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-medium transition-all duration-200"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
                    {discountPercentage}% OFF
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8"
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                  }}
                >
                  <Icon name="Heart" size={16} />
                </Button>
              </div>
              <div className="p-3 space-y-2">
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {product?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{product?.brand}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <div className="flex">{renderStars(product?.rating)}</div>
                  <span className="text-xs text-muted-foreground">
                    ({product?.reviewCount})
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-semibold text-foreground">
                      ${product?.price?.toFixed(2)}
                    </span>
                    {product?.originalPrice > product?.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product?.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Free delivery
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="mt-2"
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
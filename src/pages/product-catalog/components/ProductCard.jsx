import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, onToggleCompare, isInWishlist, isInComparison, onQuickView }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const calculateDiscount = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-amber-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 group relative overflow-hidden">
      {/* Wishlist and Compare Actions */}
      <div className="absolute top-2 right-2 z-10 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 bg-white/90 hover:bg-white shadow-soft ${isInWishlist ? 'text-red-500' : 'text-gray-600'}`}
          onClick={(e) => {
            e?.preventDefault();
            onToggleWishlist(product?.id);
          }}
        >
          <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 bg-white/90 hover:bg-white shadow-soft ${isInComparison ? 'text-primary' : 'text-gray-600'}`}
          onClick={(e) => {
            e?.preventDefault();
            onToggleCompare(product?.id);
          }}
        >
          <Icon name="GitCompare" size={16} />
        </Button>
      </div>
      {/* Discount Badge */}
      {product?.discount > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-md">
            {product?.discount}% OFF
          </span>
        </div>
      )}
      <Link to={`/product-details?id=${product?.id}`} className="block">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setImageLoading(false)}
          />
          
          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 hover:bg-white"
              onClick={(e) => {
                e?.preventDefault();
                onQuickView(product);
              }}
            >
              <Icon name="Eye" size={16} className="mr-2" />
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-sm text-muted-foreground mb-1 truncate">{product?.brand}</p>
          
          {/* Product Name */}
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 min-h-[2.5rem]">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              {renderStars(product?.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product?.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(product?.salePrice)}
            </span>
            {product?.originalPrice > product?.salePrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product?.originalPrice)}
                </span>
                <span className="text-sm text-success font-medium">
                  {calculateDiscount(product?.originalPrice, product?.salePrice)}% off
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-medium ${
              product?.inStock 
                ? product?.stock > 10 
                  ? 'text-success' :'text-warning' :'text-error'
            }`}>
              {product?.inStock 
                ? product?.stock > 10 
                  ? 'In Stock' 
                  : `Only ${product?.stock} left`
                : 'Out of Stock'
              }
            </span>
            {product?.freeShipping && (
              <span className="text-xs text-primary font-medium">Free Shipping</span>
            )}
          </div>
        </div>
      </Link>
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          fullWidth
          disabled={!product?.inStock}
          onClick={(e) => {
            e?.preventDefault();
            onAddToCart(product);
          }}
          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
        >
          <Icon name="ShoppingCart" size={16} className="mr-2" />
          {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
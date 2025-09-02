import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const discountPercentage = Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Brand */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-primary font-medium">{product?.brand}</span>
          {product?.isVerified && (
            <div className="flex items-center space-x-1">
              <Icon name="BadgeCheck" size={16} className="text-success" />
              <span className="text-xs text-success">Verified</span>
            </div>
          )}
        </div>
        <h1 className="text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
          {product?.title}
        </h1>
        <p className="text-muted-foreground mt-2">{product?.subtitle}</p>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="flex items-center bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
            <span>{product?.rating}</span>
            <Icon name="Star" size={14} className="ml-1 fill-current" />
          </div>
          <span className="text-muted-foreground text-sm">
            ({product?.reviewCount?.toLocaleString()} reviews)
          </span>
        </div>
        <div className="text-muted-foreground text-sm">
          {product?.soldCount?.toLocaleString()} sold
        </div>
      </div>
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-foreground">
            ${product?.price?.toFixed(2)}
          </span>
          {product?.originalPrice > product?.price && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ${product?.originalPrice?.toFixed(2)}
              </span>
              <span className="bg-success/10 text-success px-2 py-1 rounded text-sm font-medium">
                {discountPercentage}% off
              </span>
            </>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Inclusive of all taxes • Free delivery
        </div>
      </div>
      {/* Availability Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product?.stock > 0 ? "CheckCircle" : "XCircle"} 
          size={18} 
          className={product?.stock > 0 ? "text-success" : "text-error"} 
        />
        <span className={`font-medium ${product?.stock > 0 ? "text-success" : "text-error"}`}>
          {product?.stock > 0 ? `In Stock (${product?.stock} available)` : "Out of Stock"}
        </span>
      </div>
      {/* Variants Selection */}
      {product?.variants && product?.variants?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Select Variant:</h3>
          <div className="flex flex-wrap gap-2">
            {product?.variants?.map((variant) => (
              <button
                key={variant?.id}
                onClick={() => handleVariantSelect(variant)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                  selectedVariant?.id === variant?.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground'
                }`}
              >
                <div className="text-sm font-medium">{variant?.name}</div>
                {variant?.price !== product?.price && (
                  <div className="text-xs text-muted-foreground">
                    +${(variant?.price - product?.price)?.toFixed(2)}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Quantity:</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="h-10 w-10 rounded-r-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <div className="px-4 py-2 border-x border-border min-w-[60px] text-center font-medium">
              {quantity}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stock}
              className="h-10 w-10 rounded-l-none"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            Max {product?.stock} items
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            disabled={product?.stock === 0}
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12"
          >
            <Icon name="Heart" size={20} />
          </Button>
        </div>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          disabled={product?.stock === 0}
          iconName="Zap"
          iconPosition="left"
        >
          Buy Now
        </Button>
      </div>
      {/* Key Features */}
      {product?.keyFeatures && product?.keyFeatures?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Key Features:</h3>
          <ul className="space-y-2">
            {product?.keyFeatures?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Seller Information */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Sold by {product?.seller?.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm text-muted-foreground">{product?.seller?.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product?.seller?.reviewCount} reviews)
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Store
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Return Policy:</span>
            <div className="font-medium">{product?.seller?.returnPolicy}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Shipping:</span>
            <div className="font-medium">{product?.seller?.shipping}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
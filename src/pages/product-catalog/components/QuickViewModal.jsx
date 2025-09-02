import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

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
        <Icon key={i} name="Star" size={16} className="text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-amber-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  const productImages = product?.images || [product?.image];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-large max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Quick View</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={productImages?.[selectedImage]}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {productImages?.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product?.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Brand and Name */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">{product?.brand}</p>
                <h1 className="text-2xl font-semibold text-foreground">{product?.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product?.rating} ({product?.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-foreground">
                    {formatPrice(product?.salePrice)}
                  </span>
                  {product?.originalPrice > product?.salePrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product?.originalPrice)}
                      </span>
                      <span className="bg-accent text-accent-foreground text-sm font-semibold px-2 py-1 rounded">
                        {calculateDiscount(product?.originalPrice, product?.salePrice)}% OFF
                      </span>
                    </>
                  )}
                </div>
                {product?.freeShipping && (
                  <p className="text-sm text-success font-medium">Free Shipping Available</p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <Icon 
                  name={product?.inStock ? "CheckCircle" : "XCircle"} 
                  size={16} 
                  className={product?.inStock ? "text-success" : "text-error"}
                />
                <span className={`text-sm font-medium ${
                  product?.inStock 
                    ? product?.stock > 10 
                      ? 'text-success' :'text-warning' :'text-error'
                }`}>
                  {product?.inStock 
                    ? product?.stock > 10 
                      ? 'In Stock' 
                      : `Only ${product?.stock} left in stock`
                    : 'Out of Stock'
                  }
                </span>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product?.description || `Experience the perfect blend of style and functionality with the ${product?.name}. This premium product offers exceptional quality and performance that exceeds expectations.`}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {(product?.features || [
                    'Premium quality materials',
                    'Durable construction',
                    'Easy to use',
                    'Excellent value for money'
                  ])?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4 pt-4 border-t border-border">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-foreground">Quantity:</span>
                  <div className="flex items-center border border-border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-8 w-8 rounded-none"
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product?.stock, quantity + 1))}
                      disabled={quantity >= product?.stock}
                      className="h-8 w-8 rounded-none"
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="default"
                    onClick={handleAddToCart}
                    disabled={!product?.inStock}
                    className="flex-1"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onToggleWishlist(product?.id)}
                    className={isInWishlist ? 'text-red-500 border-red-200' : ''}
                  >
                    <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
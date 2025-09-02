import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onReorder, onTrackOrder, onReturnRequest }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'shipped':
        return 'text-primary bg-primary/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-200">
      {/* Order Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h3 className="font-semibold text-foreground">Order #{order?.orderNumber}</h3>
              <p className="text-sm text-muted-foreground">Placed on {formatDate(order?.orderDate)}</p>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order?.status)}`}>
              <Icon name="Package" size={14} className="mr-1" />
              {order?.status}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">{formatPrice(order?.totalAmount)}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Order Items Preview */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-2">
            {order?.items?.slice(0, 3)?.map((item, index) => (
              <div key={index} className="w-12 h-12 rounded-lg border-2 border-card overflow-hidden bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {order?.items?.length > 3 && (
              <div className="w-12 h-12 rounded-lg border-2 border-card bg-muted flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">+{order?.items?.length - 3}</span>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {order?.items?.length} item{order?.items?.length > 1 ? 's' : ''}
            </p>
            <p className="text-sm text-muted-foreground">
              {order?.status === 'delivered' ? `Delivered on ${formatDate(order?.deliveredDate)}` : 
               order?.status === 'shipped' ? `Expected by ${formatDate(order?.expectedDelivery)}` :
               'Processing your order'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTrackOrder(order?.id)}
            iconName="MapPin"
            iconPosition="left"
          >
            Track Order
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReorder(order?.items)}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reorder
          </Button>
          {order?.status === 'delivered' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReturnRequest(order?.id)}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Return
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Invoice
          </Button>
        </div>
      </div>
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/30 animate-slide-in">
          <div className="p-4 space-y-4">
            {/* Items List */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Order Items</h4>
              <div className="space-y-3">
                {order?.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product-details?id=${item?.productId}`}
                        className="font-medium text-foreground hover:text-primary transition-colors duration-150 line-clamp-1"
                      >
                        {item?.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">Qty: {item?.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{formatPrice(item?.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Shipping Address</h4>
                <div className="text-sm text-muted-foreground">
                  <p>{order?.shippingAddress?.name}</p>
                  <p>{order?.shippingAddress?.street}</p>
                  <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zipCode}</p>
                  <p>{order?.shippingAddress?.phone}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Payment Method</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="CreditCard" size={16} />
                  <span>{order?.paymentMethod?.type} ending in {order?.paymentMethod?.last4}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="pt-4 border-t border-border">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(order?.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{formatPrice(order?.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">{formatPrice(order?.tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>{formatPrice(order?.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderTrackingModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const trackingSteps = [
    {
      status: 'Order Placed',
      date: order?.orderDate,
      completed: true,
      icon: 'ShoppingCart',
      description: 'Your order has been confirmed'
    },
    {
      status: 'Processing',
      date: order?.processingDate,
      completed: true,
      icon: 'Package',
      description: 'Order is being prepared'
    },
    {
      status: 'Shipped',
      date: order?.shippedDate,
      completed: order?.status !== 'processing',
      icon: 'Truck',
      description: 'Package is on the way'
    },
    {
      status: 'Out for Delivery',
      date: order?.outForDeliveryDate,
      completed: order?.status === 'delivered',
      icon: 'MapPin',
      description: 'Package is out for delivery'
    },
    {
      status: 'Delivered',
      date: order?.deliveredDate,
      completed: order?.status === 'delivered',
      icon: 'CheckCircle',
      description: 'Package has been delivered'
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Track Order</h2>
              <p className="text-sm text-muted-foreground">Order #{order?.orderNumber}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tracking Information */}
        <div className="p-6">
          {/* Carrier Information */}
          {order?.trackingNumber && (
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-foreground">Tracking Information</h3>
                <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
                  Track on {order?.carrier}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Tracking Number: <span className="font-mono text-foreground">{order?.trackingNumber}</span></p>
                <p>Carrier: {order?.carrier}</p>
                {order?.estimatedDelivery && (
                  <p>Estimated Delivery: {formatDate(order?.estimatedDelivery)}</p>
                )}
              </div>
            </div>
          )}

          {/* Tracking Steps */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Order Progress</h3>
            <div className="relative">
              {trackingSteps?.map((step, index) => (
                <div key={index} className="flex items-start gap-4 pb-6 last:pb-0">
                  {/* Timeline Line */}
                  {index < trackingSteps?.length - 1 && (
                    <div className={`absolute left-6 top-12 w-0.5 h-6 ${
                      step?.completed ? 'bg-success' : 'bg-border'
                    }`} />
                  )}
                  
                  {/* Step Icon */}
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 z-10
                    ${step?.completed 
                      ? 'bg-success border-success text-success-foreground' 
                      : 'bg-card border-border text-muted-foreground'
                    }
                  `}>
                    <Icon name={step?.icon} size={20} />
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium ${
                        step?.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step?.status}
                      </h4>
                      {step?.date && (
                        <span className="text-sm text-muted-foreground">
                          {formatDate(step?.date)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{step?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-medium text-foreground mb-3">Delivery Address</h3>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{order?.shippingAddress?.name}</p>
              <p>{order?.shippingAddress?.street}</p>
              <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zipCode}</p>
              <p>{order?.shippingAddress?.phone}</p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Need Help?</h3>
                <p className="text-sm text-muted-foreground">Contact our support team for assistance</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
                  Chat
                </Button>
                <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="default" iconName="Download" iconPosition="left">
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CouponsSection = ({ coupons }) => {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  const getCouponIcon = (type) => {
    switch (type) {
      case 'percentage':
        return 'Percent';
      case 'fixed':
        return 'DollarSign';
      case 'shipping':
        return 'Truck';
      default:
        return 'Tag';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Available Coupons</h2>
        <span className="text-sm text-muted-foreground">
          {coupons?.length} available
        </span>
      </div>
      <div className="space-y-3">
        {coupons?.map((coupon) => (
          <div
            key={coupon?.id}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Icon name={getCouponIcon(coupon?.type)} size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{coupon?.title}</h3>
                <p className="text-sm text-muted-foreground">{coupon?.description}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-muted-foreground">
                    Valid till: {coupon?.expiryDate}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Min order: ${coupon?.minOrder}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-right mr-3">
                <p className="text-lg font-bold text-accent">{coupon?.discount}</p>
                <p className="text-xs text-muted-foreground">OFF</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCode(coupon?.code)}
                className="min-w-[80px]"
              >
                {copiedCoupon === coupon?.code ? (
                  <>
                    <Icon name="Check" size={14} className="mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Icon name="Copy" size={14} className="mr-1" />
                    {coupon?.code}
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button variant="ghost" size="sm">
          View All Offers
          <Icon name="ExternalLink" size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default CouponsSection;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReturnRequestModal = ({ order, isOpen, onClose, onSubmitReturn }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [returnReason, setReturnReason] = useState('');
  const [returnComments, setReturnComments] = useState('');
  const [refundMethod, setRefundMethod] = useState('original');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !order) return null;

  const returnReasons = [
    { value: 'defective', label: 'Item is defective or damaged' },
    { value: 'wrong-item', label: 'Wrong item received' },
    { value: 'not-as-described', label: 'Item not as described' },
    { value: 'size-issue', label: 'Size/fit issue' },
    { value: 'quality-issue', label: 'Quality not as expected' },
    { value: 'changed-mind', label: 'Changed my mind' },
    { value: 'other', label: 'Other reason' }
  ];

  const refundMethods = [
    { value: 'original', label: 'Original payment method' },
    { value: 'store-credit', label: 'Store credit' },
    { value: 'bank-transfer', label: 'Bank transfer' }
  ];

  const handleItemToggle = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (selectedItems?.length === 0 || !returnReason) return;

    setIsSubmitting(true);
    try {
      await onSubmitReturn({
        orderId: order?.id,
        items: selectedItems,
        reason: returnReason,
        comments: returnComments,
        refundMethod: refundMethod
      });
      onClose();
    } catch (error) {
      console.error('Return request failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateRefundAmount = () => {
    return selectedItems?.reduce((total, itemId) => {
      const item = order?.items?.find(item => item?.id === itemId);
      return total + (item ? item?.price * item?.quantity : 0);
    }, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-large max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Return Request</h2>
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

        <form onSubmit={handleSubmit}>
          {/* Select Items to Return */}
          <div className="p-6 border-b border-border">
            <h3 className="font-medium text-foreground mb-4">Select items to return</h3>
            <div className="space-y-3">
              {order?.items?.map((item) => (
                <div key={item?.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                  <Checkbox
                    checked={selectedItems?.includes(item?.id)}
                    onChange={() => handleItemToggle(item?.id)}
                  />
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground line-clamp-1">{item?.name}</h4>
                    <p className="text-sm text-muted-foreground">Qty: {item?.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatPrice(item?.price)}</p>
                    <p className="text-sm text-muted-foreground">each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return Details */}
          <div className="p-6 space-y-6">
            {/* Return Reason */}
            <div>
              <Select
                label="Reason for return"
                placeholder="Select a reason"
                options={returnReasons}
                value={returnReason}
                onChange={setReturnReason}
                required
              />
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional comments (optional)
              </label>
              <textarea
                value={returnComments}
                onChange={(e) => setReturnComments(e?.target?.value)}
                placeholder="Please provide any additional details about your return..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>

            {/* Refund Method */}
            <div>
              <Select
                label="Refund method"
                placeholder="Select refund method"
                options={refundMethods}
                value={refundMethod}
                onChange={setRefundMethod}
                required
              />
            </div>

            {/* Return Summary */}
            {selectedItems?.length > 0 && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Return Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items selected:</span>
                    <span className="text-foreground">{selectedItems?.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated refund:</span>
                    <span className="font-semibold text-foreground">{formatPrice(calculateRefundAmount())}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * Final refund amount may vary based on item condition and return policy
                </p>
              </div>
            )}

            {/* Return Policy Notice */}
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-warning mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-foreground mb-1">Return Policy</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Items must be returned within 30 days of delivery</li>
                    <li>• Items must be in original condition with tags attached</li>
                    <li>• Refunds will be processed within 5-7 business days</li>
                    <li>• Return shipping is free for defective items</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={selectedItems?.length === 0 || !returnReason || isSubmitting}
                loading={isSubmitting}
              >
                Submit Return Request
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnRequestModal;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CustomerShoppingHeader from '../../components/ui/CustomerShoppingHeader';
import AccountManagementSidebar from '../../components/ui/AccountManagementSidebar';
import OrderCard from './components/OrderCard';
import OrderFilters from './components/OrderFilters';
import OrderTrackingModal from './components/OrderTrackingModal';
import ReturnRequestModal from './components/ReturnRequestModal';
import OrderStats from './components/OrderStats';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD-2025-001',
      orderNumber: '2025001',
      orderDate: '2025-01-15T10:30:00Z',
      status: 'delivered',
      totalAmount: 299.99,
      subtotal: 279.99,
      shipping: 15.00,
      tax: 5.00,
      deliveredDate: '2025-01-18T14:20:00Z',
      processingDate: '2025-01-15T11:00:00Z',
      shippedDate: '2025-01-16T09:15:00Z',
      outForDeliveryDate: '2025-01-18T08:30:00Z',
      trackingNumber: 'TRK123456789',
      carrier: 'FedEx',
      estimatedDelivery: '2025-01-18T17:00:00Z',
      items: [
        {
          id: 'item-1',
          productId: 'prod-1',
          name: 'Wireless Bluetooth Headphones - Premium Sound Quality',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          price: 149.99,
          quantity: 1
        },
        {
          id: 'item-2',
          productId: 'prod-2',
          name: 'Smartphone Case - Protective Cover',
          image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400',
          price: 29.99,
          quantity: 2
        },
        {
          id: 'item-3',
          productId: 'prod-3',
          name: 'USB-C Charging Cable - 6ft',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
          price: 19.99,
          quantity: 5
        }
      ],
      shippingAddress: {
        name: 'John Smith',
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '+1 (555) 123-4567'
      },
      paymentMethod: {
        type: 'Credit Card',
        last4: '4242'
      }
    },
    {
      id: 'ORD-2025-002',
      orderNumber: '2025002',
      orderDate: '2025-01-20T15:45:00Z',
      status: 'shipped',
      totalAmount: 159.97,
      subtotal: 149.97,
      shipping: 10.00,
      tax: 0.00,
      processingDate: '2025-01-20T16:00:00Z',
      shippedDate: '2025-01-21T10:30:00Z',
      trackingNumber: 'TRK987654321',
      carrier: 'UPS',
      estimatedDelivery: '2025-01-24T17:00:00Z',
      expectedDelivery: '2025-01-24T17:00:00Z',
      items: [
        {
          id: 'item-4',
          productId: 'prod-4',
          name: 'Gaming Mouse - RGB Lighting',
          image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
          price: 79.99,
          quantity: 1
        },
        {
          id: 'item-5',
          productId: 'prod-5',
          name: 'Mechanical Keyboard - Blue Switches',
          image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
          price: 69.98,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'John Smith',
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '+1 (555) 123-4567'
      },
      paymentMethod: {
        type: 'Debit Card',
        last4: '8765'
      }
    },
    {
      id: 'ORD-2025-003',
      orderNumber: '2025003',
      orderDate: '2025-01-25T09:15:00Z',
      status: 'processing',
      totalAmount: 89.99,
      subtotal: 79.99,
      shipping: 10.00,
      tax: 0.00,
      processingDate: '2025-01-25T09:30:00Z',
      items: [
        {
          id: 'item-6',
          productId: 'prod-6',
          name: 'Fitness Tracker - Heart Rate Monitor',
          image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400',
          price: 79.99,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'John Smith',
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '+1 (555) 123-4567'
      },
      paymentMethod: {
        type: 'PayPal',
        last4: 'PayPal'
      }
    },
    {
      id: 'ORD-2024-045',
      orderNumber: '2024045',
      orderDate: '2024-12-10T14:20:00Z',
      status: 'delivered',
      totalAmount: 449.99,
      subtotal: 419.99,
      shipping: 20.00,
      tax: 10.00,
      deliveredDate: '2024-12-15T16:45:00Z',
      processingDate: '2024-12-10T15:00:00Z',
      shippedDate: '2024-12-11T11:20:00Z',
      outForDeliveryDate: '2024-12-15T09:00:00Z',
      trackingNumber: 'TRK456789123',
      carrier: 'DHL',
      items: [
        {
          id: 'item-7',
          productId: 'prod-7',
          name: 'Laptop Stand - Adjustable Aluminum',
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
          price: 89.99,
          quantity: 1
        },
        {
          id: 'item-8',
          productId: 'prod-8',
          name: 'Wireless Charging Pad - Fast Charge',
          image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
          price: 49.99,
          quantity: 2
        },
        {
          id: 'item-9',
          productId: 'prod-9',
          name: 'Bluetooth Speaker - Waterproof',
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
          price: 129.99,
          quantity: 2
        }
      ],
      shippingAddress: {
        name: 'John Smith',
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '+1 (555) 123-4567'
      },
      paymentMethod: {
        type: 'Credit Card',
        last4: '1234'
      }
    },
    {
      id: 'ORD-2024-032',
      orderNumber: '2024032',
      orderDate: '2024-11-28T11:30:00Z',
      status: 'cancelled',
      totalAmount: 199.99,
      subtotal: 189.99,
      shipping: 10.00,
      tax: 0.00,
      items: [
        {
          id: 'item-10',
          productId: 'prod-10',
          name: 'Smart Watch - Health Monitoring',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          price: 189.99,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'John Smith',
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phone: '+1 (555) 123-4567'
      },
      paymentMethod: {
        type: 'Credit Card',
        last4: '9876'
      }
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadOrders = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    };

    loadOrders();
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...orders];

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(order => 
        order?.orderNumber?.toLowerCase()?.includes(searchTerm) ||
        order?.items?.some(item => item?.name?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter(order => order?.status === filters?.status);
    }

    // Date range filter
    if (filters?.dateRange) {
      const now = new Date();
      let startDate;
      
      switch (filters?.dateRange) {
        case 'last7days':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last30days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'last3months':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case 'last6months':
          startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
          break;
        case 'lastyear':
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered?.filter(order => new Date(order.orderDate) >= startDate);
      }
    }

    // Price range filter
    if (filters?.priceRange) {
      const [min, max] = filters?.priceRange?.split('-')?.map(v => v === '+' ? Infinity : parseFloat(v));
      filtered = filtered?.filter(order => {
        if (max === undefined) {
          return order?.totalAmount >= min;
        }
        return order?.totalAmount >= min && order?.totalAmount <= max;
      });
    }

    setFilteredOrders(filtered);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    let sorted = [...filteredOrders];

    switch (newSortBy) {
      case 'newest':
        sorted?.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        break;
      case 'oldest':
        sorted?.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
        break;
      case 'highest':
        sorted?.sort((a, b) => b?.totalAmount - a?.totalAmount);
        break;
      case 'lowest':
        sorted?.sort((a, b) => a?.totalAmount - b?.totalAmount);
        break;
      default:
        break;
    }

    setFilteredOrders(sorted);
  };

  const handleTrackOrder = (orderId) => {
    const order = orders?.find(o => o?.id === orderId);
    setSelectedOrder(order);
    setTrackingModalOpen(true);
  };

  const handleReturnRequest = (orderId) => {
    const order = orders?.find(o => o?.id === orderId);
    setSelectedOrder(order);
    setReturnModalOpen(true);
  };

  const handleReorder = (items) => {
    console.log('Reordering items:', items);
    // Implement reorder logic - redirect to cart with items
  };

  const handleSubmitReturn = async (returnData) => {
    console.log('Submitting return request:', returnData);
    // Implement return request submission
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Amount' },
    { value: 'lowest', label: 'Lowest Amount' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerShoppingHeader />
        <div className="flex">
          <AccountManagementSidebar />
          <main className="flex-1 lg:ml-64 pt-16">
            <div className="max-w-7xl mx-auto p-6">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-muted rounded w-1/4"></div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)]?.map((_, i) => (
                    <div key={i} className="h-24 bg-muted rounded-lg"></div>
                  ))}
                </div>
                <div className="h-32 bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  {[...Array(3)]?.map((_, i) => (
                    <div key={i} className="h-48 bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerShoppingHeader />
      <div className="flex">
        <AccountManagementSidebar />
        <main className="flex-1 lg:ml-64 pt-16 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link to="/user-dashboard" className="hover:text-primary transition-colors duration-150">
                  Dashboard
                </Link>
                <Icon name="ChevronRight" size={14} />
                <span className="text-foreground">Order History</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your purchase history</p>
            </div>

            {/* Order Statistics */}
            <OrderStats orders={orders} />

            {/* Filters */}
            <OrderFilters 
              onFiltersChange={handleFiltersChange}
              totalOrders={filteredOrders?.length}
            />

            {/* Sort and Results */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredOrders?.length} of {orders?.length} orders
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e?.target?.value)}
                  className="px-3 py-1 border border-border rounded-lg bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sortOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders?.length > 0 ? (
              <div className="space-y-6">
                {filteredOrders?.map((order) => (
                  <OrderCard
                    key={order?.id}
                    order={order}
                    onReorder={handleReorder}
                    onTrackOrder={handleTrackOrder}
                    onReturnRequest={handleReturnRequest}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Package" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">
                  {orders?.length === 0 
                    ? "You haven't placed any orders yet. Start shopping to see your order history here." :"No orders match your current filters. Try adjusting your search criteria."
                  }
                </p>
                <Link to="/product-catalog">
                  <Button iconName="ShoppingCart" iconPosition="left">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Modals */}
      <OrderTrackingModal
        order={selectedOrder}
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
      />
      <ReturnRequestModal
        order={selectedOrder}
        isOpen={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        onSubmitReturn={handleSubmitReturn}
      />
    </div>
  );
};

export default OrderHistory;
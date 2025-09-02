import React, { useState, useEffect } from 'react';
import CustomerShoppingHeader from '../../components/ui/CustomerShoppingHeader';
import AccountManagementSidebar from '../../components/ui/AccountManagementSidebar';
import WelcomeSection from './components/WelcomeSection';
import QuickActions from './components/QuickActions';
import RecentOrders from './components/RecentOrders';
import AccountOverview from './components/AccountOverview';
import RecommendedProducts from './components/RecommendedProducts';
import NotificationCenter from './components/NotificationCenter';
import RecentlyViewed from './components/RecentlyViewed';
import CouponsSection from './components/CouponsSection';

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const userData = {
    name: "John Smith",
    email: "john.smith@email.com",
    loyaltyPoints: 2450,
    memberSince: "January 2023"
  };

  const accountStatus = {
    verified: true,
    emailVerified: true,
    phoneVerified: true
  };

  const accountStats = {
    totalOrders: 24,
    wishlistItems: 12,
    loyaltyPoints: 2450,
    savedAddresses: 3
  };

  const recentOrders = [
    {
      id: "ORD-2025-001",
      date: "Dec 28, 2024",
      status: "Delivered",
      total: 299.99,
      expectedDelivery: "Jan 2, 2025",
      items: [
        {
          name: "Wireless Bluetooth Headphones",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
        },
        {
          name: "Phone Case",
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2025-002",
      date: "Dec 30, 2024",
      status: "Shipped",
      total: 149.99,
      expectedDelivery: "Jan 3, 2025",
      items: [
        {
          name: "Smart Watch Series 8",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: "ORD-2025-003",
      date: "Jan 1, 2025",
      status: "Processing",
      total: 89.99,
      expectedDelivery: "Jan 5, 2025",
      items: [
        {
          name: "Portable Charger 20000mAh",
          image: "https://images.unsplash.com/photo-1609592806596-d0b4b3b0b3b3?w=400&h=400&fit=crop"
        }
      ]
    }
  ];

  const recommendedProducts = [
    {
      id: 1,
      name: "Premium Laptop Stand Adjustable",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviews: 234,
      discount: 20
    },
    {
      id: 2,
      name: "Wireless Gaming Mouse RGB",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.8,
      reviews: 156,
      discount: 25
    },
    {
      id: 3,
      name: "4K Webcam for Streaming",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
      price: 129.99,
      rating: 4.6,
      reviews: 89,
      discount: 0
    },
    {
      id: 4,
      name: "Mechanical Keyboard Blue Switches",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.7,
      reviews: 312,
      discount: 25
    },
    {
      id: 5,
      name: "USB-C Hub 7-in-1",
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
      price: 49.99,
      rating: 4.4,
      reviews: 178,
      discount: 0
    },
    {
      id: 6,
      name: "Desk Organizer with Wireless Charging",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.3,
      reviews: 67,
      discount: 25
    }
  ];

  const recentlyViewedProducts = [
    {
      id: 7,
      name: "Bluetooth Speaker Waterproof",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      price: 39.99,
      rating: 4.2,
      reviews: 145
    },
    {
      id: 8,
      name: "Fitness Tracker Heart Rate",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      price: 99.99,
      rating: 4.5,
      reviews: 203
    },
    {
      id: 9,
      name: "Wireless Earbuds Pro",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      price: 179.99,
      rating: 4.6,
      reviews: 89
    },
    {
      id: 10,
      name: "Phone Camera Lens Kit",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      price: 29.99,
      rating: 4.1,
      reviews: 76
    },
    {
      id: 11,
      name: "Portable SSD 1TB",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
      price: 159.99,
      rating: 4.8,
      reviews: 234
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Order Delivered Successfully",
      message: "Your order #ORD-2025-001 has been delivered to your address.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "offer",
      title: "New Year Sale - 50% Off",
      message: "Don\'t miss out on our biggest sale of the year. Limited time offer!",
      time: "4 hours ago",
      read: false
    },
    {
      id: 3,
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-2025-002 is on its way. Track your package.",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      type: "account",
      title: "Profile Updated",
      message: "Your account information has been successfully updated.",
      time: "2 days ago",
      read: true
    },
    {
      id: 5,
      type: "payment",
      title: "Payment Method Added",
      message: "New payment method ending in 4567 has been added to your account.",
      time: "3 days ago",
      read: true
    },
    {
      id: 6,
      type: "offer",
      title: "Exclusive Member Discount",
      message: "Get 20% off on your next purchase with code MEMBER20.",
      time: "1 week ago",
      read: true
    }
  ];

  const availableCoupons = [
    {
      id: 1,
      code: "SAVE20",
      title: "20% Off Everything",
      description: "Get 20% discount on all products",
      discount: "20%",
      type: "percentage",
      minOrder: 50,
      expiryDate: "Jan 15, 2025"
    },
    {
      id: 2,
      code: "FREESHIP",
      title: "Free Shipping",
      description: "Free shipping on orders above $25",
      discount: "FREE",
      type: "shipping",
      minOrder: 25,
      expiryDate: "Jan 31, 2025"
    },
    {
      id: 3,
      code: "FIRST10",
      title: "$10 Off First Order",
      description: "Get $10 off on your first purchase",
      discount: "$10",
      type: "fixed",
      minOrder: 30,
      expiryDate: "Feb 28, 2025"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerShoppingHeader />
        <div className="flex">
          <AccountManagementSidebar />
          <div className="flex-1 lg:ml-64 pt-16">
            <div className="p-6">
              <div className="animate-pulse space-y-6">
                <div className="h-32 bg-muted rounded-xl"></div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)]?.map((_, i) => (
                    <div key={i} className="h-24 bg-muted rounded-lg"></div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-96 bg-muted rounded-lg"></div>
                  <div className="h-96 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
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
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {/* Welcome Section */}
            <WelcomeSection user={userData} accountStatus={accountStatus} />
            
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Account Overview Stats */}
            <AccountOverview stats={accountStats} />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Recent Orders - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <RecentOrders orders={recentOrders} />
              </div>
              
              {/* Notification Center */}
              <div className="lg:col-span-1">
                <NotificationCenter notifications={notifications} />
              </div>
            </div>
            
            {/* Recently Viewed Products */}
            <div className="mb-6">
              <RecentlyViewed products={recentlyViewedProducts} />
            </div>
            
            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recommended Products - Takes 2 columns */}
              <div className="lg:col-span-2">
                <RecommendedProducts products={recommendedProducts} />
              </div>
              
              {/* Available Coupons */}
              <div className="lg:col-span-1">
                <CouponsSection coupons={availableCoupons} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
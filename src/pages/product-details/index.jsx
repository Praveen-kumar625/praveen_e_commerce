import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CustomerShoppingHeader from '../../components/ui/CustomerShoppingHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import RecentlyViewed from './components/RecentlyViewed';
import SocialShare from './components/SocialShare';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id') || '1';
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const product = {
    id: productId,
    title: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
    subtitle: "Professional Grade Audio Experience",
    brand: "TechSound Pro",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.6,
    reviewCount: 1920,
    soldCount: 5420,
    stock: 47,
    isVerified: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800"
    ],
    variants: [
      { id: 1, name: "Midnight Black", price: 199.99 },
      { id: 2, name: "Pearl White", price: 199.99 },
      { id: 3, name: "Rose Gold", price: 219.99 }
    ],
    keyFeatures: [
      "Active Noise Cancellation with 30dB reduction",
      "40-hour battery life with quick charge",
      "Premium leather ear cushions for comfort",
      "Hi-Res Audio certification",
      "Bluetooth 5.2 with multipoint connection",
      "Built-in voice assistant support"
    ],
    specifications: {
      audio: {
        "Driver Size": "40mm Dynamic",
        "Frequency Response": "20Hz - 40kHz",
        "Impedance": "32 Ohms",
        "Sensitivity": "100dB/mW",
        "THD": "< 0.1%"
      },
      connectivity: {
        "Bluetooth Version": "5.2",
        "Supported Codecs": "SBC, AAC, LDAC, aptX HD",
        "Range": "Up to 30 feet",
        "Multipoint": "Yes (2 devices)"
      },
      battery: {
        "Battery Life": "40 hours (ANC off), 30 hours (ANC on)",
        "Charging Time": "2 hours (full), 15 min (5 hours)",
        "Charging Port": "USB-C",
        "Quick Charge": "Yes"
      },
      physical: {
        "Weight": "280g",
        "Dimensions": "7.9 x 6.7 x 3.2 inches",
        "Foldable": "Yes",
        "Cable Length": "1.2m (3.5mm audio cable included)"
      }
    },
    seller: {
      name: "TechSound Official Store",
      rating: 4.8,
      reviewCount: 12450,
      returnPolicy: "30-day returns",
      shipping: "Free 2-day delivery"
    },
    qaCount: 156
  };

  // Mock related products
  const relatedProducts = [
    {
      id: 2,
      title: "Wireless Gaming Headset with RGB Lighting",
      brand: "GamePro",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.4,
      reviewCount: 856,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400"
    },
    {
      id: 3,
      title: "Professional Studio Monitor Headphones",
      brand: "AudioMaster",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.7,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400"
    },
    {
      id: 4,
      title: "Compact True Wireless Earbuds",
      brand: "SoundWave",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.3,
      reviewCount: 2156,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"
    },
    {
      id: 5,
      title: "Over-Ear Wired Studio Headphones",
      brand: "ProAudio",
      price: 179.99,
      originalPrice: 229.99,
      rating: 4.5,
      reviewCount: 967,
      image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=400"
    },
    {
      id: 6,
      title: "Sports Wireless Earphones with Hook",
      brand: "FitSound",
      price: 69.99,
      originalPrice: 99.99,
      rating: 4.2,
      reviewCount: 1543,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
    }
  ];

  // Mock recently viewed products
  const recentlyViewedProducts = [
    {
      id: 7,
      title: "Smart Watch Series 8",
      price: 399.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
    },
    {
      id: 8,
      title: "Wireless Charging Pad",
      price: 49.99,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200"
    },
    {
      id: 9,
      title: "Bluetooth Speaker",
      price: 129.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerShoppingHeader />
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="animate-pulse">
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg"></div>
                  <div className="flex space-x-2">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="w-16 h-16 bg-muted rounded-lg"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-12 bg-muted rounded w-1/3"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="h-4 bg-muted rounded"></div>
                    ))}
                  </div>
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
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/product-catalog" className="hover:text-primary transition-colors">
              Products
            </Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/product-catalog?category=electronics" className="hover:text-primary transition-colors">
              Electronics
            </Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium">Headphones</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-6">
              <ProductImageGallery images={product?.images} productName={product?.title} />
              
              {/* Social Share - Desktop */}
              <div className="hidden lg:block">
                <SocialShare product={product} url={window.location.href} />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <ProductInfo product={product} />
              
              {/* Social Share - Mobile */}
              <div className="lg:hidden">
                <SocialShare product={product} url={window.location.href} />
              </div>
            </div>
          </div>

          {/* Recently Viewed Products */}
          <div className="mb-12">
            <RecentlyViewed products={recentlyViewedProducts} />
          </div>

          {/* Product Details Tabs */}
          <div className="mb-12">
            <ProductTabs product={product} />
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <RelatedProducts products={relatedProducts} title="Related Products" />
          </div>

          {/* You May Also Like */}
          <div className="mb-12">
            <RelatedProducts 
              products={relatedProducts?.slice()?.reverse()} 
              title="You May Also Like" 
            />
          </div>

          {/* Back to Top Button */}
          <div className="fixed bottom-6 right-6 z-40">
            <Button
              variant="default"
              size="icon"
              className="rounded-full shadow-large h-12 w-12"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Icon name="ArrowUp" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
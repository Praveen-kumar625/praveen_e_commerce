import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomerShoppingHeader from '../../components/ui/CustomerShoppingHeader';

import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import QuickViewModal from './components/QuickViewModal';
import RecentlyViewedSidebar from './components/RecentlyViewedSidebar';
import ProductGrid from './components/ProductGrid';
import ComparisonBar from './components/ComparisonBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProductCatalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    minRating: null,
    inStock: false,
    freeShipping: false,
    onSale: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [comparisonItems, setComparisonItems] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB Natural Titanium",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
      ],
      originalPrice: 1199,
      salePrice: 1099,
      discount: 8,
      rating: 4.8,
      reviewCount: 2847,
      inStock: true,
      stock: 15,
      freeShipping: true,
      category: 'electronics',
      description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system.",
      features: [
        "A17 Pro chip with 6-core GPU",
        "Pro camera system with 48MP main camera",
        "Titanium design with Ceramic Shield",
        "Up to 29 hours video playback"
      ]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
      brand: "Samsung",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      originalPrice: 1299,
      salePrice: 1199,
      discount: 8,
      rating: 4.7,
      reviewCount: 1923,
      inStock: true,
      stock: 8,
      freeShipping: true,
      category: 'electronics'
    },
    {
      id: 3,
      name: "Nike Air Max 270 React Men\'s Running Shoes",
      brand: "Nike",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      originalPrice: 150,
      salePrice: 119,
      discount: 21,
      rating: 4.5,
      reviewCount: 856,
      inStock: true,
      stock: 25,
      freeShipping: true,
      category: 'fashion'
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      brand: "Sony",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      originalPrice: 399,
      salePrice: 329,
      discount: 18,
      rating: 4.9,
      reviewCount: 3421,
      inStock: true,
      stock: 12,
      freeShipping: true,
      category: 'electronics'
    },
    {
      id: 5,
      name: "Adidas Ultraboost 22 Women\'s Running Shoes",
      brand: "Adidas",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
      originalPrice: 180,
      salePrice: 144,
      discount: 20,
      rating: 4.6,
      reviewCount: 1247,
      inStock: true,
      stock: 18,
      freeShipping: true,
      category: 'fashion'
    },
    {
      id: 6,
      name: "MacBook Pro 14-inch M3 Pro 512GB Space Black",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      originalPrice: 2399,
      salePrice: 2199,
      discount: 8,
      rating: 4.8,
      reviewCount: 892,
      inStock: true,
      stock: 6,
      freeShipping: true,
      category: 'electronics'
    },
    {
      id: 7,
      name: "LG OLED55C3PUA 55-Inch Class C3 Series OLED 4K UHD Smart TV",
      brand: "LG",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      originalPrice: 1499,
      salePrice: 1299,
      discount: 13,
      rating: 4.7,
      reviewCount: 1567,
      inStock: true,
      stock: 4,
      freeShipping: true,
      category: 'electronics'
    },
    {
      id: 8,
      name: "Dyson V15 Detect Absolute Cordless Vacuum",
      brand: "Dyson",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      originalPrice: 749,
      salePrice: 649,
      discount: 13,
      rating: 4.6,
      reviewCount: 2134,
      inStock: true,
      stock: 9,
      freeShipping: true,
      category: 'home-garden'
    },
    {
      id: 9,
      name: "KitchenAid Artisan Series 5-Qt Stand Mixer",
      brand: "KitchenAid",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      originalPrice: 429,
      salePrice: 349,
      discount: 19,
      rating: 4.8,
      reviewCount: 3892,
      inStock: true,
      stock: 11,
      freeShipping: true,
      category: 'home-garden'
    },
    {
      id: 10,
      name: "Peloton Bike+ Indoor Exercise Bike",
      brand: "Peloton",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      originalPrice: 2495,
      salePrice: 2195,
      discount: 12,
      rating: 4.4,
      reviewCount: 1876,
      inStock: true,
      stock: 3,
      freeShipping: true,
      category: 'sports'
    },
    {
      id: 11,
      name: "Canon EOS R6 Mark II Mirrorless Camera Body",
      brand: "Canon",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      originalPrice: 2499,
      salePrice: 2299,
      discount: 8,
      rating: 4.9,
      reviewCount: 567,
      inStock: true,
      stock: 7,
      freeShipping: true,
      category: 'electronics'
    },
    {
      id: 12,
      name: "Levi\'s 501 Original Fit Men\'s Jeans",
      brand: "Levi\'s",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      originalPrice: 89,
      salePrice: 69,
      discount: 22,
      rating: 4.3,
      reviewCount: 4521,
      inStock: true,
      stock: 32,
      freeShipping: false,
      category: 'fashion'
    }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Parse URL parameters for initial filters
      const urlParams = new URLSearchParams(location.search);
      const category = urlParams?.get('category');
      const searchQuery = urlParams?.get('search');
      
      let initialFilters = { ...filters };
      if (category) {
        initialFilters.categories = [category];
      }
      
      setFilters(initialFilters);
      setProducts(mockProducts);
      setLoading(false);
    };

    initializeData();
  }, [location?.search]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.categories?.includes(product?.category)
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.brands?.includes(product?.brand?.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered?.filter(product => 
      product?.salePrice >= filters?.priceRange?.[0] && 
      product?.salePrice <= filters?.priceRange?.[1]
    );

    // Apply rating filter
    if (filters?.minRating) {
      filtered = filtered?.filter(product => product?.rating >= filters?.minRating);
    }

    // Apply availability filters
    if (filters?.inStock) {
      filtered = filtered?.filter(product => product?.inStock);
    }

    if (filters?.freeShipping) {
      filtered = filtered?.filter(product => product?.freeShipping);
    }

    if (filters?.onSale) {
      filtered = filtered?.filter(product => product?.discount > 0);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.salePrice - b?.salePrice);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.salePrice - a?.salePrice);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'popularity':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  // Event handlers
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
  }, []);

  const handleViewModeChange = useCallback((newViewMode) => {
    setViewMode(newViewMode);
  }, []);

  const handleToggleFilters = useCallback(() => {
    setIsFilterOpen(!isFilterOpen);
  }, [isFilterOpen]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      minRating: null,
      inStock: false,
      freeShipping: false,
      onSale: false
    });
  }, []);

  const handleAddToCart = useCallback((product) => {
    console.log('Adding to cart:', product);
    // Add cart logic here
  }, []);

  const handleToggleWishlist = useCallback((productId) => {
    setWishlistItems(prev => 
      prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const handleToggleCompare = useCallback((productId) => {
    setComparisonItems(prev => {
      if (prev?.includes(productId)) {
        return prev?.filter(id => id !== productId);
      } else if (prev?.length < 4) {
        return [...prev, productId];
      } else {
        // Replace first item if at maximum
        return [...prev?.slice(1), productId];
      }
    });
  }, []);

  const handleQuickView = useCallback((product) => {
    setQuickViewProduct(product);
    // Add to recently viewed
    setRecentlyViewed(prev => {
      let filtered = prev?.filter(p => p?.id !== product?.id);
      return [product, ...filtered]?.slice(0, 10);
    });
  }, []);

  const handleClearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, []);

  const handleRemoveFromComparison = useCallback((productId) => {
    setComparisonItems(prev => prev?.filter(id => id !== productId));
  }, []);

  const handleClearComparison = useCallback(() => {
    setComparisonItems([]);
  }, []);

  const comparisonProducts = products?.filter(p => comparisonItems?.includes(p?.id));

  return (
    <div className="min-h-screen bg-background">
      <CustomerShoppingHeader />
      <div className="pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex gap-6">
            {/* Filter Panel - Desktop */}
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={false}
              onToggle={handleToggleFilters}
              resultCount={filteredProducts?.length}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                onToggleFilters={handleToggleFilters}
                resultCount={filteredProducts?.length}
              />

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onToggleCompare={handleToggleCompare}
                onQuickView={handleQuickView}
                wishlistItems={wishlistItems}
                comparisonItems={comparisonItems}
                loading={loading}
              />

              {/* Load More Button */}
              {!loading && filteredProducts?.length > 0 && hasMoreProducts && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Simulate loading more products
                      setHasMoreProducts(false);
                    }}
                  >
                    <Icon name="RotateCw" size={16} className="mr-2" />
                    Load More Products
                  </Button>
                </div>
              )}
            </div>

            {/* Recently Viewed Sidebar */}
            <RecentlyViewedSidebar
              products={recentlyViewed}
              onClearHistory={handleClearRecentlyViewed}
              isVisible={recentlyViewed?.length > 0}
            />
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isOpen={isFilterOpen}
          onToggle={handleToggleFilters}
          resultCount={filteredProducts?.length}
        />
      )}
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={quickViewProduct ? wishlistItems?.includes(quickViewProduct?.id) : false}
      />
      {/* Comparison Bar */}
      <ComparisonBar
        products={comparisonProducts}
        onRemoveProduct={handleRemoveFromComparison}
        onClearAll={handleClearComparison}
        isVisible={comparisonItems?.length > 0}
      />
      {/* Scroll to Top Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-20 right-4 z-30 shadow-large"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon name="ArrowUp" size={20} />
      </Button>
    </div>
  );
};

export default ProductCatalog;
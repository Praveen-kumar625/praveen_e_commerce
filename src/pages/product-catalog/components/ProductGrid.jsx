import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  viewMode, 
  onAddToCart, 
  onToggleWishlist, 
  onToggleCompare, 
  onQuickView,
  wishlistItems,
  comparisonItems,
  loading 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'list' ?'grid grid-cols-1 gap-4' :'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  return (
    <div className={gridClasses}>
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          onToggleCompare={onToggleCompare}
          onQuickView={onQuickView}
          isInWishlist={wishlistItems?.includes(product?.id)}
          isInComparison={comparisonItems?.includes(product?.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => prev === 0 ? images?.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => prev === images?.length - 1 ? 0 : prev + 1);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-lg border border-border overflow-hidden">
        <div className="aspect-square relative group">
          <Image
            src={images?.[selectedImageIndex]}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-10 w-10"
                onClick={handlePrevImage}
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-10 w-10"
                onClick={handleNextImage}
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-xs">
            {selectedImageIndex + 1} / {images?.length}
          </div>

          {/* Zoom Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white shadow-medium h-10 w-10"
            onClick={toggleZoom}
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={18} />
          </Button>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-primary shadow-medium'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Mobile Swipe Indicators */}
      <div className="flex justify-center space-x-1 md:hidden">
        {images?.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              selectedImageIndex === index ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
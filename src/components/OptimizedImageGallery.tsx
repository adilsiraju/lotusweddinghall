import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { VenueArea, GalleryImage } from '@/types/database';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { Button } from '@/components/ui/button';

interface OptimizedImageGalleryProps {
  className?: string;
  initialLoadCount?: number;
  loadMoreCount?: number;
}

// Lazy loading image component
const LazyImage = React.memo(({ 
  src, 
  alt, 
  className,
  onClick 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  onClick?: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-gray-100 aspect-square",
        className
      )}
      onClick={onClick}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover cursor-pointer hover:scale-105 transition-all duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
      {(!isInView || !isLoaded) && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

const OptimizedImageGallery = ({ 
  className, 
  initialLoadCount = 6,
  loadMoreCount = 6 
}: OptimizedImageGalleryProps) => {
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null);
  const [activeSubAreaId, setActiveSubAreaId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(initialLoadCount);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const { data: venueAreas = [], isLoading: areasLoading } = useVenueAreas();
  const { data: galleryImages = [], isLoading: imagesLoading } = useGalleryImages();
  
  const isLoading = areasLoading || imagesLoading;
  
  // Memoized filtered images
  const filteredImages = useMemo(() => {
    if (!activeAreaId && !activeSubAreaId) return galleryImages;
    
    const targetAreaId = activeSubAreaId || activeAreaId;
    return galleryImages.filter(image => image.venue_area_id === targetAreaId);
  }, [galleryImages, activeAreaId, activeSubAreaId]);

  // Memoized visible images
  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  // Get the active parent area
  const activeParentArea = useMemo(() => {
    if (!activeAreaId) return null;
    return venueAreas.find(area => area.id === activeAreaId) || null;
  }, [activeAreaId, venueAreas]);

  // Get subAreas for the active parent area
  const subAreas = useMemo(() => {
    if (!activeAreaId) return [];
    const area = venueAreas.find(area => area.id === activeAreaId);
    if (!area) return [];
    return venueAreas.filter(subArea => subArea.parent_area_id === area.id);
  }, [activeAreaId, venueAreas]);

  // Get main areas (parent areas only)
  const mainAreas = useMemo(() => {
    return venueAreas.filter(area => !area.parent_area_id);
  }, [venueAreas]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + loadMoreCount);
  }, [loadMoreCount]);

  const handleAreaClick = useCallback((areaId: string) => {
    if (activeAreaId === areaId) {
      setActiveAreaId(null);
      setActiveSubAreaId(null);
    } else {
      setActiveAreaId(areaId);
      setActiveSubAreaId(null);
    }
    setVisibleCount(initialLoadCount);
  }, [activeAreaId, initialLoadCount]);

  const handleSubAreaClick = useCallback((subAreaId: string) => {
    setActiveSubAreaId(activeSubAreaId === subAreaId ? null : subAreaId);
    setVisibleCount(initialLoadCount);
  }, [activeSubAreaId, initialLoadCount]);

  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Area Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={!activeAreaId ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setActiveAreaId(null);
            setActiveSubAreaId(null);
            setVisibleCount(initialLoadCount);
          }}
          className="mb-2"
        >
          All Areas
        </Button>
        {mainAreas.map((area) => (
          <Button 
            key={area.id}
            variant={activeAreaId === area.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleAreaClick(area.id)}
            className="mb-2"
          >
            {area.name}
          </Button>
        ))}
      </div>

      {/* Sub-Area Filter Buttons */}
      {activeAreaId && subAreas.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-4">
          {subAreas.map((subArea) => (
            <Button 
              key={subArea.id}
              variant={activeSubAreaId === subArea.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleSubAreaClick(subArea.id)}
            >
              {subArea.name}
            </Button>
          ))}
        </div>
      )}

      {/* Current Filter Display */}
      {(activeAreaId || activeSubAreaId) && (
        <div className="text-sm text-gray-600">
          Showing: {activeSubAreaId 
            ? subAreas.find(s => s.id === activeSubAreaId)?.name 
            : activeParentArea?.name
          } ({filteredImages.length} images)
        </div>
      )}

      {/* Image Grid */}
      {visibleImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No images found for the selected area.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleImages.map((image, index) => (
              <LazyImage
                key={image.id}
                src={image.image_url}
                alt={image.title || 'Gallery image'}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredImages.length && (
            <div className="text-center">
              <Button 
                onClick={handleLoadMore}
                variant="outline"
              >
                Load More ({Math.min(loadMoreCount, filteredImages.length - visibleCount)} of {filteredImages.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal for full-size image viewing */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={visibleImages[selectedImageIndex]?.image_url}
              alt={visibleImages[selectedImageIndex]?.title || 'Gallery image'}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImageGallery;

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { VenueArea, GalleryImage } from '@/types/database';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { Button } from '@/components/ui/button';

interface DynamicImageGalleryProps {
  className?: string;
}

const DynamicImageGallery = ({ className }: DynamicImageGalleryProps) => {
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null);
  const [activeSubAreaId, setActiveSubAreaId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6); // Initially show 6 images
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Check if device is mobile on initial load
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Adjust initial visible count based on screen size
      setVisibleCount(window.innerWidth < 768 ? 3 : 6);
    };
    
    // Check immediately
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { data: venueAreas = [], isLoading: areasLoading } = useVenueAreas();
  const { data: galleryImages = [], isLoading: imagesLoading } = useGalleryImages();
  
  const isLoading = areasLoading || imagesLoading;
  
  // Get the active parent area (for display purposes)
  const activeParentArea = useMemo(() => {
    if (!activeAreaId) return null;
    return venueAreas.find(area => area.id === activeAreaId) || null;
  }, [activeAreaId, venueAreas]);

  // Get subAreas for the active parent area
  const subAreas = useMemo(() => {
    if (!activeAreaId) return [];
    const area = venueAreas.find(area => area.id === activeAreaId);
    return area?.childAreas || [];
  }, [activeAreaId, venueAreas]);
    // Filter images based on selected area/subarea
  const filteredImages = useMemo(() => {
    if (!activeAreaId && !activeSubAreaId) {
      return galleryImages;
    }
    
    if (activeSubAreaId) {
      return galleryImages.filter(img => img.venue_area_id === activeSubAreaId);
    }
    
    // If there are subareas for the active area, show all images from those subareas
    if (activeAreaId) {
      const area = venueAreas.find(area => area.id === activeAreaId);
      if (area?.childAreas?.length) {
        const subAreaIds = area.childAreas.map(subArea => subArea.id);
        return galleryImages.filter(img => 
          img.venue_area_id === activeAreaId || subAreaIds.includes(img.venue_area_id)
        );
      }
      // Otherwise just show images for the active area
      return galleryImages.filter(img => img.venue_area_id === activeAreaId);
    }
    
    return galleryImages;
  }, [activeAreaId, activeSubAreaId, galleryImages, venueAreas]);

  // Get visible subset of filtered images based on visibleCount
  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6); // Load 6 more images
  };
  const handleAreaClick = (area: VenueArea) => {
    if (activeAreaId === area.id) {
      setActiveAreaId(null);
      setActiveSubAreaId(null);
    } else {
      setActiveAreaId(area.id);
      setActiveSubAreaId(null);
    }
    setVisibleCount(6); // Reset to initial count when changing area
  };

  const handleSubAreaClick = (subArea: VenueArea) => {
    if (activeSubAreaId === subArea.id) {
      setActiveSubAreaId(null);
    } else {
      setActiveSubAreaId(subArea.id);
    }
    setVisibleCount(6); // Reset to initial count when changing subarea
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20">
      <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <div className={cn("", className)}>      {/* Main area filters - scrollable on mobile */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 px-1 -mx-1">
        <button
          className={cn(
            "px-4 py-2 rounded-full border transition-all whitespace-nowrap",
            !activeAreaId
              ? "bg-lotus-navy text-white border-lotus-navy"
              : "bg-transparent text-lotus-navy border-gray-300 hover:border-lotus-navy"
          )}onClick={() => {
            setActiveAreaId(null);
            setActiveSubAreaId(null);
            setVisibleCount(isMobile ? 3 : 6); // Reset to initial count based on device
          }}
        >
          All
        </button>
        {venueAreas.map(area => (
          <button            key={area.id}
            className={cn(
              "px-4 py-2 rounded-full border transition-all whitespace-nowrap",
              activeAreaId === area.id
                ? "bg-lotus-navy text-white border-lotus-navy"
                : "bg-transparent text-lotus-navy border-gray-300 hover:border-lotus-navy"
            )}
            onClick={() => handleAreaClick(area)}
          >
            {area.name}
          </button>
        ))}
      </div>      {/* Subarea filters - scrollable on mobile */}
      {activeParentArea && subAreas.length > 0 && (
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 px-1 -mx-1">
          <button
            className={cn(
              "px-3 py-1 text-sm rounded-full border transition-all whitespace-nowrap",
              !activeSubAreaId
                ? "bg-lotus-gold text-white border-lotus-gold"
                : "bg-transparent text-lotus-gold border-gray-300 hover:border-lotus-gold"
            )}
            onClick={() => setActiveSubAreaId(null)}
          >
            All {activeParentArea.name}
          </button>
          {subAreas.map(subArea => (
            <button              key={subArea.id}
              className={cn(
                "px-3 py-1 text-sm rounded-full border transition-all whitespace-nowrap",
                activeSubAreaId === subArea.id
                  ? "bg-lotus-gold text-white border-lotus-gold"
                  : "bg-transparent text-lotus-gold border-gray-300 hover:border-lotus-gold"
              )}
              onClick={() => handleSubAreaClick(subArea)}
            >
              {subArea.name}
            </button>
          ))}
        </div>
      )}      {/* Gallery grid - adjusted for better mobile view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 relative aspect-square"
          >
            <img
              src={image.image_url}
              alt={image.alt_text}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              loading="lazy"
            />            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white font-medium text-lg text-center px-4">{image.title}</span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredImages.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No images found for this selection.</p>
        </div>
      )}      {/* Load More button - enhanced for mobile */}
      {visibleImages.length < filteredImages.length && (
        <div className="flex justify-center mt-10">
          <Button 
            onClick={handleLoadMore}
            className="bg-lotus-navy hover:bg-lotus-navy/90 px-6 sm:px-8 py-2 w-full sm:w-auto max-w-[250px]"
            aria-label="Load more images"
          >
            Load More ({filteredImages.length - visibleImages.length} remaining)
          </Button>
        </div>
      )}
    </div>
  );
};

export default DynamicImageGallery;

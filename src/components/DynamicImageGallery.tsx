import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { VenueArea, GalleryImage } from '@/types/database';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { useGalleryImages } from '@/hooks/useGalleryImages';

interface DynamicImageGalleryProps {
  className?: string;
}

const DynamicImageGallery = ({ className }: DynamicImageGalleryProps) => {
  const [activeAreaId, setActiveAreaId] = useState<string | null>(null);
  const [activeSubAreaId, setActiveSubAreaId] = useState<string | null>(null);
  
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

  const handleAreaClick = (area: VenueArea) => {
    if (activeAreaId === area.id) {
      setActiveAreaId(null);
      setActiveSubAreaId(null);
    } else {
      setActiveAreaId(area.id);
      setActiveSubAreaId(null);
    }
  };

  const handleSubAreaClick = (subArea: VenueArea) => {
    if (activeSubAreaId === subArea.id) {
      setActiveSubAreaId(null);
    } else {
      setActiveSubAreaId(subArea.id);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20">
      <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <div className={cn("", className)}>
      {/* Main area filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          className={cn(
            "px-4 py-2 rounded-full border transition-all",
            !activeAreaId
              ? "bg-lotus-navy text-white border-lotus-navy"
              : "bg-transparent text-lotus-navy border-gray-300 hover:border-lotus-navy"
          )}
          onClick={() => {
            setActiveAreaId(null);
            setActiveSubAreaId(null);
          }}
        >
          All
        </button>
        {venueAreas.map(area => (
          <button
            key={area.id}
            className={cn(
              "px-4 py-2 rounded-full border transition-all",
              activeAreaId === area.id
                ? "bg-lotus-navy text-white border-lotus-navy"
                : "bg-transparent text-lotus-navy border-gray-300 hover:border-lotus-navy"
            )}
            onClick={() => handleAreaClick(area)}
          >
            {area.name}
          </button>
        ))}
      </div>

      {/* Subarea filters (only show if a parent area is selected and it has children) */}
      {activeParentArea && subAreas.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className={cn(
              "px-3 py-1 text-sm rounded-full border transition-all",
              !activeSubAreaId
                ? "bg-lotus-gold text-white border-lotus-gold"
                : "bg-transparent text-lotus-gold border-gray-300 hover:border-lotus-gold"
            )}
            onClick={() => setActiveSubAreaId(null)}
          >
            All {activeParentArea.name}
          </button>
          {subAreas.map(subArea => (
            <button
              key={subArea.id}
              className={cn(
                "px-3 py-1 text-sm rounded-full border transition-all",
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
      )}

      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 relative aspect-square"
          >
            <img
              src={image.image_url}
              alt={image.alt_text}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white font-medium text-lg">{image.title}</span>
            </div>
          </div>
        ))}
      </div>
      
      {filteredImages.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No images found for this selection.</p>
        </div>
      )}
    </div>
  );
};

export default DynamicImageGallery;


import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    category?: string;
  }[];
  className?: string;
  categories?: string[];
}

const ImageGallery = ({ images, className, categories = [] }: ImageGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredImages = activeCategory
    ? images.filter(image => image.category === activeCategory)
    : images;

  return (
    <div className={cn("", className)}>
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className={cn(
              "px-4 py-2 rounded-full border transition-all",
              !activeCategory
                ? "bg-lotus-navy text-white border-lotus-navy"
                : "bg-transparent text-lotus-navy border-gray-300 hover:border-lotus-navy"
            )}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={cn(
                "px-4 py-2 rounded-full border transition-all",
                activeCategory === category
                  ? "bg-lotus-navy text-white border-lotus-navy"
                  : "bg-transparent text-lotus-navy border-gray-300 hover:border-lotus-navy"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 relative aspect-square"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white font-medium text-lg">{image.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

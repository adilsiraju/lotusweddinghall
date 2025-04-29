
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ui/responsive-image';
import { useFeaturedGalleryImages } from '@/hooks/useFeaturedGalleryImages';
import LoadingSpinner from '@/components/ui/loading-spinner';

const GallerySectionIndex = () => {
  const navigate = useNavigate();
  const { data: featuredImages, isLoading, error } = useFeaturedGalleryImages();

  const handleViewGalleryClick = () => {
    navigate('/gallery');
  };

  // Placeholder images to use when no featured images are available
  const placeholderImages = [
    '/gallery/wedding-hall-1.jpg',
    '/gallery/wedding-hall-2.jpg',
    '/gallery/wedding-hall-3.jpg',
    '/gallery/wedding-hall-4.jpg',
  ];

  // If loading, show a loading state with placeholders
  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading">Glimpses of Celebration</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Take a virtual tour of our elegant venue spaces and get inspired
              for your upcoming event.
            </p>
          </div>
          
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  // If error or no images, show placeholders
  const imagesToDisplay = (error || !featuredImages || featuredImages.length === 0) 
    ? placeholderImages.map((src, i) => ({ id: `placeholder-${i}`, image_url: src, title: 'Venue Photo', alt_text: 'Venue Image' }))
    : featuredImages;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">Glimpses of Celebration</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Take a virtual tour of our elegant venue spaces and get inspired
            for your upcoming event.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {imagesToDisplay.slice(0, 4).map((image, index) => (
            <div key={image.id} className={`overflow-hidden rounded-lg ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <ResponsiveImage
                src={image.image_url}
                alt={image.alt_text}
                aspectRatio={index === 0 ? 'aspect-[4/3]' : 'aspect-square'}
                objectFit="cover"
                animateOnView={true}
                className="w-full h-full transform hover:scale-105 transition-transform duration-500"
                onClick={handleViewGalleryClick}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            onClick={handleViewGalleryClick}
            className="btn-secondary"
          >
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySectionIndex;

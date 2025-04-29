
import React from 'react';
import Hero from '@/components/Hero';
import DynamicImageGallery from '@/components/DynamicImageGallery';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const GalleryPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GalleryContent />
    </QueryClientProvider>
  );
};

const GalleryContent = () => {
  return (
    <div className="min-h-screen">
      <Hero 
        title="Our Gallery"
        subtitle="Moments of celebration captured in our elegant venue"
        backgroundImage="/gallery-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]" // Smaller height
      />
      
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mx-auto">Explore Our Spaces</h2>
            <p className="text-gray-600">
              Browse through our collection of images showcasing our beautiful venue, past events, and the elegant experiences we create.
            </p>
          </div>
          
          <DynamicImageGallery />
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 bg-lotus-cream">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mx-auto">Event Highlights</h2>
            <p className="text-gray-600">
              Watch videos from some of our most memorable celebrations and events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;

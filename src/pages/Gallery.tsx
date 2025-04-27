
import React from 'react';
import Hero from '@/components/Hero';
import ImageGallery from '@/components/ImageGallery';

const GalleryPage = () => {
  const galleryCategories = ["Weddings", "Receptions", "Kerala Sadhya", "Decor", "Venue"];
  
  const galleryImages = [
    {
      src: "/gallery/wedding-hall.jpg",
      alt: "Grand Wedding Hall",
      category: "Venue"
    },
    {
      src: "/gallery/wedding-ceremony.jpg",
      alt: "Traditional Wedding Ceremony",
      category: "Weddings"
    },
    {
      src: "/gallery/reception.jpg",
      alt: "Elegant Reception Setup",
      category: "Receptions"
    },
    {
      src: "/gallery/sadhya.jpg",
      alt: "Traditional Kerala Sadhya",
      category: "Kerala Sadhya"
    },
    {
      src: "/gallery/table-setting.jpg",
      alt: "Luxury Table Setting",
      category: "Decor"
    },
    {
      src: "/gallery/venue-exterior.jpg",
      alt: "Venue Exterior",
      category: "Venue"
    },
    {
      src: "/gallery/venue-entrance.jpg",
      alt: "Grand Entrance",
      category: "Venue"
    },
    {
      src: "/gallery/wedding-decor.jpg",
      alt: "Wedding Decoration",
      category: "Decor"
    },
    {
      src: "/gallery/malabar-cuisine.jpg",
      alt: "Malabar Cuisine Spread",
      category: "Kerala Sadhya"
    },
    {
      src: "/gallery/reception-party.jpg",
      alt: "Reception Celebration",
      category: "Receptions"
    },
    {
      src: "/gallery/mandap.jpg",
      alt: "Traditional Wedding Mandap",
      category: "Weddings"
    },
    {
      src: "/gallery/venue-night.jpg",
      alt: "Venue at Night",
      category: "Venue"
    }
  ];

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
          
          <ImageGallery 
            images={galleryImages}
            categories={galleryCategories}
          />
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


import React from 'react';
import Hero from '@/components/Hero';
import DynamicImageGallery from '@/components/DynamicImageGallery';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AlertCircle } from 'lucide-react';
import { useGalleryVideos } from '@/hooks/useGalleryVideos';
import { VideoPlatform } from '@/utils/videoUtils';

// Interface for video data
interface VideoData {
  id: string;
  title: string;
  embed_url: string;
  platform: VideoPlatform;
  description?: string | null;
}

const GalleryPage = () => {
  // Fetch videos from the database
  const { data: eventVideos = [], isLoading: isLoadingVideos } = useGalleryVideos();

  // Function to render video based on platform
  const renderVideo = (video: VideoData) => {
    switch (video.platform) {
      case 'youtube':
        return (
          <iframe
            key={video.id}
            width="560" 
            height="315" 
            src={video.embed_url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
            loading="lazy"
          />
        );
      case 'instagram':
        return (
          <iframe
            key={video.id}
            src={video.embed_url}
            width="320"
            height="440"
            frameBorder="0"
            scrolling="no"
            allowTransparency
            className="w-full h-full rounded-lg"
            loading="lazy"
          />
        );
      case 'vimeo':
        return (
          <iframe
            key={video.id}
            src={video.embed_url}
            width="560"
            height="315"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
            loading="lazy"
          />
        );
      case 'facebook':
        return (
          <iframe
            key={video.id}
            src={video.embed_url}
            width="560"
            height="315"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="w-full h-full rounded-lg"
            loading="lazy"
          />
        );
      default:
        return (
          <div className="flex items-center justify-center bg-gray-100 rounded-lg w-full h-full p-6">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-600">Video cannot be displayed</p>
            </div>
          </div>
        );
    }
  };

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

          {isLoadingVideos ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventVideos.length > 0 ? (
                eventVideos.map(video => {
                  // Type assertion to ensure platform is the correct type
                  const typedVideo: VideoData = {
                    ...video,
                    platform: video.platform as VideoPlatform
                  };
                  
                  return (
                    <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9">
                        <AspectRatio ratio={16/9} className="bg-gray-100">
                          {renderVideo(typedVideo)}
                        </AspectRatio>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-lotus-navy">{video.title}</h3>
                        {video.description && (
                          <p className="text-gray-600 mt-1 text-sm">{video.description}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Watch on {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="max-w-md mx-auto">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-600 mb-2">No videos available at the moment.</p>
                    <p className="text-sm text-gray-500">Check back later for event highlight videos.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;

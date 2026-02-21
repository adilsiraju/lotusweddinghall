
import React from 'react';
import Hero from '@/components/Hero';
import { GallerySuspenseWrapper } from '@/components/LazyComponents';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AlertCircle } from 'lucide-react';
import { useGalleryVideos } from '@/hooks/useGalleryVideos';
import { VideoPlatform } from '@/utils/videoUtils';

// Lazy load the gallery component for better performance
const OptimizedImageGallery = React.lazy(() => import('@/components/OptimizedImageGallery'));

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
          <div className="flex items-center justify-center bg-gray-100 rounded-lg w-full h-full p-6" style={{ background: 'var(--lotus-surface)' }}>
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 mb-2" style={{ color: 'var(--lotus-muted)' }} />
              <p style={{ color: 'var(--lotus-muted)' }}>Video cannot be displayed</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ background: 'var(--lotus-void)', color: 'var(--lotus-primary-text)' }}>
      <Hero 
        title="Our Gallery"
        subtitle="Moments of celebration captured in our elegant venue"
        backgroundImage="/gallery-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]" // Smaller height
      />
      
      <section className="py-24 md:py-32" style={{ background: 'var(--lotus-deep)' }}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="section-label mb-4">Photography</p>
            <h2 className="section-heading mx-auto mb-6">Explore Our Spaces</h2>
            <p style={{ color: 'var(--lotus-muted)' }}>
              Browse through our collection of images showcasing our beautiful venue, past events, and the elegant experiences we create.
            </p>
          </div>
          
          <GallerySuspenseWrapper>
            <OptimizedImageGallery />
          </GallerySuspenseWrapper>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-24 md:py-32" style={{ background: 'var(--lotus-void)' }}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="section-label mb-4">Video</p>
            <h2 className="section-heading mx-auto mb-6">Event Highlights</h2>
            <p style={{ color: 'var(--lotus-muted)' }}>
              Watch videos from some of our most memorable celebrations and events.
            </p>
          </div>

          {isLoadingVideos ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin h-10 w-10 border-4 border-t-transparent rounded-full" style={{ borderColor: 'var(--lotus-border)', borderTopColor: 'var(--lotus-gold)' }}></div>
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
                    <div key={video.id} className="luxury-card overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9">
                        <AspectRatio ratio={16/9} style={{ background: 'var(--lotus-surface)' }}>
                          {renderVideo(typedVideo)}
                        </AspectRatio>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: 'var(--lotus-primary-text)', fontWeight: 400 }}>{video.title}</h3>
                        {video.description && (
                          <p className="mt-1 text-sm" style={{ color: 'var(--lotus-muted)' }}>{video.description}</p>
                        )}
                        <p className="text-sm mt-2" style={{ color: 'var(--lotus-muted)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                          Watch on {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-10">
                  <div className="max-w-md mx-auto">
                    <AlertCircle className="mx-auto h-12 w-12 mb-2" style={{ color: 'var(--lotus-muted)' }} />
                    <p className="mb-2" style={{ color: 'var(--lotus-muted)' }}>No videos available at the moment.</p>
                    <p className="text-sm" style={{ color: 'var(--lotus-muted)' }}>Check back later for event highlight videos.</p>
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

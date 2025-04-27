
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  showBookButton?: boolean;
  className?: string;
}

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  showBookButton = false,
  className
}: HeroProps) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999', '_blank');
  };
  
  return (
    <div 
      className={cn(
        "relative min-h-[70vh] lg:min-h-[90vh] flex items-center justify-center",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto text-center text-white z-10 px-4">
        <h1 className="font-playfair font-semibold text-4xl md:text-5xl lg:text-6xl mb-4 animate-fade-in">
          {title}
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>
        {showBookButton && (
          <Button 
            size="lg" 
            onClick={handleWhatsAppClick}
            className="bg-lotus-gold hover:bg-lotus-gold/90 text-white px-8 py-6 text-lg animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            Book Your Event
          </Button>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  );
};

export default Hero;

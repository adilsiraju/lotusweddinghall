
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  showBookButton?: boolean;
  className?: string;
  height?: string; // Custom height
  overlayOpacity?: string; // Custom overlay opacity
}

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  showBookButton = false,
  className,
  height = 'min-h-[70vh] lg:min-h-[90vh]', // Default height
  overlayOpacity = 'rgba(0, 0, 0, 0.5)' // Default overlay opacity
}: HeroProps) => {  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999?text=Hello%20Lotus%20Wedding%20Hall%2C%20I%27m%20interested%20in%20booking%20your%20venue%20for%20an%20upcoming%20event.%20Could%20you%20please%20provide%20information%20about%20availability%20and%20packages%3F', '_blank');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        height,
        className
      )}
    >      {/* Background image with optimized loading */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform scale-[1.02] transition-transform duration-[15s] hover:scale-[1.07]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <img 
          src={backgroundImage} 
          alt="" 
          className="hidden" 
          fetchPriority="high"
          onLoad={(e) => {
            // Once image is loaded, update the parent div's background
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.backgroundImage = `url(${backgroundImage})`;
            }
          }}
        />
      </div>
        
      {/* Overlay gradient for better readability */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(to bottom, ${overlayOpacity}, ${overlayOpacity})`
        }}
      />

      {/* Content */}
      <motion.div 
        className="container mx-auto text-center text-white z-10 px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="font-playfair font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-90"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
        
        {showBookButton && (
          <motion.div variants={itemVariants}>
            <Button 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="bg-lotus-gold hover:bg-lotus-gold/90 text-white px-6 py-6 text-lg font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:translate-y-[-3px]"
            >
              Book Your Event
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
      
      {/* Scroll indicator */}
      {height.includes('90vh') && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-sm mb-2 text-white/80">Scroll</span>
          <motion.div
            className="w-[1.5px] h-8 bg-white/50"
            initial={{ height: 0 }}
            animate={{ height: 32 }}
            transition={{ 
              delay: 1.8, 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Hero;

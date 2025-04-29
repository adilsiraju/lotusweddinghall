
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  fill?: boolean;
  placeholder?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onClick?: () => void;
  animateOnHover?: boolean;
  animateOnView?: boolean;
}

const ResponsiveImage = ({
  src,
  alt,
  className,
  aspectRatio = 'aspect-auto',
  width,
  height,
  sizes = '100vw',
  priority = false,
  loading = 'lazy',
  fill = false,
  placeholder,
  objectFit = 'cover',
  objectPosition = 'center',
  onClick,
  animateOnHover = false,
  animateOnView = false,
  ...props
}: ResponsiveImageProps & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  return (
    <div 
      className={cn(
        'overflow-hidden relative',
        aspectRatio,
        className
      )}
      onClick={onClick}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {placeholder && !isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg scale-110 opacity-60 transition-opacity"
          style={{
            backgroundImage: `url(${placeholder})`,
          }}
        />
      )}
      
      <motion.img 
        src={src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full transition-opacity',
          fill ? 'absolute inset-0' : '',
          isLoaded ? 'opacity-100' : 'opacity-0',
          onClick ? 'cursor-pointer' : '',
        )}
        style={{
          objectFit,
          objectPosition,
        }}
        whileHover={animateOnHover ? { scale: 1.05 } : undefined}
        initial={animateOnView ? { opacity: 0, scale: 0.95 } : undefined}
        whileInView={animateOnView ? { opacity: 1, scale: 1 } : undefined}
        viewport={animateOnView ? { once: true, margin: "-100px" } : undefined}
        transition={{ duration: 0.5 }}
        {...props}
      />
    </div>
  );
};

export default ResponsiveImage;

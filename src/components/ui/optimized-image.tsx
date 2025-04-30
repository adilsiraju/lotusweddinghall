import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  width?: number | string;
  height?: number | string;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  placeholderColor = '#f3f4f6', // Default light gray
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Use IntersectionObserver to detect when the image is visible
  useEffect(() => {
    // Preload the image when component mounts or src changes
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholderColor,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
      }}
    >
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
        decoding="async"
        {...props}
      />
    </div>
  );
}

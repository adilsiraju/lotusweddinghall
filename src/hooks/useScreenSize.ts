
import { useState, useEffect } from 'react';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ScreenSizes {
  xs: boolean; // < 640px
  sm: boolean; // >= 640px
  md: boolean; // >= 768px
  lg: boolean; // >= 1024px
  xl: boolean; // >= 1280px
  '2xl': boolean; // >= 1536px
  current: ScreenSize;
}

const useScreenSize = (): ScreenSizes => {
  const [screenSize, setScreenSize] = useState<ScreenSizes>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
    current: 'lg'
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newScreenSize: ScreenSizes = {
        xs: width < 640,
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        '2xl': width >= 1536,
        current: 'lg'
      };
      
      if (width < 640) {
        newScreenSize.current = 'xs';
      } else if (width < 768) {
        newScreenSize.current = 'sm';
      } else if (width < 1024) {
        newScreenSize.current = 'md';
      } else if (width < 1280) {
        newScreenSize.current = 'lg';
      } else if (width < 1536) {
        newScreenSize.current = 'xl';
      } else {
        newScreenSize.current = '2xl';
      }

      setScreenSize(newScreenSize);
    };

    // Initial check
    checkScreenSize();

    // Event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenSize;
};

export default useScreenSize;

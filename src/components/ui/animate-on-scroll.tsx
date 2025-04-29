
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimateOnScrollProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-right' | 'slide-left' | 'zoom' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const animationVariants = {
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  'zoom': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  'none': {
    hidden: {},
    visible: {}
  }
};

const AnimateOnScroll = ({ 
  children, 
  animation = 'fade', 
  delay = 0, 
  duration = 0.6, 
  threshold = 0.1,
  once = true,
  ...props 
}: AnimateOnScrollProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: `-${threshold * 100}px` }}
      variants={animationVariants[animation]}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;


import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, className, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut", 
        delay: delay 
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className={cn(
        "bg-white p-6 sm:p-8 rounded-lg shadow-md transition-all duration-300",
        className
      )}
    >
      <div className="text-lotus-gold mb-4 transform transition-transform duration-300 group-hover:scale-110">
        {React.cloneElement(icon as React.ReactElement, { 
          className: cn('w-10 h-10', (icon as React.ReactElement).props.className)
        })}
      </div>
      <h3 className="font-playfair text-xl sm:text-2xl font-medium mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;

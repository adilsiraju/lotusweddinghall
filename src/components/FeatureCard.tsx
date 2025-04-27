
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]",
      className
    )}>
      <div className="text-lotus-gold mb-4">
        {icon}
      </div>
      <h3 className="font-playfair text-2xl font-medium mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;

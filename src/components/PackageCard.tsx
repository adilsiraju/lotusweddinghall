
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PackageProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  popular?: boolean;
  image?: string;
  className?: string;
}

const PackageCard = ({ 
  title, 
  description, 
  features, 
  price, 
  popular = false,
  image,
  className
}: PackageProps) => {
  return (
    <div className={cn(
      "overflow-hidden rounded-2xl transition-all duration-300 group relative",
      popular ? "shadow-xl" : "shadow-lg",
      className
    )}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          {popular && (
            <div className="absolute top-4 right-4 bg-lotus-gold text-white text-sm font-medium px-3 py-1 rounded-full">
              Most Popular
            </div>
          )}
        </div>
      )}
      
      <div className={cn(
        "p-6",
        image ? "bg-white" : popular ? "bg-lotus-navy text-white" : "bg-white"
      )}>
        <h3 className="font-playfair text-2xl font-medium mb-2">{title}</h3>
        <p className={cn(
          "mb-4",
          image ? "text-gray-600" : popular && !image ? "text-gray-200" : "text-gray-600"
        )}>{description}</p>
        
        <div className="mb-6">
          <span className="font-playfair text-3xl font-semibold">
            {price}
          </span>
        </div>
        
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className={cn(
                "h-5 w-5 mr-2 mt-1",
                popular && !image ? "text-lotus-gold" : "text-lotus-navy"
              )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className={cn(
                image ? "text-gray-700" : popular && !image ? "text-gray-100" : "text-gray-700"
              )}>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={cn(
            "w-full font-medium",
            popular 
              ? "bg-lotus-gold hover:bg-lotus-gold/90 text-white" 
              : "bg-lotus-navy hover:bg-lotus-navy/90 text-white"
          )}
        >
          Book This Package
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;

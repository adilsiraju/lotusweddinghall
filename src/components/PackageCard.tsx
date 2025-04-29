
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package } from '@/types/database';

interface PackageCardProps {
  package: Package;
  showDetails?: boolean;
  onClick?: () => void;
}

const PackageCard = ({ package: pkg, showDetails = false, onClick }: PackageCardProps) => {
  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Generate pre-written message with package details
    const message = `Hello! I'm interested in booking the "${pkg.title}" package at Lotus Wedding & Banquet Hall. Can you provide more information about availability and options? Thank you.`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/919207102999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative cursor-pointer ${pkg.popular ? 'border-lotus-gold' : ''}`}
      onClick={onClick}
    >
      {pkg.popular && (
        <div className="bg-lotus-gold text-white text-xs px-3 py-1 absolute top-0 right-0">
          POPULAR
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl sm:text-2xl font-playfair font-medium mb-2">{pkg.title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-2xl font-semibold">₹{pkg.price}</span>
          <span className="text-gray-500 ml-1">/plate</span>
        </div>
        
        {showDetails ? (
          <p className="text-gray-600 mb-4">{pkg.description}</p>
        ) : (
          <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
        )}
        
        {pkg.note && showDetails && (
          <div className="bg-gray-50 p-3 rounded-md text-sm mb-4">
            <p className="text-gray-600">{pkg.note}</p>
          </div>
        )}
        
        <Button 
          className="btn-primary w-full"
          onClick={handleBookNowClick}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default PackageCard;

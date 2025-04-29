import React from 'react';
import Hero from '@/components/Hero';
import DynamicMenuPackageCard from '@/components/DynamicMenuPackageCard';
import { Button } from '@/components/ui/button';
import { usePackages } from '@/hooks/usePackages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const PackagesPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PackagesContent />
    </QueryClientProvider>
  );
};

const PackagesContent = () => {
  const { data: packages = [], isLoading } = usePackages();
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lotus-cream/30">
      <Hero 
        title="Celebration Packages"
        subtitle="Choose from our curated collection of wedding and event packages"
        backgroundImage="/packages-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="section-heading mx-auto">Menu Packages</h2>
            <p className="text-gray-600 text-lg mt-4">
              Experience the finest Kerala cuisine with our specially curated menu packages
            </p>
          </div>

          <section className="py-16 bg-lotus-navy text-white mb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-playfair font-medium text-center mb-6">
                  Pricing Information
                </h3>
                <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-lotus-gold mr-2">•</span>
                      <span>Prices shown are per head based on 1000 guests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lotus-gold mr-2">•</span>
                      <span>Per head price decreases as guest count increases</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lotus-gold mr-2">•</span>
                      <span>All menus are completely customizable to your preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {packages.map(pkg => (
                  <DynamicMenuPackageCard key={pkg.id} packageData={pkg} />
                ))}
                {packages.length === 0 && (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No packages available at the moment. Please check back later.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-lotus-navy text-white mt-16 rounded-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-playfair font-medium text-center mb-10">
              Important Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <h4 className="text-xl font-medium text-lotus-gold mb-4">Package Inclusions</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    <span>Venue & facilities with complete setup</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    <span>Professional catering services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    <span>Basic décor package</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    <span>Beverages and security services</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <h4 className="text-xl font-medium text-lotus-gold mb-4">Additional Notes</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    <span>Pricing varies based on final guest count</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    <span>Menu customization available on request</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    <span>Special inclusions for Sadhya packages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-lotus-navy to-lotus-navy/95 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">
            Need a Custom Package?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            We understand that every celebration is unique. Contact us to create a personalized package tailored to your specific requirements.
          </p>
          <Button 
            onClick={handleWhatsAppClick}
            className="bg-lotus-gold hover:bg-lotus-gold/90 text-white px-8 py-6 text-lg"
          >
            Contact Us on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;

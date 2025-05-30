
import React from 'react';
import Hero from '@/components/Hero';
import DynamicMenuPackageCard from '@/components/DynamicMenuPackageCard';
import { Button } from '@/components/ui/button';
import { usePackages } from '@/hooks/usePackages';

const PackagesPage = () => {
  const { data: packages = [], isLoading } = usePackages();
  
  const handleCallClick = () => {
    window.location.href = 'tel:+919207102999';
  };

  // Function to categorize packages
  const categorizePackages = (packages: any[]) => {
    const lunchPackages: any[] = [];
    const dinnerPackages: any[] = [];
    
    packages.forEach(pkg => {
      const title = pkg.title.toLowerCase();
      const description = pkg.description.toLowerCase();
      
      // Check if package is specifically for lunch
      if (title.includes('lunch') || description.includes('lunch')) {
        lunchPackages.push(pkg);
      }
      // Check if package is specifically for dinner
      else if (title.includes('dinner') || description.includes('dinner')) {
        dinnerPackages.push(pkg);
      }
      // For packages that could apply to both or are general, add to both sections
      else {
        lunchPackages.push(pkg);
        dinnerPackages.push(pkg);
      }
    });
    
    return { lunchPackages, dinnerPackages };
  };

  const { lunchPackages, dinnerPackages } = categorizePackages(packages);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lotus-cream/30">
      <Hero 
        title="Celebration Packages"
        subtitle="Choose from our curated collection of wedding and event packages"
        backgroundImage="/packages-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]"
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          {/* Lunch Packages Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="section-heading mx-auto">Lunch Packages</h2>
                <p className="text-gray-600 text-lg mt-4">
                  Perfect for daytime celebrations and intimate gatherings featuring authentic Kerala flavors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {lunchPackages.map(pkg => (
                  <div key={`lunch-${pkg.id}`} className="flex">
                    <DynamicMenuPackageCard packageData={pkg} hidePricing={true} />
                  </div>
                ))}
                {lunchPackages.length === 0 && (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No lunch packages available at the moment. Please check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Dinner Packages Section */}
          <section className="py-16 bg-lotus-cream/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="section-heading mx-auto">Dinner Packages</h2>
                <p className="text-gray-600 text-lg mt-4">
                  Elegant evening dining experiences with elaborate spreads for grand celebrations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {dinnerPackages.map(pkg => (
                  <div key={`dinner-${pkg.id}`} className="flex">
                    <DynamicMenuPackageCard packageData={pkg} hidePricing={true} />
                  </div>
                ))}
                {dinnerPackages.length === 0 && (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No dinner packages available at the moment. Please check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

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
                    <span>Custom pricing based on final guest count</span>
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
            We understand that every celebration is unique. Contact us to create a personalized package tailored to your specific requirements and get detailed pricing information.
          </p>
          <Button 
            onClick={handleCallClick}
            className="bg-lotus-gold hover:bg-lotus-gold/90 text-white px-8 py-6 text-lg"
          >
            Call Us Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;

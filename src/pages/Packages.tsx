import React from 'react';
import Hero from '@/components/Hero';
import DynamicMenuPackageCard from '@/components/DynamicMenuPackageCard';
import { usePackages } from '@/hooks/usePackages';

const PackagesPage = () => {
  const { data: packages = [], isLoading } = usePackages();
  
  const handleCallClick = () => {
    window.location.href = 'tel:+919207102999';
  };

  // Function to categorize packages based on meal_type
  const categorizePackages = (packages: any[]) => {
    const lunchPackages: any[] = [];
    const dinnerPackages: any[] = [];
    
    packages.forEach(pkg => {
      // Check the meal_type field from the database
      if (pkg.meal_type === 'lunch' || pkg.meal_type === 'both') {
        lunchPackages.push(pkg);
      }
      if (pkg.meal_type === 'dinner' || pkg.meal_type === 'both') {
        dinnerPackages.push(pkg);
      }
    });
    
    return { lunchPackages, dinnerPackages };
  };

  const { lunchPackages, dinnerPackages } = categorizePackages(packages);

  return (
    <div style={{ background: 'var(--lotus-void)', color: 'var(--lotus-primary-text)' }}>
      <Hero 
        title="Celebration Packages"
        subtitle="Choose from our curated collection of wedding and event packages"
        backgroundImage="/packages-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]"
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-t-transparent rounded-full" style={{ borderColor: 'var(--lotus-border)', borderTopColor: 'var(--lotus-gold)' }}></div>
        </div>
      ) : (
        <>
          {/* Lunch Packages Section */}
          <section className="py-20" style={{ background: 'var(--lotus-deep)' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="section-label mb-4">Midday Dining</p>
                <h2 className="section-heading mx-auto mb-4">Lunch Packages</h2>
                <p className="text-lg mt-4" style={{ color: 'var(--lotus-muted)' }}>
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
                    <p style={{ color: 'var(--lotus-muted)' }}>No lunch packages available at the moment. Please check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Dinner Packages Section */}
          <section className="py-20" style={{ background: 'var(--lotus-void)' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <p className="section-label mb-4">Evening Dining</p>
                <h2 className="section-heading mx-auto mb-4">Dinner Packages</h2>
                <p className="text-lg mt-4" style={{ color: 'var(--lotus-muted)' }}>
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
                    <p style={{ color: 'var(--lotus-muted)' }}>No dinner packages available at the moment. Please check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="py-20 mt-8" style={{ background: 'var(--lotus-surface)', borderTop: '1px solid var(--lotus-border)', borderBottom: '1px solid var(--lotus-border)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center mb-10" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, color: 'var(--lotus-primary-text)' }}>
              Important Information
            </h3>
              <div className="grid md:grid-cols-2 gap-8">
              <div className="luxury-card p-6">
                <h4 className="text-xl font-medium mb-4" style={{ color: 'var(--lotus-gold)', fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 400 }}>Package Inclusions</h4>
                <ul className="space-y-3" style={{ color: 'var(--lotus-secondary-text)', fontSize: '0.9rem' }}>
                  <li className="flex items-start"><span className="mr-2" style={{ color: 'var(--lotus-gold)' }}>+</span><span>Venue &amp; facilities with complete setup</span></li>
                  <li className="flex items-start"><span className="mr-2" style={{ color: 'var(--lotus-gold)' }}>+</span><span>Professional catering services</span></li>
                  <li className="flex items-start"><span className="mr-2" style={{ color: 'var(--lotus-gold)' }}>+</span><span>Basic decor package</span></li>
                  <li className="flex items-start"><span className="mr-2" style={{ color: 'var(--lotus-gold)' }}>+</span><span>Beverages and security services</span></li>
                </ul>
              </div>
              <div className="luxury-card p-6">
                <h4 className="text-xl font-medium mb-4" style={{ color: 'var(--lotus-gold)', fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 400 }}>Additional Notes</h4>
                <ul className="space-y-3" style={{ color: 'var(--lotus-secondary-text)', fontSize: '0.9rem' }}>
                  <li className="flex items-start"><span className="mr-2" style={{ color: 'var(--lotus-gold)' }}>+</span><span>Custom pricing based on final guest count</span></li>
                  <li className="flex items-start"><span className="mr-2" style={{ color: 'var(--lotus-gold)' }}>+</span><span>Menu customization available on request</span></li>
                  <li className="flex items-start"><span className="mr-2" style={{ color: 'var(--lotus-gold)' }}>+</span><span>Special inclusions for Sadhya packages</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'var(--lotus-deep)', borderTop: '1px solid var(--lotus-border)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-4">Bespoke Events</p>
          <h2 className="section-heading mx-auto mb-6">
            Need a Custom Package?
          </h2>
          <p className="lead-text mb-8 max-w-2xl mx-auto">
            We understand that every celebration is unique. Contact us to create a personalized package tailored to your specific requirements and get detailed pricing information.
          </p>
          <button onClick={handleCallClick} className="btn-primary">
            Call Us Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;

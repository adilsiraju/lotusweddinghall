import React from 'react';
import Hero from '@/components/Hero';
import PackageCard from '@/components/PackageCard';
import { Button } from '@/components/ui/button';

const PackagesPage = () => {
  return (
    <div className="min-h-screen">
      <Hero 
        title="Celebration Packages"
        subtitle="Choose from our curated collection of wedding and event packages"
        backgroundImage="/packages-hero.jpg"
      />

      {/* Wedding Packages */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mx-auto">Wedding Packages</h2>
            <p className="text-gray-600">
              From intimate ceremonies to grand celebrations, our wedding packages are designed to create unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PackageCard
              title="Classic Elegance"
              description="A perfect package for intimate wedding ceremonies"
              price="₹1,50,000"
              image="/packages/classic.jpg"
              features={[
                "Venue space for up to 100 guests",
                "Basic decor package",
                "Sound system for ceremony",
                "3-hour event duration",
                "Traditional welcome drinks"
              ]}
            />
            
            <PackageCard
              title="Royal Celebration"
              description="Our most popular comprehensive wedding package"
              price="₹3,50,000"
              popular={true}
              image="/packages/royal.jpg"
              features={[
                "Venue space for up to 300 guests",
                "Premium decor with floral arrangements",
                "Professional sound and lighting",
                "6-hour event duration",
                "Welcome drinks and appetizers",
                "Traditional Kerala Sadhya for all guests"
              ]}
            />
            
            <PackageCard
              title="Grand Luxury"
              description="The ultimate wedding experience with premium amenities"
              price="₹5,50,000"
              image="/packages/grand.jpg"
              features={[
                "Venue space for up to 500 guests",
                "Luxury decor with customized theme",
                "Professional sound, lighting, and effects",
                "Full-day event access",
                "Welcome drinks and premium appetizers",
                "Exclusive menu customization",
                "Photography and videography services",
                "Bridal suite access"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Cuisine Options */}
      <section className="py-20 bg-lotus-cream">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Traditional Kerala Sadhya</h2>
              <p className="text-gray-600 mb-6">
                Experience the authentic flavors of Kerala with our traditional Sadhya – a feast served on banana leaves featuring a variety of vegetarian dishes, pickles, pappadam, and desserts.
              </p>
              <p className="text-gray-600 mb-6">
                Our expert chefs prepare each dish with traditional recipes and the freshest ingredients, ensuring an unforgettable culinary experience for your guests.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Over 20 traditional dishes</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Served on authentic banana leaves</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Made with fresh, local ingredients</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customizable based on preferences</span>
                </li>
              </ul>
              <Button className="btn-primary">
                View Sadhya Menu
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/cuisine/sadhya.jpg" 
                alt="Traditional Kerala Sadhya" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <img 
                src="/cuisine/malabar.jpg" 
                alt="Malabar Cuisine" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="section-heading">Malabar Cuisine</h2>
              <p className="text-gray-600 mb-6">
                Delight your guests with the rich and aromatic flavors of authentic Malabar cuisine, featuring a variety of non-vegetarian and vegetarian specialties from the northern Kerala region.
              </p>
              <p className="text-gray-600 mb-6">
                Our Malabar menu showcases the unique blend of Arab, Portuguese, and indigenous flavors that define this celebrated culinary tradition.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Authentic Malabar Biryani varieties</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Traditional seafood specialties</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Variety of artisanal breads</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-lotus-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Prepared by specialized Malabar chefs</span>
                </li>
              </ul>
              <Button className="btn-primary">
                View Malabar Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other Event Packages */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mx-auto">Corporate & Special Events</h2>
            <p className="text-gray-600">
              Perfect for business meetings, conferences, birthdays, and other special occasions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PackageCard
              title="Corporate Meeting"
              description="Professional setup for business meetings and conferences"
              price="₹75,000"
              features={[
                "Venue space for up to 50 guests",
                "Audio-visual equipment",
                "Wi-Fi connectivity",
                "Coffee breaks and lunch",
                "Stationery and amenities"
              ]}
            />
            
            <PackageCard
              title="Birthday Celebration"
              description="Make your birthday special with our celebratory package"
              price="₹1,00,000"
              features={[
                "Venue space for up to 100 guests",
                "Basic decor with birthday theme",
                "Sound system for music",
                "4-hour event duration",
                "Cake cutting ceremony setup",
                "Catering service options"
              ]}
            />
            
            <PackageCard
              title="Anniversary Special"
              description="Celebrate your milestone anniversary in elegance"
              price="₹1,25,000"
              features={[
                "Intimate venue space for up to 75 guests",
                "Romantic decor with flowers",
                "Ambient lighting and sound",
                "4-hour event duration",
                "Special couple seating arrangement",
                "Anniversary cake & champagne toast"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Custom Packages */}
      <section className="py-20 bg-lotus-navy text-white">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">Need a Custom Package?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            We understand that every celebration is unique. Contact us to create a personalized package tailored to your specific requirements.
          </p>
          <Button className="bg-lotus-gold hover:bg-lotus-gold/90 text-white px-8 py-6 text-lg">
            Request Custom Quote
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;

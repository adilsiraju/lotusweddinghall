
import React from 'react';
import Hero from '@/components/Hero';
import PackageCard from '@/components/PackageCard';
import MenuPackageCard from '@/components/MenuPackageCard';
import { Button } from '@/components/ui/button';

const PackagesPage = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999', '_blank');
  };

  return (
    <div className="min-h-screen">
      <Hero 
        title="Celebration Packages"
        subtitle="Choose from our curated collection of wedding and event packages"
        backgroundImage="/packages-hero.jpg"
      />

      {/* Package Categories */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mx-auto">Menu Packages</h2>
            <p className="text-gray-600">
              Experience the finest Kerala cuisine with our specially curated menu packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MenuPackageCard
              title="Traditional Sadhya"
              price="430"
              menu={[
                {
                  category: "Starters",
                  items: ["Lemon Juice (Welcome Drink)"]
                },
                {
                  category: "Main Course",
                  items: [
                    "Rice", "Sambar", "Aviyal", "Kootu Curry", "Thoran", "Olan",
                    "Pachadi", "Kalan", "Kichadi", "Puliyinji", "Pickle", "Papadam",
                    "Neyy (Ghee)", "Rasam", "Moru", "Upperi (Banana Chips)",
                    "Sharkara Upperi (Jaggery Chips)", "Banana"
                  ]
                },
                {
                  category: "Desserts",
                  items: ["Parippu Pradhaman", "Palada Pradhaman"]
                },
                {
                  category: "Complimentary",
                  items: [
                    "Puja, Pujari, Nadaswaram, Thallam",
                    "Security & Marriage Certificate Processing"
                  ]
                }
              ]}
            />

            <MenuPackageCard
              title="Silver Package"
              price="495"
              menu={[
                {
                  category: "Starters",
                  items: [
                    "Alsa (Served in Dining)",
                    "Salad, Curd Salad, Pickle, Coconut Chutney"
                  ]
                },
                {
                  category: "Main Course",
                  items: [
                    "Beef Biryani",
                    "Chicken Mandi",
                    "Chicken Fry",
                    "Breads (2 varieties) & Veg/Non-Veg Curries"
                  ]
                },
                {
                  category: "Drinks",
                  items: [
                    "Fresh Juices (2 Seasonal Fruits)",
                    "Water Juice",
                    "Coffee",
                    "Hot Water",
                    "Black Tea"
                  ]
                },
                {
                  category: "Dessert",
                  items: ["Choice of: Mysore Pak / Jalebi / Halwa (Carrot, Beetroot, or Ash Gourd)"]
                }
              ]}
              note="Available for both Lunch and Dinner"
            />

            <MenuPackageCard
              title="Gold Package"
              price="575"
              menu={[
                {
                  category: "Starters",
                  items: [
                    "Alsa (Served in Dining)",
                    "Salad, Curd Salad, Pickle, Coconut Chutney"
                  ]
                },
                {
                  category: "Main Course",
                  items: [
                    "Mutton Biryani",
                    "Chicken Mandi",
                    "Chicken Fry",
                    "Breads (2 varieties) & Veg/Non-Veg Curries"
                  ]
                },
                {
                  category: "Drinks",
                  items: [
                    "Fresh Juices (2 Seasonal Fruits)",
                    "Water Juice",
                    "Coffee",
                    "Bottled Water",
                    "Lemon Tea"
                  ]
                },
                {
                  category: "Dessert",
                  items: ["Choice of: Mysore Pak / Jalebi / Halwa"]
                }
              ]}
              note="Available for both Lunch and Dinner"
            />

            <MenuPackageCard
              title="Platinum Package"
              price="652"
              menu={[
                {
                  category: "Starters",
                  items: [
                    "Alsa (Served in Dining)",
                    "Chicken Lollipop / Fish Fingers / Cutlet",
                    "Salad, Curd Salad, Pickle, Coconut Chutney"
                  ]
                },
                {
                  category: "Main Course",
                  items: [
                    "Mutton Biryani",
                    "Chicken Alfaham Mandi",
                    "Chicken Fry",
                    "Mini Sadhya with Fish Curry",
                    "Porotta & Neypathil Breads",
                    "Veg and Non-Veg Curries"
                  ]
                },
                {
                  category: "Drinks",
                  items: [
                    "Fresh Juices (2 Seasonal Fruits)",
                    "Water Juice",
                    "Coffee",
                    "Bottled Water",
                    "Herbal Tea Counter"
                  ]
                },
                {
                  category: "Desserts",
                  items: ["Chocolate Fountain", "Cake Set"]
                }
              ]}
              note="Available for both Lunch and Dinner with slight variations"
            />
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="py-12 bg-lotus-cream">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-playfair font-medium text-center mb-6">Important Notes</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-lotus-gold mr-2">•</span>
                <span>All packages include: Venue, Catering, Décor, and Amenities</span>
              </li>
              <li className="flex items-start">
                <span className="text-lotus-gold mr-2">•</span>
                <span>Guest Count: The number of guests is variable — prices are calculated based on your final guest count</span>
              </li>
              <li className="flex items-start">
                <span className="text-lotus-gold mr-2">•</span>
                <span>Menu Customization: Menus are customizable; final pricing will be tailored accordingly</span>
              </li>
              <li className="flex items-start">
                <span className="text-lotus-gold mr-2">•</span>
                <span>Facilities: Luxurious air-conditioned hall, live kitchen, and photo booth included</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-20 bg-lotus-navy text-white">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">Need a Custom Package?</h2>
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

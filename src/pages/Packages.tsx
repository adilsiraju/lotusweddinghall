import React from 'react';
import Hero from '@/components/Hero';
import MenuPackageCard from '@/components/MenuPackageCard';
import { InfoCard } from '@/components/InfoCard';
import { Button } from '@/components/ui/button';

const PackagesPage = () => {
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

      {/* Package Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="section-heading mx-auto">Menu Packages</h2>
            <p className="text-gray-600 text-lg mt-4">
              Experience the finest Kerala cuisine with our specially curated menu packages
            </p>
          </div>

          {/* Pricing Information */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="bg-lotus-navy/5 rounded-lg p-6">
              <h3 className="text-xl font-medium text-lotus-navy mb-4">Pricing Information</h3>
              <p className="text-gray-600 mb-2">• Prices shown are per head based on 1000 guests</p>
              <p className="text-gray-600 mb-2">• Per head price decreases as guest count increases</p>
              <p className="text-gray-600">• All menus are completely customizable to your preferences</p>
            </div>
          </div>

          {/* Featured Packages Row */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                    category: "Special Complimentary Services",
                    items: [
                      "Religious Rituals (Puja, Pujari)",
                      "Nadaswaram",
                      "Thallam"
                    ]
                  }
                ]}
                specialNote="Includes all standard package inclusions plus special religious ceremony services"
              />
              <MenuPackageCard
                title="Reception Package 1"
                price="510"
                menu={[
                  {
                    category: "Starters",
                    items: [
                      "Chicken Macaroni & Raw Mango Salad (Served in Dining)",
                      "Salad, Curd Salad, Pickle, Coconut Chutney"
                    ]
                  },
                  {
                    category: "Main Course",
                    items: [
                      "Ghee Rice + Fried Rice",
                      "Breads (2 varieties)",
                      "Chicken Curry & Veg Curry",
                      "Chilli Chicken",
                      "Chicken Fry"
                    ]
                  },
                  {
                    category: "Drinks",
                    items: [
                      "Fresh Juices (2 Seasonal Fruits)",
                      "Water Juice (1)",
                      "Coffee",
                      "Hot Water",
                      "Black Tea"
                    ]
                  },
                  {
                    category: "Dessert",
                    items: ["Choice of: Mysore Pak / Jalebi / Halwa"]
                  }
                ]}
              />
              <MenuPackageCard
                title="Reception Package 2"
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
                      "Mutton Biryani",
                      "Chicken Mandi",
                      "Chicken Fry",
                      "Mini Sadhya with Fish Curry"
                    ]
                  },
                  {
                    category: "Drinks",
                    items: [
                      "Fresh Juices (2 Seasonal Fruits)",
                      "Water Juice (1)",
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
              />
            </div>
          </div>

          {/* Visual Separator */}
          <div className="w-full max-w-4xl mx-auto mb-16">
            <div className="h-px bg-gradient-to-r from-transparent via-lotus-navy/20 to-transparent" />
          </div>

          {/* Other Packages - Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <span>Complimentary Welcome Board & Certificate Processing</span>
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

      {/* Custom Package CTA */}
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

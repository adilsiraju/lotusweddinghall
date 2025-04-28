import React from 'react';
import Hero from '@/components/Hero';
import MenuPackageCard from '@/components/MenuPackageCard';
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

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">          <div className="max-w-3xl mx-auto text-center mb-8">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            <MenuPackageCard
              title="Traditional Sadhya"
              description="Traditional Kerala feast with complete religious ceremony services"
              price="430"
              menu={[
                {
                  category: "Welcome Drink",
                  items: ["Lemon Juice"]
                },
                {
                  category: "Main Course",
                  items: [
                    {
                      heading: "Rice",
                      items: ["Rice"]
                    },
                    {
                      heading: "Traditional Curries",
                      items: [
                        "Sambar",
                        "Aviyal",
                        "Kootu Curry",
                        "Olan",
                        "Pachadi",
                        "Kalan",
                        "Kichadi",
                        "Puli Inji"
                      ]
                    },
                    {
                      heading: "Accompaniments",
                      items: [
                        "Thoran",
                        "Pickle",
                        "Salt",
                        "Papadam",
                        "Neyy (Ghee)",
                        "Rasam",
                        "Moru"
                      ]
                    },
                    {
                      heading: "Snacks",
                      items: [
                        "Nendra Chips",
                        "Sharkara Upperi (Jaggery Banana Chips)",
                        "Banana"
                      ]
                    }
                  ]
                },
                {
                  category: "Desserts",
                  items: ["Parippu Pradhaman", "Palada Pradhaman"]
                },
                {
                  category: "Refreshments",
                  items: ["Hot Water"]
                },
                {
                  category: "Complimentary Services",
                  items: [
                    "Puja setup",
                    "Pujari",
                    "Nadaswaram",
                    "Thallam",
                    "Welcome Board",
                    "Marriage Certificate Processing"
                  ]
                }
              ]}
            />

            <MenuPackageCard
              title="Silver Package"
              description="Classic wedding feast with a perfect blend of traditional and modern cuisine"
              price="495"
              menu={[
                {
                  category: "Welcome Drinks",
                  items: [
                    "Fresh Juice (2 Seasonal Fruits)",
                    "Water Juice (1)",
                    "Coffee"
                  ]
                },
                {
                  category: "Starters",
                  items: ["Alsa (served at dining)"]
                },
                {
                  category: "Main Course",
                  items: [
                    {
                      heading: "Rice & Biryani",
                      items: [
                        "Beef Biryani",
                        "Chicken Mandi"
                      ]
                    },
                    {
                      heading: "Fry Items",
                      items: ["Chicken Fry"]
                    },
                    {
                      heading: "Mini Sadhya with fish curry",
                      items: ["Traditional Kerala Sadhya Items with fish curry"]
                    },
                    {
                      heading: "Accompaniments",
                      items: [
                        "Salad",
                        "Curd Salad",
                        "Pickle",
                      ]
                    }
                  ]
                },
                {
                  category: "Dessert",
                  items: ["Choice of: Mysore Pak / Jalebi / Halwa (Carrot, Beetroot, or Ash Gourd)"]
                },
                {
                  category: "Refreshments",
                  items: ["Hot Water", "Black Tea"]
                },
                {
                  category: "Complimentary Services",
                  items: [
                    "Welcome Board",
                    "Marriage Certificate Processing"
                  ]
                }
              ]}
            />

            <MenuPackageCard
              title="Gold Package"
              description="Premium dining experience with enhanced menu selections"
              price="575"
              menu={[
                {
                  category: "Welcome Drinks",
                  items: [
                    "Fresh Juice (2 Seasonal Fruits)",
                    "Water Juice (1)",
                    "Coffee"
                  ]
                },
                {
                  category: "Starters",
                  items: ["Alsa (served at dining)"]
                },
                {
                  category: "Main Course",
                  items: [
                    {
                      heading: "Rice & Biryani",
                      items: [
                        "Mutton Biryani",
                        "Chicken Mandi"
                      ]
                    },
                    {
                      heading: "Breads",
                      items: ["2 Breads"]
                    },
                    {
                      heading: "Curry Dishes",
                      items: ["2 Curries (Veg & Non-Veg)"]
                    },
                    {
                      heading: "Fry Items",
                      items: [
                        "Chicken Fry",
                      ]
                    },
                    {
                      heading: "Accompaniments",
                      items: [
                        "Salad",
                        "Curd Salad",
                        "Pickle",
                        "Coconut Chutney"
                      ]
                    }
                  ]
                },
                {
                  category: "Dessert",
                  items: ["Choice of: Mysore Pak / Jalebi / Halwa"]
                },
                {
                  category: "Refreshments",
                  items: ["Botteled Water", "Hot Water", "Black Tea"]
                },
                {
                  category: "Complimentary Services",
                  items: [
                    "Welcome Board",
                    "Marriage Certificate Processing"
                  ]
                }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <MenuPackageCard
              title="Reception Package 1"
              description="Perfect blend of continental and Kerala cuisine for reception celebrations"
              price="510"
              menu={[
                {
                  category: "Welcome Drinks",
                  items: [
                    "Fresh Juice (2 Seasonal Fruits)",
                    "Water Juice (1)",
                    "Coffee"
                  ]
                },
                {
                  category: "Starters",
                  items: ["Chicken Macaroni & Raw Mango Salad (served at dining)"]
                },
                {
                  category: "Main Course",
                  items: [
                    {
                      heading: "Rice & Biryani",
                      items: [
                        "Ghee Rice",
                        "Chicken Fried Rice",
                        "Vegetable Fried Rice"
                      ]
                    },
                    {
                      heading: "Breads",
                      items: ["2 Breads"]
                    },
                    {
                      heading: "Curry Dishes",
                      items: [
                        "2 Non Veg Curries",
                        "Veg Curry"
                      ]
                    },
                    {
                      heading: "Fry Items",
                      items: [
                        "Chicken Fry",
                        "Chilli Chicken",
                        "Gobi Manchurian"
                      ]
                    },
                    {
                      heading: "Accompaniments",
                      items: [
                        "Salad",
                        "Curd Salad",
                        "Pickle"
                      ]
                    }
                  ]
                },
                {
                  category: "Dessert",
                  items: ["Choice of: Mysore Pak / Jalebi / Halwa"]
                },
                {
                  category: "Refreshments",
                  items: ["Hot Water", "Black Tea"]
                },
                {
                  category: "Complimentary Services",
                  items: [
                    "Welcome Board",
                    "Marriage Certificate Processing"
                  ]
                }
              ]}
            />

            <MenuPackageCard
              title="Reception Package 2"
              description="Elegant reception feast featuring signature dishes"
              price="495"
              menu={[
                {
                  category: "Welcome Drinks",
                  items: [
                    "Fresh Juice (2 Seasonal Fruits)",
                    "Water Juice (1)",
                    "Coffee"
                  ]
                },
                {
                  category: "Starters",
                  items: ["Alsa (served at dining)"]
                },
                {
                  category: "Main Course",
                  items: [
                    {
                      heading: "Rice & Biryani",
                      items: [
                        "Beef Biryani",
                        "Chicken Mandi"
                      ]
                    },
                    {
                      heading: "Fry Items",
                      items: ["Chicken Fry"]
                    },
                    {
                      heading: "Mini Sadhya with fish curry",
                      items: ["Traditional Kerala Sadhya Items with fish curry"]
                    },
                    {
                      heading: "Accompaniments",
                      items: [
                        "Salad",
                        "Curd Salad",
                        "Pickle",
                      ]
                    }
                  ]
                },
                {
                  category: "Dessert",
                  items: ["Choice of: Mysore Pak / Jalebi / Halwa"]
                },
                {
                  category: "Refreshments",
                  items: ["Hot Water", "Black Tea"]
                },
                {
                  category: "Complimentary Services",
                  items: [
                    "Welcome Board",
                    "Marriage Certificate Processing"
                  ]
                }
              ]}
            />

            <MenuPackageCard
              title="Platinum Package"
              description="Luxury dining experience with premium selections and exclusive features"
              price="652"
              menu={[
                {
                  category: "Welcome Drinks",
                  items: [
                    "Fresh Juice (2 Seasonal Fruits)",
                    "Water Juice (1)",
                    "Coffee"
                  ]
                },
                {
                  category: "Starters",
                  items: [
                    "Alsa (served at dining)",
                    "Chicken Lollipop / Fish Fingers / Cutlet"
                  ]
                },
                {
                  category: "Main Course",
                  items: [
                    {
                      heading: "Rice & Biryani",
                      items: [
                        "Mutton Biryani",
                        "Chicken Alfaham Mandi"
                      ]
                    },
                    {
                      heading: "Breads",
                      items: [
                        "White Khubz",
                        "Porotta",
                        "Neypathil",
                      ]
                    },
                    {
                      heading: "Curry Dishes",
                      items: ["Fish Curry", "Chicken or Beef Curry", "Veg Curry"]
                    },
                    {
                      heading: "Fry Items",
                      items: [
                        "Chicken Tikka"
                      ]
                    },
                    {
                      heading: "Accompaniments",
                      items: [
                        "Hummus & Mayo",
                        "Salad",
                        "Curd Salad",
                        "Pickle",
                        "Coconut Chutney"
                      ]
                    }
                  ]
                },
                {
                  category: "Dessert",
                  items: [
                    "Chocolate Fountain",
                    "Cake Set"
                  ]
                },
                {
                  category: "Refreshments",
                  items: ["Bottled Water", "Hot Water", "Herbal Tea Counter"]
                },
                {
                  category: "Complimentary Services",
                  items: [
                    "Welcome Board",
                    "Marriage Certificate Processing"
                  ]
                }
              ]}
            />
          </div>
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

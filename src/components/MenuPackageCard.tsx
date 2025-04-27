
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDollarSign, Utensils } from 'lucide-react';

interface MenuItem {
  category: string;
  items: string[];
}

interface MenuPackageProps {
  title: string;
  price: string;
  menu: MenuItem[];
  note?: string;
}

const MenuPackageCard = ({ title, price, menu, note }: MenuPackageProps) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999', '_blank');
  };

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-lotus-navy/10">
      <CardHeader className="bg-gradient-to-br from-lotus-navy to-lotus-navy/90 text-white p-8">
        <div className="space-y-3">
          <h3 className="font-playfair text-2xl font-medium">{title}</h3>
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-lotus-gold" />
            <p className="text-3xl font-bold text-lotus-gold">₹{price}</p>
          </div>
          {note && <p className="text-sm text-gray-200 italic">{note}</p>}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {menu.map((section, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-lotus-gold" />
                <h4 className="font-medium text-lotus-navy text-lg">{section.category}</h4>
              </div>
              <ul className="space-y-2 pl-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Button 
          onClick={handleWhatsAppClick}
          className="w-full mt-6 bg-lotus-gold hover:bg-lotus-gold/90 text-white"
        >
          Book This Package
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuPackageCard;

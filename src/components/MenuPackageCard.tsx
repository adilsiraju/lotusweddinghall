
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="space-y-1">
          <h3 className="font-playfair text-2xl font-medium">{title}</h3>
          <p className="text-2xl font-semibold text-lotus-gold">₹{price}</p>
          {note && <p className="text-sm text-gray-500 italic">{note}</p>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {menu.map((section, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-lotus-navy">{section.category}</h4>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                    <span className="text-lotus-gold mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuPackageCard;

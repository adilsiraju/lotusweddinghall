
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion } from 'framer-motion';

interface MenuItem {
  category: string;
  items: string[];
}

interface MenuPackageProps {
  title: string;
  price: string;
  menu: MenuItem[];
  note?: string;
  specialNote?: string;
}

const MenuPackageCard = ({ title, price, menu, note, specialNote }: MenuPackageProps) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl border-lotus-navy/10">
        <CardHeader className="bg-gradient-to-br from-lotus-navy to-lotus-navy/90 text-white p-6 flex-shrink-0">
          <div className="space-y-2">
            <h3 className="font-playfair text-2xl font-medium">{title}</h3>
            <p className="text-3xl font-bold text-lotus-gold">₹{price} <span className="text-sm font-normal">per head*</span></p>
            {note && <p className="text-sm text-gray-200 italic">{note}</p>}
            {specialNote && (
              <p className="text-sm text-lotus-gold/90 mt-2 border-t border-white/10 pt-2">
                {specialNote}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col justify-between flex-grow">
          <div className="space-y-4 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-lotus-navy/20 scrollbar-track-transparent">
            {menu.map((section, index) => (
              <Collapsible key={index} defaultOpen={index === 0}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md bg-lotus-navy/5 hover:bg-lotus-navy/10 transition-colors">
                  <span className="text-lotus-navy font-medium">{section.category}</span>
                  <ChevronDown className="h-4 w-4 text-lotus-navy transition-transform duration-200 ease-out" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <ul className="space-y-1.5 pl-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600 flex items-start">
                        <span className="text-lotus-gold mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
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
    </motion.div>
  );
};

export default MenuPackageCard;

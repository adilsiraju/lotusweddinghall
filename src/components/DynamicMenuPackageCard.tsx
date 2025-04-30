
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion } from 'framer-motion';
import { Package, MenuCategory, MenuItem } from '@/types/database';

interface DynamicMenuPackageCardProps {
  packageData: Package;
}

const DynamicMenuPackageCard = ({ packageData }: DynamicMenuPackageCardProps) => {
  const renderMenuItems = (items: MenuItem[] = []) => {
    return items.map((item) => {
      if (item.is_heading && item.children?.length) {
        return (
          <div key={item.id} className="space-y-2">
            <h4 className="text-lotus-navy font-medium text-left">{item.name}</h4>
            <ul className="space-y-1.5 pl-4">
              {item.children.map((subItem) => (
                <li key={subItem.id} className="text-gray-600 flex items-start">
                  <span className="text-lotus-gold mr-2 flex-shrink-0">•</span>
                  <span className="text-left">{subItem.name}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      
      return (
        <li key={item.id} className="text-gray-600 flex items-start">
          <span className="text-lotus-gold mr-2 flex-shrink-0">•</span>
          <span className="text-left">{item.name}</span>
        </li>
      );
    });
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
            <h3 className="font-playfair text-2xl font-medium">{packageData.title}</h3>
            <p className="text-3xl font-bold text-lotus-gold">₹{packageData.price} <span className="text-sm font-normal">per head*</span></p>
            <p className="text-sm text-gray-200">{packageData.description}</p>
            {packageData.note && <p className="text-sm text-gray-200 italic mt-2">{packageData.note}</p>}
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col justify-between flex-grow">
          <div className="space-y-4 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-lotus-navy/20 scrollbar-track-transparent">
            {packageData.categories?.map((category) => (
              <Collapsible key={category.id} defaultOpen={false}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md bg-lotus-navy/5 hover:bg-lotus-navy/10 transition-colors">
                  <span className="text-lotus-navy font-medium text-left">{category.name}</span>
                  <ChevronDown className="h-4 w-4 text-lotus-navy transition-transform duration-200 ease-out" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 space-y-3">
                  {renderMenuItems(category.items || [])}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DynamicMenuPackageCard;

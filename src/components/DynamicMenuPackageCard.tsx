
import React, { useState } from 'react';
import { Package, MenuCategory, MenuItem } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DynamicMenuPackageCardProps {
  packageData: Package;
  hidePricing?: boolean;
}

const DynamicMenuPackageCard = ({ packageData, hidePricing = false }: DynamicMenuPackageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderMenuItems = (items: MenuItem[], depth = 0) => {
    return items.map((item) => (
      <div key={item.id} className={cn("mb-1", depth > 0 && "ml-4")}>
        {item.is_heading ? (
          <h5 className={cn(
            "font-medium text-gray-800 mb-2",
            depth === 0 ? "text-base" : "text-sm"
          )}>
            {item.name}
          </h5>
        ) : (
          <p className={cn(
            "text-gray-600 mb-1",
            depth === 0 ? "text-sm" : "text-xs"
          )}>
            • {item.name}
          </p>
        )}
        {item.children && item.children.length > 0 && (
          <div className="ml-2">
            {renderMenuItems(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <Card className={cn(
      "w-full transition-all duration-300 hover:shadow-lg relative",
      packageData.popular ? "border-lotus-gold ring-2 ring-lotus-gold/20" : "border-gray-200"
    )}>
      {packageData.popular && (
        <Badge className="absolute -top-2 right-4 bg-lotus-gold hover:bg-lotus-gold/90 text-white">
          POPULAR
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl sm:text-2xl font-playfair font-medium mb-2">
              {packageData.title}
            </CardTitle>
            {!hidePricing && (
              <div className="flex items-baseline mb-3">
                <span className="text-2xl font-semibold text-lotus-navy">₹{packageData.price}</span>
                <span className="text-gray-500 ml-1">/plate</span>
              </div>
            )}
          </div>
        </div>
        <CardDescription className="text-gray-600">
          {packageData.description}
        </CardDescription>
        
        {packageData.note && (
          <div className="bg-lotus-cream/30 p-3 rounded-md text-sm mt-3">
            <p className="text-gray-700">{packageData.note}</p>
          </div>
        )}
      </CardHeader>

      {packageData.categories && packageData.categories.length > 0 && (
        <CardContent className="pt-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left mb-4 p-3 bg-lotus-navy/5 rounded-lg hover:bg-lotus-navy/10 transition-colors"
          >
            <span className="font-medium text-lotus-navy">View Full Menu</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-lotus-navy" />
            ) : (
              <ChevronDown className="h-4 w-4 text-lotus-navy" />
            )}
          </button>

          {isExpanded && (
            <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
              {packageData.categories.map((category) => (
                <div key={category.id} className="border-l-3 border-lotus-gold pl-4">
                  <h4 className="font-semibold text-lg text-lotus-navy mb-3 font-playfair">
                    {category.name}
                  </h4>
                  {category.items && category.items.length > 0 ? (
                    <div className="space-y-1">
                      {renderMenuItems(category.items)}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No items listed</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default DynamicMenuPackageCard;

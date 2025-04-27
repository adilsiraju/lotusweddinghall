
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  items: string[];
}

export const InfoCard = ({ title, items }: InfoCardProps) => {
  return (
    <Card className="border-lotus-navy/10">
      <CardHeader className="bg-gradient-to-br from-lotus-navy to-lotus-navy/90 text-white">
        <h3 className="font-playfair text-2xl font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-lotus-gold mr-2">•</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

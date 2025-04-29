
import React from 'react';
import { useVenueAreas } from '@/hooks/useVenueAreas';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { usePackages } from '@/hooks/usePackages';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { LucideImagePlus, LucidePenLine, LucideImage, LucideUtensils } from 'lucide-react';

const AdminDashboard = () => {
  const { data: areas = [], isLoading: areasLoading } = useVenueAreas();
  const { data: images = [], isLoading: imagesLoading } = useGalleryImages({ includeInactive: true });
  const { data: packages = [], isLoading: packagesLoading } = usePackages({ includeInactive: true });
  
  const isLoading = areasLoading || imagesLoading || packagesLoading;

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Venue Areas"
          value={areas.length}
          icon={<LucideImage className="w-8 h-8 text-lotus-navy" />}
        />
        <StatCard 
          title="Total Gallery Images"
          value={images.length}
          icon={<LucideImagePlus className="w-8 h-8 text-lotus-navy" />}
        />
        <StatCard 
          title="Active Packages"
          value={packages.filter(pkg => pkg.active).length}
          icon={<LucideUtensils className="w-8 h-8 text-lotus-navy" />}
        />
        <StatCard 
          title="Total Menu Items"
          value={packages.reduce((acc, pkg) => {
            const categories = pkg.categories || [];
            return acc + categories.reduce((catAcc, cat) => {
              return catAcc + (cat.items?.length || 0);
            }, 0);
          }, 0)}
          icon={<LucidePenLine className="w-8 h-8 text-lotus-navy" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <QuickActionCard 
          title="Gallery Management"
          description="Upload, organize and manage images in the gallery."
          icon={<LucideImagePlus className="w-12 h-12 text-lotus-navy" />}
          linkTo="/admin/gallery"
        />
        <QuickActionCard 
          title="Package Management"
          description="Create and manage menu packages and pricing."
          icon={<LucidePenLine className="w-12 h-12 text-lotus-navy" />}
          linkTo="/admin/packages"
        />
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <p className="text-gray-600">
          This admin dashboard allows you to manage content for your wedding hall website.
          Use the navigation menu to access different management tools.
          <br /><br />
          You can add new packages, upload gallery images, and organize them into different venue areas.
          All changes will be immediately reflected on the main website.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => {
  return (
    <Card className="p-6 flex flex-col items-center justify-center text-center">
      <div className="mb-2">
        {icon}
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
      <p className="text-gray-500 text-sm">{title}</p>
    </Card>
  );
};

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  linkTo 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode,
  linkTo: string 
}) => {
  return (
    <Link to={linkTo}>
      <Card className="p-6 hover:shadow-md transition-shadow flex items-center space-x-6">
        <div className="shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default AdminDashboard;

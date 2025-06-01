import React from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';

// Lazy load heavy admin components
export const LazyAdminGallery = React.lazy(() => import('@/pages/Admin/Gallery'));
export const LazyAdminPackages = React.lazy(() => import('@/pages/Admin/Packages'));
export const LazyAdminDashboard = React.lazy(() => import('@/pages/Admin/Dashboard'));
export const LazyVideoManagement = React.lazy(() => import('@/components/VideoManagementSection'));

// Heavy UI components that can be lazy loaded
export const LazyChart = React.lazy(() => import('@/components/ui/chart').then(module => ({ default: module.ChartContainer })));
export const LazyTable = React.lazy(() => import('@/components/ui/table').then(module => ({ default: module.Table })));

// Suspense wrapper with consistent loading
export const AdminSuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense 
    fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    }
  >
    {children}
  </React.Suspense>
);

// Gallery Suspense wrapper
export const GallerySuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense 
    fallback={
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    }
  >
    {children}
  </React.Suspense>
);

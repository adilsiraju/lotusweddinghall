
import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LucideImagePlus, LucidePenLine, Home, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-10 w-10 border-4 border-lotus-navy border-t-transparent rounded-full"></div>
    </div>;
  }

  // If not logged in or not admin, redirect to admin login
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-lotus-navy text-white">
        <div className="p-4 flex flex-col h-full">
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-gray-300 mt-1">Lotus Wedding Hall</p>
          </div>
          
          <nav className="flex-1 flex flex-col gap-2">
            <NavLink to="/admin/dashboard" active={location.pathname === "/admin/dashboard"}>
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </NavLink>
            <NavLink to="/admin/gallery" active={location.pathname.startsWith("/admin/gallery")}>
              <LucideImagePlus className="w-5 h-5 mr-2" />
              Gallery Management
            </NavLink>
            <NavLink to="/admin/packages" active={location.pathname.startsWith("/admin/packages")}>
              <LucidePenLine className="w-5 h-5 mr-2" />
              Package Management
            </NavLink>
          </nav>
          
          <div className="mt-auto pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-white/10 mt-2"
              asChild
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Website
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {location.pathname.includes('/gallery') && 'Gallery Management'}
            {location.pathname.includes('/packages') && 'Package Management'}
            {location.pathname === '/admin/dashboard' && 'Dashboard'}
          </h1>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Helper component for navigation links
const NavLink = ({ to, active, children }: { 
  to: string; 
  active: boolean; 
  children: React.ReactNode 
}) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      active 
        ? "bg-lotus-gold text-white" 
        : "text-white hover:bg-white/10"
    }`}
  >
    {children}
  </Link>
);

export default AdminLayout;

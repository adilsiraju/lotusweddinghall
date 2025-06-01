
import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Main Pages (keep these loaded immediately for better UX)
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import Packages from './pages/Packages';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Lazy load Admin Pages (heavy components) - using our optimized lazy components
import { 
  LazyAdminDashboard, 
  LazyAdminGallery, 
  LazyAdminPackages,
  AdminSuspenseWrapper 
} from './components/LazyComponents';

const AdminLogin = React.lazy(() => import('./pages/Admin/Login'));

// Layouts
import AdminLayout from './components/layouts/AdminLayout';
import MainLayout from './components/layouts/MainLayout';

// Components
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from "./components/ErrorBoundary";
import LoadingSpinner from "./components/ui/loading-spinner";

// Create a client with optimized defaults for performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1, // Reduce retries for faster failure handling
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    },
  },
});

// Optimized Suspense fallback component
const AdminPageFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Admin Routes - All wrapped in Suspense for optimal lazy loading */}
              <Route path="/admin/login" element={
                <Suspense fallback={<AdminPageFallback />}>
                  <AdminLogin />
                </Suspense>
              } />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={
                  <AdminSuspenseWrapper>
                    <LazyAdminDashboard />
                  </AdminSuspenseWrapper>
                } />
                <Route path="gallery" element={
                  <AdminSuspenseWrapper>
                    <LazyAdminGallery />
                  </AdminSuspenseWrapper>
                } />
                <Route path="packages" element={
                  <AdminSuspenseWrapper>
                    <LazyAdminPackages />
                  </AdminSuspenseWrapper>
                } />
              </Route>

              {/* Main Website Routes with shared Navigation and Footer */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="packages" element={<Packages />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

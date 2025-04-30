
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import Packages from './pages/Packages';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminGallery from './pages/Admin/Gallery';
import AdminPackages from './pages/Admin/Packages';

// Layouts
import AdminLayout from './components/layouts/AdminLayout';
import MainLayout from './components/layouts/MainLayout';

// Components
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from "./components/ErrorBoundary";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="packages" element={<AdminPackages />} />
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


import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Layouts
import AdminLayout from './components/layouts/AdminLayout';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* Add more admin routes later */}
            </Route>

            {/* Main Website Routes */}
            <Route path="/" element={
              <>
                <Navigation />
                <Routes>
                  <Route index element={<Index />} />
                  <Route path="gallery" element={<Gallery />} />
                  <Route path="packages" element={<Packages />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

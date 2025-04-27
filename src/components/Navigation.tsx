
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999', '_blank');
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-lotus-navy py-4'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo-white.png" 
            alt="Lotus Wedding Hall" 
            className="h-12 brightness-100"
          />
          <span className="ml-2 font-playfair text-xl font-semibold text-white">
            Lotus Wedding & Banquet Hall
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <Link to="/" className="nav-link mx-3 py-2 text-white">Home</Link>
          <Link to="/gallery" className="nav-link mx-3 py-2 text-white">Gallery</Link>
          <Link to="/packages" className="nav-link mx-3 py-2 text-white">Packages</Link>
          <Link to="/about" className="nav-link mx-3 py-2 text-white">About Us</Link>
          <Link to="/contact" className="nav-link mx-3 py-2 text-white">Contact</Link>
          <Button 
            size="sm" 
            onClick={handleWhatsAppClick}
            className="ml-6 bg-lotus-gold hover:bg-lotus-gold/90 text-white transition-all duration-300 font-medium px-5 py-2"
          >
            Book Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 mb-1.5 bg-white"></div>
          <div className="w-6 h-0.5 mb-1.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden absolute w-full bg-lotus-navy transition-all duration-300 ease-in-out',
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      )}>
        <nav className="container flex flex-col py-4">
          <Link to="/" className="py-3 px-4 text-white hover:bg-lotus-navy/90" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/gallery" className="py-3 px-4 text-white hover:bg-lotus-navy/90" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
          <Link to="/packages" className="py-3 px-4 text-white hover:bg-lotus-navy/90" onClick={() => setIsMobileMenuOpen(false)}>Packages</Link>
          <Link to="/about" className="py-3 px-4 text-white hover:bg-lotus-navy/90" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="py-3 px-4 text-white hover:bg-lotus-navy/90" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="px-4 py-3">
            <Button onClick={handleWhatsAppClick} className="w-full bg-lotus-gold hover:bg-lotus-gold/90 text-white">Book Now</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo-white.png" 
            alt="Lotus Wedding Hall" 
            className={cn(
              'h-12 transition-all duration-300',
              isScrolled ? 'brightness-0' : 'brightness-100'
            )} 
          />
          <span className={cn(
            'ml-2 font-playfair text-xl font-semibold transition-colors duration-300',
            isScrolled ? 'text-lotus-navy' : 'text-white'
          )}>
            Lotus
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <Link to="/" className={cn(
            'nav-link',
            isScrolled ? 'text-lotus-navy' : 'text-white'
          )}>Home</Link>
          <Link to="/gallery" className={cn(
            'nav-link',
            isScrolled ? 'text-lotus-navy' : 'text-white'
          )}>Gallery</Link>
          <Link to="/packages" className={cn(
            'nav-link',
            isScrolled ? 'text-lotus-navy' : 'text-white'
          )}>Packages</Link>
          <Link to="/about" className={cn(
            'nav-link',
            isScrolled ? 'text-lotus-navy' : 'text-white'
          )}>About Us</Link>
          <Link to="/contact" className={cn(
            'nav-link',
            isScrolled ? 'text-lotus-navy' : 'text-white'
          )}>Contact</Link>
          <Button size="sm" className={cn(
            'ml-6 bg-lotus-gold hover:bg-lotus-gold/90 text-white',
            'transition-all duration-300 font-medium px-5 py-2'
          )}>
            Book Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={cn(
            'w-6 h-0.5 mb-1.5 transition-all duration-300 transform',
            isScrolled ? 'bg-lotus-navy' : 'bg-white',
            isMobileMenuOpen && 'rotate-45 translate-y-2'
          )}></div>
          <div className={cn(
            'w-6 h-0.5 mb-1.5 transition-all duration-200',
            isScrolled ? 'bg-lotus-navy' : 'bg-white',
            isMobileMenuOpen && 'opacity-0'
          )}></div>
          <div className={cn(
            'w-6 h-0.5 transition-all duration-300 transform',
            isScrolled ? 'bg-lotus-navy' : 'bg-white',
            isMobileMenuOpen && '-rotate-45 -translate-y-2'
          )}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden absolute w-full bg-white transition-all duration-300 ease-in-out shadow-lg',
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      )}>
        <nav className="container flex flex-col py-4">
          <Link to="/" className="py-3 px-4 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/gallery" className="py-3 px-4 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
          <Link to="/packages" className="py-3 px-4 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Packages</Link>
          <Link to="/about" className="py-3 px-4 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="py-3 px-4 hover:bg-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="px-4 py-3">
            <Button className="w-full bg-lotus-gold hover:bg-lotus-gold/90 text-white">Book Now</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

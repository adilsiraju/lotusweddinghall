
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const handleCallClick = () => {
    window.location.href = 'tel:+919207102999';
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen && !(e.target as Element).closest('#mobile-menu') && 
          !(e.target as Element).closest('#mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300',
        isScrolled ? 'bg-lotus-navy shadow-md' : 'bg-lotus-navy/90 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group" aria-label="Home">
          <motion.img 
            src="/logo-white.png" 
            alt="Lotus Wedding Hall" 
            className="h-10 md:h-12 brightness-100"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <span className="ml-2 font-playfair text-lg md:text-xl font-semibold text-white">
            Lotus <span className="hidden sm:inline">Wedding & Banquet Hall</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/gallery" currentPath={location.pathname}>Gallery</NavLink>
          <NavLink to="/packages" currentPath={location.pathname}>Packages</NavLink>
          <NavLink to="/about" currentPath={location.pathname}>About Us</NavLink>
          <NavLink to="/contact" currentPath={location.pathname}>Contact</NavLink>
          <Button 
            size="sm" 
            onClick={handleCallClick}
            className="ml-6 bg-lotus-gold hover:bg-lotus-gold/90 text-white transition-all duration-300 font-medium px-5 py-2"
          >
            Call Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-button"
          className="md:hidden p-2 z-50 relative"
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className={cn(
            "w-6 h-0.5 mb-1.5 transition-all duration-300 bg-white transform",
            isMobileMenuOpen && "rotate-45 translate-y-2"
          )}></div>
          <div className={cn(
            "w-6 h-0.5 mb-1.5 transition-all duration-300 bg-white",
            isMobileMenuOpen && "opacity-0"
          )}></div>
          <div className={cn(
            "w-6 h-0.5 bg-white transition-all duration-300 transform",
            isMobileMenuOpen && "-rotate-45 -translate-y-2"
          )}></div>
        </button>
      </div>

      {/* Mobile Menu with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[62px] left-0 w-full bg-lotus-navy/95 backdrop-blur-md z-40 shadow-xl"
          >
            <nav className="container flex flex-col pt-2 pb-4 overflow-hidden">
              <MobileNavLink to="/" currentPath={location.pathname}>Home</MobileNavLink>
              <MobileNavLink to="/gallery" currentPath={location.pathname}>Gallery</MobileNavLink>
              <MobileNavLink to="/packages" currentPath={location.pathname}>Packages</MobileNavLink>
              <MobileNavLink to="/about" currentPath={location.pathname}>About Us</MobileNavLink>
              <MobileNavLink to="/contact" currentPath={location.pathname}>Contact</MobileNavLink>
              <div className="px-4 py-3 mt-2">
                <Button onClick={handleCallClick} className="w-full bg-lotus-gold hover:bg-lotus-gold/90 text-white">Call Now</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ to, currentPath, children }: { to: string; currentPath: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className={cn(
      "nav-link mx-3 py-2 text-white relative",
      currentPath === to && "font-medium"
    )}
  >
    {children}
    {currentPath === to && (
      <motion.span 
        layoutId="navigation-underline"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-lotus-gold" 
      />
    )}
  </Link>
);

// Mobile Nav Link with animation
const MobileNavLink = ({ to, currentPath, children }: { to: string; currentPath: string; children: React.ReactNode }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
  >
    <Link 
      to={to} 
      className={cn(
        "py-3 px-4 block text-white hover:bg-white/10 transition-colors",
        currentPath === to && "text-lotus-gold font-medium"
      )}
    >
      {children}
    </Link>
  </motion.div>
);

export default Navigation;

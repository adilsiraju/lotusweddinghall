
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const MainLayout = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16"> 
        <Outlet />
      </main>
      <Footer />

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-lotus-navy hover:bg-lotus-gold text-white p-3 rounded-full shadow-lg transition-colors duration-300"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Page transition */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1, transformOrigin: 'bottom' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-lotus-gold w-full h-screen"
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname + "-2"}
            initial={{ scaleY: 1, transformOrigin: 'bottom' }}
            animate={{ scaleY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            className="bg-lotus-gold w-full h-screen"
          />
        </AnimatePresence>
      </div>
    </>
  );
};

export default MainLayout;

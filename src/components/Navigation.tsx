
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleCallClick = () => { window.location.href = 'tel:+919207102999'; };

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen && !(e.target as Element).closest('#mobile-menu') &&
          !(e.target as Element).closest('#mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'lotus-header fixed top-0 left-0 right-0 z-[60] transition-all duration-500',
          isScrolled
            ? 'py-3 md:py-4 lg:py-5 glass-dark border-b border-[var(--lotus-border)]'
            : 'py-6 md:py-8 lg:py-10'
        )}
        style={!isScrolled ? {
          background: 'linear-gradient(to bottom, rgba(6,6,6,0.8) 0%, rgba(6,6,6,0.4) 60%, transparent 100%)',
        } : undefined}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Lotus Wedding Hall">
            <img
              src="/logo-white.png"
              alt="Lotus"
              className="h-7 md:h-8 opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="flex flex-col gap-[3px] leading-none">
              <span
                className="text-[var(--lotus-primary-text)] tracking-[0.12em] uppercase text-[10px] font-inter font-medium opacity-90"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Lotus
              </span>
              <span
                className="text-[var(--lotus-secondary-text)] tracking-[0.06em] uppercase text-[8px] font-inter opacity-70 hidden sm:block"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Wedding &amp; Banquet Hall
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {[
              { to: '/', label: 'Home' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/packages', label: 'Packages' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'nav-link',
                  location.pathname === to && 'text-[var(--lotus-primary-text)]'
                )}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {label}
                {location.pathname === to && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-[-2px] left-0 right-0 h-[1px]"
                    style={{ background: 'var(--lotus-gold)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <button
              onClick={handleCallClick}
              className="btn-ghost-gold text-[10px] ml-2"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em' }}
            >
              Reserve
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-button"
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={cn(
              'block w-5 h-[1px] bg-[var(--lotus-primary-text)] transition-all duration-300 origin-center',
              isMobileMenuOpen && 'rotate-45 translate-y-[6px]'
            )} />
            <span className={cn(
              'block w-5 h-[1px] bg-[var(--lotus-primary-text)] transition-all duration-300',
              isMobileMenuOpen && 'opacity-0 -translate-x-2'
            )} />
            <span className={cn(
              'block w-5 h-[1px] bg-[var(--lotus-primary-text)] transition-all duration-300 origin-center',
              isMobileMenuOpen && '-rotate-45 -translate-y-[6px]'
            )} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col"
            style={{ background: 'var(--lotus-void)' }}
          >
            {/* Subtle grid overlay — Nothing-inspired */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(var(--lotus-border) 1px, transparent 1px), linear-gradient(90deg, var(--lotus-border) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="container mx-auto flex flex-col justify-center h-full py-24 relative">
              <div className="mb-10">
                <p className="counter-label mb-0 opacity-60">Navigation</p>
              </div>
              <nav className="flex flex-col gap-0">
                {[
                  { to: '/', label: 'Home', num: '01' },
                  { to: '/gallery', label: 'Gallery', num: '02' },
                  { to: '/packages', label: 'Packages', num: '03' },
                  { to: '/about', label: 'About', num: '04' },
                  { to: '/contact', label: 'Contact', num: '05' },
                ].map(({ to, label, num }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={to}
                      className={cn(
                        'group flex items-baseline gap-4 py-5 border-b transition-all duration-200',
                        'border-[var(--lotus-border)] hover:border-[var(--lotus-gold)]',
                        location.pathname === to
                          ? 'text-[var(--lotus-gold)]'
                          : 'text-[var(--lotus-primary-text)]'
                      )}
                    >
                      <span className="counter-label w-6 shrink-0 opacity-40">{num}</span>
                      <span
                        className="text-4xl sm:text-5xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-200"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                      >
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10"
              >
                <button
                  onClick={handleCallClick}
                  className="btn-ghost-gold"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Call: +91 92071 02999
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

import React from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from './ui/animate-on-scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lotus-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <AnimateOnScroll animation="slide-up" delay={0.1}>
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/logo-white.png" alt="Lotus Wedding Hall" className="h-12" />
                <span className="ml-2 font-playfair text-xl font-medium">Lotus Wedding & Banquet Hall</span>
              </div>
              <p className="text-gray-300 mb-4">
                Creating unforgettable moments for your special celebrations with elegance and warmth since 2019.
              </p>
              <div className="flex space-x-4">
                <SocialLink href="https://www.facebook.com/lotusweddingthalassery/" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </SocialLink>
                <SocialLink href="https://www.instagram.com/lotusweddinghall" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </SocialLink>
                <SocialLink href="tel:+919207102999" aria-label="Phone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </SocialLink>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Quick Links */}
          <AnimateOnScroll animation="slide-up" delay={0.2}>
            <div className="col-span-1">
              <h3 className="font-playfair text-lg mb-4 font-medium">Quick Links</h3>
              <ul className="space-y-2">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/gallery">Gallery</FooterLink>
                <FooterLink to="/packages">Packages</FooterLink>
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Services */}
          <AnimateOnScroll animation="slide-up" delay={0.3}>
            <div className="col-span-1">
              <h3 className="font-playfair text-lg mb-4 font-medium">Our Services</h3>
              <ul className="space-y-2">
                <FooterLink to="/packages">Wedding Ceremonies</FooterLink>
                <FooterLink to="/packages">Reception Parties</FooterLink>
                <FooterLink to="/packages">Corporate Events</FooterLink>
                <FooterLink to="/packages">Birthday Celebrations</FooterLink>
                <FooterLink to="/packages">Kerala Sadhya</FooterLink>
                <FooterLink to="/packages">Malabar Cuisine</FooterLink>
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Contact */}
          <AnimateOnScroll animation="slide-up" delay={0.4}>
            <div className="col-span-1">
              <h3 className="font-playfair text-lg mb-4 font-medium">Contact Us</h3>
              <address className="not-italic text-gray-300">
                <p className="flex items-start mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 mt-1 flex-shrink-0">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>QF3V+WG7 Railway Station Road,<br />Lotus Rd, Thalassery, Kerala 670101</span>
                </p>
                <p className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+91 920 7102 999</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 flex-shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>info@lotusweddinghall.com</span>
                </p>
              </address>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Lotus Wedding & Banquet Hall. All rights reserved.
            </p>
            <div className="flex space-x-4 text-gray-400 text-sm">
              <Link to="/privacy" className="hover:text-lotus-gold transition-colors">Privacy Policy</Link>
              <span className="hidden sm:inline">|</span>
              <Link to="/terms" className="hover:text-lotus-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components for consistent styling
const SocialLink = ({ children, href, ...props }: { children: React.ReactNode, href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-white hover:text-lotus-gold transition-colors"
    {...props}
  >
    {children}
  </a>
);

const FooterLink = ({ children, to }: { children: React.ReactNode, to: string }) => (
  <li>
    <Link to={to} className="text-gray-300 hover:text-lotus-gold transition-colors">
      {children}
    </Link>
  </li>
);

export default Footer;

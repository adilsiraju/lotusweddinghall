
import React from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from './ui/animate-on-scroll';

const Footer = () => {
  return (
    <footer className="bg-lotus-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <AnimateOnScroll animation="slide-up" delay={0.1}>
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/logo-white.png" alt="Lotus Wedding Hall" className="h-12" />
                <span className="ml-2 font-playfair text-xl font-medium">Lotus</span>
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
                <SocialLink href="https://wa.me/919207102999" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.881 11.881 0 005.705 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.443-8.413z"/>
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
              &copy; {new Date().getFullYear()} Lotus Wedding & Banquet Hall. All rights reserved.
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

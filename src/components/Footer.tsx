
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--lotus-deep)',
        borderTop: '1px solid var(--lotus-border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
      }}
    >
      <div className="container mx-auto py-20">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo-white.png" alt="Lotus" className="h-8 opacity-80" />
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase font-medium"
                  style={{ color: 'var(--lotus-primary-text)', fontFamily: 'Inter, sans-serif' }}>
                  Lotus
                </p>
                <p className="text-[8px] tracking-[0.1em] uppercase"
                  style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif' }}>
                  Wedding &amp; Banquet Hall
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6"
              style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              Creating unforgettable celebrations with elegance and warmth in the heart of Thalassery, since 2019.
            </p>
            <div className="flex gap-3">
              <SocialLink href="https://www.facebook.com/lotusweddingthalassery/" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/lotusweddinghall" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialLink>
              <SocialLink href="tel:+919207102999" aria-label="Phone">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.17.83.43 1.64.78 2.41a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--lotus-gold)', fontFamily: 'Inter, sans-serif' }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/gallery', 'Gallery'], ['/packages', 'Packages'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm transition-colors duration-200 hover:text-[var(--lotus-primary-text)]"
                    style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--lotus-gold)', fontFamily: 'Inter, sans-serif' }}>
              Services
            </h4>
            <ul className="space-y-3">
              {['Wedding Ceremonies', 'Reception Parties', 'Corporate Events', 'Birthday Celebrations', 'Kerala Sadhya', 'Malabar Cuisine'].map(s => (
                <li key={s}>
                  <Link to="/packages" className="text-sm transition-colors duration-200 hover:text-[var(--lotus-primary-text)]"
                    style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--lotus-gold)', fontFamily: 'Inter, sans-serif' }}>
              Contact
            </h4>
            <address className="not-italic space-y-4">
              <p className="text-sm leading-relaxed"
                style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                QF3V+WG7 Railway Station Road,<br />
                Lotus Rd, Thalassery,<br />
                Kerala 670101
              </p>
              <p>
                <a href="tel:+919207102999" className="text-sm transition-colors hover:text-[var(--lotus-primary-text)]"
                  style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif' }}>
                  +91 920 710 2999
                </a>
              </p>
              <p>
                <a href="mailto:info@lotusweddinghall.com" className="text-sm transition-colors hover:text-[var(--lotus-primary-text)]"
                  style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif' }}>
                  info@lotusweddinghall.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--lotus-border)' }} className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-wide"
            style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            &copy; {year} Lotus Wedding &amp; Banquet Hall. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([label, to]) => (
              <Link key={to} to={to} className="transition-colors hover:text-[var(--lotus-gold)]"
                style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ children, href, ...props }: { children: React.ReactNode; href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 flex items-center justify-center border transition-all duration-200 hover:border-[var(--lotus-gold)] hover:text-[var(--lotus-gold)]"
    style={{ borderColor: 'var(--lotus-border)', color: 'var(--lotus-muted)' }}
    {...props}
  >
    {children}
  </a>
);

export default Footer;

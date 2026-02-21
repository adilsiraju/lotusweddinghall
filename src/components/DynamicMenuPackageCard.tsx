
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Package, MenuItem } from '@/types/database';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicMenuPackageCardProps {
  packageData: Package;
  hidePricing?: boolean;
}

/* ── Menu Modal ─────────────────────────────────────────────── */
interface MenuModalProps {
  packageData: Package;
  hidePricing: boolean;
  onClose: () => void;
}

const MenuModal = ({ packageData, hidePricing, onClose }: MenuModalProps) => {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const renderMenuItems = (items: MenuItem[], depth = 0): React.ReactNode => {
    return items.map((item) => (
      <div key={item.id} className={cn('mb-1', depth > 0 && 'ml-4')}>
        {item.is_heading ? (
          <h6
            style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--lotus-secondary-text)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              fontSize: '0.68rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
              marginTop: depth === 0 ? '0.75rem' : '0.25rem',
            }}
          >
            {item.name}
          </h6>
        ) : (
          <p
            className="flex items-start gap-2 mb-[3px]"
            style={{ color: 'var(--lotus-secondary-text)', fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.6 }}
          >
            <span style={{ color: 'var(--lotus-gold)', opacity: 0.5, flexShrink: 0, marginTop: '0.1em' }}>•</span>
            {item.name}
          </p>
        )}
        {item.children && item.children.length > 0 && (
          <div className="ml-3">{renderMenuItems(item.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'rgba(6,6,6,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel */}
        <motion.div
          className="relative w-full sm:max-w-lg flex flex-col"
          style={{
            background: 'var(--lotus-surface)',
            border: '1px solid var(--lotus-border)',
            maxHeight: '90dvh',
            borderRadius: '0',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Modal header */}
          <div
            className="flex items-start justify-between px-7 pt-7 pb-5 shrink-0"
            style={{ borderBottom: '1px solid var(--lotus-border)' }}
          >
            <div>
              {packageData.popular && (
                <span
                  className="inline-block mb-3 px-2 py-[3px] text-[9px] tracking-[0.2em] uppercase"
                  style={{ background: 'var(--lotus-gold)', color: 'var(--lotus-void)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Popular
                </span>
              )}
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
                  fontWeight: 400,
                  color: 'var(--lotus-primary-text)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                {packageData.title}
              </h2>
              {!hidePricing && (
                <div className="flex items-baseline gap-1 mt-2">
                  <span style={{ color: 'var(--lotus-gold)', fontFamily: 'Inter, sans-serif', fontSize: '1.2rem', fontWeight: 500 }}>₹{packageData.price}</span>
                  <span style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 300 }}>/plate</span>
                </div>
              )}
              <p className="mt-2" style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.65 }}>
                {packageData.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="ml-4 shrink-0 w-9 h-9 flex items-center justify-center transition-colors duration-200"
              style={{ border: '1px solid var(--lotus-border)', color: 'var(--lotus-muted)' }}
              aria-label="Close menu"
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--lotus-gold)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--lotus-gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--lotus-border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--lotus-muted)'; }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable menu body */}
          <div className="overflow-y-auto px-7 py-6 flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--lotus-border) transparent' }}>
            {packageData.note && (
              <div
                className="mb-6 p-3 text-xs"
                style={{
                  background: 'var(--lotus-gold-dim)',
                  borderLeft: '2px solid var(--lotus-gold)',
                  color: 'var(--lotus-secondary-text)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {packageData.note}
              </div>
            )}

            {packageData.categories && packageData.categories.length > 0 ? (
              <div className="space-y-7">
                {packageData.categories.map((category, i) => (
                  <div key={category.id}>
                    {/* Hairline separator for all but first */}
                    {i > 0 && <div className="mb-6" style={{ height: '1px', background: 'var(--lotus-border)' }} />}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-5 h-[1px] shrink-0" style={{ background: 'var(--lotus-gold)' }} />
                      <h4
                        style={{
                          fontFamily: 'Cormorant Garamond, Georgia, serif',
                          fontSize: '1.2rem',
                          fontWeight: 400,
                          color: 'var(--lotus-primary-text)',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {category.name}
                      </h4>
                    </div>
                    {category.items && category.items.length > 0 ? (
                      <div className="pl-8">{renderMenuItems(category.items)}</div>
                    ) : (
                      <p className="pl-8 text-xs italic" style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif' }}>No items listed</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>No menu details available.</p>
            )}
          </div>

          {/* Footer close strip */}
          <div
            className="px-7 py-4 shrink-0 flex justify-end"
            style={{ borderTop: '1px solid var(--lotus-border)' }}
          >
            <button
              onClick={onClose}
              className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--lotus-gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--lotus-muted)'; }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

/* ── Card ────────────────────────────────────────────────────── */
const DynamicMenuPackageCard = ({ packageData, hidePricing = false }: DynamicMenuPackageCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const hasMenu = packageData.categories && packageData.categories.length > 0;

  return (
    <>
      <div
        className="luxury-card w-full flex flex-col relative"
        style={packageData.popular ? { borderColor: 'var(--lotus-gold)' } : undefined}
      >
        {/* Popular badge */}
        {packageData.popular && (
          <div
            className="absolute -top-3 right-4 px-3 py-1 text-[10px] tracking-[0.2em] uppercase"
            style={{ background: 'var(--lotus-gold)', color: 'var(--lotus-void)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Popular
          </div>
        )}

        {/* Card body */}
        <div className="p-6 flex flex-col h-full">
          <div className="w-8 h-[1px] mb-5" style={{ background: 'var(--lotus-gold)' }} />

          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)',
              fontWeight: 400,
              color: 'var(--lotus-primary-text)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            {packageData.title}
          </h3>

          {!hidePricing && (
            <div className="flex items-baseline gap-1 mt-3">
              <span style={{ color: 'var(--lotus-gold)', fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', fontWeight: 500 }}>
                ₹{packageData.price}
              </span>
              <span style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 300 }}>
                /plate
              </span>
            </div>
          )}

          <p
            className="mt-3 flex-1"
            style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7 }}
          >
            {packageData.description}
          </p>

          {hasMenu && (
            <>
              <div className="mt-6 mb-4" style={{ height: '1px', background: 'var(--lotus-border)' }} />
              <button
                onClick={openModal}
                className="group flex items-center justify-between w-full text-left"
              >
                <span
                  className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 group-hover:text-[var(--lotus-gold)]"
                  style={{ color: 'var(--lotus-secondary-text)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  View Full Menu
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: 'var(--lotus-muted)' }}
                >
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {modalOpen && (
        <MenuModal packageData={packageData} hidePricing={hidePricing} onClose={closeModal} />
      )}
    </>
  );
};

export default DynamicMenuPackageCard;

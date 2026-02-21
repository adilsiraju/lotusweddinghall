
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  showBookButton?: boolean;
  className?: string;
  height?: string;
  overlayOpacity?: string;
}

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  showBookButton = false,
  className,
  height = 'h-screen',
}: HeroProps) => {
  const handleCallClick = () => { window.location.href = 'tel:+919207102999'; };
  const handleExploreClick = () => { document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' }); };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
  };

  return (
    <div className={cn('relative flex items-end justify-center overflow-hidden bg-[var(--lotus-void)]', height, className)}>
      {/* Background image */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Multi-layer gradient overlay — cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(6,6,6,0.25) 0%,
              rgba(6,6,6,0.10) 30%,
              rgba(6,6,6,0.20) 55%,
              rgba(6,6,6,0.70) 80%,
              rgba(6,6,6,0.92) 100%
            )`,
        }}
      />

      {/* Thin top border — Mercedes precision detail */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] z-20"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)' }}
      />

      {/* Content — bottom-aligned, left-heavy layout */}
      <div className="container mx-auto relative z-10 pb-20 md:pb-28 lg:pb-32">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Category label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px]" style={{ background: 'var(--lotus-gold)' }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-medium"
              style={{ color: 'var(--lotus-gold)', fontFamily: 'Inter, sans-serif' }}
            >
              Thalassery's Premier Wedding Venue
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="font-light text-[var(--lotus-primary-text)] mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
            }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-lg"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.875rem, 1.3vw, 1.0625rem)',
              lineHeight: 1.75,
              color: 'rgba(245,245,247,0.6)',
              fontWeight: 300,
              letterSpacing: '0.01em',
            }}
          >
            {subtitle}
          </motion.p>

          {/* CTA buttons */}
          {showBookButton && (
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button onClick={handleCallClick} className="btn-primary">
                Book a Visit
              </button>
              <button onClick={handleExploreClick} className="btn-secondary">
                Discover More
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator — Apple-style */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden
      >
        <span
          className="text-[9px] tracking-[0.25em] uppercase"
          style={{ color: 'rgba(245,245,247,0.4)', fontFamily: 'Inter, sans-serif', writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-[1px]"
          style={{ background: 'rgba(245,245,247,0.3)' }}
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{ delay: 2.3, duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;

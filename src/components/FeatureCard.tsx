
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
  index?: number;
}

const FeatureCard = ({ title, description, className, delay = 0, index = 0 }: FeatureCardProps) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={{ once: true, margin: '-80px' }}
      className={cn('group relative p-7 transition-all duration-300 cursor-default', className)}
      style={{
        background: 'var(--lotus-surface)',
        border: '1px solid var(--lotus-border)',
      }}
      whileHover={{
        borderColor: 'rgba(201,169,110,0.35)',
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      {/* Top accent line that reveals on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-all duration-500 origin-left"
        style={{
          background: 'linear-gradient(to right, var(--lotus-gold), transparent)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />

      {/* Number — Nothing-inspired counter */}
      <div
        className="mb-5 text-[11px] tracking-[0.3em]"
        style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, monospace' }}
      >
        {num}
      </div>

      {/* Title */}
      <h3
        className="mb-3 font-light"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--lotus-primary-text)',
        }}
      >
        {title}
      </h3>

      {/* Hairline divider */}
      <div className="w-6 h-[1px] mb-4 transition-all duration-300 group-hover:w-8" style={{ background: 'var(--lotus-gold)' }} />

      {/* Description */}
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--lotus-secondary-text)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
      >
        {description}
      </p>

      {/* Arrow on hover */}
      <div
        className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
        style={{ color: 'var(--lotus-gold)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
};

export default FeatureCard;


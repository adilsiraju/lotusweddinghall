import React, { useRef } from 'react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import { useFeaturedGalleryImages } from '@/hooks/useFeaturedGalleryImages';
import ResponsiveImage from '@/components/ui/responsive-image';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

/* ── Reusable animation wrapper ─────────────────────────────── */
const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Section label helper ───────────────────────────────────── */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="section-label">{children}</div>
);

/* ── Stat block ─────────────────────────────────────────────── */
const Stat = ({ value, label, delay }: { value: string; label: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay ?? 0 }}
      className="flex flex-col"
    >
      <span
        className="font-light leading-none mb-3"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(3.5rem, 7vw, 6rem)',
          letterSpacing: '-0.04em',
          color: 'var(--lotus-primary-text)',
        }}
      >
        {value}
      </span>
      <div className="w-6 h-[1px] mb-3" style={{ background: 'var(--lotus-gold)' }} />
      <span
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </span>
    </motion.div>
  );
};

/* ── Main Page ──────────────────────────────────────────────── */
const IndexPage = () => {
  const { data: featuredImages = [], isLoading: isLoadingImages } = useFeaturedGalleryImages();

  const generateWhatsAppUrl = (msg: string) =>
    `https://wa.me/919207102999?text=${encodeURIComponent(msg)}`;

  const handleBookNow = () => {
    const msg =
      'Hello! I would like to book Lotus Wedding & Banquet Hall for an event. Please provide me with availability and details.';
    window.open(generateWhatsAppUrl(msg), '_blank');
  };

  return (
    <div style={{ background: 'var(--lotus-void)', color: 'var(--lotus-primary-text)' }}>
      {/* ═══════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════ */}
      <Hero
        title="Where Celebrations Become Legend"
        subtitle="Thalassery's most distinguished wedding and banquet hall, where traditional Kerala heritage meets modern luxury."
        backgroundImage="/hero-wedding.jpg"
        showBookButton={true}
      />

      {/* ═══════════════════════════════════════════════
          2. MANIFESTO — Apple-style "We believe…"
      ═══════════════════════════════════════════════ */}
      <section
        id="intro"
        className="py-32 md:py-44"
        style={{ background: 'var(--lotus-deep)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
            <Reveal>
              <SectionLabel>Our Philosophy</SectionLabel>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Founded in 2019, 150&nbsp;m from Thalassery Railway Station.
              </p>
            </Reveal>

            <div>
              <Reveal delay={0.1}>
                <p
                  className="mb-8 font-light"
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.025em',
                    color: 'var(--lotus-primary-text)',
                  }}
                >
                  Every celebration deserves a stage worthy of the memory it will become.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div
                  className="w-full h-[1px] mb-8"
                  style={{ background: 'var(--lotus-border)' }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <p className="lead-text">
                    We blend the warmth of authentic Kerala tradition with the precision of a luxury hospitality
                    experience. From the first consultation to the final farewell, every detail is curated
                    with intention.
                  </p>
                  <p className="lead-text">
                    Our grand hall accommodates up to 500 guests. Our chefs craft traditional Sadhya and
                    Malabar cuisine on-site. Our team handles every coordinate of your day, so you experience
                    nothing but joy.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="flex flex-wrap gap-4 mt-10">
                  <button
                    className="btn-primary"
                    onClick={() => (window.location.href = '/gallery')}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Explore Venue
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => (window.location.href = '/contact')}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Get in Touch
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. STATS ROW — Mercedes boldness
      ═══════════════════════════════════════════════ */}
      <section
        className="py-24 border-y"
        style={{ background: 'var(--lotus-void)', borderColor: 'var(--lotus-border)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <Stat value="1300+" label="Guest Capacity" delay={0} />
            <Stat value="7+" label="Years of Excellence" delay={0.08} />
            <Stat value="1,000+" label="Events Hosted" delay={0.16} />
            <Stat value="100%" label="Client Satisfaction" delay={0.24} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. SERVICES GRID
      ═══════════════════════════════════════════════ */}
      <section className="py-32 md:py-44" style={{ background: 'var(--lotus-deep)' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <Reveal>
              <SectionLabel>What We Offer</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-heading max-w-2xl">
                Every occasion,<br />
                <span style={{ color: 'var(--lotus-gold)' }}>flawlessly executed.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: 'var(--lotus-border)' }}>
            {[
              {
                title: 'Wedding Ceremonies',
                description:
                  'Our grand hall provides an architecturally stunning setting for traditional wedding ceremonies, adorned with meticulous floral arrangements and ambient lighting.',
              },
              {
                title: 'Reception Parties',
                description:
                  'Celebrate your union with friends and family in spaces designed for connection, elegant, intimate, and memorable beyond the evening.',
              },
              {
                title: 'Special Celebrations',
                description:
                  'From milestone birthdays to sophisticated corporate events, our versatile spaces adapt to the unique character of every occasion.',
              },
              {
                title: 'Kerala Sadhya',
                description:
                  'Experience the full ceremonial grandeur of traditional Kerala Sadhya, served on banana leaves by our master chefs using time-honoured recipes.',
              },
              {
                title: 'Malabar Cuisine',
                description:
                  'An exploration of the rich, aromatic flavour profiles that define the Malabar coast, prepared fresh, served with pride.',
              },
              {
                title: 'Full Event Planning',
                description:
                  'Our experienced coordination team manages every logistical detail including décor, catering timelines, and guest flow, leaving you free to be present.',
              },
            ].map((service, i) => (
              <FeatureCard
                key={service.title}
                title={service.title}
                description={service.description}
                index={i}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. GALLERY PREVIEW — Editorial bento grid
      ═══════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44"
        style={{ background: 'var(--lotus-void)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <Reveal>
                <SectionLabel>The Space</SectionLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="section-heading mb-0">
                  Glimpses of<br />
                  <em style={{ color: 'var(--lotus-gold)', fontStyle: 'italic' }}>Celebration</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <button
                className="btn-ghost-gold shrink-0"
                onClick={() => (window.location.href = '/gallery')}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Full Gallery
              </button>
            </Reveal>
          </div>

          {isLoadingImages ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[280px_280px] gap-2">
              {/* Large left image */}
              <Reveal className="md:col-span-7 md:row-span-2 h-[260px] md:h-auto overflow-hidden group relative">
                <img
                  src={featuredImages[0]?.image_url ?? '/gallery/wedding-hall.jpg'}
                  alt={featuredImages[0]?.alt_text ?? 'Wedding Hall'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to top, rgba(6,6,6,0.6), transparent)' }} />
                {featuredImages[0]?.title && (
                  <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: 'var(--lotus-primary-text)', fontFamily: 'Inter, sans-serif' }}>
                      {featuredImages[0].title}
                    </span>
                  </div>
                )}
              </Reveal>

              {/* Small top-right */}
              <Reveal delay={0.08} className="md:col-span-5 md:row-span-1 h-[200px] md:h-auto overflow-hidden group relative">
                <img
                  src={featuredImages[1]?.image_url ?? '/gallery/table-setting.jpg'}
                  alt={featuredImages[1]?.alt_text ?? 'Table Setting'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: 'rgba(6,6,6,0.3)' }} />
              </Reveal>

              {/* Small bottom-right */}
              <Reveal delay={0.12} className="md:col-span-5 md:row-span-1 h-[200px] md:h-auto overflow-hidden group relative">
                <img
                  src={featuredImages[2]?.image_url ?? '/gallery/sadhya.jpg'}
                  alt={featuredImages[2]?.alt_text ?? 'Kerala Sadhya'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: 'rgba(6,6,6,0.3)' }} />
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. TESTIMONIALS — Minimal dark quotes
      ═══════════════════════════════════════════════ */}
      <section
        className="py-32 md:py-44 border-t"
        style={{ background: 'var(--lotus-deep)', borderColor: 'var(--lotus-border)' }}
      >
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Client Voices</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-heading max-w-xl">Words from<br />our guests.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] mt-16" style={{ background: 'var(--lotus-border)' }}>
            {[
              {
                quote:
                  'The venue was breathtaking, and the Kerala Sadhya was absolutely delicious. Our guests are still talking about how wonderful everything was.',
                author: 'Priya & Rahul',
                role: 'Wedding Reception',
              },
              {
                quote:
                  'The staff at Lotus were attentive to every detail, making our corporate event truly exceptional. The space is elegant and the service impeccable.',
                author: 'Suresh Kumar',
                role: 'Corporate Event',
              },
              {
                quote:
                  "We couldn't have asked for a more beautiful venue. The Malabar cuisine was outstanding, and the team took care of absolutely everything.",
                author: 'Deepa & Arun',
                role: 'Wedding Ceremony',
              },
            ].map(({ quote, author, role }, i) => (
              <Reveal
                key={author}
                delay={i * 0.1}
                className="p-8 md:p-10 flex flex-col"
                style={{ background: 'var(--lotus-surface)' } as React.CSSProperties}
              >
                {/* Large quote mark */}
                <div
                  className="text-6xl leading-none mb-5 select-none"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    color: 'var(--lotus-gold)',
                    opacity: 0.5,
                  }}
                >
                  "
                </div>
                <p
                  className="flex-1 mb-8 font-light leading-relaxed"
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
                    color: 'var(--lotus-primary-text)',
                    lineHeight: 1.65,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {quote}
                </p>
                <div className="w-6 h-[1px] mb-4" style={{ background: 'var(--lotus-gold)' }} />
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: 'var(--lotus-primary-text)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {author}
                  </p>
                  <p
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: 'var(--lotus-muted)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. CTA — Full-width, cinematic close
      ═══════════════════════════════════════════════ */}
      <section
        className="relative py-40 md:py-56 overflow-hidden"
        style={{ background: 'var(--lotus-void)' }}
      >
        {/* Background image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/venue-interior.jpg)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.82) 50%, rgba(6,6,6,0.90) 100%)',
          }}
        />

        {/* Gold top line — Mercedes precision */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, var(--lotus-gold), transparent)' }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <SectionLabel>Begin Your Story</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="font-light mb-6"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--lotus-primary-text)',
                }}
              >
                Your perfect event starts with a single conversation.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                className="mb-12 max-w-lg mx-auto"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  color: 'rgba(245,245,247,0.55)',
                  fontWeight: 300,
                }}
              >
                Schedule a private venue tour or reach out to discuss how we can bring your vision to life.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleBookNow}
                  className="btn-primary"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Book Now via WhatsApp
                </button>
                <button
                  onClick={() => (window.location.href = '/contact')}
                  className="btn-secondary"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Contact Us
                </button>
              </div>
            </Reveal>

            {/* Location detail */}
            <Reveal delay={0.36}>
              <p
                className="mt-12 text-xs tracking-[0.2em] uppercase"
                style={{ color: 'rgba(245,245,247,0.3)', fontFamily: 'Inter, sans-serif' }}
              >
                150m from Thalassery Railway Station &nbsp;·&nbsp; +91 92071 02999
              </p>
            </Reveal>
          </div>
        </div>

        {/* Gold bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, var(--lotus-gold), transparent)' }}
        />
      </section>
    </div>
  );
};

export default IndexPage;

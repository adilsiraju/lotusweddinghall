
import React from 'react';
import Hero from '@/components/Hero';
import { OptimizedImage } from '@/components/ui/optimized-image';

const timelineEvents = [
  { year: '2019', title: 'The Beginning', body: "Lotus Wedding & Banquet Hall was born with a vision to create a premium space where families could celebrate life's most important milestones in a setting rooted in tradition and elegance." },
  { year: '2020', title: 'The Challenge', body: 'Just as Lotus was finding its rhythm, the COVID-19 pandemic brought celebrations to a standstill. Like many in the industry, we paused operations, using the time to reflect, adapt, and prepare for a stronger comeback.' },
  { year: '2021', title: 'A New Chapter', body: 'Lotus reopened with a full-scale renovation, upgrading our interiors, lighting, kitchen, and guest amenities. We redesigned the entire venue to offer a more luxurious and spacious experience while staying true to our cultural essence.' },
  { year: '2022', title: 'Rebuilding Trust', body: 'With safety, quality, and hospitality at the forefront, 2022 marked the return of grand events. We began hosting weddings, receptions, and community gatherings once again, restoring confidence and joy among families.' },
  { year: '2023', title: 'Digital Innovation', body: 'We embraced technology with a complete digital transformation, launching our interactive website, virtual venue tours, and a comprehensive event planning portal to provide a seamless experience for our guests.' },
  { year: '2024', title: 'Sustainability Focus', body: 'Committed to environmental responsibility, we implemented eco-friendly practices across our operations, from energy-efficient lighting and water conservation to reducing single-use plastics and partnering with sustainable vendors.' },
  { year: '2025', title: 'Evolving With Vision', body: 'Now in 2025, Lotus stands as a symbol of resilience, grace, and excellence in wedding hospitality. With technology and tradition working hand in hand, we continue to innovate and serve with heart.' },
];

const values = [
  { label: 'Tradition', desc: "Honoring Kerala's rich cultural heritage in every celebration we host." },
  { label: 'Excellence', desc: 'Striving for perfection in every detail of your special day.' },
  { label: 'Hospitality', desc: 'Treating every guest with warmth and personalized attention.' },
  { label: 'Innovation', desc: 'Blending tradition with contemporary luxury for unique experiences.' },
];

const AboutPage = () => {
  return (
    <div style={{ background: 'var(--lotus-void)', color: 'var(--lotus-primary-text)' }}>
      <Hero
        title="About Lotus"
        subtitle="The story behind Kerala's premier wedding & banquet hall"
        backgroundImage="/about-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]"
      />

      {/* Our Story */}
      <section className="py-24 md:py-32" style={{ background: 'var(--lotus-deep)' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">Who We Are</p>
              <h2 className="section-heading mb-8">Our Story</h2>
              <p className="lead-text mb-6">
                Founded in 2019, Lotus Wedding &amp; Banquet Hall was envisioned as a space where Kerala's timeless traditions could meet the comfort and style of modern celebrations.
              </p>
              <p className="mb-6" style={{ color: 'var(--lotus-secondary-text)', lineHeight: 1.8, fontWeight: 300 }}>
                Though our journey began just before the world faced an unexpected pause, the challenges of the pandemic became a moment of reflection and reinvention. In 2021, Lotus underwent a complete transformation, renovating its interiors, upgrading guest experiences, and reemerging as a premium wedding and event destination.
              </p>
              <p className="mb-6" style={{ color: 'var(--lotus-secondary-text)', lineHeight: 1.8, fontWeight: 300 }}>
                What began as a humble, family-run initiative has blossomed into one of the region's most trusted venues for weddings, receptions, and cultural gatherings. We've remained committed to offering not just a space, but an experience rich in heritage, elegance, and care.
              </p>
              <p style={{ color: 'var(--lotus-secondary-text)', lineHeight: 1.8, fontWeight: 300 }}>
                Today, Lotus continues to grow with a blend of traditional hospitality and modern sophistication, creating meaningful moments for every guest who walks through our doors.
              </p>
            </div>
            <div className="relative">
              <img
                src="/about/venue-history.jpg"
                alt="Lotus Venue History"
                className="rounded-sm w-full object-cover"
                style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}
                loading="eager"
                decoding="async"
              />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 -z-10" style={{ background: 'var(--lotus-gold)', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 md:py-32" style={{ background: 'var(--lotus-void)' }}>
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="section-label mb-4">What Drives Us</p>
            <h2 className="section-heading mx-auto mb-6">Our Core Values</h2>
            <p style={{ color: 'var(--lotus-muted)' }}>These principles guide everything we do at Lotus Wedding &amp; Banquet Hall.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.label} className="luxury-card p-8 text-center flex flex-col items-center gap-4 group hover:border-[var(--lotus-gold)] transition-colors duration-300">
                <div className="w-14 h-14 flex items-center justify-center rounded-sm border group-hover:border-[var(--lotus-gold)] transition-colors duration-300" style={{ borderColor: 'var(--lotus-border)', color: 'var(--lotus-gold)' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.5rem', fontWeight: 300 }}>{v.label[0]}</span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.25rem', fontWeight: 400, color: 'var(--lotus-primary-text)' }}>{v.label}</h3>
                <p style={{ color: 'var(--lotus-muted)', fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32" style={{ background: 'var(--lotus-deep)' }}>
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="section-label mb-4">The People</p>
            <h2 className="section-heading mx-auto mb-6">Meet Our Team</h2>
            <p style={{ color: 'var(--lotus-muted)' }}>The passionate professionals dedicated to making your event perfect.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-16 max-w-3xl mx-auto">
            {[
              { src: '/team/director.jpg', alt: 'Siraju Ettammal', name: 'Siraju Ettammal', role: 'Founder & Director', bio: 'Visionary behind Lotus, leading with tradition, trust, and hospitality excellence.' },
              { src: '/team/jmd.jpg', alt: 'Adil Siraju', name: 'Adil Siraju', role: 'JMD, Digital Strategy & Brand Experience', bio: "Driving Lotus's digital presence, design, and modern guest experience." },
            ].map((member) => (
              <div key={member.name} className="text-center flex flex-col items-center">
                <div className="relative mb-6 w-48 h-48 rounded-full overflow-hidden" style={{ border: '1px solid var(--lotus-border)' }}>
                  <OptimizedImage src={member.src} alt={member.alt} className="w-full h-full object-cover" width={192} height={192} />
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.35rem' }}>{member.name}</h3>
                <p className="mb-2" style={{ color: 'var(--lotus-gold)', fontSize: '0.8rem', letterSpacing: '0.08em', fontWeight: 400 }}>{member.role}</p>
                <p style={{ color: 'var(--lotus-muted)', maxWidth: '18rem', fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 300 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32" style={{ background: 'var(--lotus-void)' }}>
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="section-label mb-4">Since 2019</p>
            <h2 className="section-heading mx-auto mb-6">Our Journey</h2>
            <p style={{ color: 'var(--lotus-muted)' }}>Key milestones in the Lotus story over the years.</p>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-20 top-0 bottom-0 w-px" style={{ background: 'var(--lotus-border)' }} />
            <div className="flex flex-col gap-10">
              {timelineEvents.map((ev) => (
                <div key={ev.year} className="flex items-start gap-8">
                  <div className="shrink-0 w-16 text-right" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.1rem', fontWeight: 400, color: 'var(--lotus-gold)', paddingTop: '1rem' }}>{ev.year}</div>
                  <div className="shrink-0 relative z-10 mt-4" style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--lotus-gold)', marginLeft: '-1px' }} />
                  <div className="luxury-card p-6 flex-1">
                    <h3 className="mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.15rem', fontWeight: 400, color: 'var(--lotus-primary-text)' }}>{ev.title}</h3>
                    <p style={{ color: 'var(--lotus-muted)', fontSize: '0.875rem', lineHeight: 1.75, fontWeight: 300 }}>{ev.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

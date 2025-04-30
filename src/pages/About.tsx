
import React from 'react';
import Hero from '@/components/Hero';
import { OptimizedImage } from '@/components/ui/optimized-image';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Hero 
        title="About Lotus"
        subtitle="The story behind Kerala's premier wedding & banquet hall"
        backgroundImage="/about-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]" // Smaller height
      />
      
      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2019, Lotus Wedding & Banquet Hall was envisioned as a space where Kerala’s timeless traditions could meet the comfort and style of modern celebrations.
              </p>
              <p className="text-gray-600 mb-6">
                Though our journey began just before the world faced an unexpected pause, the challenges of the pandemic became a moment of reflection and reinvention. In 2021, Lotus underwent a complete transformation—renovating its interiors, upgrading guest experiences, and reemerging as a premium wedding and event destination.
              </p>
              <p className="text-gray-600 mb-6">
                Though our journey began just before the world faced an unexpected pause, the challenges of the pandemic became a moment of reflection and reinvention. In 2021, Lotus underwent a complete transformation—renovating its interiors, upgrading guest experiences, and reemerging as a premium wedding and event destination.
              </p>
              <p className="text-gray-600 mb-6">
                What began as a humble, family-run initiative has blossomed into one of the region’s most trusted venues for weddings, receptions, and cultural gatherings. Over the years, we’ve remained committed to offering not just a space, but an experience—rich in heritage, elegance, and care.
              </p>
              <p className="text-gray-600">
                Today, Lotus continues to grow with a blend of traditional hospitality and modern sophistication, creating meaningful moments for every guest who walks through our doors.
              </p>
            </div>            
            <div className="relative">
              <img 
                src="/about/venue-history.jpg" 
                alt="Lotus Venue History" 
                className="rounded-lg shadow-xl"
                loading="eager"
                decoding="async"
              />
              <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-lotus-gold rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-lotus-cream">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mx-auto">Our Core Values</h2>
            <p className="text-gray-600">
              These principles guide everything we do at Lotus Wedding & Banquet Hall.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lotus-navy text-white text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3">Tradition</h3>
              <p className="text-gray-600">Honoring Kerala's rich cultural heritage in every celebration we host.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lotus-navy text-white text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3">Excellence</h3>
              <p className="text-gray-600">Striving for perfection in every detail of your special day.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lotus-navy text-white text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3">Hospitality</h3>
              <p className="text-gray-600">Treating every guest with warmth and personalized attention.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lotus-navy text-white text-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3">Innovation</h3>
              <p className="text-gray-600">Blending tradition with contemporary luxury for unique experiences.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading mx-auto">Meet Our Team</h2>
            <p className="text-gray-600">
              The passionate professionals dedicated to making your event perfect.
            </p>
          </div>
            <div className="flex flex-col md:flex-row justify-center gap-16 max-w-3xl mx-auto">
            <div className="text-center flex flex-col items-center">              <div className="relative mb-6 w-48 h-48 rounded-full overflow-hidden">
                <OptimizedImage 
                  src="/team/director.jpg" 
                  alt="Siraju Ettammal - Director" 
                  className="w-full h-full object-cover"
                  width={192}
                  height={192}
                />
              </div>
              <h3 className="font-playfair text-xl font-medium">Siraju Ettammal</h3>
              <p className="text-lotus-navy font-medium mb-2">Founder & Director</p>
              <p className="text-gray-600 max-w-xs">Visionary behind Lotus, leading with tradition, trust, and hospitality excellence.</p>
            </div>
            
            <div className="text-center flex flex-col items-center">              <div className="relative mb-6 w-48 h-48 rounded-full overflow-hidden">
                <OptimizedImage 
                  src="/team/jmd.jpg" 
                  alt="Adil Siraju - JMD" 
                  className="w-full h-full object-cover"
                  width={192}
                  height={192}
                />
              </div>
              <h3 className="font-playfair text-xl font-medium">Adil Siraju</h3>
              <p className="text-lotus-navy font-medium mb-2">JMD - Digital Strategy & Brand Experience</p>
              <p className="text-gray-600 max-w-xs">Driving the Lotus’s digital presence, design, and modern guest experience.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Milestones */}
      <section className="py-20 bg-lotus-navy text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-4">Our Journey</h2>
            <p className="opacity-80">
              Key milestones in the Lotus story over the years.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/30"></div>
            
            {/* Timeline Items */}
            <div className="relative z-10">
              {/* 2019 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2019</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">The Beginning</h3>
                  <p className="opacity-80">Lotus Wedding & Banquet Hall was born in 2019 with a vision to create a premium space where families could celebrate life’s most important milestones in a setting rooted in tradition and elegance.</p>
                </div>
              </div>
              
              {/* 2020 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2020</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">The Challenge</h3>
                  <p className="opacity-80">Just as Lotus was finding its rhythm, the COVID-19 pandemic brought celebrations to a standstill. Like many in the industry, we paused operations—but used the time to reflect, adapt, and prepare for a stronger comeback.</p>
                </div>
              </div>
              
              {/* 2021 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2021</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">A New Chapter</h3>
                  <p className="opacity-80">Lotus reopened with a full-scale renovation, upgrading our interiors, lighting, kitchen, and guest amenities. We redesigned the entire venue to offer a more luxurious and spacious experience while staying true to our cultural essence.</p>
                </div>
              </div>
                {/* 2022 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2022</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Rebuilding Trust</h3>
                  <p className="opacity-80">With safety, quality, and hospitality at the forefront, 2022 marked the return of grand events. We began hosting weddings, receptions, and community gatherings once again—restoring confidence and joy among families.</p>
                </div>
              </div>

              {/* 2023 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2023</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Digital Innovation</h3>
                  <p className="opacity-80">We embraced technology with a complete digital transformation—launching our interactive website, virtual venue tours, and a comprehensive event planning portal to provide a seamless experience for our guests.</p>
                </div>
              </div>

              {/* 2024 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2024</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Sustainability Focus</h3>
                  <p className="opacity-80">Committed to environmental responsibility, we implemented eco-friendly practices across our operations—from energy-efficient lighting and water conservation to reducing single-use plastics and partnering with sustainable vendors.</p>
                </div>
              </div>

              {/* 2025 */}
              <div className="timeline-item">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2025</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Evolving With Vision</h3>
                  <p className="opacity-80">Now in 2025, Lotus stands as a symbol of resilience, grace, and excellence in wedding hospitality. With technology and tradition working hand in hand, we continue to innovate and serve with heart.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

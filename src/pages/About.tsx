
import React from 'react';
import Hero from '@/components/Hero';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Hero 
        title="About Lotus"
        subtitle="The story behind Kerala's premier wedding & banquet hall"
        backgroundImage="/about-hero.jpg"
      />
      
      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2005, Lotus Wedding & Banquet Hall began with a vision to create a venue that honors Kerala's rich cultural traditions while providing modern luxury and convenience for life's most special celebrations.
              </p>
              <p className="text-gray-600 mb-6">
                What started as a modest family-run banquet hall has grown into one of Kerala's most prestigious venues, hosting thousands of weddings and events over the years while maintaining the warm, personal touch that has been our hallmark from the beginning.
              </p>
              <p className="text-gray-600">
                Today, Lotus continues to blend traditional Kerala hospitality with contemporary elegance, creating memorable experiences for every guest who walks through our doors.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/about/venue-history.jpg" 
                alt="Lotus Venue History" 
                className="rounded-lg shadow-xl"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="/team/director.jpg" 
                  alt="Rajesh Menon - Director" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-medium">Rajesh Menon</h3>
              <p className="text-lotus-navy font-medium mb-2">Founder & Director</p>
              <p className="text-gray-600">With 20+ years of hospitality experience, Rajesh leads our team with passion and vision.</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="/team/event-manager.jpg" 
                  alt="Priya Thomas - Event Manager" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-medium">Priya Thomas</h3>
              <p className="text-lotus-navy font-medium mb-2">Event Manager</p>
              <p className="text-gray-600">Priya ensures every event runs flawlessly with meticulous attention to detail.</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="/team/chef.jpg" 
                  alt="Anoop Kumar - Head Chef" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-medium">Anoop Kumar</h3>
              <p className="text-lotus-navy font-medium mb-2">Head Chef</p>
              <p className="text-gray-600">Master of Kerala cuisine with expertise in both traditional and modern culinary arts.</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img 
                  src="/team/decor.jpg" 
                  alt="Lakshmi Nair - Decor Specialist" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-playfair text-xl font-medium">Lakshmi Nair</h3>
              <p className="text-lotus-navy font-medium mb-2">Decor Specialist</p>
              <p className="text-gray-600">Lakshmi transforms our spaces into magical settings that reflect your unique vision.</p>
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
              {/* 2005 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2005</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Founding of Lotus</h3>
                  <p className="opacity-80">Lotus Wedding Hall was established as a family-run venue with a capacity of 150 guests.</p>
                </div>
              </div>
              
              {/* 2010 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2010</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Major Expansion</h3>
                  <p className="opacity-80">Expanded our facilities to accommodate up to 300 guests and introduced our signature Kerala Sadhya catering services.</p>
                </div>
              </div>
              
              {/* 2015 */}
              <div className="timeline-item mb-16">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2015</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Award-Winning Venue</h3>
                  <p className="opacity-80">Recognized as Kerala's Best Wedding Venue and expanded our culinary offerings to include Malabar cuisine.</p>
                </div>
              </div>
              
              {/* 2020 */}
              <div className="timeline-item">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-lotus-gold text-white text-xl font-medium py-2 px-4 rounded-full">2020</div>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3 className="font-playfair text-xl font-medium mb-2">Luxury Renovation</h3>
                  <p className="opacity-80">Complete renovation and modernization of our facilities with increased capacity for up to 500 guests.</p>
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

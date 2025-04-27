
import React from 'react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const IndexPage = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919207102999', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        title="Elegant Celebrations & Cherished Memories"
        subtitle="Thalassery's premier wedding and event venue with traditional cuisine"
        backgroundImage="/hero-wedding.jpg"
        showBookButton={true}
      />
      
      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <h2 className="section-heading">Welcome to Lotus Wedding & Banquet Hall</h2>
              <p className="text-gray-600 mb-6">
                Located in the heart of Thalassery, just 150m from the railway station, Lotus Wedding & Banquet Hall offers a perfect blend of tradition and modern elegance for your special celebrations.
              </p>
              <p className="text-gray-600 mb-6">
                Since 2019, we've been helping families create cherished memories with our elegant venue, exceptional service, and authentic Kerala cuisine.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-primary" onClick={() => window.location.href='/gallery'}>
                  Explore Our Venue
                </Button>
                <Button className="btn-secondary" onClick={() => window.location.href='/contact'}>
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/venue-interior.jpg" 
                    alt="Lotus Wedding Hall Interior" 
                    className="w-full h-full object-cover animate-zoom-in"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-lg overflow-hidden shadow-lg hidden md:block">
                  <img 
                    src="/food-closeup.jpg" 
                    alt="Kerala Sadhya Food" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-lotus-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mx-auto">Our Exclusive Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From breathtaking celebrations to intimate gatherings, we offer a range of services to make your special day truly memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.5458C20.4041 14.1102 19.0288 13.0922 17.3998 12.916C17.3993 12.916 17.3988 12.916 17.3982 12.9159C16.5975 12.7926 15.7138 12.9956 15.0647 13.6447C14.3838 14.3256 14.2174 15.2665 14.3839 16.0973L14.4603 16.4729C13.9352 16.1752 13.3631 15.9683 12.7578 15.8658L12.7578 9.94521C14.4055 9.63711 15.6638 8.18753 15.6638 6.44218C15.6638 4.48029 14.0487 2.86523 12.0868 2.86523C10.1249 2.86523 8.50987 4.48029 8.50987 6.44218C8.50987 8.17966 9.75694 9.62388 11.3925 9.9409L11.3925 15.8658C9.08581 16.2159 7.26768 18.0341 7.26768 20.2307C7.26768 22.5887 9.18489 24.5059 11.5429 24.5059C13.4772 24.5059 15.1193 23.2427 15.6223 21.5049C16.9525 21.8605 18.6403 22.6394 19.7189 24.0446C19.8657 24.2385 20.0818 24.3462 20.3066 24.3462C20.4343 24.3462 20.5645 24.3143 20.6823 24.2467C20.9941 24.0683 21.1358 23.6969 21.0176 23.3589C20.3173 21.288 18.5957 20.0787 17.1369 19.3492C17.0322 19.2965 16.9286 19.2476 16.8267 19.202C16.6247 18.5922 16.2874 18.0463 15.8625 17.6011C15.5821 17.3068 15.26 17.0515 14.9086 16.8424L14.7921 16.2432C14.6825 15.6893 14.7773 15.13 15.1353 14.7152C15.4696 14.3269 15.9973 14.1849 16.4875 14.2596C17.7124 14.4077 18.8078 15.2638 19.3348 16.4714C19.4529 16.7427 19.7049 16.9157 19.9907 16.9157C20.0529 16.9157 20.1163 16.9085 20.1792 16.893C20.5338 16.797 20.7441 16.4349 20.6481 16.0803L21 15.5458Z" fill="#D4AF37"/>
              </svg>}
              title="Wedding Ceremonies"
              description="Our grand hall provides the perfect setting for your traditional wedding ceremony with all the elegance and grandeur it deserves."
            />
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.7 5H5.2C4.54772 5 4 5.54772 4 6.2V8.7C4 9.35229 4.54772 9.9 5.2 9.9H8.7C9.35229 9.9 9.9 9.35229 9.9 8.7V6.2C9.9 5.54772 9.35229 5 8.7 5Z" fill="#D4AF37"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.7 14.1H5.2C4.54772 14.1 4 14.6477 4 15.3V17.8C4 18.4523 4.54772 19 5.2 19H8.7C9.35229 19 9.9 18.4523 9.9 17.8V15.3C9.9 14.6477 9.35229 14.1 8.7 14.1Z" fill="#D4AF37"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.8 5H14.3C13.6477 5 13.1 5.54772 13.1 6.2V8.7C13.1 9.35229 13.6477 9.9 14.3 9.9H17.8C18.4523 9.9 19 9.35229 19 8.7V6.2C19 5.54772 18.4523 5 17.8 5Z" fill="#D4AF37"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.8 14.1H14.3C13.6477 14.1 13.1 14.6477 13.1 15.3V17.8C13.1 18.4523 13.6477 19 14.3 19H17.8C18.4523 19 19 18.4523 19 17.8V15.3C19 14.6477 18.4523 14.1 17.8 14.1Z" fill="#D4AF37"/>
              </svg>}
              title="Reception Parties"
              description="Celebrate your union with friends and family in our elegantly designed spaces perfect for memorable reception parties."
            />
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.0489 2.92705C11.3483 2.00574 12.6517 2.00574 12.9511 2.92705L14.2451 6.90983C14.379 7.32185 14.763 7.60081 15.1962 7.60081H19.3839C20.3527 7.60081 20.7554 8.84043 19.9717 9.40983L16.5838 11.8713C16.2333 12.126 16.0866 12.5773 16.2205 12.9894L17.5146 16.9721C17.814 17.8934 16.7595 18.6596 15.9757 18.0902L12.5878 15.6287C12.2373 15.374 11.7627 15.374 11.4122 15.6287L8.02426 18.0902C7.24054 18.6596 6.186 17.8934 6.48541 16.9721L7.7795 12.9894C7.91338 12.5773 7.76672 12.126 7.41623 11.8713L4.02827 9.40983C3.24455 8.84043 3.64732 7.60081 4.61606 7.60081H8.80379C9.23696 7.60081 9.62101 7.32185 9.75489 6.90983L11.0489 2.92705Z" fill="#D4AF37"/>
              </svg>}
              title="Special Celebrations"
              description="From milestone birthdays to corporate events, our versatile venue adapts to your special celebration needs."
            />
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.84828 8.84847C9.64245 8.05431 10.7996 7.6665 12 7.6665C13.2003 7.6665 14.3575 8.05431 15.1516 8.84847C15.9458 9.64264 16.3336 10.7998 16.3336 12.0002C16.3336 13.2005 15.9458 14.3577 15.1516 15.1518C14.3575 15.946 13.2003 16.3338 12 16.3338C10.7996 16.3338 9.64245 15.946 8.84828 15.1518C8.05412 14.3577 7.66631 13.2005 7.66631 12.0002C7.66631 10.7998 8.05412 9.64264 8.84828 8.84847ZM9.39848 14.6016C10.0343 15.2374 10.8995 15.5893 11.7998 15.5893C12.7001 15.5893 13.5654 15.2374 14.2012 14.6016C14.837 13.9658 15.1889 13.1005 15.1889 12.2002C15.1889 11.2999 14.837 10.4346 14.2012 9.79878C13.5654 9.16296 12.7001 8.81104 11.7998 8.81104C10.8995 8.81104 10.0343 9.16296 9.39848 9.79878C8.76266 10.4346 8.41074 11.2999 8.41074 12.2002C8.41074 13.1005 8.76266 13.9658 9.39848 14.6016Z" fill="#D4AF37"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM3.06667 12C3.06667 7.05446 7.05446 3.06667 12 3.06667C16.9455 3.06667 20.9333 7.05446 20.9333 12C20.9333 16.9455 16.9455 20.9333 12 20.9333C7.05446 20.9333 3.06667 16.9455 3.06667 12Z" fill="#D4AF37"/>
                <path stroke="#D4AF37" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.4999 11.9999H22.9999M1 11.9999H3.5M11.9999 20.4999V22.9999M11.9999 1V3.5"></path>
              </svg>}
              title="Kerala Sadhya"
              description="Experience the authentic flavors of traditional Kerala Sadhya served on banana leaves, prepared by our expert chefs."
            />
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.5454 2.5C17.9813 5.31331 19.1807 7.90455 21 9.83307C19.1807 11.7616 17.9813 14.3528 17.5454 17.1662C17.1094 14.3528 15.91 11.7616 14.0907 9.83307C15.91 7.90455 17.1094 5.31331 17.5454 2.5Z" fill="#D4AF37"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.45459 12.5C9.77254 14.5666 10.6255 16.4857 12 18C10.6255 19.5143 9.77254 21.4334 9.45459 23.5C9.13665 21.4334 8.2837 19.5143 6.90918 18C8.2837 16.4857 9.13665 14.5666 9.45459 12.5Z" fill="#D4AF37"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.45459 6.5C6.62944 7.64887 7.0898 8.72554 7.81777 9.66667C7.0898 10.6078 6.62944 11.6845 6.45459 12.8333C6.27973 11.6845 5.81937 10.6078 5.0914 9.66667C5.81937 8.72554 6.27973 7.64887 6.45459 6.5Z" fill="#D4AF37"/>
              </svg>}
              title="Malabar Cuisine"
              description="Delight your guests with the rich and aromatic flavors of authentic Malabar cuisine crafted with traditional recipes."
            />
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#D4AF37">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10H21M6 14H8M11 14H13M3 7.8L3 16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3L7.8 3C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8Z" />
              </svg>}
              title="Event Planning"
              description="Our experienced team helps coordinate every detail of your event, ensuring a seamless and stress-free experience."
            />
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mx-auto">Glimpses of Celebration</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our beautiful venue spaces and past celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 overflow-hidden rounded-lg relative group">
              <img 
                src="/gallery/wedding-hall.jpg" 
                alt="Decorated Wedding Hall" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <div className="overflow-hidden rounded-lg relative group">
              <img 
                src="/gallery/table-setting.jpg" 
                alt="Elegant Table Setting" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <div className="overflow-hidden rounded-lg relative group">
              <img 
                src="/gallery/sadhya.jpg" 
                alt="Traditional Kerala Sadhya" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <div className="md:col-span-2 overflow-hidden rounded-lg relative group">
              <img 
                src="/gallery/reception.jpg" 
                alt="Wedding Reception" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button className="btn-primary" onClick={() => window.location.href='/gallery'}>
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-lotus-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mx-auto">Client Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read what our clients have to say about their experience with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="The venue was breathtaking, and the Kerala Sadhya was absolutely delicious. Our guests are still talking about how wonderful everything was!"
              author="Priya & Rahul"
              role="Wedding Reception"
            />
            <TestimonialCard
              quote="The staff at Lotus were attentive to every detail, making our corporate event truly exceptional. The space is elegant and the service impeccable."
              author="Suresh Kumar"
              role="Corporate Event"
            />
            <TestimonialCard
              quote="We couldn't have asked for a more beautiful venue for our special day. The Malabar cuisine was outstanding, and the team took care of everything."
              author="Deepa & Arun"
              role="Wedding Ceremony"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-lotus-navy text-white">
        <div className="container mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">Ready to Plan Your Special Event?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to schedule a venue tour or to discuss how we can make your celebration truly memorable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-lotus-gold hover:bg-lotus-gold/90 text-white px-8 py-6 text-lg"
            >
              Book Now
            </Button>
            <Button 
              onClick={() => window.location.href='/contact'}
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Instagram, MapPin, PhoneCall, Mail } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      eventType: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Format the message for WhatsApp
      const formattedMessage = `
*New Inquiry from Website*
---------------------------
*Name:* ${values.name}
*Email:* ${values.email}
*Phone:* ${values.phone || 'Not provided'}
*Event Date:* ${values.eventDate || 'Not provided'}
*Event Type:* ${values.eventType || 'Not provided'}
---------------------------
*Message:*
${values.message}
      `;
      
      // Encode for URL
      const encodedMessage = encodeURIComponent(formattedMessage);
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/919207102999?text=${encodedMessage}`;
      
      // Show success message
      toast({
        title: "Redirecting to WhatsApp",
        description: "You'll be redirected to WhatsApp to send your message.",
      });
      
      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');
      
      form.reset();
    } catch (error: any) {
      console.error('Failed to process form:', error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem processing your request. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Hello! I would like to inquire about your venue and services.";
    window.open(`https://wa.me/919207102999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{ background: 'var(--lotus-void)', color: 'var(--lotus-primary-text)' }}>
      <Hero 
        title="Contact Us"
        subtitle="Reach out to discuss your event or schedule a venue tour"
        backgroundImage="/contact-hero.jpg"
        height="min-h-[50vh] lg:min-h-[60vh]"
      />
      
      <section className="py-24 md:py-32" style={{ background: 'var(--lotus-deep)' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Get in Touch Section */}
            <div>
              <p className="section-label mb-4">We're Here</p>
              <h2 className="section-heading mb-6">Get in Touch</h2>
              <p className="mb-8" style={{ color: 'var(--lotus-muted)' }}>
                Have a question or want to book our venue? Reach out to us using any of the methods below or fill out the contact form.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <MapPin className="h-5 w-5" />, label: 'Location', content: <span style={{ color: 'var(--lotus-muted)' }}>Near Railway Station, Thalassery, Kerala, India - 670101</span> },
                  { icon: <PhoneCall className="h-5 w-5" />, label: 'Phone', content: (<><span style={{ color: 'var(--lotus-muted)' }}>+91 920 710 2999</span><br /><Button variant="link" className="text-[var(--lotus-gold)] p-0 h-auto font-medium text-sm" onClick={handleWhatsAppClick}>Contact on WhatsApp</Button></>) },
                  { icon: <Mail className="h-5 w-5" />, label: 'Email', content: <span style={{ color: 'var(--lotus-muted)' }}>lotusweddinghall@gmail.com</span> },
                  { icon: <Instagram strokeWidth={1.5} className="h-5 w-5" />, label: 'Instagram', content: <a href="https://www.instagram.com/lotusweddinghall" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lotus-gold)' }} className="hover:underline">@lotusweddinghall</a> },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-sm border" style={{ borderColor: 'var(--lotus-border)', color: 'var(--lotus-gold)' }}>{item.icon}</div>
                    <div>
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--lotus-secondary-text)', letterSpacing: '0.05em' }}>{item.label}</p>
                      <div>{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 luxury-card p-6">
                <p className="text-sm mb-4" style={{ color: 'var(--lotus-gold)', letterSpacing: '0.15em', fontWeight: 400, textTransform: 'uppercase' }}>Business Hours</p>
                <div className="flex justify-between" style={{ color: 'var(--lotus-secondary-text)', fontSize: '0.9rem' }}>
                  <span>Monday through Sunday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="luxury-card p-8">
                <h2 className="mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 400 }}>Send us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="eventDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Date (Optional)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type (Optional)</FormLabel>
                          <FormControl>
                            <select
                              id="eventType"
                              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
                              style={{ background: 'var(--lotus-surface)', borderColor: 'var(--lotus-border)', color: 'var(--lotus-primary-text)' }}
                              {...field}
                            >
                              <option value="">Select Event Type</option>
                              <option value="Wedding">Wedding</option>
                              <option value="Reception">Reception</option>
                              <option value="Corporate Event">Corporate Event</option>
                              <option value="Birthday Celebration">Birthday Celebration</option>
                              <option value="Other">Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              rows={5} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="btn-primary w-full py-6" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" color="white" className="mr-2" />
                          Processing...
                        </>
                      ) : "Send via WhatsApp"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16" style={{ background: 'var(--lotus-void)' }}>
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="section-heading mx-auto mb-4">Visit Our Venue</h2>
            <p style={{ color: 'var(--lotus-muted)' }}>Find us at the heart of Thalassery, near the Railway Station</p>
          </div>
          <div className="rounded-sm overflow-hidden h-[400px] md:h-[500px] relative" style={{ border: '1px solid var(--lotus-border)' }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--lotus-surface)' }}>
              <LoadingSpinner size="lg" />
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.145304390272!2d75.49123757592926!3d11.754812488459844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba42779a8cf3017%3A0xc57e010b220f9efd!2sLotus%20Wedding%20%26%20Banquet%20Hall!5e0!3m2!1sen!2sin!4v1745989385836!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              onLoad={(e) => e.currentTarget.parentElement?.querySelector('.absolute')?.remove()}
              title="Lotus Wedding Hall Location"
              aria-label="Google Maps showing Lotus Wedding Hall location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default ContactPage;

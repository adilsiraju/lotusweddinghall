
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || '';
    const eventDate = formData.get('eventDate') as string || '';
    const eventType = formData.get('eventType') as string || '';
    const message = formData.get('message') as string;
    
    // Create formatted message for WhatsApp
    const whatsappMessage = encodeURIComponent(
      `*New Inquiry from Website*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Phone:* ${phone}\n` +
      `*Event Date:* ${eventDate}\n` +
      `*Event Type:* ${eventType}\n\n` +
      `*Message:*\n${message}`
    );
    
    // WhatsApp phone number - Indian format (omitting the + prefix)
    const whatsappNumber = "919207102999";
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
    // Show toast notification
    toast({
      title: "Message Ready!",
      description: "Redirecting you to WhatsApp to send your message.",
      duration: 5000,
    });
    
    // Reset form
    form.reset();
    setIsSubmitting(false);
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="w-full"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="+91 98765 43210"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <Input
            id="eventDate"
            name="eventDate"
            type="date"
            className="w-full"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
          Event Type
        </label>
        <select
          id="eventType"
          name="eventType"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-lotus-navy focus:ring-lotus-navy p-2"
        >
          <option value="">Select Event Type</option>
          <option value="wedding">Wedding</option>
          <option value="reception">Reception</option>
          <option value="corporate">Corporate Event</option>
          <option value="birthday">Birthday Celebration</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us more about your event..."
          required
          className="w-full"
          rows={5}
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-lotus-navy hover:bg-lotus-navy/90 text-white px-6"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Preparing Message..." : "Send via WhatsApp"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

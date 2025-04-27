
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit the form data to a backend service
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
      duration: 5000,
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
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
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

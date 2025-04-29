
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventDate?: string;
  eventType?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const formData: ContactFormData = await req.json();
    const { name, email, phone, eventDate, eventType, message } = formData;

    // Validate form data
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Event Date:</strong> ${eventDate || 'Not provided'}</p>
      <p><strong>Event Type:</strong> ${eventType || 'Not provided'}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    // Send email
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`
      },
      body: JSON.stringify({
        from: 'Lotus Wedding Hall <website@lotusweddinghall.com>',
        to: ['lotusweddinghall@gmail.com'],
        subject: `[Website Contact] ${eventType ? eventType : 'New Inquiry'}`,
        html: emailContent,
        reply_to: email
      })
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Email sending failed:', emailResult);
      throw new Error(`Failed to send email: ${emailResult.message || 'Unknown error'}`);
    }

    console.log('Email sent successfully:', emailResult);

    // Send confirmation email to the user
    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`
      },
      body: JSON.stringify({
        from: 'Lotus Wedding Hall <website@lotusweddinghall.com>',
        to: [email],
        subject: 'Thank you for contacting Lotus Wedding & Banquet Hall',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>For urgent inquiries, please call us at +91 920 710 2999.</p>
          <br>
          <p>Warm regards,</p>
          <p><strong>Lotus Wedding & Banquet Hall</strong></p>
          <p>Thalassery, Kerala</p>
        `
      })
    });

    const confirmationResult = await confirmationResponse.json();
    console.log('Confirmation email sent:', confirmationResult);

    return new Response(
      JSON.stringify({ success: true, id: emailResult.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

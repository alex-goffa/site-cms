'use client';

import { useState } from 'react';

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      // Prepare form data object for submission
      const formValues = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string, 
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || '',
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
        submittedAt: new Date()
      };
      
      // For now just log the data
      console.log('Contact form submission:', formValues);
      
      // In a real application, you would make an API call here
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(formValues),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      
      // Reset the form
      event.currentTarget.reset();
      
      // Show success message
      setSubmitStatus('success');
      
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Clear error status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">Contact Us</h2>
      <p className="mb-8 lg:mb-10 text-center text-gray-500 sm:text-lg">
        Got a question about SoM Academy? Want to join our program? Let's talk!
      </p>
      
      {submitStatus === 'success' && (
        <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          <span className="font-medium">Thank you!</span> Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          <span className="font-medium">Error!</span> There was a problem sending your message. Please try again.
        </div>
      )}
      
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div>
            <div className="mb-2 block">
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 md:gap-6">
          <div>
            <div className="mb-2 block">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@email.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone (optional)</label>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>
        
        <div>
          <div className="mb-2 block">
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
          </div>
          <input
            type="text"
            id="subject"
            name="subject"
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Let us know how we can help you"
            required
          />
        </div>
        
        <div className="sm:col-span-2">
          <div className="mb-2 block">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
          </div>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Leave a comment..."
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300"
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  );
}

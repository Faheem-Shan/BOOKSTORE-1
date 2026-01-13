import React, { useState } from 'react';
import Title from '../components/Title';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    // Updates state based on the input's 'name' attribute
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple check to ensure fields aren't empty
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }
    
    // In a real app, this is where you'd use fetch/axios to send the data to a server
    console.log('Form Submitted:', formData); 
    
    // Clear the form after submission
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <section className="max-padd-container py-12 bg-gray-50">
      <Title text="Get in Touch" />
      
      {/* Contact Form Container */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Email: bookly@gmail.com | Phone: +91-9876543210
      </p>
    </section>
  );
};

export default Contact;
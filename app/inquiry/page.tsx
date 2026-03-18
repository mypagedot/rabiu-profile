'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

// Define types for form data
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  location: string;
  website: string;
  description: string;
  services: string[];
  budget: string;
}

export default function InquiryPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    location: '',
    website: '',
    description: '',
    services: [],
    budget: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle text/email/number/textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes (services)
  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service),
    }));
  };

  // Handle radio changes (budget)
  const handleBudgetChange = (value: string) => {
    setFormData(prev => ({ ...prev, budget: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.businessName || !formData.location || !formData.description || formData.services.length === 0 || !formData.budget) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        businessName: '',
        location: '',
        website: '',
        description: '',
        services: [],
        budget: '',
      });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Service options
  const serviceOptions = [
    { value: 'mobile', label: 'Mobile App (corporate, professional and enterprises)' },
    { value: 'web', label: 'Web app (corporate, professional and enterprises)' },
    { value: 'desktop', label: 'Desktop app (corporate, professional and enterprises)' },
    { value: 'brand', label: 'Visual brand system design' },
  ];

  // Budget options
  const budgetOptions = ['$500-$1000', '$1100-$2000', '$3000-$6000'];

  return (
    <>
      {/* Simple header matching the site's style */}
      <header className="bg-[#1a1a2e] py-4 shadow-lg">
        <div className="container mx-auto px-6">
          <Link href="/" className="text-2xl md:text-3xl font-extrabold text-[#1dc9b7] font-montserrat tracking-tight">
            Rabiu<span className="text-white font-semibold">SM</span>
          </Link>
        </div>
      </header>

      <main className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4 text-center relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              Start Your Project Inquiry
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Tell me about your vision – I'll get back to you within 24 hours.
            </p>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you! Your inquiry has been sent successfully.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                Something went wrong. Please try again or contact me directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row: Full Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1dc9b7] focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1dc9b7] focus:border-transparent outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Row: Phone & Business Name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1dc9b7] focus:border-transparent outline-none transition"
                    placeholder="+234 912 323 4431"
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1dc9b7] focus:border-transparent outline-none transition"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>

              {/* Row: Location & Website (optional) */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Where are you based? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1dc9b7] focus:border-transparent outline-none transition"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website or Social Media (optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1dc9b7] focus:border-transparent outline-none transition"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Description (textarea) */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell me about you and your business <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1dc9b7] focus:border-transparent outline-none transition"
                  placeholder="Please include as much detail as possible about you and your business, your goals, and the problem you're trying to solve..."
                />
              </div>

              {/* Services (checkboxes) */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-3">
                  What service are you looking for? (you can choose more than one) <span className="text-red-500">*</span>
                </span>
                <div className="space-y-2">
                  {serviceOptions.map(service => (
                    <label key={service.value} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        value={service.value}
                        checked={formData.services.includes(service.value)}
                        onChange={(e) => handleServiceChange(service.value, e.target.checked)}
                        className="w-5 h-5 text-[#1dc9b7] border-gray-300 rounded focus:ring-[#1dc9b7]"
                      />
                      <span className="text-gray-700">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget (radio) */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-3">
                  What’s your estimated budget? <span className="text-red-500">*</span>
                </span>
                <div className="space-y-2">
                  {budgetOptions.map(option => (
                    <label key={option} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="budget"
                        value={option}
                        checked={formData.budget === option}
                        onChange={(e) => handleBudgetChange(e.target.value)}
                        className="w-5 h-5 text-[#1dc9b7] border-gray-300 focus:ring-[#1dc9b7]"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting this form, you agree to be contacted regarding your inquiry.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="bg-[#1a1a2e] text-white py-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Rabiu Sani Muhammad. All rights reserved.
        </p>
      </footer>
    </>
  );
}
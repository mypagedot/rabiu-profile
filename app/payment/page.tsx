// app/services/payment/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PaymentPage() {
  const [selectedPackage, setSelectedPackage] = useState('corporate');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Package data
  const packages = {
    corporate: {
      name: 'Corporate Package',
      price: '₦200,000',
      description: 'Logo, basic brand guidelines, stationery, social kit, basic website',
    },
    professional: {
      name: 'Professional Package',
      price: '₦750,000',
      description: 'Complete brand identity, guidelines, marketing collateral, 5‑page website',
    },
    enterprise: {
      name: 'Enterprise Package',
      price: '₦1,500,000+',
      description: 'Custom solution including everything in Professional plus advanced development',
    },
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPackage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    // Get form field values
    const fullname = (document.getElementById('fullname') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
    const address = (document.getElementById('address') as HTMLInputElement)?.value;
    const notes = (document.getElementById('notes') as HTMLTextAreaElement)?.value;

    if (!fullname || !email || !phone || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    const selected = packages[selectedPackage as keyof typeof packages];

    // Compose email body
    const subject = encodeURIComponent(`Bank Transfer Order: ${selected.name}`);
    const body = encodeURIComponent(
      `Order Details:\n\n` +
      `Package: ${selected.name}\n` +
      `Price: ${selected.price}\n` +
      `Description: ${selected.description}\n\n` +
      `Customer Information:\n` +
      `Full Name: ${fullname}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Billing Address: ${address}\n` +
      `Additional Notes: ${notes || 'None'}\n\n` +
      `Please make a bank transfer to:\n` +
      `Bank: Access Bank\n` +
      `Account Name: Rabiu Muhammad Sani\n` +
      `Account Number: 1493971518\n` +
      `Sort Code: 011\n\n` +
      `After transfer, reply to this email with the payment receipt attached to confirm your order.`
    );

    // Open default email client
    window.location.href = `mailto:aljauromanee@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 py-4 shadow-lg backdrop-blur-md">
        <div className="container mx-auto px-5 max-w-7xl">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-extrabold text-[#1dc9b7] font-['Montserrat'] tracking-tight"
            >
              Rabiu<span className="text-white font-semibold">SM</span>
            </Link>
            <ul className="hidden md:flex items-center space-x-2 lg:space-x-5">
              <li>
                <Link href="/" className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-5 lg:px-7 py-2 lg:py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-[#1dc9b7] hover:to-[#0f9b8e] transition-all duration-300 hover:-translate-y-0.5">
                  Let's Talk
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* Payment Hero */}
        <section
          className="relative text-white py-16 md:py-20 bg-cover bg-center bg-fixed overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(22,33,62,0.9) 100%), url(/assets/images/hero-bg-img.jpg)',
          }}
        >
          <div className="container mx-auto px-5 max-w-7xl relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 font-['Montserrat']">
              Bank Transfer Payment
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Complete your purchase by selecting a package and providing your billing details. After submission, you'll receive instructions via email.
            </p>
          </div>
        </section>

        {/* Payment Form */}
        <section className="container mx-auto px-5 max-w-4xl py-16">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Package Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#16213e] mb-4 flex items-center gap-2">
                <i className="fas fa-cube text-[#0f9b8e]"></i> Select Package
              </h2>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <label htmlFor="package" className="block text-gray-700 font-medium mb-2">
                    Choose your package
                  </label>
                  <select
                    id="package"
                    value={selectedPackage}
                    onChange={handlePackageChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]"
                  >
                    <option value="corporate">Corporate – ₦200,000</option>
                    <option value="professional">Professional – ₦750,000</option>
                    <option value="enterprise">Enterprise – from ₦1,500,000</option>
                  </select>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#16213e]">{packages[selectedPackage as keyof typeof packages].name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{packages[selectedPackage as keyof typeof packages].description}</p>
                  <p className="text-xl font-bold text-[#0f9b8e] mt-2">{packages[selectedPackage as keyof typeof packages].price}</p>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#16213e] mb-4 flex items-center gap-2">
                <i className="fas fa-user text-[#0f9b8e]"></i> Billing Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                    Billing Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bank Transfer Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#16213e] mb-4 flex items-center gap-2">
                <i className="fas fa-university text-[#0f9b8e]"></i> Bank Transfer Details
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">Please make a bank transfer to:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>Bank:</strong> Access Bank
                  </li>
                  <li>
                    <strong>Account Name:</strong> Rabiu Muhammad Sani
                  </li>
                  <li>
                    <strong>Account Number:</strong> 1493971518
                  </li>
                  <li>
                    <strong>Sort Code:</strong> 011
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  After completing the transfer, click the button below to send us an email with your order details. Please attach the payment receipt to the email.
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#16213e] mb-3 flex items-center gap-2">
                <i className="fas fa-file-invoice text-[#0f9b8e]"></i> Order Summary
              </h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>{packages[selectedPackage as keyof typeof packages].name}</span>
                <span className="font-semibold">{packages[selectedPackage as keyof typeof packages].price}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>VAT (included)</span>
                <span>₦0</span>
              </div>
              <div className="border-t border-gray-300 my-3 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#0f9b8e]">{packages[selectedPackage as keyof typeof packages].price}</span>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-[#0f9b8e]"
                />
                <span className="text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#0f9b8e] hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#0f9b8e] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Submit Bank Transfer Request
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white pt-16 pb-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCwwIEwxMDAsMCBMMTAwLDEwMCBaIiBmaWxsPSIjMGY5YjhlIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')`,
          }}
        ></div>
        <div className="container mx-auto px-5 max-w-7xl relative z-10">
          <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div className="footer-column">
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">Rabiu Sani Muhammad</h3>
              <p className="text-gray-300 mb-5 leading-relaxed">
                Professional Full Brand Designer specializing in comprehensive visual identity systems, UI/UX design, and
                strategic brand development for businesses of all sizes.
              </p>
              <div className="social-links flex gap-4">
                {['behance', 'dribbble', 'linkedin-in', 'instagram', 'twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex items-center justify-center w-11 h-11 bg-white/10 rounded-full text-white border border-white/20 transition hover:bg-[#1dc9b7] hover:-translate-y-1 hover:scale-110"
                  >
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-column">
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About Me' },
                  { href: '/portfolio', label: 'Portfolio' },
                  { href: '/services', label: 'Services' },
                  { href: '/skills', label: 'Skills' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                      <i className="fas fa-chevron-right text-xs"></i> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">Contact Info</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:aljauromanee@gmail.com" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-envelope w-5"></i> aljauromanee@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+2349123234431" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-phone-alt w-5"></i> +234 91 23234431
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-map-marker-alt w-5"></i> FCT, Abuja, Nigeria
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-globe w-5"></i> Available for International Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright text-center pt-8 border-t border-white/20 text-gray-400 text-sm">
            <p>&copy; 2026 Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Professional Brand Design Portfolio</p>
          </div>
        </div>
      </footer>
    </>
  );
}
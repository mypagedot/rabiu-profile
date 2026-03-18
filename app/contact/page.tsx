// app/contact/page.tsx
'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 50) {
        headerRef.current.classList.add('py-3', 'bg-[#1a1a2e]/98');
        headerRef.current.classList.remove('py-[18px]', 'bg-[#1a1a2e]/95');
      } else {
        headerRef.current.classList.remove('py-3', 'bg-[#1a1a2e]/98');
        headerRef.current.classList.add('py-[18px]', 'bg-[#1a1a2e]/95');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form submission (Formspree)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mleqvzoo', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  // FAQ toggle
  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => (prev === index ? null : index));
  };

  // ----- AI Chat Widget Component -----
  const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
      { text: "Hi! I'm your virtual assistant. How can I help you today?", sender: 'bot' },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const knowledgeBase: { keywords: string[]; response: string }[] = [
      {
        keywords: ['services', 'what do you do', 'offer', 'provide'],
        response:
          'I offer professional brand design services including: Brand Identity (logo, color palette, typography), UI/UX Design for web and mobile, and complete Web Design. You can check my Services page for more details.',
      },
      {
        keywords: ['portfolio', 'work', 'projects', 'examples'],
        response:
          'You can view my recent projects on the Portfolio page. I have work in brand identity, web design, and UI/UX. Would you like me to guide you there?',
      },
      {
        keywords: ['contact', 'email', 'phone', 'reach', 'call'],
        response:
          'You can reach me at aljauromanee@gmail.com or call +234 912 323 4431. I typically respond within 24 hours.',
      },
      {
        keywords: ['price', 'cost', 'budget', 'pricing', 'quote'],
        response:
          'Pricing depends on the project scope. For a brand identity package, prices start around ₦150,000. Web design projects vary. Please fill out the contact form with your requirements for a custom quote.',
      },
      {
        keywords: ['time', 'timeline', 'how long', 'duration'],
        response:
          'Typical timelines: Brand identity takes 2-3 weeks, website design 3-5 weeks, depending on complexity and feedback speed. I can provide a more accurate estimate after discussing your project.',
      },
      {
        keywords: ['process', 'how work', 'step', 'method'],
        response:
          'My process: 1) Discovery & research, 2) Concept development, 3) Design & iterations, 4) Final delivery with brand guidelines. I involve you at every stage to ensure the result matches your vision.',
      },
      {
        keywords: ['location', 'based', 'where', 'abuja'],
        response:
          "I'm based in FCT, Abuja, Nigeria, but I work with clients worldwide through remote collaboration. I'm also available for in-person meetings in major Nigerian cities by appointment.",
      },
      {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: 'Hello! How can I assist you with your design needs today?',
      },
    ];

    const getBotResponse = (userMessage: string): string => {
      const lowerMsg = userMessage.toLowerCase();
      for (const item of knowledgeBase) {
        if (item.keywords.some(keyword => lowerMsg.includes(keyword))) {
          return item.response;
        }
      }
      return "I'm not sure I understood. Could you rephrase? You can also email me directly at aljauromanee@gmail.com for specific inquiries.";
    };

    const handleSend = () => {
      if (!input.trim()) return;
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      setInput('');
      setIsTyping(true);
      setTimeout(() => {
        const botReply = getBotResponse(input);
        setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
        setIsTyping(false);
      }, 800);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
            aria-label="Open chat"
            title="Open chat"
          >
            <i className="fas fa-comment-dots text-2xl"></i>
          </button>
        )}

        {isOpen && (
          <div className="absolute bottom-0 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col" style={{ maxHeight: '500px' }}>
            <div className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <i className="fas fa-robot"></i>
                <span className="font-semibold">Design Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white" aria-label="Close chat" title="Close chat">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3" style={{ minHeight: '300px', maxHeight: '350px' }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                    <i className="fas fa-ellipsis-h animate-pulse"></i>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 p-3 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f9b8e]/50 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg transition"
                aria-label="Send message"
                title="Send message"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  // ----- End Chat Widget -----

  return (
    <>
      {/* Custom CSS for pseudo-elements and gradients */}
      <style jsx>{`
        .nav-link-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background: #1dc9b7;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after {
          width: 70%;
        }
        .step-number-bg {
          background: linear-gradient(135deg, #0f9b8e 0%, #1dc9b7 100%);
        }
        .portfolio-overlay-bg {
          background: linear-gradient(transparent, rgba(15, 155, 142, 0.8));
        }
        .featured-case-bg {
          background: radial-gradient(circle at 20% 50%, rgba(15, 155, 142, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(29, 201, 183, 0.1) 0%, transparent 50%);
        }
        .testimonial-quote::before {
          content: '"';
          position: absolute;
          font-size: 3rem;
          color: #1dc9b7;
          opacity: 0.3;
          font-family: serif;
          top: -20px;
          left: -10px;
        }
        .testimonial-quote::after {
          content: '"';
          position: absolute;
          font-size: 3rem;
          color: #1dc9b7;
          opacity: 0.3;
          font-family: serif;
          bottom: -40px;
          right: -10px;
        }
      `}</style>

      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg transition-all duration-300 py-[18px]"
      >
        <div className="max-w-7xl mx-auto px-5">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="logo text-[#1dc9b7] text-3xl font-extrabold no-underline font-['Montserrat',sans-serif] tracking-tight"
            >
              Rabiu<span className="text-white font-semibold">SM</span>
            </Link>
            <ul
              className={`nav-links ${
                mobileMenuOpen ? 'flex' : 'hidden'
              } md:flex absolute md:static top-full left-0 w-full md:w-auto bg-[#1a1a2e] md:bg-transparent flex-col md:flex-row list-none gap-6 items-center p-6 md:p-0 shadow-lg md:shadow-none z-50 transition-all duration-300`}
            >
              <li>
                <Link
                  href="/"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative block md:inline-block"
                  onClick={closeMobileMenu}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="nav-cta bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] rounded-[30px] px-[22px] py-2 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block md:inline-block text-center active"
                  onClick={closeMobileMenu}
                >
                  Let's Talk
                </Link>
              </li>
            </ul>
            <button
              className="mobile-menu block md:hidden text-2xl text-white bg-transparent border-0 p-1 z-[1001]"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>
        </div>
      </header>

      {/* Contact Hero */}
      <section
        className="relative bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/85 bg-cover bg-center bg-fixed text-white py-32 md:py-40 mb-20 overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/CTA1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 featured-case-bg"></div>
        <div className="container max-w-7xl mx-auto px-5 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-['Montserrat',sans-serif] uppercase tracking-wide drop-shadow-lg">
              Let's{' '}
              <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:-bottom-2 after:left-0 after:rounded">
                Connect
              </span>{' '}
              & Create Something Amazing
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Ready to transform your brand with professional design? Reach out for a consultation, request a quote, or just say hello. I'm here to help bring your vision to life.
            </p>
            <div className="flex gap-5 justify-center flex-wrap">
              <a
                href="mailto:aljauromanee@gmail.com"
                className="btn inline-flex items-center justify-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10"
              >
                <i className="fas fa-paper-plane"></i> Send a Message
              </a>
              <a
                href="tel:+2349123234431"
                className="btn-outline inline-flex items-center justify-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
              >
                <i className="fas fa-calendar-alt"></i> Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Get In Touch
          </h2>

          <div className="contact-container grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="contact-form-container bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="form-title text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-8">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="youremail@example.com"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+234 912 323 4431"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-semibold text-[#16213e] mb-2">Project Type</label>
                  <div className="project-type-options grid grid-cols-2 gap-3">
                    {[
                      { id: 'mobile', label: 'Mobile App' },
                      { id: 'fintech', label: 'Fintech Solutions' },
                      { id: 'branding', label: 'Brand Identity' },
                      { id: 'uiux', label: 'UI/UX Design' },
                      { id: 'web', label: 'Web Design' },
                      { id: 'other', label: 'Other Specify' },
                    ].map((type) => (
                      <div key={type.id} className="project-type-option">
                        <input
                          type="radio"
                          name="project-type"
                          id={type.id}
                          value={type.id}
                          checked={selectedType === type.id}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="hidden"
                        />
                        <label
                          htmlFor={type.id}
                          className={`block text-center py-3 px-2 rounded-xl border-2 cursor-pointer font-medium transition-all ${
                            selectedType === type.id
                              ? 'bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white border-transparent'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#0f9b8e] hover:-translate-y-1'
                          }`}
                        >
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition appearance-none"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-100k">Under ₦500,000</option>
                    <option value="100k-300k">₦500,000 - ₦1,000,000</option>
                    <option value="300k-500k">₦1,000,000 - ₦2,000,000</option>
                    <option value="over-500k">Above ₦2,000,000</option>
                    <option value="other">Other Specify</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn w-full inline-flex items-center justify-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus === 'success' && (
                  <div className="text-center text-green-600 bg-green-50 p-3 rounded-lg">
                    Thank you! I'll respond within 24 hours.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="text-center text-red-600 bg-red-50 p-3 rounded-lg">
                    Something went wrong. Please try again or email directly.
                  </div>
                )}

                <p className="text-center text-gray-500 text-sm">
                  I typically respond within 24 hours during business days.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-container space-y-8">
              {/* Contact Info Card */}
              <div className="contact-info-card bg-white rounded-3xl p-8 md:p-10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className="contact-info-header flex items-center mb-6">
                  <div className="contact-info-icon w-16 h-16 rounded-full bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-2xl mr-5">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">Contact Information</h3>
                </div>

                <div className="contact-details space-y-5">
                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-envelope text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Email Address</p>
                      <a href="mailto:aljauromanee@gmail.com" className="text-gray-600 hover:text-[#0f9b8e] transition">
                        aljauromanee@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-phone-alt text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Phone Number</p>
                      <a href="tel:+2349123234431" className="text-gray-600 hover:text-[#0f9b8e] transition">
                        +234 912 323 4431
                      </a>
                    </div>
                  </div>

                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-map-marker-alt text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Location</p>
                      <p className="text-gray-600">FCT, Abuja, Nigeria</p>
                    </div>
                  </div>

                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-globe text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Availability</p>
                      <p className="text-gray-600">Available for local and international projects</p>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Buttons */}
                <div className="direct-contact-buttons mt-8 space-y-3">
                  <a
                    href="mailto:aljauromanee@gmail.com?subject=Design%20Inquiry&body=Hello%20Rabiu,%20I%20would%20like%20to%20discuss%20a%20design%20project."
                    className="direct-contact-btn flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-green-500 group hover:bg-green-500 hover:text-white hover:border-l-green-600"
                  >
                    <i className="fas fa-envelope text-green-600 group-hover:text-white"></i>
                    Send Email
                  </a>
                  <a
                    href="https://wa.me/2349123234431?text=Hello%20Rabiu,%20I'm%20interested%20in%20your%20design%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-contact-btn flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-[#25D366] group hover:bg-[#25D366] hover:text-white hover:border-l-[#128C7E]"
                  >
                    <i className="fab fa-whatsapp text-[#25D366] group-hover:text-white"></i>
                    WhatsApp Message
                  </a>
                  <a
                    href="tel:+2349123234431"
                    className="direct-contact-btn flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-blue-500 group hover:bg-blue-500 hover:text-white hover:border-l-blue-600"
                  >
                    <i className="fas fa-phone-alt text-blue-500 group-hover:text-white"></i>
                    Direct Call
                  </a>
                  <a
                    href="sms:+2349123234431?body=Hello%20Rabiu,%20I'm%20interested%20in%20your%20design%20services."
                    className="direct-contact-btn flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-purple-500 group hover:bg-purple-500 hover:text-white hover:border-l-purple-600"
                  >
                    <i className="fas fa-sms text-purple-500 group-hover:text-white"></i>
                    Send SMS
                  </a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="contact-info-card bg-white rounded-3xl p-8 md:p-10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className="contact-info-header flex items-center mb-6">
                  <div className="contact-info-icon w-16 h-16 rounded-full bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-2xl mr-5">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">Working Hours</h3>
                </div>

                <div className="contact-details space-y-4">
                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-calendar-day text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Monday - Friday</p>
                      <p className="text-gray-600">9:00 AM - 5:00 PM (WAT)</p>
                    </div>
                  </div>

                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-calendar-week text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Saturday</p>
                      <p className="text-gray-600">10:00 AM - 3:00 PM (WAT)</p>
                    </div>
                  </div>

                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-calendar-times text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Sunday</p>
                      <p className="text-gray-600">Available for urgent projects only</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <i className="fas fa-info-circle text-[#0f9b8e] mt-0.5"></i>
                    For urgent projects outside working hours, please email with "URGENT" in the subject line.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section mb-24">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Frequently Asked Questions
          </h2>

          <div className="faq-container space-y-4">
            {[
              {
                q: "What's your typical response time for new project inquiries?",
                a: "I typically respond within 24 hours during business days. For urgent inquiries, please include \"URGENT\" in your email subject line or call my direct line. I make it a priority to get back to potential clients as quickly as possible to discuss their project needs.",
              },
              {
                q: "Do you work with international clients?",
                a: "Yes, absolutely! I work with clients from all over the world. I'm experienced in remote collaboration and use tools like Zoom, Slack, and Figma to ensure seamless communication regardless of location. Time zone differences are not a problem - I'm flexible with scheduling.",
              },
              {
                q: "What information should I provide when requesting a quote?",
                a: "To provide an accurate quote, please include: your business overview and goals, target audience details, project scope and specific requirements, desired timeline/deadline, and budget range if you have one. The more details you can provide initially, the more accurate my proposal will be.",
              },
              {
                q: "What's included in your design packages?",
                a: "My packages typically include: initial consultation and research, concept development, design creation, revisions based on feedback, final file delivery in all required formats, and basic brand guidelines. Exact deliverables vary by project type - see my Services page for detailed package information.",
              },
              {
                q: "How do you handle project revisions?",
                a: "I include a specific number of revision rounds in each project package (usually 2-3 rounds). This ensures the project stays on track while giving you ample opportunity to provide feedback. All revisions are managed systematically, and I provide clear timelines for each revision phase.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`faq-item bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all ${
                  faqOpen === idx ? 'shadow-lg' : ''
                }`}
              >
                <button
                  className="faq-question w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(idx)}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-[#16213e]">{item.q}</h3>
                  <i
                    className={`fas fa-chevron-down text-[#0f9b8e] transition-transform duration-300 ${
                      faqOpen === idx ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                <div
                  className={`faq-answer px-6 transition-all duration-500 overflow-hidden ${
                    faqOpen === idx ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            My Location
          </h2>

          <div className="map-container bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl overflow-hidden shadow-2xl min-h-[400px] flex items-center justify-center text-white">
            <div className="map-placeholder text-center p-10 max-w-lg">
              <i className="fas fa-map-marked-alt text-6xl text-[#1dc9b7] mb-6"></i>
              <h3 className="text-3xl font-bold mb-4">Based in FCT, Abuja, Nigeria</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Serving clients locally in Nigeria and internationally. While I'm based in FCT, Abuja, I work with clients from Lagos to London, and everywhere in between through remote collaboration.
              </p>
              <p className="mt-6 text-white/90 flex items-center justify-center gap-2">
                <i className="fas fa-plane"></i>
                Available for in-person consultations in major Nigerian cities by appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/95 bg-cover bg-center text-white py-24 relative overflow-hidden" style={{ backgroundImage: "url('/assets/images/CTA1.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat',sans-serif]">Ready to Start Your Design Project?</h3>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Don't wait to transform your brand. Whether you need a complete brand identity, a website redesign, or strategic design consultation, I'm here to help you achieve your goals. Let's schedule a call to discuss your project.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="mailto:aljauromanee@gmail.com?subject=Design%20Project%20Inquiry&body=Hello%20Rabiu,%20I%20would%20like%20to%20discuss%20a%20design%20project."
              className="btn inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
            >
              <i className="fas fa-paper-plane"></i> Send Email Now
            </a>
            <a
              href="https://wa.me/2349123234431?text=Hello%20Rabiu,%20I'm%20interested%20in%20your%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp Me Directly
            </a>
            <a
              href="tel:+2349123234431"
              className="btn-outline inline-flex items-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition"
            >
              <i className="fas fa-phone-alt"></i> Call Me Directly
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white pt-16 pb-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCwwIEwxMDAsMCBMMTAwLDEwMCBaIiBmaWxsPSIjMGY5YjhlIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div className="footer-column">
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">Rabiu Sani Muhammad</h3>
              <p className="text-gray-300 mb-5 leading-relaxed">
                Professional Full Brand Designer specializing in comprehensive visual identity systems, UI/UX design, and strategic brand development for businesses of all sizes.
              </p>
              <div className="social-links flex gap-4">
                {[
                  { href: 'https://wa.me/2349123234431', icon: 'fab fa-whatsapp' },
                  { href: 'https://dribbble.com', icon: 'fab fa-dribbble' },
                  { href: 'https://linkedin.com', icon: 'fab fa-linkedin-in' },
                  { href: 'https://instagram.com', icon: 'fab fa-instagram' },
                  { href: 'https://twitter.com', icon: 'fab fa-twitter' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 bg-white/10 rounded-full text-white border border-white/20 transition hover:bg-[#1dc9b7] hover:-translate-y-1 hover:scale-110"
                  >
                    <i className={social.icon}></i>
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
                    <i className="fas fa-phone-alt w-5"></i> +234 912 323 4431
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

      {/* AI Chat Widget */}
      <ChatWidget />
    </>
  );
}
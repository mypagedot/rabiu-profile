'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SpeakingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  // Form submission (FormSubmit.co)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/rabiusm001@gmail.com', {
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
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Topic selection styling
  const [selectedTopic, setSelectedTopic] = useState<string>('');

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
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg transition-all duration-300 py-4.5"
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
                  className="nav-cta bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] rounded-[30px] px-5.5 py-2 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block md:inline-block text-center"
                  onClick={closeMobileMenu}
                >
                  Invite to Speak
                </Link>
              </li>
            </ul>
            <button
              className="mobile-menu block md:hidden text-2xl text-white bg-transparent border-0 p-1 z-1001"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-linear-to-br from-[#1a1a2e]/80 to-[#16213e]/85 bg-cover bg-center bg-fixed text-white py-32 md:py-40 mb-20 overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/CTA1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 featured-case-bg"></div>
        <div className="container max-w-7xl mx-auto px-5 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-['Montserrat',sans-serif] uppercase tracking-wide drop-shadow-lg">
              Invite Me to{' '}
              <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-linear-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:-bottom-2 after:left-0 after:rounded">
                Speak
              </span>{' '}
              at Your Event
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
              As a Mobile Software Engineer and Visual Brand System Designer, I share insights on mobile development, design systems, and the intersection of code and creativity. Book me for your next conference, workshop, or corporate event—globally.
            </p>
            <div className="flex gap-5 justify-center flex-wrap">
              <a
                href="#booking-form"
                className="btn inline-flex items-center justify-center gap-2 px-9 py-4 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10"
              >
                <i className="fas fa-microphone"></i> Request Speaking Engagement
              </a>
              <a
                href="#topics"
                className="btn-outline inline-flex items-center justify-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
              >
                <i className="fas fa-lightbulb"></i> Explore Topics
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Topics Section */}
      <section id="topics" className="topics-section mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Popular Speaking Topics
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fas fa-mobile-alt',
                title: 'Modern Mobile Development',
                description: 'Cross-platform strategies (React Native, Flutter), performance optimization, and publishing workflows for iOS and Android.'
              },
              {
                icon: 'fas fa-paint-brush',
                title: 'Visual Brand Systems',
                description: 'Building scalable design systems that bridge brand identity and development—from logos to component libraries.'
              },
              {
                icon: 'fas fa-code',
                title: 'Code as a Design Tool',
                description: 'How software engineering principles can enhance design processes and create more robust user experiences.'
              },
              {
                icon: 'fas fa-users-cog',
                title: 'Design-Developer Collaboration',
                description: 'Bridging the gap between design and engineering teams for smoother handoffs and better products.'
              },
              {
                icon: 'fas fa-rocket',
                title: 'From Idea to App Store',
                description: 'A step‑by‑step guide to launching a mobile app—concept, design, development, and deployment.'
              },
              {
                icon: 'fas fa-cubes',
                title: 'Component-Driven Design',
                description: 'Creating reusable UI components that maintain brand consistency across web and mobile platforms.'
              }
            ].map((topic, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-2xl mb-6">
                  <i className={topic.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">{topic.title}</h3>
                <p className="text-gray-600 leading-relaxed">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Bio / Why Invite Me */}
      <section className="bio-section mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-linear-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-10 md:p-16 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Montserrat',sans-serif]">
                  Why Invite <span className="text-[#1dc9b7]">Rabiu</span>?
                </h2>
                <div className="space-y-4 text-white/90 text-lg">
                  <p>
                    I bring a unique blend of hands‑on software engineering and professional brand design. With over 8 years of experience shipping mobile apps and building visual identities for startups and enterprises, my talks are grounded in real‑world practice—not just theory.
                  </p>
                  <p>
                    Whether your audience is technical, creative, or mixed, I tailor content to be accessible and actionable. Past engagements include tech conferences, design meetups, and corporate innovation days across Africa, Europe, and online.
                  </p>
                  <p>
                    I speak in English and am comfortable with both in‑person and virtual events. Let’s create an inspiring session for your attendees.
                  </p>
                </div>
              </div>
              <div className="relative h-80 md:h-auto">
                <div className="absolute inset-0 bg-[#1dc9b7]/20 rounded-3xl filter blur-3xl"></div>
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="text-3xl font-bold text-[#1dc9b7]">15+</div>
                    <div className="text-sm uppercase tracking-wider mt-1">Events Worldwide</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="text-3xl font-bold text-[#1dc9b7]">5k+</div>
                    <div className="text-sm uppercase tracking-wider mt-1">Attendees Reached</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="text-3xl font-bold text-[#1dc9b7]">100%</div>
                    <div className="text-sm uppercase tracking-wider mt-1">Positive Feedback</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="text-3xl font-bold text-[#1dc9b7]">20+</div>
                    <div className="text-sm uppercase tracking-wider mt-1">Workshops Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="booking-section mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Request a Speaking Engagement
          </h2>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Booking Form */}
            <div className="booking-form-container bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="form-title text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-8">Event Details</h3>
              <form onSubmit={handleSubmit} className="contact-form space-y-6">
                {/* Honeypot and other FormSubmit.co settings */}
                <input type="text" name="_honey" style={{ display: 'none' }} aria-label="Honeypot field" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Speaking Inquiry from Website" />
                <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" /> {/* Update with actual thank you page */}

                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g., Alex Johnson"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="organizer@event.com"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Phone Number (with country code)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+1 234 567 8900"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventName" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    required
                    placeholder="e.g., TechCon 2025"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventDate" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Proposed Date(s) *
                  </label>
                  <input
                    type="text"
                    id="eventDate"
                    name="eventDate"
                    required
                    placeholder="e.g., May 10-12, 2025 (flexible)"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="eventLocation" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Event Location (City, Country or Virtual) *
                  </label>
                  <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    required
                    placeholder="e.g., London, UK (or Virtual)"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="audienceSize" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Expected Audience Size
                  </label>
                  <select
                    id="audienceSize"
                    name="audienceSize"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition appearance-none"
                  >
                    <option value="">Select approximate size</option>
                    <option value="<50">Less than 50</option>
                    <option value="50-200">50–200</option>
                    <option value="200-500">200–500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-semibold text-[#16213e] mb-2">
                    Topic(s) of Interest *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'mobile-dev', label: 'Mobile Development' },
                      { id: 'brand-systems', label: 'Brand Systems' },
                      { id: 'design-dev', label: 'Design + Dev' },
                      { id: 'ui-ux', label: 'UI/UX Design' },
                      { id: 'workshop', label: 'Hands‑on Workshop' },
                      { id: 'custom', label: 'Custom Topic' },
                    ].map((topic) => (
                      <div key={topic.id} className="topic-option">
                        <input
                          type="checkbox"
                          name="topics"
                          id={topic.id}
                          value={topic.label}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={topic.id}
                          className="block text-center py-3 px-2 rounded-xl border-2 cursor-pointer font-medium transition-all bg-gray-50 border-gray-200 text-gray-700 hover:border-[#0f9b8e] hover:-translate-y-1 peer-checked:bg-linear-to-r peer-checked:from-[#0f9b8e] peer-checked:to-[#1dc9b7] peer-checked:text-white peer-checked:border-transparent"
                        >
                          {topic.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Honorarium / Budget Range (if applicable)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition appearance-none"
                  >
                    <option value="">Select range</option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-3000">$1,000–$3,000</option>
                    <option value="3000-5000">$3,000–$5,000</option>
                    <option value="5000+">$5,000+</option>
                    <option value="volunteer">Volunteer / Non‑profit</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-semibold text-[#16213e] mb-2">
                    Additional Details / Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your event, the audience, what you'd like me to cover, and any other relevant information..."
                    className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#0f9b8e] focus:ring-2 focus:ring-[#0f9b8e]/20 focus:bg-white transition resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn w-full inline-flex items-center justify-center gap-2 px-9 py-4 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Speaking Request'}
                </button>

                {formStatus === 'success' && (
                  <div className="text-center text-green-600 bg-green-50 p-3 rounded-lg">
                    Thank you! I'll respond within 48 hours.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="text-center text-red-600 bg-red-50 p-3 rounded-lg">
                    Something went wrong. Please email me directly at rabiusm001@gmail.com
                  </div>
                )}

                <p className="text-center text-gray-500 text-sm">
                  I typically reply within 48 hours. For urgent inquiries, please use the contact methods below.
                </p>
              </form>
            </div>

            {/* Contact Information & Speaker Kit */}
            <div className="contact-info-container space-y-8">
              <div className="contact-info-card bg-white rounded-3xl p-8 md:p-10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                <div className="contact-info-header flex items-center mb-6">
                  <div className="contact-info-icon w-16 h-16 rounded-full bg-linear-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-2xl mr-5">
                    <i className="fas fa-address-card"></i>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">Speaker Contact</h3>
                </div>

                <div className="contact-details space-y-5">
                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-envelope text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Email</p>
                      <a href="mailto:rabiusm001@gmail.com" className="text-gray-600 hover:text-[#0f9b8e] transition">
                        rabiusm001@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-phone-alt text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Phone / WhatsApp</p>
                      <a href="tel:+2349123234431" className="text-gray-600 hover:text-[#0f9b8e] transition">
                        +234 912 323 4431
                      </a>
                    </div>
                  </div>

                  <div className="contact-detail flex gap-4">
                    <i className="fas fa-globe text-[#0f9b8e] text-xl mt-1"></i>
                    <div>
                      <p className="font-semibold text-[#16213e]">Based in</p>
                      <p className="text-gray-600">Abuja, Nigeria (available worldwide)</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <a
                    href="mailto:rabiusm001@gmail.com?subject=Speaker%20Inquiry&body=Hello%20Rabiu,%20I'd%20like%20to%20invite%20you%20to%20speak%20at..."
                    className="direct-contact-btn flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-green-500 group hover:bg-green-500 hover:text-white hover:border-l-green-600"
                  >
                    <i className="fas fa-envelope text-green-600 group-hover:text-white"></i>
                    Send Email Directly
                  </a>
                  <a
                    href="https://wa.me/2349123234431?text=Hello%20Rabiu,%20I'm%20interested%20in%20having%20you%20speak%20at%20our%20event."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-contact-btn flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-gray-50 border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-[#25D366] group hover:bg-[#25D366] hover:text-white hover:border-l-[#128C7E]"
                  >
                    <i className="fab fa-whatsapp text-[#25D366] group-hover:text-white"></i>
                    WhatsApp Me
                  </a>
                </div>
              </div>

              {/* Speaker Kit Card */}
              
              {/* Speaker Kit Card */}
<div className="contact-info-card bg-white rounded-3xl p-8 md:p-10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
  <div className="contact-info-header flex items-center mb-6">
    <div className="contact-info-icon w-16 h-16 rounded-full bg-linear-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-2xl mr-5">
      <i className="fas fa-file-alt"></i>
    </div>
    <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e]">Booking Deposit Payment</h3>
  </div>
  <p className="text-gray-600 mb-6">
    Pay a 40% deposit to secure your speaking engagement. This deposit confirms your booking and allows me to reserve the date for your event. The remaining balance can be settled closer to the event date.
  </p>
  <a
    href="/pay"
    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f9b8e] text-white rounded-xl hover:bg-[#1dc9b7] transition"
  >
    <i className="fas fa-credit-card"></i> Proceed to Deposit Payment
  </a>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section mb-24">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Speaking FAQs
          </h2>

          <div className="faq-container space-y-4">
            {[
              {
                q: "Do you speak at virtual events?",
                a: "Absolutely! I'm well‑equipped for virtual keynotes, panels, and workshops. I use high‑quality audio/video and can work with platforms like Zoom, Hopin, or your preferred tool.",
              },
              {
                q: "What are your technical requirements for in‑person talks?",
                a: "I typically need a projector/screen, HDMI connection, a lapel microphone, and reliable internet if doing a live demo. I bring my own laptop. For workshops, power outlets for attendees are helpful.",
              },
              {
                q: "Do you charge for travel?",
                a: "For international events, I request travel and accommodation to be covered. For virtual events, there's no travel cost. My honorarium varies based on event type, duration, and location—let's discuss!",
              },
              {
                q: "Can you tailor a talk specifically for our audience?",
                a: "Yes, I love customizing content! After understanding your audience's background and goals, I adapt examples, depth, and takeaways to make the session as relevant as possible.",
              },
              {
                q: "How far in advance should I book?",
                a: "Ideally 4–6 weeks ahead, but I'm open to last‑minute requests if my schedule allows. Reach out and I'll do my best to accommodate.",
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

      {/* Map / Global Reach Section */}
      <section className="map-section mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            I Speak Worldwide
          </h2>

          <div className="map-container bg-linear-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl overflow-hidden shadow-2xl min-h-100 flex items-center justify-center text-white">
            <div className="map-placeholder text-center p-10 max-w-lg">
              <i className="fas fa-globe-americas text-6xl text-[#1dc9b7] mb-6"></i>
              <h3 className="text-3xl font-bold mb-4">Based in Abuja, Available Globally</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                I've spoken at events across Nigeria, Ghana, Kenya, and virtually to audiences in Europe and North America. Whether you're in Lagos, London, or anywhere else, I'm ready to travel or connect online.
              </p>
              <p className="mt-6 text-white/90 flex items-center justify-center gap-2">
                <i className="fas fa-passport"></i>
                Passport valid for international travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="contact-cta bg-linear-to-br from-[#1a1a2e]/90 to-[#16213e]/95 bg-cover bg-center text-white py-24 relative overflow-hidden" style={{ backgroundImage: "url('/assets/images/CTA1.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat',sans-serif]">Let's Create an Unforgettable Session</h3>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Whether it's a keynote, workshop, or panel, I'm passionate about sharing knowledge and inspiring audiences. Fill out the form above or reach out directly—I'd love to hear about your event.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="mailto:rabiusm001@gmail.com?subject=Speaker%20Inquiry&body=Hello%20Rabiu,%20I'd%20like%20to%20discuss%20having%20you%20speak%20at%20our%20event."
              className="btn inline-flex items-center gap-2 px-9 py-4 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
            >
              <i className="fas fa-paper-plane"></i> Email Me Now
            </a>
            <a
              href="https://wa.me/2349123234431?text=Hello%20Rabiu,%20I'm%20interested%20in%20having%20you%20speak%20at%20our%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp Me
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
                Mobile Software Engineer & Visual Brand System Designer. I help teams build better products through code, design, and speaking.
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
                  { href: '/contact', label: 'Speaking' },
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
                  <a href="mailto:rabiusm001@gmail.com" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-envelope w-5"></i> rabiusm001@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+2349123234431" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-phone-alt w-5"></i> +234 912 323 4431
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-map-marker-alt w-5"></i> Abuja, Nigeria (Worldwide)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2">
                    <i className="fas fa-globe w-5"></i> Available for International Events
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright text-center pt-8 border-t border-white/20 text-gray-400 text-sm">
            <p>&copy; 2026 Rabiu Sani Muhammad. All Rights Reserved. | Speaker & Designer</p>
          </div>
        </div>
      </footer>
    </>
  );
}
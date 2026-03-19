'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ----- Industrial Services (for clients) -----
const industrialServices = [
  {
    id: 'mobile-app-dev',
    title: 'Mobile Application Development',
    description:
      'End‑to‑end mobile app development for iOS and Android. From concept to App Store – I build high‑performance, scalable apps tailored to your business needs.',
    icon: 'fa-mobile-alt',
    features: [
      'Native iOS (Swift) & Android (Kotlin)',
      'Cross‑platform (React Native / Flutter)',
      'Backend integration & APIs',
      'App Store & Play Store deployment',
      'Maintenance & support',
    ],
  },
  {
    id: 'visual-brand-system',
    title: 'Visual Brand System Designer',
    description:
      'Complete brand identity that communicates your unique value. I design cohesive visual systems that work across digital and print.',
    icon: 'fa-paint-brush',
    features: [
      'Logo design & variations',
      'Color palette & typography',
      'Brand guidelines documentation',
      'Stationery & marketing materials',
      'Design system for digital products',
    ],
  },
  {
    id: 'ui-ux-wireframing',
    title: 'UI/UX Wireframing & Prototyping',
    description:
      'User‑centered design for mobile apps. I create wireframes, interactive prototypes, and high‑fidelity UI that align with platform guidelines.',
    icon: 'fa-drafting-compass',
    features: [
      'User research & personas',
      'Wireframes (low to high fidelity)',
      'Interactive prototypes (Figma)',
      'Usability testing',
      'Design handoff for developers',
    ],
  },
];

// ----- Training Packages (for learners) -----
const trainingPackages = [
  {
    id: 'become-mobile-engineer',
    title: 'Become a Mobile Software Engineer – Full Package',
    description:
      'Master both native and cross‑platform development. Build real‑world apps, learn backend integration, and get career support.',
    icon: 'fa-code',
    duration: '16 weeks',
    priceNGN: 1200000,
    modules: [
      {
        name: 'Programming Fundamentals',
        topics: [
          'Swift & Kotlin basics',
          'Object‑oriented programming',
          'Data structures & algorithms',
        ],
      },
      {
        name: 'Native iOS Development',
        topics: [
          'UIKit & SwiftUI',
          'Auto Layout & navigation',
          'Core Data & networking',
        ],
      },
      {
        name: 'Native Android Development',
        topics: [
          'Activities, fragments, intents',
          'Material Design & Jet pack',
          'Room database & Retrofit',
        ],
      },
      {
        name: 'Cross‑Platform (React Native)',
        topics: [
          'React Native components',
          'State management',
          'Native modules',
        ],
      },
      {
        name: 'Backend & APIs',
        topics: [
          'REST & GraphQL',
          'Firebase (Auth, Fire store)',
          'Cloud functions',
        ],
      },
      {
        name: 'Deployment & Career',
        topics: [
          'App store submission',
          'Portfolio building',
          'CV & interview prep',
        ],
      },
    ],
  },
  {
    id: 'become-brand-designer',
    title: 'Become a Visual Brand System Designer – Full Package',
    description:
      'Learn to create complete brand identities from scratch. Includes logo design, color theory, typography, and brand guidelines.',
    icon: 'fa-paint-brush',
    duration: '10 weeks',
    priceNGN: 850000,
    modules: [
      {
        name: 'Brand Strategy',
        topics: [
          'Brand positioning',
          'Audience analysis',
          'Mood boards & inspiration',
        ],
      },
      {
        name: 'Logo Design',
        topics: [
          'Sketching & conceptualisation',
          'Vectorisation (Illustrator)',
          'Logo variations & lockups',
        ],
      },
      {
        name: 'Color & Typography',
        topics: [
          'Color theory & psychology',
          'Palette creation',
          'Type pairing & hierarchy',
        ],
      },
      {
        name: 'Brand Guidelines',
        topics: [
          'Document structure',
          'Usage rules',
          'Tone of voice',
        ],
      },
      {
        name: 'Real‑World Applications',
        topics: [
          'Stationery design',
          'Digital mockups',
          'Final asset delivery',
        ],
      },
    ],
  },
  {
    id: 'become-uiux-designer',
    title: 'Become a UI/UX Designer – Full Package',
    description:
      'Design intuitive mobile experiences. Cover wireframing, prototyping, user research, and design systems.',
    icon: 'fa-pencil-ruler',
    duration: '12 weeks',
    priceNGN: 1000000,
    modules: [
      {
        name: 'UX Fundamentals',
        topics: [
          'User research methods',
          'Personas & journey maps',
          'Information architecture',
        ],
      },
      {
        name: 'Wireframing & Prototyping',
        topics: [
          'Low‑fidelity wireframes',
          'Interactive prototypes (Figma)',
          'Usability testing',
        ],
      },
      {
        name: 'Visual UI Design',
        topics: [
          'iOS HIG & Material Design',
          'Color, typography, spacing',
          'Components & icons',
        ],
      },
      {
        name: 'Design Systems',
        topics: [
          'Design tokens',
          'Component libraries',
          'Documentation',
        ],
      },
      {
        name: 'Portfolio & Career',
        topics: [
          'Case study creation',
          'Portfolio presentation',
          'Interview preparation',
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith('#') && target.hash.length > 1) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth',
          });
        }
      }
    };
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      (anchor as HTMLAnchorElement).addEventListener('click', handleAnchorClick as EventListener);
    });
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        (anchor as HTMLAnchorElement).removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1a1a2e]/98 py-3 shadow-lg backdrop-blur-md'
            : 'bg-[#1a1a2e]/95 py-4'
        }`}
      >
        <div className="container mx-auto px-5 max-w-7xl">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-extrabold text-[#1dc9b7] font-['Montserrat'] tracking-tight"
            >
              Rabiu<span className="text-white font-semibold">SM</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-2 lg:space-x-5">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%] active:after:w-[70%] active:text-[#1dc9b7]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-5 lg:px-7 py-2 lg:py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-[#1dc9b7] hover:to-[#0f9b8e] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Let's Talk
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white text-2xl focus:outline-none z-50"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-[#1a1a2e]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-6 text-xl">
              <Link href="/" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link href="/about" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMobileMenu}>
                About
              </Link>
              <Link href="/portfolio" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMobileMenu}>
                Portfolio
              </Link>
              <Link href="/services" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMobileMenu}>
                Services
              </Link>
              <Link href="/skills" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMobileMenu}>
                Skills
              </Link>
              <Link
                href="/contact"
                className="bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-3 rounded-full font-semibold"
                onClick={closeMobileMenu}
              >
                Let's Talk
              </Link>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section - FIXED: added background image and overlay styling */}
        <section
          className="relative text-white py-20 md:py-24 bg-cover bg-center bg-fixed overflow-hidden mb-20"
          style={{ backgroundImage: "url('/assets/images/hero-bg-img.jpg')" }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
          <div className="container mx-auto px-5 max-w-7xl relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-['Montserrat'] uppercase tracking-wide drop-shadow-lg">
                Professional{' '}
                <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:-bottom-2 after:left-0 after:rounded">
                  Services
                </span>{' '}
                & Learning Paths
              </h2>
          
              <div className="flex gap-5 justify-center flex-wrap">
                <a
                  href="#industrial"
                  className="btn inline-flex items-center justify-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10"
                >
                  <i className="fas fa-briefcase"></i> Industrial Services
                </a>
                <a
                  href="#training"
                  className="btn-outline inline-flex items-center justify-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
                >
                  <i className="fas fa-graduation-cap"></i> Training Packages
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Services Section */}
        <section id="industrial" className="container mx-auto px-5 max-w-7xl mb-24">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Industrial Services
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 text-lg leading-relaxed">
            Professional services for businesses and startups. Let’s build something great together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industrialServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] p-6 text-white">
                  <div className="flex items-center gap-4">
                    <i className={`fas ${service.icon} text-3xl`}></i>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4 text-sm text-gray-500">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-[#0f9b8e] mt-1 text-xs"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/package?service=${encodeURIComponent(service.title)}`}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a2e] text-white font-semibold rounded-lg hover:bg-[#0f9b8e] transition-colors duration-300 group"
                  >
                    Get a quote
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Training Packages Section */}
        <section id="training" className="container mx-auto px-5 max-w-7xl mb-24">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Training Packages
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 text-lg leading-relaxed">
            Structured learning paths with detailed curricula, hands‑on projects, and mentorship.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] p-6 text-white">
                  <div className="flex items-center gap-4">
                    <i className={`fas ${pkg.icon} text-3xl`}></i>
                    <h3 className="text-xl font-bold">{pkg.title}</h3>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-clock"></i>
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold">
                      <i className="fas fa-tag"></i>
                      <span>₦{pkg.priceNGN.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-1">
                    {pkg.modules.map((module, idx) => (
                      <div key={idx} className="border-l-2 border-[#0f9b8e] pl-3">
                        <h4 className="font-semibold text-[#16213e] text-sm mb-1">{module.name}</h4>
                        <ul className="space-y-1 text-xs text-gray-500">
                          {module.topics.map((topic, tidx) => (
                            <li key={tidx} className="flex items-start gap-1.5">
                              <i className="fas fa-circle text-[0.3rem] text-[#0f9b8e] mt-1.5"></i>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/payment?package=${encodeURIComponent(pkg.title)}`}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a2e] text-white font-semibold rounded-lg hover:bg-[#0f9b8e] transition-colors duration-300 group"
                  >
                    Start learning
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Process */}
        <section className="work-process container mx-auto px-5 max-w-7xl mb-24">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            My Learning & Mentorship Process
          </h2>
          <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-16">
            Every learning journey follows a structured path that ensures you gain practical skills
            and confidence. Here's how we'll work together.
          </p>
          <div className="process-steps grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'Discovery & Goal Setting',
                desc: 'We discuss your current level, career aspirations, and tailor the curriculum to your needs.',
              },
              {
                number: '02',
                title: 'Structured Learning',
                desc: 'You follow the module‑by‑module plan with hands‑on exercises, projects, and regular check‑ins.',
              },
              {
                number: '03',
                title: 'Real‑World Projects',
                desc: 'Apply your skills to build portfolio‑ready projects that demonstrate your new abilities.',
              },
              {
                number: '04',
                title: 'Career Support',
                desc: 'Get help with your CV, portfolio presentation, and interview preparation to land your dream role.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="process-step bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#0f9b8e] hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
              >
                <div className="step-number w-14 h-14 rounded-full bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] text-white text-xl font-bold flex items-center justify-center mx-auto mb-5">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[#16213e] mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages CTA */}
        <section className="packages-cta container mx-auto px-5 max-w-7xl mb-24 text-center">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-8 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Not Sure Which Path to Take?
          </h2>
          <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-12">
            Book a free 30‑minute consultation. We'll discuss your background and goals, and I'll
            recommend the perfect learning package for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fas fa-calendar-check"></i> Schedule a Free Call
          </Link>
        </section>

        {/* Services CTA */}
        <section className="services-cta bg-linear-to-br from-[#1a1a2e] to-[#16213e] text-white py-24 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCwwIEwxMDAsMCBMMTAwLDEwMCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] bg-cover"></div>
          <div className="container mx-auto px-5 max-w-4xl text-center relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat']">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you want to become a mobile engineer or a brand designer, I'm here to guide
              you step by step. Let's build your future together.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link
                href="/portfolio"
                className="btn inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fas fa-eye"></i> View Student Work
              </Link>
              <Link
                href="/contact"
                className="btn-outline inline-flex items-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
              >
                <i className="fas fa-calendar-check"></i> Book Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white pt-16 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover footer-pattern"></div>
        <div className="container mx-auto px-5 max-w-7xl relative z-10">
          <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div className="footer-column">
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">Rabiu Sani Muhammad</h3>
              <p className="text-gray-300 mb-5 leading-relaxed">
                Mobile Software Engineer & Visual Brand System Designer. I also mentor aspiring
                developers and designers through structured career packages.
              </p>
              <div className="social-links flex gap-4">
                {['behance', 'dribbble', 'linkedin-in', 'instagram', 'twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    title={`Visit ${social}`}
                    aria-label={`Visit ${social}`}
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
                    <i className="fas fa-globe w-5"></i> Available for International Students
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright text-center pt-8 border-t border-white/20 text-gray-400 text-sm">
            <p>
              &copy; 2026 Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Mentorship &
              Training Portfolio
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
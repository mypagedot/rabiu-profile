'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
                  className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-5 lg:px-7 py-2 lg:py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-[#1dc9b7] hover:to-[#0f9b8e] transition-all duration-300 hover:-translate-y-0.5"
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
                className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-3 rounded-full font-semibold"
                onClick={closeMobileMenu}
              >
                Let's Talk
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        {/* Services Hero Section */}
        <section
          className="relative text-white py-28 md:py-36 bg-cover bg-center bg-fixed overflow-hidden mb-20"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(22,33,62,0.88) 100%), url(/assets/images/hero-bg-img.jpg)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(15,155,142,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(29,201,183,0.1) 0%, transparent 50%)',
            }}
          ></div>
          <div className="container mx-auto px-5 max-w-7xl relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-['Montserrat'] uppercase tracking-wide drop-shadow-lg">
                Professional{' '}
                <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:-bottom-2 after:left-0 after:rounded">
                  Design Services
                </span>{' '}
                & Tools
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
                Comprehensive brand design solutions powered by industry-leading tools and technologies. I create strategic visual identities that communicate your brand's unique value and drive business growth.
              </p>
              <div className="flex gap-5 justify-center flex-wrap">
                <a
                  href="#services"
                  className="btn inline-flex items-center justify-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10"
                >
                  <i className="fas fa-concierge-bell"></i> Explore Services
                </a>
                <Link
                  href="/contact"
                  className="btn-outline inline-flex items-center justify-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
                >
                  <i className="fas fa-calendar-check"></i> Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section id="services" className="services-overview container mx-auto px-5 max-w-7xl mb-24">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            My Design Services
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 text-lg leading-relaxed">
            As a Full Brand Designer, I offer comprehensive design solutions that cover every aspect of your visual identity. From initial concept to final implementation, I ensure cohesive and impactful brand experiences.
          </p>

          <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Service Card 1 */}
            <div className="service-card bg-white p-10 rounded-xl text-center border border-gray-100 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-[#0f9b8e]/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f9b8e] to-[#1dc9b7] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <i className="fas fa-palette text-5xl text-[#0f9b8e] group-hover:text-white mb-6 transition-colors duration-500"></i>
              <h3 className="text-2xl font-semibold text-[#16213e] group-hover:text-white mb-4 transition-colors duration-500">Brand Identity Design</h3>
              <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 mb-5">
                Complete visual identity systems that establish a strong, memorable brand presence across all touchpoints.
              </p>
              <ul className="service-features text-left mt-4 space-y-2 text-sm text-gray-600 group-hover:text-white/90">
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Logo Design & Variations</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Color Palette Development</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Typography Systems</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Brand Guidelines</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Visual Language Development</li>
              </ul>
            </div>

            {/* Service Card 2 */}
            <div className="service-card bg-white p-10 rounded-xl text-center border border-gray-100 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-[#0f9b8e]/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f9b8e] to-[#1dc9b7] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <i className="fas fa-laptop text-5xl text-[#0f9b8e] group-hover:text-white mb-6 transition-colors duration-500"></i>
              <h3 className="text-2xl font-semibold text-[#16213e] group-hover:text-white mb-4 transition-colors duration-500">UI/UX Design</h3>
              <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 mb-5">
                User-centered digital experiences that are intuitive, engaging, and conversion-focused.
              </p>
              <ul className="service-features text-left mt-4 space-y-2 text-sm text-gray-600 group-hover:text-white/90">
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Website Design & Development</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Mobile App UI/UX</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">User Research & Testing</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Wireframing & Prototyping</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Interaction Design</li>
              </ul>
            </div>

            {/* Service Card 3 */}
            <div className="service-card bg-white p-10 rounded-xl text-center border border-gray-100 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-[#0f9b8e]/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0f9b8e] to-[#1dc9b7] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <i className="fas fa-print text-5xl text-[#0f9b8e] group-hover:text-white mb-6 transition-colors duration-500"></i>
              <h3 className="text-2xl font-semibold text-[#16213e] group-hover:text-white mb-4 transition-colors duration-500">Print & Packaging</h3>
              <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 mb-5">
                Tangible design solutions that create physical connections with your audience.
              </p>
              <ul className="service-features text-left mt-4 space-y-2 text-sm text-gray-600 group-hover:text-white/90">
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Business Stationery Design</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Product Packaging</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Marketing Collateral</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Brochures & Catalogs</li>
                <li className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-[#0f9b8e] group-hover:before:text-white">Signage & Environmental Graphics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="detailed-services container mx-auto px-5 max-w-7xl mb-24">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Detailed Service Offerings
          </h2>

          {/* Category 1 */}
          <div className="service-category bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="service-category-header flex flex-col md:flex-row items-center gap-6 mb-10">
              <div className="service-category-icon w-20 h-20 rounded-full bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-3xl">
                <i className="fas fa-layer-group"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">Comprehensive Brand Systems</h3>
            </div>
            <div className="service-items grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Complete Brand Identity</h4>
                <p className="text-gray-600 mb-3">Full visual identity system including logo, color palette, typography, and brand guidelines.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦250,000</div>
              </div>
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Logo Design & Development</h4>
                <p className="text-gray-600 mb-3">Professional logo creation with multiple concepts and final files in all formats.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦80,000</div>
              </div>
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Brand Guidelines Document</h4>
                <p className="text-gray-600 mb-3">Comprehensive brand manual detailing logo usage, colors, typography, and applications.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦120,000</div>
              </div>
            </div>
          </div>

          {/* Category 2 */}
          <div className="service-category bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="service-category-header flex flex-col md:flex-row items-center gap-6 mb-10">
              <div className="service-category-icon w-20 h-20 rounded-full bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-3xl">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">Digital Design & Development</h3>
            </div>
            <div className="service-items grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Website Design & Development</h4>
                <p className="text-gray-600 mb-3">Custom website design with responsive development and CMS integration.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦350,000</div>
              </div>
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Mobile App UI/UX Design</h4>
                <p className="text-gray-600 mb-3">User interface and experience design for iOS and Android applications.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦300,000</div>
              </div>
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">E-commerce Design</h4>
                <p className="text-gray-600 mb-3">Online store design with product catalog, shopping cart, and checkout optimization.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦400,000</div>
              </div>
            </div>
          </div>

          {/* Category 3 */}
          <div className="service-category bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="service-category-header flex flex-col md:flex-row items-center gap-6 mb-10">
              <div className="service-category-icon w-20 h-20 rounded-full bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white text-3xl">
                <i className="fas fa-bullhorn"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">Marketing & Advertising Design</h3>
            </div>
            <div className="service-items grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Social Media Graphics Package</h4>
                <p className="text-gray-600 mb-3">Complete set of social media templates, banners, and content graphics.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦75,000</div>
              </div>
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Digital Advertising Design</h4>
                <p className="text-gray-600 mb-3">Eye-catching banner ads, Google Ads graphics, and social media advertisements.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦60,000</div>
              </div>
              <div className="service-item bg-gray-50 p-6 rounded-xl shadow hover:bg-white hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-semibold text-[#16213e] mb-3">Email Marketing Templates</h4>
                <p className="text-gray-600 mb-3">Responsive email designs that work across all devices and email clients.</p>
                <div className="service-price text-[#0f9b8e] font-bold">Starting at ₦50,000</div>
              </div>
            </div>
            <div className="explore-button-container text-center">
              <Link
                href="/skills"
                className="btn inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fas fa-code"></i> Explore Technology Stacks I Used
              </Link>
            </div>
          </div>
        </section>

        {/* Design Tools Section */}
        <section className="design-tools bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-24 rounded-3xl mx-5 max-w-7xl lg:mx-auto mb-24 relative overflow-hidden">
          <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full -top-40 -right-40"></div>
          <div className="container mx-auto px-5 max-w-7xl relative z-10">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-white mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
              Professional Design Tools
            </h2>
            <p className="text-center max-w-3xl mx-auto text-white/80 text-lg leading-relaxed mb-16">
              I leverage industry-leading design tools to create high-quality, professional visual solutions for every project.
            </p>
            <div className="tools-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="tool-card bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:-translate-y-3 hover:bg-white/20 transition-all duration-300">
                <i className="fas fa-paint-brush text-5xl text-[#1dc9b7] mb-5"></i>
                <h3 className="text-xl font-semibold mb-3">Adobe Creative Suite</h3>
                <p className="text-white/80 text-sm">Photoshop, Illustrator, InDesign, XD, After Effects for comprehensive design and motion graphics.</p>
              </div>
              <div className="tool-card bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:-translate-y-3 hover:bg-white/20 transition-all duration-300">
                <i className="fas fa-pencil-ruler text-5xl text-[#1dc9b7] mb-5"></i>
                <h3 className="text-xl font-semibold mb-3">Figma & Sketch</h3>
                <p className="text-white/80 text-sm">UI/UX design, prototyping, and collaborative design systems for digital products.</p>
              </div>
              <div className="tool-card bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:-translate-y-3 hover:bg-white/20 transition-all duration-300">
                <i className="fas fa-cube text-5xl text-[#1dc9b7] mb-5"></i>
                <h3 className="text-xl font-semibold mb-3">3D & Motion Tools</h3>
                <p className="text-white/80 text-sm">Blender, Cinema 4D for 3D visualization and motion design elements.</p>
              </div>
              <div className="tool-card bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:-translate-y-3 hover:bg-white/20 transition-all duration-300">
                <i className="fas fa-video text-5xl text-[#1dc9b7] mb-5"></i>
                <h3 className="text-xl font-semibold mb-3">Video Editing</h3>
                <p className="text-white/80 text-sm">Premiere Pro, DaVinci Resolve for professional video editing and post-production.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Process */}
        <section className="work-process container mx-auto px-5 max-w-7xl mb-24">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            My Design Process
          </h2>
          <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-16">
            Every successful project follows a structured process that ensures clarity, collaboration, and exceptional results. Here's how we'll work together to bring your vision to life.
          </p>
          <div className="process-steps grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '01', title: 'Discovery & Research', desc: 'We start with in-depth research to understand your business, audience, and market landscape. This phase includes competitor analysis and goal definition.' },
              { number: '02', title: 'Strategy & Planning', desc: 'Based on research findings, we develop a strategic design plan with clear objectives, timelines, and success metrics for your project.' },
              { number: '03', title: 'Design & Creation', desc: 'This is where ideas become visuals. I create design concepts, mockups, and prototypes that bring your brand strategy to life.' },
              { number: '04', title: 'Refinement & Delivery', desc: 'We refine designs based on your feedback, prepare final deliverables, and ensure everything is production-ready for implementation.' },
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

        {/* Pricing Packages */}
        <section className="pricing container mx-auto px-5 max-w-7xl mb-24">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            Design Packages
          </h2>
          <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-16">
            Flexible design packages tailored to different business needs. All packages include professional design consultation and project management.
          </p>
          <div className="pricing-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Corporate Package */}
            <div className="pricing-card bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
              <div className="pricing-header text-center mb-6">
                <h3 className="text-2xl font-bold text-[#16213e] mb-3">Corporate Package</h3>
                <div className="pricing-price text-4xl font-extrabold text-[#0f9b8e] mb-1">₦250,000+</div>
                <div className="pricing-period text-gray-500 text-sm">Depend on the project complexity - One-time project fee</div>
              </div>
              <ul className="pricing-features space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Logo Design (2 concepts)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Brand Guidelines (basic)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Business Card Design</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Letterhead & Envelope</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Social Media Kit (5 graphics)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> 2 Rounds of Revisions</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Corporate Website (basic)</li>
                <li className="flex items-center gap-2 text-gray-400"><i className="fas fa-times text-gray-400 w-5"></i> Professional Domain Name</li>
                <li className="flex items-center gap-2 text-gray-400"><i className="fas fa-times text-gray-400 w-5"></i> Packaging Design</li>
                <li className="flex items-center gap-2 text-gray-400"><i className="fas fa-times text-gray-400 w-5"></i> Mobile App</li>
              </ul>

              {/* Duration & Agreement */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-[#16213e] mb-2 flex items-center gap-2"><i className="fas fa-clock text-[#0f9b8e]"></i> Duration</h4>
                <p className="text-sm text-gray-600">2–3 weeks from deposit</p>
              </div>
              <div className="mb-8">
                <h4 className="text-md font-semibold text-[#16213e] mb-2 flex items-center gap-2"><i className="fas fa-file-signature text-[#0f9b8e]"></i> Agreement</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>50% deposit, 50% on completion</li>
                  <li>2 rounds of revisions</li>
                  <li>Print/digital formats + source files</li>
                  <li>1 week support</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/payment"
                  className="flex-1 text-center bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-3 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Choose Corporate
                </Link>
              </div>
            </div>

            {/* Professional Package (featured) */}
            <div className="pricing-card bg-white p-8 rounded-2xl shadow-xl border-2 border-[#0f9b8e] relative hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 scale-105 lg:scale-110">
              <div className="pricing-badge absolute top-5 right-5 bg-[#0f9b8e] text-white px-3 py-1 text-xs font-semibold rounded-full rotate-12">
                Most Popular
              </div>
              <div className="pricing-header text-center mb-6">
                <h3 className="text-2xl font-bold text-[#16213e] mb-3">Professional Package</h3>
                <div className="pricing-price text-4xl font-extrabold text-[#0f9b8e] mb-1">₦800,000+</div>
                <div className="pricing-period text-gray-500 text-sm">Depend on the project complexity - Complete brand system</div>
              </div>
              <ul className="pricing-features space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Complete Brand Identity</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Logo + Submarks + Variations</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Comprehensive Brand Guidelines</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Business Stationery Set</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Social Media Kit (15 graphics)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Marketing Collateral (brochure/flyer)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Email Marketing Template</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Basic Website Design (5 pages)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> 5 Rounds of Revisions</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Color Palette & Typography System</li>
                <li className="flex items-center gap-2 text-gray-400"><i className="fas fa-times text-gray-400 w-5"></i> Custom Domain Name</li>
                <li className="flex items-center gap-2 text-gray-400"><i className="fas fa-times text-gray-400 w-5"></i> E‑commerce Functionality</li>
                <li className="flex items-center gap-2 text-gray-400"><i className="fas fa-times text-gray-400 w-5"></i> Mobile App</li>
              </ul>

              {/* Duration & Agreement */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-[#16213e] mb-2 flex items-center gap-2"><i className="fas fa-clock text-[#0f9b8e]"></i> Duration</h4>
                <p className="text-sm text-gray-600">4–6 weeks depending on feedback</p>
              </div>
              <div className="mb-8">
                <h4 className="text-md font-semibold text-[#16213e] mb-2 flex items-center gap-2"><i className="fas fa-file-signature text-[#0f9b8e]"></i> Agreement</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>40% deposit, 30% midpoint, 30% final</li>
                  <li>5 rounds of revisions</li>
                  <li>All formats + editable source files</li>
                  <li>1 month support & training</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/payment"
                  className="flex-1 text-center bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-3 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Choose Professional
                </Link>
              </div>
            </div>

            {/* Enterprise Package */}
            <div className="pricing-card bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
              <div className="pricing-header text-center mb-6">
                <h3 className="text-2xl font-bold text-[#16213e] mb-3">Enterprise Package</h3>
                <div className="pricing-price text-4xl font-extrabold text-[#0f9b8e] mb-1">₦1,500,000+</div>
                <div className="pricing-period text-gray-500 text-sm">Depend on the  complexity - Custom project-based pricing</div>
              </div>
              <ul className="pricing-features space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Everything in Professional</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Custom Website Development (full)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Product Packaging Design</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> E‑commerce Design & Development</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Mobile Application</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Digital Advertising Campaign</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Email Marketing Suite (5 templates)</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Unlimited Revisions</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> 3 Months Support & Maintenance</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Brand Training Session</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Custom Domain Name & Hosting</li>
                <li className="flex items-center gap-2 text-gray-600"><i className="fas fa-check text-[#0f9b8e] w-5"></i> Premium Stock Photos</li>
              </ul>

              {/* Duration & Agreement */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-[#16213e] mb-2 flex items-center gap-2"><i className="fas fa-clock text-[#0f9b8e]"></i> Duration</h4>
                <p className="text-sm text-gray-600">8–12 weeks (adjustable by scope)</p>
              </div>
              <div className="mb-8">
                <h4 className="text-md font-semibold text-[#16213e] mb-2 flex items-center gap-2"><i className="fas fa-file-signature text-[#0f9b8e]"></i> Agreement</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>Custom payment schedule</li>
                  <li>Unlimited revisions</li>
                  <li>All source files + documentation</li>
                  <li>3 months priority support</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/payment"
                  className="flex-1 text-center bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-3 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Choose Enterprise
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center mt-12 text-gray-600">
            Need a custom solution? <Link href="/contact" className="text-[#0f9b8e] font-semibold hover:underline">Contact me</Link> for a personalized quote based on your specific requirements.
          </p>
        </section>

        {/* Services CTA */}
        <section className="services-cta bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-24 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCwwIEwxMDAsMCBMMTAwLDEwMCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] bg-cover"></div>
          <div className="container mx-auto px-5 max-w-4xl text-center relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat']">Ready to Transform Your Brand?</h3>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Let's collaborate to create a powerful visual identity that communicates your unique value, connects with your audience, and drives business growth. Schedule a free design consultation today.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <Link href="/portfolio" className="btn inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <i className="fas fa-eye"></i> View My Work
              </Link>
              <Link href="/contact" className="btn-outline inline-flex items-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all duration-300">
                <i className="fas fa-calendar-check"></i> Book Free Consultation
              </Link>
            </div>
          </div>
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
                Professional Full Brand Designer specializing in comprehensive visual identity systems, UI/UX design, and strategic brand development for businesses of all sizes.
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
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script'; // ← Added for chat widget

export default function Home() {
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  // For typed effect
  const [typedText, setTypedText] = useState('');
  // For back to top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Refs for stats animation
  const statsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statsObserver = useRef<IntersectionObserver | null>(null);

  // Slideshow images
  const slideImages = [
    '/assets/images/rsmm.jpeg',
    '/assets/images/about-1.png',
    '/assets/images/rabiu-2.png',
    '/assets/images/CTA55.png',
  ];

  // Handle scroll events for header and back to top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect for "Software Engineer"
  useEffect(() => {
    const targetText = 'Software Engineer';
    let index = 0;
    setTypedText('');
    const timer = setInterval(() => {
      if (index < targetText.length) {
        setTypedText(targetText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Slideshow effect – starts after 0.1 second, then cycles every 3 seconds
  useEffect(() => {
    const SLIDE_INTERVAL = 3000;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      }, SLIDE_INTERVAL);
      return () => clearInterval(intervalId);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [slideImages.length]);

  // Stats animation with Intersection Observer
  useEffect(() => {
    statsObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLSpanElement;
            const target = parseInt(el.dataset.target || '0', 10);
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                el.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = target + suffix;
              }
            };
            updateCounter();
            statsObserver.current?.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsRef.current.forEach((el) => {
      if (el) statsObserver.current?.observe(el);
    });

    return () => statsObserver.current?.disconnect();
  }, []);

  // Work items with proper categories and platform links
  const workItems = [
    {
      category: 'I am Working on this mobileApp',
      title: 'Eco Global Renewable Energy Limited – Mobile App (Working on this Project)',
      description:
        'Cross‑platform mobile banking app with biometric login, real‑time transactions, and an intuitive dashboard. Built with React Native + Node.js.',
      image: '/assets/images/solar-mobile.png',
      categoryLabel: 'Mobile App',
      platformLink: 'https://payquick.example.com', // Replace with actual live platform URL
    },
    {
      category: 'branding',
      title: 'Halal Promotion Foundation – Corporate Platform Identity',
      description:
        'Full visual identity – logo, packaging, and marketing collateral for an organic food startup. Sustainable look, strong shelf presence.',
      image: '/assets/images/halal-pf.png',
      categoryLabel: 'Full Visual Brand Identity',
      platformLink: 'https://halalnigeria.com/', // Replace with actual live platform URL
    },
    {
      category: 'web',
      title: 'ICICE AL-Noor Masjid – Support Services Platform',
      description:
        'User experience design for a patient‑monitoring dashboard. Simplified workflows, accessible components, and a calming colour palette. Using Laravel + Blade.',
      image: '/assets/images/icice-1.png',
      categoryLabel: 'Web App',
      platformLink: 'https://icicecentre.org/', // Already live
    },
  ];

  const filteredWork = activeFilter === 'all' ? workItems : workItems.filter(item => item.category === activeFilter);

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Header (unchanged) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#1a1a2e]/98 py-3 shadow-lg backdrop-blur-md' : 'bg-[#1a1a2e]/95 py-4'
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl md:text-3xl font-extrabold text-[#1dc9b7] font-montserrat tracking-tight">
              Rabiu<span className="text-white font-semibold">SM</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-2 lg:space-x-5">
              <li><Link href="/" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%] active:after:w-[70%] active:text-[#1dc9b7]">Home</Link></li>
              <li><Link href="/about" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">About</Link></li>
              <li><Link href="/portfolio" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">Portfolio</Link></li>
              <li><Link href="/services" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">Services</Link></li>
              <li><Link href="/skills" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">Skills</Link></li>
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
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-[#1a1a2e]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-6 text-xl">
              <Link href="/" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>Home</Link>
              <Link href="/about" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>About</Link>
              <Link href="/portfolio" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>Portfolio</Link>
              <Link href="/services" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>Services</Link>
              <Link href="/skills" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>Skills</Link>
              <Link href="/contact" className="bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-3 rounded-full font-semibold" onClick={closeMenu}>Let's Talk</Link>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section (unchanged) */}
        <section
          className="relative text-white py-28 md:py-36 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'linear-gradient(135deg, rgba(26,26,46,0.75) 0%, rgba(22,33,62,0.6) 100%), url(/assets/images/hero-bg-img.jpg)' }}
        >
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-medium mb-2">I am <strong>Rabiu Sani Muhammad (Aljauromanee),</strong> a Mobile</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-montserrat uppercase leading-tight mb-4">
              <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-linear-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:-bottom-2 after:left-0">
                {typedText}
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl mt-2"> & <span className="text-[#1dc9b7]">Visual Brand Systems Designer</span></span>
            </h1>

            <div className="inline-block bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 text-white/90 text-sm md:text-base mb-8">
              <i className="fas fa-mobile-alt mr-2 text-[#1dc9b7]"></i> Mobile Apps · Brand Design · UI/UX
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/portfolio" className="btn-primary bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-briefcase"></i> VIEW PORTFOLIO
              </Link>
              <Link href="/skills" className="btn-outline border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-code"></i> MY SKILLS
              </Link>
              <Link href="/education" className="btn-outline border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-graduation-cap"></i> EDUCATION
              </Link>
              <Link href="/package" className="btn-outline border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-comment"></i> VIEW OUR PACKAGES
              </Link>
              <Link href="/contact" className="btn-outline border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-comment"></i> LET'S TALK
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction Section with Slideshow (unchanged) */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-0">
                Code meets Creativity
              </h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                <strong>I specialize in bridging the gap between engineering and design.</strong> With a solid foundation in software engineering, focused on mobile application development, and a passion for visual brand systems design, I create products that are both technically robust and visually compelling. I have assisted startups and established organizations in developing high-performance iOS and Android applications using React Native, Flutter, and native technologies, while simultaneously crafting distinctive brand identities that capture their unique vision.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                My approach combines clean software architecture with strategic design thinking, ensuring that every solution I deliver is intuitive, scalable, and visually aligned with the brand it represents.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['iOS & Android', 'React Native / Flutter', 'Mobile Architecture', 'UI/UX Design', 'Brand Identity', 'Logo Design', 'API Integration', 'Design Systems', 'Motion Graphics'].map((skill) => (
                  <span key={skill} className="bg-[#0f9b8e]/10 text-[#0f9b8e] px-4 py-2 rounded-full text-sm font-medium border border-[#0f9b8e]/20 hover:bg-[#0f9b8e] hover:text-white transition-all duration-300">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Standard button group */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="btn-primary inline-flex items-center gap-2 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <i className="fas fa-user"></i> Explore More About Me
                </Link>

                <Link
                  href="/booking"
                  className="btn-outline inline-flex items-center gap-2 border-2 border-[#0f9b8e] text-[#0f9b8e] px-8 py-4 rounded-lg font-semibold hover:bg-[#0f9b8e] hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <i className="fas fa-mic"></i> Invite Me to Speak
                </Link>
              </div>
            </div>

            {/* Right column - slideshow */}
            <div className="relative group w-full h-64 sm:h-80 md:h-96 lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
              {slideImages.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="absolute inset-0 bg-linear-to-tr from-[#0f9b8e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* What I Do Section (unchanged) */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute w-96 h-96 bg-[#0f9b8e]/5 rounded-full -top-48 -right-48"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              What I Do
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: 'fa-mobile-alt', title: 'Mobile App Development', desc: 'End‑to‑end development of native and cross‑platform apps (iOS/Android) using React Native, Flutter, Swift, Kotlin – clean code, smooth performance.' },
                { icon: 'fa-paint-brush', title: 'Brand Identity Design', desc: 'Strategic visual identities – logos, colour systems, typography, and guidelines that make your brand unforgettable across all touchpoints.' },
                { icon: 'fa-cubes', title: 'System Architecture', desc: 'Scalable app architecture, API design, state management, and backend integration – built to grow with your user base.' },
                { icon: 'fa-pencil-ruler', title: 'UI/UX Design', desc: 'User‑centred interfaces, wireframing to high‑fidelity prototypes, with a focus on usability and conversion.' },
                { icon: 'fa-print', title: 'Print & Packaging', desc: 'Brochures, packaging, business cards – tangible brand experiences that complement your digital presence.' },
                { icon: 'fa-bullhorn', title: 'Digital Marketing Assets', desc: 'Social media creatives, ad banners, email templates – consistent, high‑impact visuals for your campaigns.' },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="service-card bg-white p-8 rounded-xl text-center border border-gray-100 shadow-lg hover:border-transparent transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#0f9b8e]/20 relative z-10 group"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-[#0f9b8e] to-[#1dc9b7] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <i className={`fas fa-${service.icon} text-5xl text-[#0f9b8e] group-hover:text-white mb-6 transition-colors duration-300`}></i>
                  <h3 className="text-2xl font-semibold text-[#16213e] group-hover:text-white mb-4 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Work Section – updated with platform links and single button */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            Featured Work
          </h2>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'mobile', 'branding', 'uiux', 'web'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#0f9b8e] text-white'
                    : 'bg-[#0f9b8e]/10 text-[#0f9b8e] border border-[#0f9b8e]/20 hover:bg-[#0f9b8e] hover:text-white'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'mobile' ? 'Mobile Apps' : filter === 'branding' ? 'Brand Identity' : filter === 'uiux' ? 'UI/UX' : 'Web Development'}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWork.map((item, idx) => (
              <div key={idx} className="work-item bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 group">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f9b8e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="bg-white text-[#0f9b8e] px-4 py-1.5 rounded-full text-sm font-semibold">{item.categoryLabel}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#16213e] mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  {/* Only one button: View the Platform */}
                  <Link
                    href={item.platformLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#0f9b8e]/10 text-[#0f9b8e] border border-[#0f9b8e]/30 px-4 py-3 rounded-lg font-semibold hover:bg-[#0f9b8e] hover:text-white transition"
                  >
                    View the Platform
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary inline-flex items-center gap-2 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <i className="fas fa-arrow-right"></i> See All Projects
            </Link>
          </div>
        </section>

        {/* Impact Stats Section (unchanged) */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              Impact by numbers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { target: 5, suffix: '+', label: 'Projects Delivered' },
                { target: 80, suffix: '%', label: 'Client Satisfaction' },
                { target: 5, suffix: '+', label: 'Years Experience' },
                { target: 4, suffix: '+', label: 'Happy Clients' },
              ].map((stat, idx) => (
                <div key={idx} className="stat-item bg-gray-100 p-8 rounded-xl text-center transition-all duration-300 hover:bg-gray-200 hover:-translate-y-2 hover:border-[#1dc9b7] border border-transparent shadow-sm">
                  <h3 className="text-4xl font-bold text-[#0f9b8e] mb-2">
                    <span
                      ref={(el) => { statsRef.current[idx] = el; }}
                      data-target={stat.target}
                      data-suffix={stat.suffix}
                      className="stat-number"
                    >
                      0
                    </span>
                  </h3>
                  <p className="text-gray-700 uppercase tracking-wider text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section (unchanged) */}
        <section
          className="relative text-white py-24 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/images/CTA8.png)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to build something great?</h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Whether you need a polished mobile app, a complete brand overhaul, or a blend of both. I'll help you bring your vision to life.
            </p>
            <a
              href="https://forms.gle/KHfLihRz1UQKJ1YR6"
              className="btn-primary inline-flex items-center gap-2 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-10 py-5 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-calendar-check"></i> Let's Build yours Today
            </a>
          </div>
        </section>
      </main>

      {/* Footer (unchanged) */}
      <footer className="bg-[#1a1a2e] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_50%,rgba(15,155,142,0.05)_50%)] bg-size-[30px_30px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#1dc9b7] mb-5">Rabiu Sani Muhammad</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Mobile Software Engineer & Visual Brand Systems Designer. I create high‑performance apps and distinctive brand identities for forward‑thinking businesses.
              </p>
              <div className="flex space-x-3">
                {['whatsapp', 'github', 'linkedin', 'dribbble', 'instagram'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1dc9b7] hover:-translate-y-1 transition-all duration-300 border border-white/20"
                  >
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About Me', 'Portfolio', 'Skills', 'Services', 'Contact'].map((item, idx) => (
                  <li key={idx}>
                    <Link href={`/${item.toLowerCase().replace(' ', '')}`} className="text-gray-300 hover:text-[#1dc9b7] transition flex items-center gap-2">
                      <i className="fas fa-chevron-right text-xs"></i> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-5">Contact Info</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:aljauromanee@gmail.com" className="text-gray-300 hover:text-[#1dc9b7] transition flex items-center gap-3">
                    <i className="fas fa-envelope w-5"></i> aljauromanee@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+2349123234431" className="text-gray-300 hover:text-[#1dc9b7] transition flex items-center gap-3">
                    <i className="fas fa-phone-alt w-5"></i> +234 9123234431
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#1dc9b7] transition flex items-center gap-3">
                    <i className="fas fa-map-marker-alt w-5"></i> FCT, Abuja, Nigeria
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#1dc9b7] transition flex items-center gap-3">
                    <i className="fas fa-globe w-5"></i> Available Worldwide
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-400 text-sm pt-8 border-t border-white/10">
            <p>&copy; {new Date().getFullYear()} Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Mobile Software Engineer & Visual Brand Systems Designer</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white shadow-lg flex items-center justify-center text-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl z-50 ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      {/* ========== AI CHAT WIDGET (ADDED) ========== */}
      {/* Tawk.to Script – replace the direct link with your own property */}
      <Script
        id="tawk-to-script"
        strategy="lazyOnload"
        src="https://embed.tawk.to/65f1c2c89131ed19d976fd72/1hp6cmmpr"
        onError={(e) => console.error('Tawk.to script failed to load', e)} 
      />
      {/* ========== END AI CHAT WIDGET ========== */}
    </>
  );
}
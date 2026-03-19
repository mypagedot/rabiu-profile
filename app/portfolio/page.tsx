// app/portfolio/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const headerRef = useRef<HTMLElement>(null);

  // All image paths now start with a leading slash – required for Next.js public folder
  const projects = [
    {
      id: 1,
      title: 'EcoFresh Organic Foods',
      category: 'branding',
      image: '/assets/images/fintech.png',
      description:
        'Complete brand identity system for an organic food company, including logo, packaging, and marketing materials that communicate freshness and sustainability.',
      stats: [
        { icon: 'fa-calendar', label: '3 Months' },
        { icon: 'fa-tasks', label: '12 Deliverables' },
        { icon: 'fa-chart-line', label: '+40% Brand Recognition' },
      ],
      detailsLink: '/eco fresh',
      caseStudyLink: '/contact?project=EcoFresh',
    },
    {
      id: 2,
      title: 'FinTech Mobile Banking App',
      category: 'uiux',
      image: '/assets/images/mobile.jpg',
      description:
        'User experience and interface design for a mobile banking application, focusing on intuitive navigation, security, and seamless transaction flows.',
      stats: [
        { icon: 'fa-calendar', label: '4 Months' },
        { icon: 'fa-mobile-alt', label: '45+ Screens' },
        { icon: 'fa-chart-line', label: '+35% User Retention' },
      ],
      detailsLink: '/project-fin-tech.com',
      caseStudyLink: '/contact?project=FinTech',
    },
    {
      id: 3,
      title: 'Corporate Branding Package',
      category: 'print',
      image: '/assets/images/ecofresh-ide.jpg',
      description:
        'Complete corporate identity package including business cards, letterheads, envelopes, and presentation folders for a multinational consulting firm.',
      stats: [
        { icon: 'fa-calendar', label: '2 Months' },
        { icon: 'fa-file-alt', label: '8+ Items' },
        { icon: 'fa-chart-line', label: 'Professional Image' },
      ],
      detailsLink: '/project-corporate',
      caseStudyLink: '/contact?project=Corporate',
    },
    {
      id: 4,
      title: 'E-commerce Fashion Platform',
      category: 'web',
      image: '/assets/images/abbaIsa.png',
      description:
        'Complete website design and user experience for a fashion e-commerce platform, focusing on conversion optimization and mobile responsiveness.',
      stats: [
        { icon: 'fa-calendar', label: '5 weeks' },
        { icon: 'fa-shopping-cart', label: '60+ Product Pages' },
        { icon: 'fa-chart-line', label: '+28% Conversion Rate' },
      ],
      detailsLink: 'https://mypagedot.github.io/abbaIsa/',
      caseStudyLink: '/contact?project=Fashion',
      external: true,
    },
    {
      id: 5,
      title: 'Corporate Platform Branding for Community Services',
      category: 'branding',
      image: '/assets/images/msahabah.png',
      description:
        'Complete visual identity for a technology startup, including logo, brand guidelines, website design, and marketing collateral.',
      stats: [
        { icon: 'fa-calendar', label: '3 Months' },
        { icon: 'fa-palette', label: 'Full System' },
        { icon: 'fa-chart-line', label: '+50% Investor Interest' },
      ],
      detailsLink: 'https://msahabah.netlify.app/',
      caseStudyLink: '/contact?project=TechStartup',
      external: true,
    },
    {
      id: 6,
      title: 'Animated Brand Story Video',
      category: 'motion',
      image: '/assets/images/coporatebranding.jpg',
      description:
        '2-minute animated brand story video for a healthcare company, explaining their services and values through engaging motion graphics.',
      stats: [
        { icon: 'fa-calendar', label: '6 Weeks' },
        { icon: 'fa-video', label: '2 Min Video' },
        { icon: 'fa-chart-line', label: '+300% Engagement' },
      ],
      detailsLink: '/project-motion',
      caseStudyLink: '/contact',
    },
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'branding', label: 'Brand Identity' },
    { value: 'uiux', label: 'UI/UX Design' },
    { value: 'print', label: 'Print & Packaging' },
    { value: 'web', label: 'Web Design' },
    { value: 'motion', label: 'Motion Graphics' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Fixed mobile menu toggle – uses functional update to avoid stale state
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

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;

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
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <>
      {/* Custom CSS – no @apply, plain CSS works */}
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
                  className="nav-link-underline text-white font-medium no-underline px-3 py-2 text-base transition-colors hover:text-[#1dc9b7] relative active block md:inline-block"
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

      {/* Portfolio Hero */}
      <section
        className="relative bg-gradient-to-br from-[#1a1a2e]/92 to-[#16213e]/88 bg-cover bg-center bg-fixed text-white py-32 md:py-40 mb-20 overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/hero-bg-img.jpg')" }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Optional decorative gradient (kept for aesthetics) */}
        <div className="absolute inset-0 featured-case-bg"></div>
        <div className="container max-w-7xl mx-auto px-5 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-['Montserrat',sans-serif] uppercase tracking-wide drop-shadow-lg">
              My{' '}
              <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:-bottom-2 after:left-0 after:rounded">
                Design Portfolio
              </span>{' '}
              & Case Studies
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Explore a curated collection of my brand design, UI/UX, and visual
              identity projects. Each case study showcases strategic design
              solutions that have delivered measurable results for clients across
              various industries.
            </p>
            <div className="flex gap-5 justify-center flex-wrap">
              <a
                href="/package"
                className="btn inline-flex items-center justify-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10"
              >
                <i className="fas fa-star"></i> Choose your Package
              </a>
              <a
                href="https://docs.google.com/forms/d/1Y1LIMzMhg0LOWikTFFiS_IdFxDjbT6g7R4cnBgjwCbs/edit"
                className="btn-outline inline-flex items-center justify-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition-all duration-300"
              >
                <i className="fas fa-briefcase"></i> Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Filter */}
      <div className="max-w-7xl mx-auto px-5">
        <div className="portfolio-filter flex justify-center gap-4 flex-wrap mb-16">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-btn px-7 py-3 rounded-full font-semibold transition-all hover:-translate-y-1 hover:shadow-lg ${
                activeFilter === filter.value
                  ? 'bg-[#0f9b8e] text-white shadow-md'
                  : 'bg-[#0f9b8e]/10 text-[#0f9b8e] border border-[#0f9b8e]/20 hover:bg-[#0f9b8e] hover:text-white'
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-5">
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="portfolio-item bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl flex flex-col group"
              data-category={project.category}
            >
              <div className="portfolio-img h-72 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="portfolio-overlay absolute inset-0 portfolio-overlay-bg flex items-end justify-start p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="portfolio-category bg-white text-[#0f9b8e] px-5 py-2 rounded-full text-sm font-semibold">
                    {filters.find((f) => f.value === project.category)?.label}
                  </span>
                </div>
              </div>
              <div className="portfolio-info p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold mb-3 text-[#16213e]">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <div className="portfolio-stats flex justify-between text-sm text-gray-500 mb-5">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="stat flex items-center gap-1">
                      <i className={`fas ${stat.icon}`}></i> {stat.label}
                    </div>
                  ))}
                </div>
                <div className="portfolio-actions flex gap-4">
                  {project.external ? (
                    <a
                      href={project.detailsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-btn flex-1 text-center py-3 px-2 rounded-lg bg-[#0f9b8e]/10 text-[#0f9b8e] border border-[#0f9b8e]/30 font-semibold transition hover:bg-[#0f9b8e] hover:text-white"
                    >
                      View the platform
                    </a>
                  ) : (
                    <Link
                      href={project.detailsLink}
                      className="view-btn flex-1 text-center py-3 px-2 rounded-lg bg-[#0f9b8e]/10 text-[#0f9b8e] border border-[#0f9b8e]/30 font-semibold transition hover:bg-[#0f9b8e] hover:text-white"
                    >
                      View Details
                    </Link>
                  )}
                  <Link
                    href={project.caseStudyLink}
                    className="case-study-btn flex-1 text-center py-3 px-2 rounded-lg bg-[#0f9b8e] text-white border border-[#0f9b8e] font-semibold transition hover:bg-[#1dc9b7] hover:-translate-y-0.5"
                  >
                    Case Study
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Process */}
      <section className="process mb-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="section-title text-center text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded">
            My Design Process
          </h2>
          <div className="process-steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Discovery & Research',
                description:
                  'Understanding your business, audience, and market through in-depth research and analysis to establish project foundations.',
              },
              {
                number: '02',
                title: 'Strategy & Planning',
                description:
                  'Developing a strategic approach based on research findings, defining project goals, timelines, and success metrics.',
              },
              {
                number: '03',
                title: 'Design & Creation',
                description:
                  "Translating strategy into visual concepts, creating designs that communicate your brand's unique value proposition.",
              },
              {
                number: '04',
                title: 'Refinement & Delivery',
                description:
                  'Refining designs based on feedback, preparing final deliverables, and ensuring all elements work seamlessly together.',
              },
            ].map((step) => (
              <div
                key={step.number}
                className="process-step text-center p-8 bg-white rounded-2xl shadow-lg border-t-4 border-[#0f9b8e] transition hover:-translate-y-4 hover:shadow-2xl"
              >
                <div className="step-number w-14 h-14 step-number-bg text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-[#16213e] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="portfolio-cta bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-24 rounded-3xl mb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCwwIEwxMDAsMCBMMTAwLDEwMCBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 font-['Montserrat',sans-serif]">
            Ready to Bring Your Vision to Life?
          </h3>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Let's collaborate to create a powerful visual identity that
            communicates your unique value, connects with your audience, and drives
            business growth. Schedule a free design consultation today.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/services"
              className="btn inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
            >
              <i className="fas fa-concierge-bell"></i> View Services
            </Link>
            <a
              href="https://forms.gle/KHfLihRz1UQKJ1YR6"
              className="btn-outline inline-flex items-center gap-2 px-9 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#1a1a2e] transition"
            >
              <i className="fas fa-calendar-check"></i> Book Consultation
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
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">
                Rabiu Sani Muhammad
              </h3>
              <p className="text-gray-300 mb-5 leading-relaxed">
                Professional Full Brand Designer specializing in comprehensive
                visual identity systems, UI/UX design, and strategic brand
                development for businesses of all sizes.
              </p>
              <div className="social-links flex gap-4">
                {['behance', 'dribbble', 'linkedin-in', 'instagram', 'twitter'].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="flex items-center justify-center w-11 h-11 bg-white/10 rounded-full text-white border border-white/20 transition hover:bg-[#1dc9b7] hover:-translate-y-1 hover:scale-110"
                    >
                      <i className={`fab fa-${social}`}></i>
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="footer-column">
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">
                Quick Links
              </h3>
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
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2"
                    >
                      <i className="fas fa-chevron-right text-xs"></i> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="text-2xl font-semibold mb-6 text-[#1dc9b7]">
                Contact Info
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:aljauromanee@gmail.com"
                    className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2"
                  >
                    <i className="fas fa-envelope w-5"></i> aljauromanee@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2347068766833"
                    className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2"
                  >
                    <i className="fas fa-phone-alt w-5"></i> +234 706 876 6833
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2"
                  >
                    <i className="fas fa-map-marker-alt w-5"></i> FCT, Abuja, Nigeria
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#1dc9b7] flex items-center gap-2"
                  >
                    <i className="fas fa-globe w-5"></i> Available for International
                    Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright text-center pt-8 border-t border-white/20 text-gray-400 text-sm">
            <p>
              &copy; 2026 Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. |
              Professional Brand Design Portfolio
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
// app/my-clients-testimonials/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // using Next.js Image for optimization

export default function MyClientsTestimonialsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Timeline intersection observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    document.querySelectorAll('.timeline-item').forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Testimonial data with actual image paths
  const testimonials = [
    {
      quote: "Rabiu doesn't just design an app — he designs the entire brand around it. His ability to switch from mobile architecture to visual identity is rare and invaluable.",
      name: 'Aisha Mohammed',
      title: 'Software Programmer',
      location: 'Lagos',
      image: '/assets/images/man-icon.webp', // Replace with actual image
      side: 'right', // first item on right
    },
    {
      quote: "We hired him for a mobile app, but we got a complete visual system that unified our entire brand. The consistency across platforms doubled our engagement.",
      name: 'Sani M.R',
      title: 'CEO, Softie hub',
      location: 'Nigeria',
      image: '/assets/images/man-icon.webp',
      side: 'left',
    },
    {
      quote: "As a developer who thinks like a designer, he bridges the gap perfectly. Our team finally speaks the same language — engineering and brand live in harmony.",
      name: 'Prince',
      title: 'CEO, Pi Technology',
      location: 'Nigeria',
      image: '/assets/images/Pi-tech.jpeg',
      side: 'right',
    },
    {
      quote: "Working with Rabiu transformed our startup. He created a brand identity that resonates with our audience and a mobile app that just works. Highly recommended.",
      name: 'Nasir A. Abdullahi',
      title: 'Director, Halal Promotion Foundation',
      location: 'Abuja',
      image: '/assets/images/ustazh-nasir.jpeg',
      side: 'left',
    },
    {
      quote: "His design system brought consistency across all our products. The development team now builds faster with fewer revisions. A true multiplier.",
      name: 'James Carter',
      title: 'CTO, FinServe',
      location: 'London',
      image: '/assets/images/man-icon.webp',
      side: 'right',
    },
    {
      quote: "Rabiu has an eye for detail that’s rare. He listened to our vision and delivered a brand and app that exceeded our expectations.",
      name: 'Al-Amin Ibrahim',
      title: 'Product-Focused, Software Developer',
      location: 'Nigeria',
      image: '/assets/images/man-icon.webp',
      side: 'left',
    },
  ];

  return (
    <>
      {/* Header (identical to About page) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1a1a2e]/98 py-3 shadow-lg backdrop-blur-md'
            : 'bg-[#1a1a2e]/95 py-4'
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl md:text-3xl font-extrabold text-[#1dc9b7] font-montserrat tracking-tight">
              Rabiu<span className="text-white font-semibold">SM</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-2 lg:space-x-5">
              <li><Link href="/" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">Home</Link></li>
              <li><Link href="/about" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">About</Link></li>
              <li><Link href="/portfolio" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">Portfolio</Link></li>
              <li><Link href="/services" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">Services</Link></li>
              <li><Link href="/skills" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]">Skills</Link></li>
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
              <Link href="/contact" className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-3 rounded-full font-semibold" onClick={closeMenu}>Let's Talk</Link>
            </div>
          )}
        </div>
      </header>

      <main className="pt-0">
        {/* Page Hero */}
        <section
          className="relative py-24 md:py-32 text-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/assets/images/CTA.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90"></div>
          <div className="container mx-auto px-6 relative z-10 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4 drop-shadow-lg">
              What My Clients Say
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 drop-shadow">
              Real feedback from the people I've had the pleasure to work with.
            </p>
          </div>
        </section>

        {/* Testimonials Timeline with Glass Cards */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{ backgroundImage: 'url(/assets/images/cta5.png)' }} // Replace with your image
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              Client Testimonials
            </h2>

            {/* Timeline container with central line */}
            <div className="timeline relative before:content-[''] before:absolute before:left-5 md:before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-[#1dc9b7] before:to-[#0f9b8e] before:rounded">
              {testimonials.map((testimonial, index) => {
                const isLeft = testimonial.side === 'left';
                return (
                  <div
                    key={index}
                    className={`timeline-item relative pl-14 md:pl-0 mb-12 md:mb-20 md:w-1/2 opacity-0 transition-all duration-600 ${
                      isLeft
                        ? 'md:ml-0 md:mr-auto md:pl-12 md:pr-0 md:translate-x-[-8px]'
                        : 'md:ml-auto md:pr-12 md:translate-x-8'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`timeline-dot absolute left-5 md:left-auto top-2 w-5 h-5 bg-white border-4 border-[#0f9b8e] rounded-full shadow-[0_0_0_4px_rgba(15,155,142,0.2)] transition-all duration-300 ${
                        isLeft ? 'md:left-[-10px] md:right-auto' : 'md:right-[-10px] md:left-auto'
                      }`}
                    ></div>

                    {/* Testimonial Card */}
                    <div className="timeline-content bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/20 hover:bg-white/30 hover:border-[#1dc9b7] transition-all duration-300">
                      <i className="fas fa-quote-right text-3xl text-[#1dc9b7] opacity-50 mb-4"></i>
                      <p className="text-white/90 mb-6 leading-relaxed">{testimonial.quote}</p>

                      {/* Client info with image */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#1dc9b7] shadow-md">
                          {/* Using next/image for optimized images */}
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white flex items-center gap-2 flex-wrap">
                            {testimonial.name}
                            <span className="text-xs bg-white/20 text-[#1dc9b7] px-2 py-0.5 rounded-full uppercase">
                              {testimonial.location}
                            </span>
                          </h4>
                          <span className="text-sm text-white/70">{testimonial.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="relative py-28 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/assets/images/cta9.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90"></div>
          <div className="container mx-auto px-6 text-center relative z-10 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Join these happy clients and let's create something remarkable together.
            </p>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
              <i className="fas fa-paper-plane"></i> Start a Conversation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer (identical to About page) */}
      <footer className="bg-[#1a1a2e] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_50%,rgba(15,155,142,0.05)_50%)] bg-[length:30px_30px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#1dc9b7] mb-5">Rabiu Sani Muhammad</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Mobile software engineer & visual brand system designer — creating identities that speak and systems that perform.
              </p>
              <div className="flex space-x-3">
                {['whatsapp', 'dribbble', 'linkedin-in', 'instagram', 'twitter'].map((social) => (
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
                {['Home', 'About Me', 'Portfolio', 'Skills', 'Services', 'Contact'].map((item, idx) => {
                  const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`;
                  return (
                    <li key={idx}>
                      <Link
                        href={path}
                        className="text-gray-300 hover:text-[#1dc9b7] transition flex items-center gap-2"
                      >
                        <i className="fas fa-chevron-right text-xs"></i> {item}
                      </Link>
                    </li>
                  );
                })}
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
                    <i className="fas fa-globe w-5"></i> Available for International Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-arrow-up"></i> Back to Navbar
            </button>
          </div>

          <div className="text-center text-gray-400 text-sm pt-8 border-t border-white/10">
            <p>&copy; {new Date().getFullYear()} Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Mobile · Brand · System</p>
          </div>
        </div>
      </footer>

      {/* Scoped styles for timeline visibility */}
      <style jsx>{`
        .timeline-item.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (min-width: 768px) {
          .timeline-item.visible {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
}
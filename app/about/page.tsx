'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // slideshow state
  const [bgMood, setBgMood] = useState<'dark' | 'light'>('dark'); // New background mood state

  // Slideshow images
  const slideImages = [
    '/assets/images/Rabiuuuu.jpeg',
    '/assets/images/mobile-2.jpg',
    '/assets/images/mobile-app.jpg',
    '/assets/images/rsmm.jpeg',
  ];

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Timeline intersection observer
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

  // Timeline data with explicit side assignment
  const timelineItems = [
    {
      year: '2019',
      title: 'Graphics Designer',
      desc: 'Created brand identities, logos, and marketing materials for local startups. Developed a keen eye for typography, color theory, and composition while collaborating with printers and digital teams.',
      side: 'right', // on the right side
    },
    {
      year: '2021',
      title: 'FrontEnd Developer & Graphics Designer',
      desc: 'Translated static designs into responsive websites using HTML, CSS, JavaScript. Maintained visual consistency while adding interactivity; learned to bridge design and code.',
      side: 'left', // moved to left as requested
    },
    {
      year: '2023',
      title: 'FrontEnd Developer & Visual brand system Designer',
      desc: 'Built component libraries and design systems for web apps. Standardised UI elements, documented brand guidelines, and ensured seamless handoff between design and development.',
      side: 'right',
    },
    {
      year: '2024',
      title: 'Web developer & Full Stack UI/UX Designer',
      desc: 'Designed end-to-end user experiences, from wireframes to high-fidelity prototypes. Implemented frontend interfaces and basic backend logic, delivering complete web solutions.',
      side: 'left', // moved to left as requested
    },
    {
      year: 'Present',
      title: 'Mobile software engineer & visual brand system designer',
      desc: 'Independent consultant: architecting mobile apps (Flutter, React Native) while building holistic brand systems for international clients. Two disciplines finally speak one language.',
      side: 'right',
    },
  ];

  const isDark = bgMood === 'dark';

  return (
    <div className={`transition-colors duration-500 min-h-screen ${isDark ? 'bg-[#121225]' : 'bg-gray-50'}`}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? `${isDark ? 'bg-[#1a1a2e]/98' : 'bg-white/98'} shadow-lg backdrop-blur-md py-3`
          : `${isDark ? 'bg-[#1a1a2e]/95' : 'bg-white/95'} py-4`
          }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl md:text-3xl font-extrabold text-[#1dc9b7] font-montserrat tracking-tight">
              Rabiu<span className={`${isDark ? 'text-white' : 'text-[#1a1a2e]'} font-semibold`}>SM</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-2 lg:space-x-5">
              {['Home', 'About', 'Portfolio', 'Services', 'Skills'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`nav-link ${isDark ? 'text-white' : 'text-gray-800'} hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%] ${item === 'About' ? 'after:w-[70%] text-[#1dc9b7]' : ''}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li className="flex items-center mx-2">
                <button
                  onClick={() => setBgMood(prev => prev === 'dark' ? 'light' : 'dark')}
                  className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${isDark ? 'bg-[#202020]' : 'bg-gray-300'}`}
                  aria-label="Toggle background mood"
                >
                  <div className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
                    <i className={`fas ${isDark ? 'fa-moon text-[#1a1a2e]' : 'fa-sun text-yellow-500'} text-[10px]`}></i>
                  </div>
                </button>
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
              className={`md:hidden ${isDark ? 'text-white' : 'text-[#1a1a2e]'} text-2xl focus:outline-none z-50`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden fixed inset-0 ${isDark ? 'bg-[#1a1a2e]/95' : 'bg-white/95'} backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-6 text-xl`}>
              {['Home', 'About', 'Portfolio', 'Services', 'Skills'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`${isDark ? 'text-white' : 'text-gray-800'} hover:text-[#1dc9b7] transition`}
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              ))}
              <div className="flex items-center gap-4 py-2">
                <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                <button
                  onClick={() => setBgMood(prev => prev === 'dark' ? 'light' : 'dark')}
                  className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${isDark ? 'bg-[#202020]' : 'bg-gray-300'}`}
                  aria-label="Toggle background mood"
                >
                  <div className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
                    <i className={`fas ${isDark ? 'fa-moon text-[#1a1a2e]' : 'fa-sun text-yellow-500'} text-[10px]`}></i>
                  </div>
                </button>
              </div>
              <Link href="/contact" className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-3 rounded-full font-semibold" onClick={closeMenu}>Let's Talk</Link>
            </div>
          )}
        </div>
      </header>

      {/* Main content – top padding removed to eliminate gap with navbar */}
      <main className="pt-0">
        {/* Page Hero */}
        <section
          className="relative py-24 md:py-32 text-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/assets/images/CTA.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90"></div>
          <div className="container mx-auto px-6 relative z-10 text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4 drop-shadow-lg">
              The Mobile software engineer & visual brand system designer
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 drop-shadow">
              I craft fluid mobile experiences & cohesive brand identities — where code meets storytelling.
            </p>
          </div>
        </section>

        {/* Introduction Section with Slideshow */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'} mb-6 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-0`}>
                I am Rabiu SM (Aljauromanee)
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg mb-4 leading-relaxed`}>
                My journey began with a fascination for how things work — both in code and in visual communication. With a degree in Software Engineering and a natural eye for design, I've spent the last 7+ years bridging the gap between technical functionality and aesthetic excellence.
              </p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg mb-4 leading-relaxed`}>
                Based in Abuja, Nigeria, I've had the privilege of working with clients across Africa, Europe, and the Middle East. My work ranges from crafting minimalist brand identities to architecting complex mobile applications. I believe that great design is invisible — it feels intuitive, works flawlessly, and leaves a lasting impression.
              </p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg mb-6 leading-relaxed`}>
                Today, I lead brand and product design projects that help startups and established businesses tell their stories authentically and connect with their audiences on a deeper level.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Mobile-first thinker', 'Design system architect', 'Hybrid engineer', 'Brand strategist'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#0f9b8e]/10 text-[#0f9b8e] px-4 py-2 rounded-full text-sm font-medium border border-[#0f9b8e]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Slideshow container */}
            <div className="relative group w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {slideImages.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f9b8e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Timeline Section with Background Image and Glass Effect */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed timeline-bg"
            ></div>
            <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay for contrast */}
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-white mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              MY DESIGN AND DEVELOPMENT JOURNEY
            </h2>

            <div className="timeline relative before:content-[''] before:absolute before:left-5 md:before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-[#1dc9b7] before:to-[#0f9b8e] before:rounded">
              {timelineItems.map((item, index) => {
                const isLeft = item.side === 'left';
                return (
                  <div
                    key={index}
                    className={`timeline-item relative pl-14 md:pl-0 mb-12 md:mb-20 md:w-1/2 opacity-0 transition-all duration-600 ${
                      isLeft
                        ? 'md:ml-0 md:mr-auto md:pl-12 md:pr-0 md:translate-x-[-8px]'
                        : 'md:ml-auto md:pr-12 md:translate-x-8'
                    }`}
                  >
                    <div
                      className={`timeline-dot absolute left-5 md:left-auto top-2 w-5 h-5 bg-white border-4 border-[#0f9b8e] rounded-full shadow-[0_0_0_4px_rgba(15,155,142,0.2)] transition-all duration-300 ${
                        isLeft ? 'md:left-[-10px] md:right-auto' : 'md:right-[-10px] md:left-auto'
                      }`}
                    ></div>
                    <div className="timeline-content bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/20 hover:bg-white/30 hover:border-[#1dc9b7] transition-all duration-300">
                      <span className="inline-block bg-[#0f9b8e]/30 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/90 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* View Testimonials Button */}
        <section className="container mx-auto px-6 py-20 text-center">
          <Link
            href="/testimonials"
            className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-10 py-5 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3"
          >
            <i className="fas fa-comment-dots"></i> View My Clients' Testimonials
          </Link>
        </section>

        {/* CTA Section */}
        <section
          className="relative py-28 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/assets/images/cta9.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90"></div>
          <div className="container mx-auto px-6 text-center relative z-10 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Something Extraordinary</h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Whether you need a complete brand overhaul, a stunning mobile app, or just a creative partner to bounce ideas — I'm here to help.
            </p>
            <Link
              href="/contact"
              className="btn-primary bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
              <i className="fas fa-paper-plane"></i> Start a Conversation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-black' : 'bg-[#1a1a2e]'} text-white py-8 relative overflow-hidden transition-colors duration-500`}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_50%,rgba(15,155,142,0.05)_50%)] bg-[length:30px_30px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Mobile · Brand · System</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white shadow-lg flex items-center justify-center text-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl z-50 ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

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
        .timeline-bg {
          background-image: url(/assets/images/softie-bg.jpg);
        }
      `}</style>
    </div>
  );
}
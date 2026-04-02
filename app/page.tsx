'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

// Static data moved outside component to avoid recreation on each render
const slideImages = [
  '/assets/images/rabiu22.png',
  '/assets/images/about-1.png',
  '/assets/images/rabiu-2.png',
  '/assets/images/CTA55.png',
  '/assets/images/rsmm.jpeg',
];

const workItems = [
  {
    category: 'mobile',
    title: 'Eco Global Renewable Energy Limited – Mobile App (I am working on this Project)',
    description:
      'Cross‑platform mobile banking app with biometric login, real‑time transactions, and an intuitive dashboard. Built with React Native + Node.js.',
    image: '/assets/images/solar-mobile.png',
    categoryLabel: 'Mobile App',
    platformLink: 'https://payquick.example.com',
  },
  {
    category: 'branding',
    title: 'Halal Promotion Foundation – Corporate Platform Identity',
    description:
      'Full visual identity – logo, packaging, and marketing collateral for an organic food startup. Sustainable look, strong shelf presence.',
    image: '/assets/images/halal-pf.png',
    categoryLabel: 'Full Visual Brand Identity',
    platformLink: 'https://halalnigeria.com/',
  },
  {
    category: 'web',
    title: 'ICICE AL-Noor Masjid – Support Services Platform',
    description:
      'User experience design for a patient‑monitoring dashboard. Simplified workflows, accessible components, and a calming colour palette. Using Laravel + Blade.',
    image: '/assets/images/icice.png',
    categoryLabel: 'Web App',
    platformLink: 'https://icicecentre.org/',
  },
];

export default function Home() {
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [typedText, setTypedText] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgMood, setBgMood] = useState<'dark' | 'light'>('dark'); // New background mood state

  // Refs for stats animation
  const statsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statsObserver = useRef<IntersectionObserver | null>(null);
  // FIX: Use a Map to store animation frame IDs per element (prevents interference)
  const animationFrames = useRef<Map<Element, number>>(new Map());

  // Handle scroll events for header and back to top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect for "Software Engineer" and subtitle
  useEffect(() => {
    const targetText1 = 'SOFTWARE ENGINEER';
    const targetText2 = '& VISUAL BRAND SYSTEMS DESIGNER';
    let index1 = 0;
    let index2 = 0;
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timeoutBeforeSecondLine: NodeJS.Timeout;

    setTypedText('');
    setTypedText2('');

    timer1 = setInterval(() => {
      if (index1 < targetText1.length) {
        setTypedText(targetText1.slice(0, index1 + 1));
        index1++;
      } else {
        clearInterval(timer1);

        timeoutBeforeSecondLine = setTimeout(() => {
          timer2 = setInterval(() => {
            if (index2 < targetText2.length) {
              setTypedText2(targetText2.slice(0, index2 + 1));
              index2++;
            } else {
              clearInterval(timer2);
            }
          }, 70);
        }, 300);
      }
    }, 110);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearTimeout(timeoutBeforeSecondLine);
    };
  }, []);

  // Slideshow effect – properly cleaned up
  useEffect(() => {
    const SLIDE_INTERVAL = 1000;
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
      }, SLIDE_INTERVAL);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [slideImages.length]);

  // Stats animation with Intersection Observer + per‑element requestAnimationFrame
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

            // Cancel any existing animation for this element (should not happen, but safe)
            const existingFrame = animationFrames.current.get(el);
            if (existingFrame) {
              cancelAnimationFrame(existingFrame);
              animationFrames.current.delete(el);
            }

            const updateCounter = () => {
              if (!el.isConnected) {
                // Element removed from DOM – clean up
                animationFrames.current.delete(el);
                return;
              }
              current += increment;
              if (current < target) {
                el.textContent = Math.floor(current) + suffix;
                const frameId = requestAnimationFrame(updateCounter);
                animationFrames.current.set(el, frameId);
              } else {
                el.textContent = target + suffix;
                animationFrames.current.delete(el); // Finished
              }
            };

            // Start the animation
            const frameId = requestAnimationFrame(updateCounter);
            animationFrames.current.set(el, frameId);

            // Stop observing this element once animation starts
            statsObserver.current?.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all stat elements
    statsRef.current.forEach((el) => {
      if (el) statsObserver.current?.observe(el);
    });

    // Cleanup: disconnect observer and cancel all pending animations
    return () => {
      statsObserver.current?.disconnect();
      animationFrames.current.forEach((frameId) => cancelAnimationFrame(frameId));
      animationFrames.current.clear();
    };
  }, []);

  const filteredWork = activeFilter === 'all' ? workItems : workItems.filter(item => item.category === activeFilter);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const isDark = bgMood === 'dark';

  return (
    <div className={`transition-colors duration-500 min-h-screen ${isDark ? 'bg-[#121225]' : 'bg-gray-50'}`}>



      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
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
                    className={`nav-link ${isDark ? 'text-white' : 'text-gray-800'} hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]`}
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
              <span className="sr-only">Menu</span>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
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

      {/* Main content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section
          className="relative pt-20 pb-20 md:pt-40 md:pb-32 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/assets/images/hero-bg-img.jpg')" }}
        >
          {/* Dark overlay mirroring the services page */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
          {/* Subtle pattern background overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

          <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center relative z-10 gap-12">
            {/* Left Side: Text and Buttons */}
            <div className="w-full md:w-1/2 text-left relative z-20">
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full mb-10">
                <p className="text-[1.05rem] sm:text-xl lg:text-2xl text-white mb-1 leading-snug font-sans tracking-wide text-center md:text-left">
                  I am <span className="font-bold">Rabiu Sani Muhammad</span> <br className="block md:hidden" />
                  <span className="font-bold">(Aljauromanee)</span>, a Mobile
                </p>
                <h1 className="text-[1.4rem] min-[375px]:text-2xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[3.5rem] whitespace-nowrap text-center md:text-left font-extrabold font-['Montserrat'] text-white leading-tight tracking-wider uppercase mt-2 mb-5 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] w-full min-h-[1.2em]">
                  {typedText}
                  {typedText2.length === 0 && (
                    <span className="inline-block animate-pulse w-[3px] md:w-[6px] h-[0.8em] bg-white ml-2 mb-[-2px] align-baseline drop-shadow-md"></span>
                  )}
                </h1>

                {/* Visual Line */}
                <div className="w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-[#ffffff]/80 to-transparent md:from-[#1dc9b7]/80 md:via-[#1dc9b7]/80 md:to-transparent my-4 shadow-[0_0_8px_rgba(29,201,183,0.5)]"></div>

                <h2 className="text-[1.05rem] min-[375px]:text-[1.2rem] sm:text-3xl lg:text-4xl text-center md:text-left font-extrabold font-['Montserrat'] text-white leading-tight tracking-wider uppercase mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] w-full min-h-[1.2em]">
                  {typedText2}
                  {typedText2.length > 0 && (
                    <span className="inline-block animate-pulse w-[3px] md:w-[6px] h-[0.8em] bg-white ml-2 mb-[-2px] align-baseline drop-shadow-md"></span>
                  )}
                </h2>

                <div className="inline-flex items-center gap-3 bg-[#3a3f4e]/90 hover:bg-[#43495a] backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full text-white/95 text-sm sm:text-base font-semibold shadow-xl transition-all self-center md:self-start">
                  <i className="fas fa-mobile-alt text-[#1dc9b7]"></i>
                  <span className="tracking-wide">Mobile Apps &middot; Brand Design &middot; UI/UX</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">

                <Link href="/portfolio" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Portfolio
                </Link>
                <Link href="/education" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Education
                </Link>
                <Link href="/skills" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold transition-all backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  My Skills
                </Link>
                <Link href="/package" className="bg-[#ffffff] hover:bg-[#ebfcf9] text-[#1dc9b7] px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  My Packages
                </Link>
              </div>
            </div>

            {/* Right Side: Image with tilted cards effect */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-12 md:mt-0 px-4 sm:px-8 z-10 xl:pl-10">
              <div className="relative w-full aspect-[4/3] max-w-xl xl:max-w-[40rem] transform hover:scale-105 transition-transform duration-700 ease-out">
                {/* Back layers with glassmorphism */}
                <div className="absolute inset-0 border-[3px] border-white/30 bg-white/5 rounded-[1.5rem] transform rotate-[16deg] translate-x-4 scale-[1.05] shadow-xl backdrop-blur-sm z-0"></div>
                <div className="absolute inset-0 border-[3px] border-white/40 bg-white/10 rounded-[1.5rem] transform -rotate-[12deg] -translate-x-4 scale-[1.02] shadow-xl backdrop-blur-sm z-10"></div>
                <div className="absolute inset-0 border-[3px] border-white/50 bg-white/20 rounded-[1.5rem] transform rotate-[8deg] translate-y-3 scale-[1.08] shadow-2xl backdrop-blur-sm z-20"></div>

                {/* Front Image Layer */}
                <div className="absolute inset-0 border-[6px] sm:border-[8px] border-white rounded-[1.5rem] overflow-hidden transform -rotate-[4deg] scale-105 shadow-2xl z-30 transition-all duration-500 hover:-rotate-1 hover:scale-[1.1] cursor-pointer">
                  {slideImages.map((src, index) => (
                    <div
                      key={src}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                      <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className={`container mx-auto px-6 py-16 md:py-20`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - content */}
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'} mb-6 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-0`}>
                Code meets Creativity
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg mb-4 leading-relaxed`}>
                <strong className={`${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>I specialize in bridging the gap between engineering and design.</strong> With a solid foundation in software engineering, focused on mobile application development, and a passion for visual brand systems design, I create products that are both technically robust and visually compelling. I have assisted startups and established organizations in developing high-performance iOS and Android applications using React Native, Flutter, and native technologies, while simultaneously crafting distinctive brand identities that capture their unique vision.
              </p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-lg mb-6 leading-relaxed`}>
                My approach combines clean software architecture with strategic design thinking, ensuring that every solution I deliver is intuitive, scalable, and visually aligned with the brand it represents.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['iOS & Android', 'React Native / Flutter', 'Mobile Architecture', 'UI/UX Design', 'Brand Identity', 'Logo Design', 'API Integration', 'Design Systems', 'Motion Graphics'].map((skill) => (
                  <span key={skill} className="bg-[#0f9b8e]/10 text-[#0f9b8e] px-4 py-2 rounded-full text-sm font-medium border border-[#0f9b8e]/20 hover:bg-[#0f9b8e] hover:text-white transition-all duration-300">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <i className="fas fa-user"></i> Explore More About Me
                </Link>

                <Link
                  href="/booking"
                  className={`btn-outline inline-flex items-center gap-2 border-2 ${isDark ? 'border-[#0f9b8e] text-[#0f9b8e] hover:bg-[#0f9b8e] hover:text-white' : 'border-[#1dc9b7] text-[#1dc9b7] hover:bg-[#1dc9b7] hover:text-white'} px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1`}
                >
                  <i className="fas fa-mic"></i> Invite Me to Speak
                </Link>
              </div>
            </div>

            {/* Right column - image */}
            <div className="relative group w-full h-64 sm:h-80 md:h-96 lg:h-125 rounded-2xl overflow-hidden shadow-2xl">
              <img src="/assets/images/rabiu-2.png" alt="Rabiu Sani Muhammad" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f9b8e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* Recent Work Section */}
        <section className={`container mx-auto px-6 py-12`}>
          <h2 className={`text-3xl md:text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-[#1a1a2e]'} mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2`}>
            MY PROJECTS
          </h2>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'mobile', 'branding', 'uiux', 'web'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === filter
                  ? 'bg-[#0f9b8e] text-white'
                  : `bg-[#0f9b8e]/10 text-[#0f9b8e] border border-[#0f9b8e]/20 hover:bg-[#0f9b8e] hover:text-white`
                  }`}
              >
                {filter === 'all' ? 'All' : filter === 'mobile' ? 'Mobile Apps' : filter === 'branding' ? 'Brand Identity' : filter === 'uiux' ? 'UI/UX' : 'Web Development'}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWork.map((item, idx) => (
              <div key={idx} className={`work-item ${isDark ? 'bg-[#1a1a2e] border border-white/5' : 'bg-white'} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 group`}>
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f9b8e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="bg-white text-[#0f9b8e] px-4 py-1.5 rounded-full text-sm font-semibold">{item.categoryLabel}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#16213e]'} mb-3`}>{item.title}</h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>{item.description}</p>
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
            <Link href="/portfolio" className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <i className="fas fa-arrow-right"></i> See All Projects
            </Link>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className={`${isDark ? 'bg-[#0f111a]' : 'bg-white'} py-12 transition-colors duration-500`}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl md:text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-[#1a1a2e]'} mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2`}>
              Impact by numbers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { target: 4, suffix: '+', label: 'Projects Delivered' },
                { target: 80, suffix: '%', label: 'Client Satisfaction' },
                { target: 3, suffix: '+', label: 'Years Experience' },
                { target: 4, suffix: '+', label: 'Happy Clients' },
              ].map((stat, idx) => (
                <div key={idx} className={`stat-item ${isDark ? 'bg-[#1a1a2e] hover:bg-[#20203a]' : 'bg-gray-100 hover:bg-gray-200'} p-8 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#1dc9b7] border border-transparent shadow-sm`}>
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
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider text-sm font-medium`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
              href="/inquiry"
              className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-10 py-5 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-calendar-check"></i> Let's Build yours Today
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-black' : 'bg-[#1a1a2e]'} text-white py-8 relative overflow-hidden transition-colors duration-500`}>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_50%,rgba(15,155,142,0.05)_50%)] bg-size-[30px_30px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Mobile Software Engineer & Visual Brand Systems Designer</p>
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

      {/* AI Chat Widget */}
      <Script
        id="tawk-to-script"
        strategy="lazyOnload"
        src="https://embed.tawk.to/65f1c2c89131ed19d976fd72/1hp6cmmpr"
        onError={(e) => console.error('Tawk.to script failed to load', e)}
      />
    </div>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // slideshow state

  // Testimonial carousel state
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const totalSlides = 3; // number of cards (no duplicate)
  // ✅ Fixed: provide initial value `null` and use correct type for browser setInterval
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    }, 100); // 0.1s delay

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

  // Testimonial carousel setup
  useEffect(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll('.testimonial-card');
    cardsRef.current = Array.from(cards) as HTMLDivElement[];

    const updateCardWidth = () => {
      if (cardsRef.current.length > 0) {
        setCardWidth(cardsRef.current[0].offsetWidth);
      }
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Update carousel position
  useEffect(() => {
    if (!trackRef.current) return;
    const gap = 24; // matches gap-6 (6 * 4 = 24px)
    const translateX = -testimonialIndex * (cardWidth + gap);
    trackRef.current.style.transform = `translateX(${translateX}px)`;
  }, [testimonialIndex, cardWidth]);

  // Auto‑slide
  useEffect(() => {
    startAutoSlide();
    // ✅ Added null check in cleanup for safety
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, []);

  const startAutoSlide = () => {
    autoSlideRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const resetAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    startAutoSlide();
  };

  const handlePrev = () => {
    if (testimonialIndex > 0) {
      setTestimonialIndex((prev) => prev - 1);
    } else {
      // Jump to last slide without animation
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        setTestimonialIndex(totalSlides - 1); // now correctly goes to index 2
        setTimeout(() => {
          if (trackRef.current) trackRef.current.style.transition = 'transform 0.4s ease-in-out';
        }, 20);
      }
    }
    resetAutoSlide();
  };

  const handleNext = () => {
    if (testimonialIndex < totalSlides - 1) {
      setTestimonialIndex((prev) => prev + 1);
    } else {
      // Jump to first slide without animation
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        setTestimonialIndex(0);
        setTimeout(() => {
          if (trackRef.current) trackRef.current.style.transition = 'transform 0.4s ease-in-out';
        }, 20);
      }
    }
    resetAutoSlide();
  };

  const goToSlide = (index: number) => {
    setTestimonialIndex(index);
    resetAutoSlide();
  };

  return (
    <>
      {/* Header */}
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
              <li><Link href="/about" className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%] active:after:w-[70%] active:text-[#1dc9b7]">About</Link></li>
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
        {/* Page Hero */}
        <section
          className="relative py-24 md:py-32 text-center bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/assets/images/CTA.jpg)' }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#1a1a2e]/90 to-[#16213e]/90"></div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-0">
                I'm Rabiu Sani Muhammad (Aljauromanee)
              </h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                My journey began with a fascination for how things work — both in code and in visual communication. With a degree in Software Engineering and a natural eye for design, I've spent the last 7+ years bridging the gap between technical functionality and aesthetic excellence.
              </p>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Based in Abuja, Nigeria, I've had the privilege of working with clients across Africa, Europe, and the Middle East. My work ranges from crafting minimalist brand identities to architecting complex mobile applications. I believe that great design is invisible — it feels intuitive, works flawlessly, and leaves a lasting impression.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
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

        {/* Timeline Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            MY DESIGN AND DEVELOPMENT JOURNEY
          </h2>

          <div className="timeline relative before:content-[''] before:absolute before:left-5 md:before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-[#1dc9b7] before:to-[#0f9b8e] before:rounded">
            {[
              {
                year: '2019',
                title: 'Graphics Designer',
                desc: 'Created brand identities, logos, and marketing materials for local startups. Developed a keen eye for typography, color theory, and composition while collaborating with printers and digital teams.',
              },
              {
                year: '2021',
                title: 'FrontEnd Developer & Graphics Designer',
                desc: 'Translated static designs into responsive websites using HTML, CSS, JavaScript. Maintained visual consistency while adding interactivity; learned to bridge design and code.',
              },
              {
                year: '2023',
                title: 'FrontEnd Developer & Visual brand system Designer',
                desc: 'Built component libraries and design systems for web apps. Standardised UI elements, documented brand guidelines, and ensured seamless handoff between design and development.',
              },
              {
                year: '2024',
                title: 'Web developer & Full Stack UI/UX Designer',
                desc: 'Designed end-to-end user experiences, from wireframes to high-fidelity prototypes. Implemented frontend interfaces and basic backend logic, delivering complete web solutions.',
              },
              {
                year: 'Present',
                title: 'Mobile software engineer & visual brand system designer',
                desc: 'Independent consultant: architecting mobile apps (Flutter, React Native) while building holistic brand systems for international clients. Two disciplines finally speak one language.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative pl-14 md:pl-0 mb-12 md:mb-20 md:w-1/2 md:ml-auto md:pr-12 md:transform md:translate-x-8 opacity-0 transition-all duration-600 ${
                  index % 2 === 0 ? '' : 'md:ml-0 md:mr-auto md:pl-12 md:pr-0 md:translate-x-[-8px]'
                }`}
              >
                <div
                  className={`timeline-dot absolute left-5 md:left-auto top-2 w-5 h-5 bg-white border-4 border-[#0f9b8e] rounded-full shadow-[0_0_0_4px_rgba(15,155,142,0.2)] transition-all duration-300 ${
                    index % 2 === 0
                      ? 'md:right-[-10px] md:left-auto'
                      : 'md:left-[-10px] md:right-auto'
                  }`}
                ></div>
                <div className="timeline-content bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#1dc9b7] transition-all duration-300">
                  <span className="inline-block bg-[#0f9b8e]/10 text-[#0f9b8e] px-4 py-1 rounded-full text-sm font-semibold mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-bold text-[#16213e] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SD Grid */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            Software design life cycle
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'fa-clipboard-list', title: '1. Planning', desc: 'Requirement gathering, feasibility study, project roadmap and resource allocation.' },
              { icon: 'fa-search', title: '2. Analysis', desc: 'Detailed study of user needs, system specifications, and risk assessment.' },
              { icon: 'fa-pencil-ruler', title: '3. Design', desc: 'System architecture, database design, UI/UX wireframes and prototypes.' },
              { icon: 'fa-code', title: '4. Development', desc: 'Actual coding, implementation of features, and integration of components.' },
              { icon: 'fa-vial', title: '5. Testing', desc: 'Quality assurance, unit testing, integration testing, and user acceptance.' },
              { icon: 'fa-sync-alt', title: '6. Maintenance', desc: 'Deployment, bug fixes, updates, and continuous improvement.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#1dc9b7] shadow-lg"
              >
                <i className={`fas ${item.icon} text-4xl text-[#0f9b8e] mb-4`}></i>
                <h4 className="text-xl font-semibold text-[#1a1a2e] mb-3">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Carousel - Single Card Slide */}
        <section className="bg-white py-20 rounded-3xl mx-6 md:mx-auto md:max-w-4xl mb-20 shadow-sm">
          <div className="container mx-auto px-6">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-linear-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              Trusted by global clients & Testimonials
            </h2>

            <div className="relative overflow-hidden px-2">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-[#1a1a2e] hover:bg-[#0f9b8e] hover:text-white transition-all"
                aria-label="Previous testimonial"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-[#1a1a2e] hover:bg-[#0f9b8e] hover:text-white transition-all"
                aria-label="Next testimonial"
              >
                <i className="fas fa-chevron-right"></i>
              </button>

              {/* Carousel Track */}
              <div
                ref={trackRef}
                className="flex gap-6 transition-transform duration-400 ease-in-out"
                onMouseEnter={() => {
                  if (autoSlideRef.current) clearInterval(autoSlideRef.current);
                }}
                onMouseLeave={startAutoSlide}
              >
                {/* Testimonial Cards - 3 unique cards */}
                {[
                  {
                    quote:
                      "Rabiu doesn't just design an app — he designs the entire brand around it. His ability to switch from mobile architecture to visual identity is rare and invaluable.",
                    avatar: 'A',
                    name: 'Aisha Mohammed',
                    location: 'Lagos',
                    title: 'Software Programmer',
                  },
                  {
                    quote:
                      "We hired him for a mobile app, but we got a complete visual system that unified our entire brand. The consistency across platforms doubled our engagement.",
                    avatar: 'M',
                    name: 'Sani M.R',
                    location: 'Nigeria',
                    title: 'CEO, Softie hub',
                  },
                  {
                    quote:
                      "As a developer who thinks like a designer, he bridges the gap perfectly. Our team finally speaks the same language — engineering and brand live in harmony.",
                    avatar: 'P',
                    name: 'Rexieliun',
                    location: 'Singapore',
                    title: 'Creative Director, Luminary',
                  },
                ].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="testimonial-card flex-shrink-0 w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#1dc9b7]"
                  >
                    <i className="fas fa-quote-right text-3xl text-[#1dc9b7] opacity-50 mb-4"></i>
                    <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.quote}</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a1a2e] flex items-center gap-2">
                          {testimonial.name}
                          <span className="text-xs bg-gray-100 text-[#0f9b8e] px-2 py-0.5 rounded-full uppercase">
                            {testimonial.location}
                          </span>
                        </h4>
                        <span className="text-sm text-gray-500">{testimonial.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots - 3 dots */}
            <div className="flex justify-center gap-3 mt-8">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === testimonialIndex % 3
                      ? 'w-8 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                ></button>
              ))}
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
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Something Extraordinary</h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Whether you need a complete brand overhaul, a stunning mobile app, or just a creative partner to bounce ideas — I'm here to help.
            </p>
            <Link
              href="/contact"
              className="btn-primary bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
              <i className="fas fa-paper-plane"></i> Start a Conversation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
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
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
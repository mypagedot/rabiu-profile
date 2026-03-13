'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Refs for animation targets
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const specializationTextRef = useRef<HTMLDivElement>(null);
  const specializationImageRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade‑in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8', 'translate-x-[-30px]', 'translate-x-[30px]');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    timelineRefs.current.forEach((el) => {
      if (el) {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-500', 'ease-out');
        observer.observe(el);
      }
    });

    skillRefs.current.forEach((el) => {
      if (el) {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-500', 'ease-out');
        observer.observe(el);
      }
    });

    if (specializationTextRef.current) {
      specializationTextRef.current.classList.add('opacity-0', 'translate-x-[-30px]', 'transition-all', 'duration-800', 'ease-out');
      observer.observe(specializationTextRef.current);
    }
    if (specializationImageRef.current) {
      specializationImageRef.current.classList.add('opacity-0', 'translate-x-[30px]', 'transition-all', 'duration-800', 'ease-out');
      observer.observe(specializationImageRef.current);
    }

    return () => observer.disconnect();
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

  // Timeline data
  const timelineItems = [
    { year: '2006-2012', title: 'Primary Education Foundation', institution: 'Nurudden Township Primary School, Jos', description: 'Completed First School Leaving Certificate, establishing foundational knowledge and learning skills that would support future academic pursuits.' },
    { year: '2012-2018', title: 'Secondary Education in Sciences', institution: 'Hassan Government Day Secondary School, Jalingo', degree: 'Science and Technology Stream', description: 'Developed strong analytical and problem-solving skills through science-focused curriculum, laying groundwork for future technical education.' },
    { year: '2009-2016', title: 'Islamic Studies & Arabic Language', institution: 'School for Arabic and Higher Islamic Studies, Jos', degree: 'National Board for Arabic and Islamic Studies', description: 'Completed a comprehensive seven-year program in Arabic language and Islamic studies, enhancing cultural understanding and linguistic skills.' },
    { year: '2018-2020', title: 'Diploma in Computer Science', institution: 'Taraba State Polytechnic, Suntai', degree: 'National Diploma in Computer Science', description: 'Acquired fundamental knowledge in computer science, programming, and information technology systems, sparking interest in software development.' },
    { year: '2021', title: 'Graphic Design Certification', institution: 'Gradenet, Nigeria', degree: 'Certificate in Graphic Design', description: 'Developed visual design skills and understanding of user interface principles, enhancing ability to create visually appealing applications.' },
    { year: '2023', title: 'Web Design & Development', institution: 'HIIT, Abuja', degree: 'Web Design and Development Course', description: 'Mastered front-end and back-end web development technologies, expanding technical skill set for full-stack development capabilities.' },
    { year: '2024-2027', title: 'Bachelor\'s in Software Engineering', institution: 'Lincoln University, Malaysia', degree: 'Bachelor of Information Technology (Software Engineering)', description: 'Currently pursuing specialized education in software engineering with focus on mobile application development, system design, and advanced programming methodologies.' },
  ];

  return (
    <>
      {/* Header (unchanged) */}
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
              <li>
                <Link
                  href="/"
                  className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%] active:after:w-[70%] active:text-[#1dc9b7]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
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
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-[#1a1a2e]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-6 text-xl">
              <Link href="/" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>
                Home
              </Link>
              <Link href="/about" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>
                About
              </Link>
              <Link href="/portfolio" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>
                Portfolio
              </Link>
              <Link href="/services" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>
                Services
              </Link>
              <Link href="/skills" className="text-white hover:text-[#1dc9b7] transition" onClick={closeMenu}>
                Skills
              </Link>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-3 rounded-full font-semibold"
                onClick={closeMenu}
              >
                Let's Talk
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="pt-20">
        {/* About Hero Section (unchanged) */}
        <section
          className="relative text-white py-28 md:py-36 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(1,37,34,0.414) 0%, rgba(2,42,38,0.485) 100%), url(assets/images/hero-bg-img.jpg)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 20% 50%, rgba(11,26,24,0.673) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(1,29,27,0.655) 0%, transparent 50%)',
            }}
          ></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-montserrat uppercase leading-tight mb-6">
              My <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:bottom-[-8px] after:left-0">Professional</span> Journey
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              From foundational education to specialized software engineering expertise, my journey reflects a commitment to continuous learning and technological innovation in mobile application development.
            </p>
            <div className="inline-block bg-[#0f9b8e]/20 border-2 border-[#1dc9b7] text-white px-6 py-3 rounded-full font-semibold text-base md:text-lg backdrop-blur-sm">
              <i className="fas fa-code mr-2"></i> Software Engineer | Mobile App Developer
            </div>
          </div>
        </section>

        {/* My Journey Timeline */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            Educational & Professional Timeline
          </h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0f9b8e] to-[#1dc9b7] rounded hidden md:block"></div>

            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0; // even index => left side (card on left side of line)
              return (
                <div
                  key={index}
                  className={`relative mb-12 md:mb-20 ${
                    isEven
                      ? 'md:pr-[50%] md:pl-0' // content on left side (right side empty)
                      : 'md:pl-[50%] md:pr-0' // content on right side
                  }`}
                >
                  {/* Card container */}
                  <div
                    ref={(el) => { timelineRefs.current[index] = el; }}
                    className={`bg-white p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative ${
                      isEven
                        ? 'md:ml-auto md:mr-0 border-l-4 border-[#0f9b8e]' // left border for left‑side cards
                        : 'md:mr-auto md:ml-0 border-l-4 md:border-l-0 md:border-r-4 border-[#0f9b8e]' // right border for right‑side cards
                    }`}
                  >
                    {/* Year badge – positioned relative to card */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 z-10 
                        ${isEven ? 'md:right-[-30px]' : 'md:left-[-30px]'} 
                        left-[-30px] /* on mobile, always left side */
                      `}
                    >
                      <span className="inline-block bg-[#0f9b8e] text-white px-4 py-2 rounded-full font-semibold text-sm md:text-base shadow-lg">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-[#16213e] mb-2">{item.title}</h3>
                    <span className="text-[#0f9b8e] font-semibold block mb-1">{item.institution}</span>
                    {item.degree && <span className="text-gray-500 italic block mb-3">{item.degree}</span>}
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technical Skills (unchanged) */}
        <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-24 rounded-3xl mx-6 md:mx-auto md:max-w-6xl mb-20 relative overflow-hidden">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full -top-48 -right-48"></div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              Technical Expertise
            </h2>
            <p className="text-center text-white/80 text-lg mb-12 max-w-3xl mx-auto">
              My diverse educational background has equipped me with a unique combination of technical skills, creative design thinking, and problem-solving abilities.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'fa-mobile-alt', title: 'Mobile Development', desc: 'Specialized in developing native and cross-platform mobile applications for iOS and Android using modern frameworks and best practices.' },
                { icon: 'fa-code', title: 'Software Engineering', desc: 'Proficient in software design patterns, system architecture, and full development lifecycle from requirements to deployment.' },
                { icon: 'fa-paint-brush', title: 'UI/UX Design', desc: 'Combining graphic design skills with user experience principles to create intuitive, visually appealing application interfaces.' },
                { icon: 'fa-globe', title: 'Web Development', desc: 'Full-stack web development capabilities including frontend frameworks, backend APIs, and database management systems.' },
              ].map((skill, idx) => (
                <div
                  key={idx}
                  ref={(el) => { skillRefs.current[idx] = el; }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 border border-white/10"
                >
                  <i className={`fas ${skill.icon} text-4xl text-[#1dc9b7] mb-4`}></i>
                  <h3 className="text-xl font-semibold text-white mb-3">{skill.title}</h3>
                  <p className="text-white/80 text-sm">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialization (unchanged) */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={specializationTextRef}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-0">
                Mobile Application Development Specialization
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                As a Software Engineer specializing in Mobile Application Development, I focus on creating robust, scalable, and user-friendly mobile solutions for diverse platforms and industries.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                My approach combines technical expertise with design thinking to deliver applications that not only function flawlessly but also provide exceptional user experiences.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                With continuous learning at the core of my professional development, I stay updated with the latest technologies and methodologies in mobile development.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Flutter', 'React Native', 'Android (Kotlin/Java)', 'iOS (Swift)', 'Firebase', 'REST APIs', 'UI/UX Design', 'Agile Methodology'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#0f9b8e]/10 text-[#0f9b8e] px-4 py-2 rounded-full text-sm font-medium border border-[#0f9b8e]/20 hover:bg-[#0f9b8e] hover:text-white transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div ref={specializationImageRef} className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
                  alt="Mobile Application Development"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0f9b8e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action (unchanged) */}
        <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-20 rounded-3xl mx-6 md:mx-auto md:max-w-5xl mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Build Your Mobile Solution?</h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Whether you need a custom mobile application, want to discuss software engineering projects, or are looking for a dedicated mobile developer for your team, I'd love to connect and explore how we can work together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/portfolio" className="btn-primary bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-code-branch"></i> View My Projects
              </Link>
              <Link href="/contact" className="btn-outline border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-comment-dots"></i> Start a Conversation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (unchanged) */}
      <footer className="bg-[#1a1a2e] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_50%,rgba(15,155,142,0.05)_50%)] bg-[length:30px_30px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#1dc9b7] mb-5">Rabiu Sani Muhammad</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Software Engineer specializing in Mobile Application Development. Creating innovative, user-friendly mobile solutions with cutting-edge technologies.
              </p>
              <div className="flex space-x-3">
                {['github', 'linkedin-in', 'twitter', 'stack-overflow', 'medium'].map((social) => (
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
                {['Home', 'About Me', 'Portfolio', 'Tech Stacks', 'Services', 'Contact'].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-300 hover:text-[#1dc9b7] transition flex items-center gap-2"
                    >
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
            <p>&copy; {new Date().getFullYear()} Rabiu Sani Muhammad. All Rights Reserved. | Software Engineer & Mobile App Developer</p>
          </div>
        </div>
      </footer>
    </>
  );
}
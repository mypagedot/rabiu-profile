'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function SkillsPage() {
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

  // Close mobile menu on window resize (if open)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Toggle mobile menu
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
                  className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
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
                  className="nav-link text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%] active:after:w-[70%] active:text-[#1dc9b7]"
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
        {/* Hero Section */}
        <section
          className="relative text-white py-28 md:py-36 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(22,33,62,0.675) 100%), url(assets/images/CTA1.jpg)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" 
               style={{
                 background: 'radial-gradient(circle at 20% 50%, rgba(15,155,142,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(29,201,183,0.1) 0%, transparent 50%)'
               }}></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-montserrat uppercase leading-tight mb-6">
              Development & Design{' '}
              <span className="text-[#1dc9b7] relative inline-block after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-transparent after:via-[#1dc9b7] after:to-transparent after:bottom-[-8px] after:left-0">
                Technology Stack
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Solid white cards, international clarity. Every tool and skill is presented with a clean, universal design language.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#stacks" className="btn-primary bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-layer-group"></i> Explore Tech Stacks
              </a>
              <a href="/portfolio" className="btn-outline border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-eye"></i> View Work Examples
              </a>
            </div>
          </div>
        </section>

        {/* Tech Stack Overview */}
        <section id="stacks" className="container mx-auto px-6 py-20">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            My Technology Stacks
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
            Clean, distraction‑free cards with subtle shadows – following global design standards.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'fa-code', title: 'Frontend Development', desc: 'Building responsive interfaces with modern HTML, CSS, JavaScript, and frameworks.' },
              { icon: 'fa-server', title: 'Backend Development', desc: 'Server‑side logic, APIs, and robust architecture for scalable applications.' },
              { icon: 'fa-mobile-alt', title: 'Mobile Development', desc: 'Cross‑platform apps for iOS and Android with React Native and Flutter.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-lg"
              >
                <div className="w-20 h-20 mx-auto bg-[#0f9b8e]/10 rounded-full flex items-center justify-center text-4xl text-[#0f9b8e] mb-6">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-2xl font-semibold text-[#16213e] mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Tech Breakdown */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center text-[#1a1a2e] mb-16 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            Detailed Technology Breakdown
          </h2>

          {/* Frontend Category */}
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] rounded-full flex items-center justify-center text-3xl text-white">
                <i className="fas fa-code"></i>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-[#1a1a2e] mb-2">Frontend Development</h3>
                <p className="text-gray-600 text-lg">Semantic, responsive, interactive.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'fab fa-html5', name: 'HTML5', desc: 'Semantic markup and modern features.', level: 95, text: 'Advanced' },
                { icon: 'fab fa-css3-alt', name: 'CSS3', desc: 'Animations, flex/grid, responsive.', level: 90, text: 'Advanced' },
                { icon: 'fab fa-js-square', name: 'JavaScript', desc: 'ES6+, async, DOM manipulation.', level: 85, text: 'Advanced' },
                { icon: 'fab fa-react', name: 'React.js', desc: 'Component‑based UI.', level: 75, text: 'Intermediate' },
                { icon: 'fab fa-bootstrap', name: 'Bootstrap', desc: 'Rapid prototyping.', level: 85, text: 'Advanced' },
                { icon: 'fas fa-wind', name: 'Tailwind CSS', desc: 'Utility‑first.', level: 90, text: 'Advanced' },
                { icon: 'fab fa-wordpress', name: 'WordPress', desc: 'CMS & themes.', level: 80, text: 'Advanced' },
              ].map((tool, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#0f9b8e]/10 rounded-full flex items-center justify-center text-3xl text-[#0f9b8e] mb-4">
                    <i className={tool.icon}></i>
                  </div>
                  <h4 className="text-xl font-semibold text-[#16213e] mb-2">{tool.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{tool.desc}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7]" style={{ width: `${tool.level}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-[#0f9b8e]">{tool.text}</span>
                    <span className="text-gray-600">{tool.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Category */}
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] rounded-full flex items-center justify-center text-3xl text-white">
                <i className="fas fa-server"></i>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-[#1a1a2e] mb-2">Backend Development</h3>
                <p className="text-gray-600 text-lg">APIs, server logic.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'fab fa-node-js', name: 'Node.js', desc: 'JavaScript runtime.', level: 70, text: 'Intermediate' },
                { icon: 'fab fa-php', name: 'PHP', desc: 'Scripting.', level: 65, text: 'Intermediate' },
                { icon: 'fas fa-laravel', name: 'Laravel', desc: 'PHP framework.', level: 70, text: 'Intermediate' },
                { icon: 'fas fa-forward', name: 'Next.js', desc: 'React framework.', level: 75, text: 'Intermediate' },
              ].map((tool, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#0f9b8e]/10 rounded-full flex items-center justify-center text-3xl text-[#0f9b8e] mb-4">
                    <i className={tool.icon}></i>
                  </div>
                  <h4 className="text-xl font-semibold text-[#16213e] mb-2">{tool.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{tool.desc}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7]" style={{ width: `${tool.level}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-[#0f9b8e]">{tool.text}</span>
                    <span className="text-gray-600">{tool.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Development Category */}
          <div className="bg-white rounded-2xl p-8 md:p-12 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] rounded-full flex items-center justify-center text-3xl text-white">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-[#1a1a2e] mb-2">Mobile Development</h3>
                <p className="text-gray-600 text-lg">Cross‑platform and native mobile apps.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'fab fa-react', name: 'React Native', desc: 'Cross‑platform mobile apps with native performance.', level: 70, text: 'Intermediate' },
                { icon: 'fab fa-flutter', name: 'Flutter', desc: 'UI toolkit for natively compiled applications.', level: 65, text: 'Intermediate' },
                { icon: 'fas fa-code', name: 'Swift', desc: 'iOS native development.', level: 50, text: 'Beginner' },
                { icon: 'fab fa-android', name: 'Kotlin', desc: 'Android native development.', level: 45, text: 'Beginner' },
              ].map((tool, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#0f9b8e]/10 rounded-full flex items-center justify-center text-3xl text-[#0f9b8e] mb-4">
                    <i className={tool.icon}></i>
                  </div>
                  <h4 className="text-xl font-semibold text-[#16213e] mb-2">{tool.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{tool.desc}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7]" style={{ width: `${tool.level}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-[#0f9b8e]">{tool.text}</span>
                    <span className="text-gray-600">{tool.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design & Tools Category */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0f9b8e] to-[#1dc9b7] rounded-full flex items-center justify-center text-3xl text-white">
                <i className="fas fa-tools"></i>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-[#1a1a2e] mb-2">Development Tools & Design</h3>
                <p className="text-gray-600 text-lg">Essential software.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'fab fa-git-alt', name: 'Git', desc: 'Version control.', level: 90, text: 'Advanced' },
                { icon: 'fas fa-code', name: 'VS Code', desc: 'Editor.', level: 95, text: 'Advanced' },
                { icon: 'fas fa-robot', name: 'Cursor AI', desc: 'AI coding.', level: 80, text: 'Intermediate' },
                { icon: 'fas fa-paint-brush', name: 'Canva', desc: 'Graphic design.', level: 85, text: 'Advanced' },
                { icon: 'fas fa-pen-nib', name: 'CorelDraw', desc: 'Vector graphics.', level: 75, text: 'Advanced' },
                { icon: 'fas fa-laravel', name: 'Photoshop', desc: 'Image editing.', level: 75, text: 'Intermediate' },
                { icon: 'fab fa-figma', name: 'Figma', desc: 'Prototyping.', level: 70, text: 'Intermediate' },
              ].map((tool, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#0f9b8e]/10 rounded-full flex items-center justify-center text-3xl text-[#0f9b8e] mb-4">
                    <i className={tool.icon}></i>
                  </div>
                  <h4 className="text-xl font-semibold text-[#16213e] mb-2">{tool.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{tool.desc}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7]" style={{ width: `${tool.level}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-[#0f9b8e]">{tool.text}</span>
                    <span className="text-gray-600">{tool.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-24 rounded-3xl mx-6 md:mx-auto md:max-w-6xl mb-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative pb-4 after:content-[''] after:absolute after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#0f9b8e] after:to-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              My Integrated Workflow
            </h2>
            <p className="text-center text-white/80 text-lg mb-16">Consistent, modern card styling throughout.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'fa-search', title: 'Research & Discovery', desc: 'Data‑informed strategy.' },
                { icon: 'fa-pencil-ruler', title: 'Design & Prototyping', desc: 'Figma, Canva, CorelDraw.' },
                { icon: 'fa-code', title: 'Development', desc: 'VS Code, React, responsive.' },
                { icon: 'fa-rocket', title: 'Launch & Optimize', desc: 'Performance & analytics.' },
              ].map((step, idx) => (
                <div key={idx} className="bg-white/95 backdrop-blur-sm p-8 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-lg">
                  <div className="w-16 h-16 mx-auto bg-[#0f9b8e]/10 rounded-full flex items-center justify-center text-3xl text-[#0f9b8e] mb-4">
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">Seamless Tool Integration</h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                All cards are now solid white with subtle shadows — a clean, globally inspired design language.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <i className="fas fa-comments"></i> Discuss Your Project
              </Link>
            </div>
            <div className="flex-1 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-12 flex items-center justify-center min-h-[300px]">
              <div className="grid grid-cols-3 gap-6">
                {['fab fa-react', 'fab fa-js-square', 'fab fa-html5', 'fab fa-css3-alt', 'fab fa-figma', 'fab fa-wordpress'].map((icon, idx) => (
                  <div key={idx} className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-3xl text-white hover:scale-110 transition-transform border border-white/20">
                    <i className={icon}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="relative text-white py-24 bg-cover bg-center"
          style={{ backgroundImage: 'url(assets/images/CTA8.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#171919]/60 to-[#1a1a2e]/70"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Need a Specific Technology Solution?</h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Modern cards, international standard – let’s build something great together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services" className="btn-primary bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-concierge-bell"></i> My Services
              </Link>
              <Link href="/contact" className="btn-outline border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-calendar-check"></i> Tech Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] bg-cover opacity-5 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#1dc9b7] mb-5">Rabiu Sani Muhammad</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Professional Full Brand Designer specializing in comprehensive visual identity systems, UI/UX design, and strategic brand development for businesses of all sizes.
              </p>
              <div className="flex space-x-3">
                {['behance', 'dribbble', 'linkedin-in', 'instagram', 'twitter'].map((social) => (
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
                {['Home', 'About Me', 'Portfolio', 'Services', 'Tech Stack', 'Contact'].map((item, idx) => (
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
                    <i className="fas fa-phone-alt w-5"></i> +234 91 23234431
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

          {/* Back to Navbar Button */}
          <div className="text-center mb-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0f9b8e] to-[#1dc9b7] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-arrow-up"></i> Back to Navbar
            </button>
          </div>

          <div className="text-center text-gray-400 text-sm pt-8 border-t border-white/10">
            <p>&copy; {new Date().getFullYear()} Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Professional Brand Design Portfolio</p>
          </div>
        </div>
      </footer>
    </>
  );
}
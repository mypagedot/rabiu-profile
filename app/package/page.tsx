"use client";

import Link from "next/link";
import { useState } from "react";

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState<"mobile" | "web" | "desktop">("mobile");

  // Package data for each platform – International standard pricing (USD)
  const packages = {
    mobile: {
      corporate: {
        name: "Corporate",
        price: "$3,000 to $6,000",
        description: "Depend on the project - One‑time project fee",
        features: [
          "<strong>Tech Stack</strong>: React Native (Expo) or Flutter",
          "<strong>App Strategy Workshop</strong> – 2 hours",
          "<strong>Wireframes</strong> – key screens (up to 10)",
          "<strong>UI Design</strong> – up to 15 screens (iOS/Android)",
          "<strong>Prototype</strong> – clickable prototype for testing",
          "<strong>Asset Export</strong> – all icons and graphics",
        ],
        duration: "2–3 weeks",
        terms: [
          "Payment: 50% deposit, 50% on final approval",
          "Revisions: Up to 2 rounds per screen",
          "Formats: Figma, Sketch, PNG, SVG",
          "Support: 1 week of minor adjustments",
        ],
      },
      professional: {
        name: "Professional",
        price: "$7,500 to $15,000",
        description: "Complete app design system",
        features: [
          "<strong>Everything in Corporate</strong> – plus:",
          "<strong>Tech Stack</strong>: React Native (CLI) / Node.js Backend",
          "<strong>Full App Design</strong> – up to 40 screens",
          "<strong>Design System</strong> – components, typography, colors",
          "<strong>Interactive Prototype</strong> – with animations",
          "<strong>User Flow Diagrams</strong>",
          "<strong>Developer Handoff</strong> – with Zeplin / Figma dev mode",
          "<strong>App Store Assets</strong> – icon, screenshots (5 languages)",
        ],
        duration: "4–6 weeks",
        terms: [
          "Payment: 40% deposit, 30% midpoint, 30% final",
          "Revisions: Up to 5 rounds per screen",
          "Formats: All source files + documentation",
          "Support: 1 month priority support",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: "Starts at $20,000+",
        description: "Custom project‑based pricing",
        features: [
          "<strong>Everything in Professional</strong> – plus:",
          "<strong>Tech Stack</strong>: Native Swift/Kotlin or Advanced Flutter / AWS",
          "<strong>Custom Animations</strong> – Lottie / Rive",
          "<strong>Wearable / Tablet Designs</strong>",
          "<strong>User Testing</strong> – 2 rounds with report",
          "<strong>Branded Pitch Deck</strong>",
          "<strong>3 Months Support</strong> – design maintenance",
          "<strong>Workshop</strong> – 4 hours for your team",
        ],
        duration: "8–12 weeks",
        terms: [
          "Payment: Custom schedule (30/40/30 typical)",
          "Revisions: Unlimited during project phases",
          "Formats: All source files + handoff docs",
          "Support: 3 months priority support",
        ],
      },
    },
    web: {
      corporate: {
        name: "Corporate",
        price: "$1,500 to $3,000",
        description: "Depend on the project One‑time project fee",
        features: [
          "<strong>Tech Stack</strong>: React / Tailwind CSS / Vercel",
          "<strong>Discovery & Planning</strong> – 2 hours",
          "<strong>Wireframes</strong> – up to 5 pages",
          "<strong>UI Design</strong> – up to 5 pages (desktop + mobile)",
          "<strong>HTML/CSS Prototype</strong> – basic interactivity",
          "<strong>Asset Export</strong> – images, icons",
        ],
        duration: "2–3 weeks",
        terms: [
          "Payment: 50% deposit, 50% on final approval",
          "Revisions: Up to 2 rounds per page",
          "Formats: Figma, HTML/CSS, PNG",
          "Support: 1 week of minor adjustments",
        ],
      },
      professional: {
        name: "Professional",
        price: "$3,500 to $7,000",
        description: "Depend on the project - Full website design & development",
        features: [
          "<strong>Everything in Corporate</strong> – plus:",
          "<strong>Tech Stack</strong>: Next.js / Node.js / Headless CMS",
          "<strong>Full Website Design</strong> – up to 15 pages",
          "<strong>Design System</strong> – components, variants",
          "<strong>Custom Development</strong> – Next.js / WordPress",
          "<strong>CMS Integration</strong> (if applicable)",
          "<strong>SEO Setup</strong> – basic on‑page",
          "<strong>Contact Forms & Integrations</strong>",
        ],
        duration: "5–7 weeks",
        terms: [
          "Payment: 40% deposit, 30% midpoint, 30% final",
          "Revisions: Up to 5 rounds per page",
          "Formats: All source files + dev handoff",
          "Support: 1 month priority support",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: "Starts at $10,000+",
        description: "Custom project‑based pricing",
        features: [
          "<strong>Everything in Professional</strong> – plus:",
          "<strong>Tech Stack</strong>: Microservices (Go/Node) / AWS / GCP",
          "<strong>E‑commerce / Membership Functionality</strong>",
          "<strong>Custom Web App Features</strong> – dashboards, tools",
          "<strong>Advanced Animations</strong> – GSAP / Framer Motion",
          "<strong>Performance Optimization</strong>",
          "<strong>Training & Documentation</strong>",
          "<strong>6 Months Support & Maintenance</strong>",
        ],
        duration: "10–14 weeks",
        terms: [
          "Payment: Custom schedule",
          "Revisions: Unlimited during project phases",
          "Formats: All source files + full documentation",
          "Support: 6 months priority support",
        ],
      },
    },
    desktop: {
      corporate: {
        name: "Corporate",
        price: "$2,000 to $4,000",
        description: "One‑time project fee",
        features: [
          "<strong>Tech Stack</strong>: Tauri or Electron + React",
          "<strong>Requirements Workshop</strong> – 2 hours",
          "<strong>Wireframes</strong> – key screens (up to 10)",
          "<strong>UI Design</strong> – up to 15 screens (Windows/macOS)",
          "<strong>Prototype</strong> – basic interactions",
          "<strong>Asset Export</strong> – icons, graphics",
        ],
        duration: "3–4 weeks",
        terms: [
          "Payment: 50% deposit, 50% on final approval",
          "Revisions: Up to 2 rounds per screen",
          "Formats: Figma, Sketch, PNG",
          "Support: 1 week of minor adjustments",
        ],
      },
      professional: {
        name: "Professional",
        price: "$4,500 to $8,500",
        description: "Depend on the Project - Complete desktop app design",
        features: [
          "<strong>Everything in Corporate</strong> – plus:",
          "<strong>Tech Stack</strong>: Electron.js / Native APIs / SQLite",
          "<strong>Full App Design</strong> – up to 40 screens",
          "<strong>Design System</strong> – components, theming",
          "<strong>Interactive Prototype</strong> – with complex interactions",
          "<strong>User Flows & Personas</strong>",
          "<strong>Developer Handoff</strong> – with specs",
          "<strong>Adaptive Layouts</strong> – window resizing",
        ],
        duration: "6–8 weeks",
        terms: [
          "Payment: 40% deposit, 30% midpoint, 30% final",
          "Revisions: Up to 5 rounds per screen",
          "Formats: All source files + documentation",
          "Support: 1 month priority support",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: "Starts at $12,000+",
        description: "Depend on the Project - Custom project‑based pricing",
        features: [
          "<strong>Everything in Professional</strong> – plus:",
          "<strong>Tech Stack</strong>: C++ / C# (WPF) or High-Performance Tauri (Rust)",
          "<strong>Multi‑platform Adaptation</strong> (Windows, macOS, Linux)",
          "<strong>Advanced Interactions</strong> – drag‑drop, shortcuts",
          "<strong>Offline Functionality Design</strong>",
          "<strong>User Testing & Iteration</strong>",
          "<strong>Branded Installer / Onboarding</strong>",
          "<strong>6 Months Priority Support</strong>",
        ],
        duration: "12–16 weeks",
        terms: [
          "Payment: Custom schedule",
          "Revisions: Unlimited during project phases",
          "Formats: All source files + full documentation",
          "Support: 6 months priority support",
        ],
      },
    },
  };

  const currentPackages = packages[activeTab];

  // Helper to render a package card
  const renderPackageCard = (
    tier: "corporate" | "professional" | "enterprise",
    pkg: typeof packages.mobile.corporate
  ) => {
    const isProfessional = tier === "professional";
    return (
      <div
        key={tier}
        className={`bg-white rounded-2xl shadow-xl border ${isProfessional ? "border-2 border-[#0f9b8e] relative transform scale-105 lg:scale-110" : "border-gray-100"
          } overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}
      >
        {isProfessional && (
          <div className="absolute top-4 right-4 bg-[#0f9b8e] text-white px-3 py-1 text-xs font-semibold rounded-full rotate-12 z-10">
            Most Popular
          </div>
        )}
        <div className="bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] p-6 text-center">
          <h2 className="text-3xl font-bold text-white">{pkg.name}</h2>
          <div className="text-4xl font-extrabold text-white mt-2">{pkg.price}</div>
          <p className="text-white/90 text-sm mt-1">{pkg.description}</p>
        </div>
        <div className="p-8">
          <h3 className="text-xl font-semibold text-[#16213e] mb-4 flex items-center gap-2">
            <i className="fas fa-cubes text-[#0f9b8e]"></i> What’s Included
          </h3>
          <ul className="space-y-3 text-gray-600 mb-6">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <i className="fas fa-check text-[#0f9b8e] mt-1"></i>
                <span dangerouslySetInnerHTML={{ __html: feature }} />
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-[#16213e] mb-4 flex items-center gap-2">
            <i className="fas fa-clock text-[#0f9b8e]"></i> Duration
          </h3>
          <p className="text-gray-600 mb-6">
            <strong>{pkg.duration}</strong> from deposit to final delivery.
          </p>

          <h3 className="text-xl font-semibold text-[#16213e] mb-4 flex items-center gap-2">
            <i className="fas fa-file-signature text-[#0f9b8e]"></i> Agreement Terms
          </h3>
          <ul className="space-y-2 text-gray-600 mb-8">
            {pkg.terms.map((term, idx) => (
              <li key={idx}>
                <span className="font-medium">{term.split(":")[0]}:</span>
                {term.split(":").slice(1).join(":")}
              </li>
            ))}
          </ul>

          <Link
            href="/payment"
            className="block w-full text-center bg-linear-to-r from-[#0f9b8e] to-[#1dc9b7] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {tier === "enterprise" ? "Contact for Quote" : `Choose ${pkg.name}`}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 py-4 shadow-lg backdrop-blur-md">
        <div className="container mx-auto px-5 max-w-7xl">
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-extrabold text-[#1dc9b7] font-['Montserrat'] tracking-tight"
            >
              Rabiu<span className="text-white font-semibold">SM</span>
            </Link>
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
                  className="text-white hover:text-[#1dc9b7] transition px-3 py-2 text-sm lg:text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1dc9b7] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[70%]"
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
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* Packages Hero */}
        <section
          className="relative text-white py-24 md:py-32 bg-cover bg-center bg-fixed overflow-hidden mb-16"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(15, 155, 142, 0.8), rgba(29, 201, 183, 0.8)), url(/assets/images/hero-bg-img.jpg)"
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
          <div className="container mx-auto px-5 max-w-7xl relative z-10 text-center flex flex-col items-center">
            <span className="bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-sm">
              World-Class Engineering
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter drop-shadow-xl text-white font-sans leading-tight">
              Transparent Pricing.<br />
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">Premium Solutions.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/95 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-md mb-8">
              Choose a tier that fits your scale. Every project is built using modern, internationally recognized technology stacks, guaranteeing performance, security, and extreme scalability.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-white/90 text-3xl md:text-4xl mt-4">
              <i className="fab fa-react hover:text-[#61DAFB] transition-colors cursor-pointer hover:-translate-y-1 transform duration-300" title="React Native"></i>
              <i className="fab fa-node-js hover:text-[#339933] transition-colors cursor-pointer hover:-translate-y-1 transform duration-300" title="Node.js"></i>
              <i className="fab fa-aws hover:text-[#FF9900] transition-colors cursor-pointer hover:-translate-y-1 transform duration-300" title="AWS"></i>
              <i className="fab fa-python hover:text-[#3776AB] transition-colors cursor-pointer hover:-translate-y-1 transform duration-300" title="Python"></i>
              <i className="fab fa-swift hover:text-[#F05138] transition-colors cursor-pointer hover:-translate-y-1 transform duration-300" title="Swift"></i>
              <i className="fab fa-docker hover:text-[#2496ED] transition-colors cursor-pointer hover:-translate-y-1 transform duration-300" title="Docker"></i>
            </div>
          </div>
        </section>

        {/* Platform Tabs */}
        <section className="container mx-auto px-5 max-w-7xl mb-12">
          <div className="flex justify-center space-x-2 sm:space-x-4 border-b border-gray-200 pb-2">
            {[
              { id: "mobile", label: "Mobile Applications" },
              { id: "web", label: "Web Applications" },
              { id: "desktop", label: "Desktop Applications" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-t-lg transition ${activeTab === tab.id
                  ? "bg-[#1a1a2e] text-white"
                  : "text-gray-600 hover:text-[#0f9b8e] hover:bg-gray-100"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Packages Grid */}
        <section className="container mx-auto px-5 max-w-7xl mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderPackageCard("corporate", currentPackages.corporate)}
            {renderPackageCard("professional", currentPackages.professional)}
            {renderPackageCard("enterprise", currentPackages.enterprise)}
          </div>

          {/* Additional info */}
          <div className="mt-16 text-center bg-gray-50 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg">
              All packages include a free initial consultation, project management, and delivery of final files.
              <br />
              Need a mix of platforms or a completely custom solution?{" "}
              <Link href="/contact" className="text-[#0f9b8e] font-semibold hover:underline">
                Let’s talk
              </Link>
              .
            </p>
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
                Professional Full‑Stack Developer & UI/UX Designer specializing in mobile, web, and desktop applications for businesses worldwide.
              </p>
              <div className="social-links flex gap-4">
                {["behance", "dribbble", "linkedin-in", "instagram", "twitter"].map((social) => (
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
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Me" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/services", label: "Services" },
                  { href: "/skills", label: "Skills" },
                  { href: "/contact", label: "Contact" },
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
            <p>&copy; 2026 Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | International Software Development Portfolio</p>
          </div>
        </div>
      </footer>
    </>
  );
}
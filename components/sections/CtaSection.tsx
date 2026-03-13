// components/sections/CtaSection.tsx


import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="cta-section" style={{ backgroundImage: "url('/images/CTA8.png')" }}>
      <div className="container">
        <div className="cta-content">
          <h3>Ready to build something great?</h3>
          <p>
            Whether you need a polished mobile app, a complete brand overhaul, or a blend of both – let's talk.
            I'll help you bring your vision to life.
          </p>
          <a
            href="https://forms.gle/KHfLihRz1UQKJ1YR6"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-calendar-check"></i> Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
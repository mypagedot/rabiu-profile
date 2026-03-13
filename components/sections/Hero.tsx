import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h2>I am <strong>Rabiu Sani M. (Aljauromanee),</strong> a Mobile</h2>
          <h1>
            <span className="highlight" id="typed-role"></span> 
            & <span className="highlight">Visual Brand Systems Designer</span>
          </h1>
          <div className="filter-status">
            <span> 
              <i className="fas fa-mobile-alt"></i>  Mobile Apps · Brand Design · UI/UX
            </span>
          </div>
          <div className="cta-buttons">
            <Link href="/portfolio" className="btn"><i className="fas fa-briefcase"></i> VIEW PORTFOLIO</Link>
            <Link href="/skills" className="btn btn-outline"><i className="fas fa-code"></i> MY SKILLS</Link>
            <Link href="/myjourney" className="btn btn-outline"><i className="fas fa-graduation-cap"></i> EDUCATION</Link>
            <Link href="/contact" className="btn btn-outline"><i className="fas fa-comment"></i> LET'S TALK</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
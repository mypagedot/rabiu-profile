import Link from "next/link";
import { FaWhatsapp, FaGithub, FaLinkedinIn, FaDribbble, FaInstagram } from "react-icons/fa"; // or use Font Awesome via CDN

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Rabiu Sani Muhammad</h3>
            <p>Mobile Software Engineer & Visual Brand Systems Designer. I create high‑performance apps and distinctive brand identities for forward‑thinking businesses.</p>
            <div className="social-links">
              <a href="https://wa.me/2349123234431" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="#"><FaGithub /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaDribbble /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/"><i className="fas fa-chevron-right"></i> Home</Link></li>
              <li><Link href="/about"><i className="fas fa-chevron-right"></i> About Me</Link></li>
              <li><Link href="/portfolio"><i className="fas fa-chevron-right"></i> Portfolio</Link></li>
              <li><Link href="/skills"><i className="fas fa-chevron-right"></i> Skills</Link></li>
              <li><Link href="/services"><i className="fas fa-chevron-right"></i> Services</Link></li>
              <li><Link href="/contact"><i className="fas fa-chevron-right"></i> Contact</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul>
              <li><a href="mailto:aljauromanee@gmail.com"><i className="fas fa-envelope"></i> aljauromanee@gmail.com</a></li>
              <li><a href="tel:+2349123234431"><i className="fas fa-phone-alt"></i> +234 9123234431</a></li>
              <li><span><i className="fas fa-map-marker-alt"></i> FCT, Abuja, Nigeria</span></li>
              <li><span><i className="fas fa-globe"></i> Available Worldwide</span></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Rabiu Sani Muhammad (Aljauromanee). All Rights Reserved. | Mobile Software Engineer & Visual Brand Systems Designer</p>
        </div>
      </div>
    </footer>
  );
}
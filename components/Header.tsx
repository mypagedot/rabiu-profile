"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "Skills", path: "/skills" },
    { name: "Let's Talk", path: "/contact", isCta: true },
  ];

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            Rabiu<span>SM</span>
          </Link>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${pathname === item.path ? "active" : ""} ${
                    item.isCta ? "nav-cta" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button className="mobile-menu" onClick={toggleMenu} aria-label="Menu">
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </nav>
      </div>
    </header>
  );
}
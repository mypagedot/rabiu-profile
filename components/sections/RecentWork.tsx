"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const workItems = [
  {
    id: 1,
    category: "mobile",
    title: "PayQuick – FinTech App",
    description: "Cross‑platform mobile banking app with biometric login, real‑time transactions, and an intuitive dashboard. Built with React Native + Node.js.",
    image: "/images/finTech.jpg",
    categoryLabel: "Mobile App",
  },
  {
    id: 2,
    category: "branding",
    title: "EcoFresh Organics",
    description: "Full visual identity – logo, packaging, and marketing collateral for an organic food startup. Sustainable look, strong shelf presence.",
    image: "/images/ecofresh-ide.jpg",
    categoryLabel: "Brand Identity",
  },
  {
    id: 3,
    category: "uiux",
    title: "MediTrack – Health Dashboard",
    description: "User experience design for a patient‑monitoring dashboard. Simplified workflows, accessible components, and a calming colour palette.",
    image: "/images/coporatebranding.jpg",
    categoryLabel: "UI/UX Design",
  },
];

export default function RecentWork() {
  const [filter, setFilter] = useState("all");

  const filteredItems = filter === "all" ? workItems : workItems.filter(item => item.category === filter);

  return (
    <section className="container recent-work">
      <h2 className="section-title">Featured Work</h2>

      <div className="work-filter">
        {["all", "mobile", "branding", "uiux"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat === "all" ? "All" : cat === "mobile" ? "Mobile Apps" : cat === "branding" ? "Brand Identity" : "UI/UX"}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {filteredItems.map((item) => (
          <div className="work-item" key={item.id}>
            <div className="work-img">
              <Image src={item.image} alt={item.title} width={400} height={260} style={{ objectFit: "cover" }} />
              <div className="work-overlay">
                <span className="work-category">{item.categoryLabel}</span>
              </div>
            </div>
            <div className="work-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="work-actions">
                <Link href="/project-detail" className="view-btn">View Details</Link>
                <Link href={`/contact?project=${encodeURIComponent(item.title)}`} className="booking-btn">Inquire</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Link href="/portfolio" className="btn"><i className="fas fa-arrow-right"></i> See All Projects</Link>
      </div>
    </section>
  );
}
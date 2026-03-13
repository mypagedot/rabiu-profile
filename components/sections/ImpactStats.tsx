"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects Delivered", target: 5, suffix: "+" },
  { label: "Client Satisfaction", target: 80, suffix: "%" },
  { label: "Years Experience", target: 5, suffix: "+" },
  { label: "Happy Clients", target: 4, suffix: "+" },
];

export default function ImpactStats() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || animated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            stats.forEach((stat, index) => {
              let start = 0;
              const step = stat.target / 50;
              const timer = setInterval(() => {
                start += step;
                if (start < stat.target) {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = Math.floor(start);
                    return newCounts;
                  });
                } else {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = stat.target;
                    return newCounts;
                  });
                  clearInterval(timer);
                }
              }, 30);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="impact-stats" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Impact by numbers</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-item" key={stat.label}>
              <h3>
                {counts[index]}
                {stat.suffix}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    no: "Step I",
    title: "Consultation",
    body: "Skin analysis, full medical history, and an honest conversation about what's achievable.",
  },
  {
    no: "Step II",
    title: "The Plan",
    body: "A treatment plan edited to your skin — never a menu upsell.",
  },
  {
    no: "Step III",
    title: "The Treatment",
    body: "One room, one practitioner, unhurried.",
  },
  {
    no: "Step IV",
    title: "Aftercare",
    body: "Written aftercare and a follow-up check within the week.",
  },
];

export default function VisitSteps() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = grid.current;
    if (!root) return;
    // Arm from JS: without it the cells render finished rather than blank.
    root.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target); // entrance plays once per cell
        }
      },
      { threshold: 0.2 },
    );
    root.querySelectorAll(".step-cell").forEach((cell) => io.observe(cell));
    return () => io.disconnect();
  }, []);

  return (
    <div className="visit-steps">
      <p className="steps-head mono">
        How the visit unfolds
        <span className="steps-rule" aria-hidden="true"></span>
      </p>
      <div className="steps-grid" ref={grid}>
        {steps.map((s, i) => (
          <div
            className="step-cell"
            key={s.no}
            style={{ "--step-delay": `${i * 80}ms` } as React.CSSProperties}
          >
            <p className="step-no mono">{s.no}</p>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-body">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

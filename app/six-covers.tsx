"use client";

import { useEffect, useRef, useState } from "react";

const treatments = [
  {
    no: "No. 01",
    name: "Signature Hydrafacial",
    category: "Skin Health",
    duration: "50 min",
    downtime: "None",
    from: "£120",
    bestFor: "Instant glow, congestion",
    line: "Deep cleanse, gentle resurfacing and serum infusion in one sitting. Skin leaves brighter than it arrived.",
  },
  {
    no: "No. 02",
    name: "Anti-Wrinkle Injections",
    category: "Injectables",
    duration: "30 min",
    downtime: "Minimal",
    from: "£180",
    bestFor: "Forehead, frown & eye lines",
    line: "Precise, conservative dosing that softens expression lines while keeping the face moving. Consultation first, always.",
  },
  {
    no: "No. 03",
    name: "Dermal Fillers",
    category: "Injectables",
    duration: "45 min",
    downtime: "24–48 h",
    from: "£250",
    bestFor: "Lips, cheeks, jawline",
    line: "Structure restored a fraction of a millilitre at a time. Placed, never poured.",
  },
  {
    no: "No. 04",
    name: "Microneedling",
    category: "Collagen Induction",
    duration: "60 min",
    downtime: "24 h",
    from: "£150",
    bestFor: "Texture, scarring, pores",
    line: "Controlled micro-channels prompt the skin to rebuild itself. Texture refines over a series.",
  },
  {
    no: "No. 05",
    name: "Laser Skin Renewal",
    category: "Correction",
    duration: "40 min",
    downtime: "48 h",
    from: "£200",
    bestFor: "Pigmentation, redness, tone",
    line: "Calibrated light lifts pigment and diffuses redness toward one even register.",
  },
  {
    no: "No. 06",
    name: "Chemical Peel",
    category: "Resurfacing",
    duration: "35 min",
    downtime: "3–5 days",
    from: "£110",
    bestFor: "Dullness, fine lines",
    line: "A deliberate turnover of the surface — fresh skin, revealed on schedule.",
  },
];

const plateSrc = (idx: number) => `/plates/menu-0${idx + 1}.jpg`;
const plateNo = (idx: number) => `0${idx + 1}`;

/* Photo layer — a 404 removes it entirely so the cover falls back to
   type on ink rather than a broken frame. */
function CoverPhoto({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  eager: boolean;
}) {
  const [missing, setMissing] = useState(false);

  if (missing) return null;

  return (
    <div className="plate-photo">
      {/* eslint-disable-next-line @next/next/no-img-element -- plain <img> required: the plate treatments come from CSS filters/masks on the raw element */}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onError={() => setMissing(true)}
        ref={(el) => {
          // Catch failures that fired before hydration attached onError.
          if (el && el.complete && el.naturalWidth === 0) setMissing(true);
        }}
      />
    </div>
  );
}

export default function SixCovers() {
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stack.current;
    if (!root) return;
    // Arm from JS: without it the covers render finished rather than blank.
    root.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target); // entrance plays once per cover
        }
      },
      { threshold: 0.25 },
    );
    root
      .querySelectorAll(".plate-cover")
      .forEach((cover) => io.observe(cover));
    return () => io.disconnect();
  }, []);

  return (
    <section className="covers" id="menu">
      <div className="covers-intro">
        <h2 className="covers-intro-title">The Menu</h2>
        <p className="covers-intro-meta mono">Six treatments · No. 01–06</p>
      </div>

      <div className="covers-stack" ref={stack}>
        {treatments.map((t, i) => (
          <article
            className="plate-cover"
            id={`plate-${plateNo(i)}`}
            key={t.no}
            style={{ zIndex: i + 1 }}
          >
            <CoverPhoto
              src={plateSrc(i)}
              alt={`${t.name} — plate photograph`}
              eager={i === 0}
            />
            <div className="plate-content">
              <p className="plate-eyebrow mono">{`${t.no} — ${t.category}`}</p>
              <h3 className="plate-name">
                <span className="plate-name-inner">{t.name}</span>
              </h3>
              <p className="plate-desc">{t.line}</p>
              <p className="plate-spec mono">
                Downtime: <span className="plate-spec-value">{t.downtime}</span>{" "}
                · From <span className="plate-spec-value">{t.from}</span> · Best
                for: <span className="plate-spec-value">{t.bestFor}</span>
              </p>
            </div>
            <div className="plate-band mono">
              <span>{`Plate ${plateNo(i)} / 06`}</span>
              <span className="plate-band-right">{t.duration}</span>
            </div>
          </article>
        ))}
        <div className="covers-spacer" aria-hidden="true" />
      </div>
    </section>
  );
}

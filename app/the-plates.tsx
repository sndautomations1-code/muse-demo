"use client";

import { useEffect, useRef, useState } from "react";

const treatments = [
  {
    no: "No. 01",
    name: "Signature Hydrafacial",
    category: "Skin Health",
    duration: "50 min",
    downtime: "None",
    price: "£120",
    bestFor: "Instant glow, congestion",
    description:
      "Deep cleanse, gentle resurfacing and serum infusion in one sitting. Skin leaves brighter than it arrived.",
    pairsWith: "05",
    photo: "/plates/menu-01.jpg",
    photoPos: "center",
  },
  {
    no: "No. 02",
    name: "Anti-Wrinkle Injections",
    category: "Injectables",
    duration: "30 min",
    downtime: "Minimal",
    price: "£180",
    bestFor: "Forehead, frown & eye lines",
    description:
      "Precise, conservative dosing that softens expression lines while keeping the face moving. Consultation first, always.",
    pairsWith: "03",
    photo: "/plates/menu-02.jpg",
    photoPos: "center",
  },
  {
    no: "No. 03",
    name: "Dermal Fillers",
    category: "Injectables",
    duration: "45 min",
    downtime: "24–48 h",
    price: "£250",
    bestFor: "Lips, cheeks, jawline",
    description:
      "Structure restored a fraction of a millilitre at a time. Placed, never poured.",
    pairsWith: "02",
    photo: "/plates/menu-03.jpg",
    photoPos: "center",
  },
  {
    no: "No. 04",
    name: "Microneedling",
    category: "Collagen Induction",
    duration: "60 min",
    downtime: "24 h",
    price: "£150",
    bestFor: "Texture, scarring, pores",
    description:
      "Controlled micro-channels prompt the skin to rebuild itself. Texture refines over a series.",
    pairsWith: "06",
    photo: "/plates/menu-04.jpg",
    photoPos: "center",
  },
  {
    no: "No. 05",
    name: "Laser Skin Renewal",
    category: "Correction",
    duration: "40 min",
    downtime: "48 h",
    price: "£200",
    bestFor: "Pigmentation, redness, tone",
    description:
      "Calibrated light lifts pigment and diffuses redness toward one even register.",
    pairsWith: "01",
    photo: "/plates/menu-05.jpg",
    photoPos: "center",
  },
  {
    no: "No. 06",
    name: "Chemical Peel",
    category: "Resurfacing",
    duration: "35 min",
    downtime: "3–5 days",
    price: "£110",
    bestFor: "Dullness, fine lines",
    description:
      "A deliberate turnover of the surface — fresh skin, revealed on schedule.",
    pairsWith: "04",
    photo: "/plates/menu-06.jpg",
    photoPos: "center",
  },
];

/* Photo widths alternate per panel to break the split's monotony:
   panels 1 & 4 → 45%, 2 & 5 → 52%, 3 & 6 → 40%. */
const PHOTO_WIDTHS = ["45%", "52%", "40%"];

const panelNo = (idx: number) => `0${idx + 1}`;

/* Photo layer — a 404 hides the image and leaves the wrapper's solid
   #ECEBE4 block, so the split layout holds. */
function PanelPhoto({
  src,
  alt,
  pos,
  chip,
  eager,
}: {
  src: string;
  alt: string;
  pos: string;
  chip: string;
  eager: boolean;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="plates-photo">
      {!missing && (
        /* eslint-disable-next-line @next/next/no-img-element -- plain <img> required: the plate treatments come from CSS filters on the raw element */
        <img
          src={src}
          alt={alt}
          style={{ objectPosition: pos }}
          loading={eager ? "eager" : "lazy"}
          onError={() => setMissing(true)}
          ref={(el) => {
            // Catch failures that fired before hydration attached onError.
            if (el && el.complete && el.naturalWidth === 0) setMissing(true);
          }}
        />
      )}
      <span className="plates-chip mono">{chip}</span>
    </div>
  );
}

export default function ThePlates() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    // Arm from JS: without it the panels render finished rather than blank.
    section.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target); // entrance plays once per panel
        }
      },
      { threshold: 0.35 },
    );
    section
      .querySelectorAll(".plates-panel")
      .forEach((panel) => io.observe(panel));
    return () => io.disconnect();
  }, []);

  return (
    <section className="plates" id="menu" ref={root}>
      <div className="plates-head">
        <h2 className="plates-title">The Menu</h2>
        <p className="plates-meta mono">Six treatments · No. 01–06</p>
      </div>

      {treatments.map((t, i) => {
        const no = panelNo(i);
        const pair = treatments[Number(t.pairsWith) - 1];
        return (
          <article
            className="plates-panel"
            id={`plate-${no}`}
            key={t.no}
            style={{ "--photo-w": PHOTO_WIDTHS[i % 3] } as React.CSSProperties}
          >
            <PanelPhoto
              src={t.photo}
              alt={`${t.name} — plate photograph`}
              pos={t.photoPos}
              chip={`Plate ${no}`}
              eager={i === 0}
            />
            <div className="plates-content">
              <span className="plates-watermark" aria-hidden="true">
                {no}
              </span>
              <p className="plates-eyebrow mono">{`${t.no} — ${t.category}`}</p>
              <h3 className="plates-name">
                <span className="plates-name-inner">{t.name}</span>
              </h3>
              <p className="plates-desc">{t.description}</p>
              <p className="plates-spec mono">
                Downtime: <span className="plates-spec-value">{t.downtime}</span>{" "}
                · From <span className="plates-spec-value">{t.price}</span> ·
                Best for:{" "}
                <span className="plates-spec-value">{t.bestFor}</span>
              </p>
              <p className="plates-pairs mono">
                Pairs with:{" "}
                <a className="plates-pairs-link" href={`#plate-${t.pairsWith}`}>
                  {`${pair.no} — ${pair.name}`}
                </a>
              </p>
              <a
                className="plates-enquire mono"
                href="https://splendessa.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire{" "}
                <span className="plates-enquire-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <p className="plates-index mono">{`Plate ${no} / 06`}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

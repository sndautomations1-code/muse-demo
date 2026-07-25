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
    photo: "/plates/menu-01.jpg",
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
    photo: "/plates/menu-02.jpg",
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
    photo: "/plates/menu-03.jpg",
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
    photo: "/plates/menu-04.jpg",
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
    photo: "/plates/menu-05.jpg",
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
    photo: "/plates/menu-06.jpg",
  },
];

const cardNo = (idx: number) => `0${idx + 1}`;

/* Photo layer — a 404 hides the image and leaves the frame's solid
   #ECEBE4 block, so the sheet keeps its rhythm. */
function CardPhoto({
  src,
  alt,
  chip,
  eager,
}: {
  src: string;
  alt: string;
  chip: string;
  eager: boolean;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="sheet-photo">
      {!missing && (
        /* eslint-disable-next-line @next/next/no-img-element -- plain <img> required: the plate treatments come from CSS filters on the raw element */
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
      )}
      <span className="sheet-chip mono">{chip}</span>
    </div>
  );
}

export default function MenuSheet() {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = grid.current;
    if (!root) return;
    // Arm from JS: without it the cards render finished rather than blank.
    root.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target); // entrance plays once per card
        }
      },
      { threshold: 0.2 },
    );
    root.querySelectorAll(".sheet-card").forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  return (
    <section className="sheet" id="menu">
      {/* eslint-disable-next-line @next/next/no-img-element -- raw asset: multiply blend does the knockout, no processing */}
      <img
        className="sheet-flora sheet-flora-left"
        src="/plates/roses.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- raw asset: multiply blend does the knockout, no processing */}
      <img
        className="sheet-flora sheet-flora-right"
        src="/plates/roses.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="sheet-head">
        <h2 className="sheet-title">The Menu</h2>
        <p className="sheet-meta mono">Six treatments · No. 01–06</p>
      </div>

      <div className="sheet-mask">
        <div className="sheet-grid" ref={grid}>
          {treatments.map((t, i) => {
            const no = cardNo(i);
            return (
              <article
                className="sheet-card"
                id={`plate-${no}`}
                key={t.no}
                title={t.bestFor}
                style={{ "--card-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <CardPhoto
                  src={t.photo}
                  alt={`${t.name} — plate photograph`}
                  chip={`Plate ${no}`}
                  eager={i === 0}
                />
                <div className="sheet-body">
                  <p className="sheet-topline mono">
                    <span className="sheet-eyebrow">{`${t.no} — ${t.category}`}</span>
                    <span className="sheet-duration">{t.duration}</span>
                  </p>
                  <h3 className="sheet-name">{t.name}</h3>
                  <p className="sheet-desc">{t.description}</p>
                  <p className="sheet-downtime mono">{`Downtime: ${t.downtime}`}</p>
                  <div className="sheet-foot">
                    <a
                      className="sheet-enquire mono"
                      href="https://splendessa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enquire{" "}
                      <span className="sheet-enquire-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                    <p className="sheet-price">
                      <span className="sheet-price-from mono">From</span>
                      {t.price}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

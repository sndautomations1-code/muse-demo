"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const MENU_ACTIVATE_EVENT = "muse:menu-activate";

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

/* Card thumb (<1024px) — vanishes on 404 rather than showing a broken frame */
function MenuThumb({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) return null;

  return (
    /* eslint-disable-next-line @next/next/no-img-element -- plain <img> required: the plate treatments come from CSS filters on the raw element */
    <img
      className="menu-thumb"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setMissing(true)}
      ref={(el) => {
        // Catch failures that fired before hydration attached onError.
        if (el && el.complete && el.naturalWidth === 0) setMissing(true);
      }}
    />
  );
}

export default function MenuCatalogue() {
  // Two stacked plate layers; sources swap alternately so only opacity animates.
  const [slots, setSlots] = useState<(number | null)[]>([0, null]);
  const [front, setFront] = useState(0);
  const [shown, setShown] = useState(0); // drives the caption — flips with the image
  const frontRef = useRef(0);
  const shownRef = useRef(0);
  const slotsRef = useRef(slots);
  const pendingRef = useRef<number | null>(null);
  const imgEls = useRef<(HTMLImageElement | null)[]>([null, null]);

  const commit = useCallback((target: number, layer: number) => {
    pendingRef.current = null;
    shownRef.current = target;
    frontRef.current = layer;
    setFront(layer);
    setShown(target);
  }, []);

  // Flip only once the back layer has real pixels for the pending plate —
  // a 404 (or a stale load event from a superseded src) never flips.
  const tryCommit = useCallback(
    (layer: number) => {
      const target = pendingRef.current;
      if (target === null || layer === frontRef.current) return;
      if (slotsRef.current[layer] !== target) return;
      const el = imgEls.current[layer];
      if (!el || !el.complete || el.naturalWidth === 0) return;
      if (!el.currentSrc.endsWith(plateSrc(target))) return;
      commit(target, layer);
    },
    [commit],
  );

  const activate = useCallback(
    (idx: number) => {
      if (idx === shownRef.current) {
        pendingRef.current = null; // back on the shown plate — cancel any in-flight swap
        return;
      }
      if (pendingRef.current === idx) return;
      pendingRef.current = idx;
      const back = 1 - frontRef.current;
      const next = [...slotsRef.current];
      next[back] = idx;
      slotsRef.current = next;
      setSlots(next);
      // Cached same-src images fire no load event — check after the src lands.
      requestAnimationFrame(() => tryCommit(back));
    },
    [tryCommit],
  );

  // Hero callout clicks flash a row; mirror that row onto the plate. The
  // smooth scroll to #menu then slides rows under the stationary cursor and
  // the browser re-fires hover — suppress row activation until the pointer
  // genuinely moves (post-scroll synthetic mousemoves keep their coords).
  const suppressHoverUntil = useRef(0);
  const pointerAt = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onActivate = (e: Event) => {
      const no = (e as CustomEvent<string>).detail;
      const idx = treatments.findIndex((t) => t.no === no);
      if (idx === -1) return;
      suppressHoverUntil.current = performance.now() + 1600;
      pointerAt.current = null;
      activate(idx);
    };
    const onMove = (e: MouseEvent) => {
      if (performance.now() >= suppressHoverUntil.current) return;
      if (!pointerAt.current) {
        pointerAt.current = { x: e.clientX, y: e.clientY };
        return;
      }
      const dx = e.clientX - pointerAt.current.x;
      const dy = e.clientY - pointerAt.current.y;
      if (Math.hypot(dx, dy) > 12) suppressHoverUntil.current = 0;
    };
    window.addEventListener(MENU_ACTIVATE_EVENT, onActivate);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener(MENU_ACTIVATE_EVENT, onActivate);
      window.removeEventListener("mousemove", onMove);
    };
  }, [activate]);

  const hoverRow = useCallback(
    (idx: number) => {
      if (performance.now() < suppressHoverUntil.current) return;
      activate(idx);
    },
    [activate],
  );

  return (
    <section className="menu" id="menu">
      <div className="menu-index">
        <div className="menu-head">
          <h2 className="section-title">The Menu</h2>
          <p className="menu-hint mono">Hover a treatment for details</p>
        </div>
        <ul className="menu-list">
          {treatments.map((t, i) => (
            <li
              className="menu-row"
              key={t.no}
              onMouseEnter={() => hoverRow(i)}
            >
              <span className="menu-no mono">{t.no}</span>
              <span className="menu-name-wrap">
                <span className="menu-name">{t.name}</span>
                <span className="menu-cat mono">{t.category}</span>
              </span>
              <span className="menu-duration mono">{t.duration}</span>
              <div className="menu-card">
                <div className="menu-card-inner">
                  <p className="menu-line">{t.line}</p>
                  <MenuThumb src={plateSrc(i)} alt={`${t.name} — plate photograph`} />
                  <p className="menu-spec mono">
                    {`Downtime: ${t.downtime} · From ${t.from} · Best for: ${t.bestFor}`}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <figure className="menu-plate">
        <div className="menu-plate-frame">
          {slots.map((idx, layer) =>
            idx === null ? null : (
              /* eslint-disable-next-line @next/next/no-img-element -- plain <img> required: the plate treatments come from CSS filters on the raw element */
              <img
                key={layer}
                className={layer === front ? "is-front" : undefined}
                src={plateSrc(idx)}
                alt={
                  layer === front
                    ? `${treatments[idx].name} — plate photograph`
                    : ""
                }
                aria-hidden={layer !== front}
                loading={idx === 0 ? "eager" : "lazy"}
                ref={(el) => {
                  imgEls.current[layer] = el;
                }}
                onLoad={() => tryCommit(layer)}
                onError={() => {
                  // 404 → abandon the swap; the previous plate stays put.
                  if (pendingRef.current === slotsRef.current[layer]) {
                    pendingRef.current = null;
                  }
                }}
              />
            ),
          )}
        </div>
        <figcaption className="menu-plate-caption mono">
          {`Plate — ${treatments[shown].no} · ${treatments[shown].name}`}
        </figcaption>
      </figure>
    </section>
  );
}

"use client";

// Coordinates live in the photo's own pixel space (1376 x 768) — the
// .callouts-img box replicates the drawn image exactly, so these track
// anatomy at any viewport. Lines: label column at x 427, one 30° elbow,
// ending at the ring edge of the dot.
const CALLOUTS = [
  {
    no: "No. 01",
    cover: "plate-01",
    label: "the glow",
    y: 45,
    points: "430,345.6 468.7,345.6 561.3,292.2",
    dot: { x: 41.06, y: 37.76 },
  },
  {
    no: "No. 03",
    cover: "plate-03",
    label: "the jawline",
    y: 55.5,
    points: "430,426.2 479.9,426.2 594.3,360.2",
    dot: { x: 43.46, y: 46.61 },
  },
  {
    no: "No. 05",
    cover: "plate-05",
    label: "even tone",
    y: 66,
    points: "430,506.9 484.6,506.9 593.3,444.2",
    dot: { x: 43.39, y: 57.55 },
  },
];

// The anchor does the scrolling; the flash lands once that scroll is
// underway and runs for its own 1.2s animation.
function flash(id: string) {
  const cover = document.getElementById(id);
  if (!cover) return;
  window.setTimeout(() => cover.classList.add("flash"), 400);
  window.setTimeout(() => cover.classList.remove("flash"), 1600);
}

export default function HeroAnnotations() {
  return (
    <div className="callouts">
      <div className="callouts-img">
        {CALLOUTS.map((c, i) => (
          <div
            className="callout"
            key={c.no}
            style={
              { "--callout-delay": `${1 + i * 0.15}s` } as React.CSSProperties
            }
          >
            <svg
              className="callout-svg"
              viewBox="0 0 1376 768"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline points={c.points} vectorEffect="non-scaling-stroke" />
            </svg>
            <span
              className="callout-dot"
              style={{ left: `${c.dot.x}%`, top: `${c.dot.y}%` }}
              aria-hidden="true"
            />
            <a
              className="callout-tag"
              href={`#${c.cover}`}
              style={{ top: `${c.y}%` }}
              onClick={() => flash(c.cover)}
            >
              <span className="callout-no">{c.no}</span>
              <span className="callout-sep" aria-hidden="true">
                —
              </span>
              <em className="callout-label">{c.label}</em>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

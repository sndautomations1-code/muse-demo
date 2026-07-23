"use client";

const ANNOS = [
  // prettier-ignore
  { no: "No. 01", label: "the glow",    lx: 47, ly: 62, x1: 48.5, y1: 59.5, x2: 68,   y2: 36.2, dx: 68.5, dy: 35.5 },
  // prettier-ignore
  { no: "No. 03", label: "the jawline", lx: 52, ly: 73, x1: 53.5, y1: 70.8, x2: 69,   y2: 45.2, dx: 69.5, dy: 44.5 },
  // prettier-ignore
  { no: "No. 05", label: "even tone",   lx: 44, ly: 83, x1: 45.5, y1: 80.8, x2: 70,   y2: 58.2, dx: 70.5, dy: 57.5 },
];

function flash(no: string) {
  document.querySelectorAll(".menu-row").forEach((row) => {
    if (row.querySelector(".menu-no")?.textContent?.trim() !== no) return;
    window.setTimeout(() => row.classList.add("flash"), 400);
    window.setTimeout(() => row.classList.remove("flash"), 1600);
  });
}

export default function HeroAnnotations() {
  return (
    <>
      {ANNOS.map((a, i) => (
        <div
          className="anno"
          key={a.no}
          style={{ "--anno-delay": `${1 + i * 0.15}s` } as React.CSSProperties}
        >
          <svg
            className="anno-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1={a.x1}
              y1={a.y1}
              x2={a.x2}
              y2={a.y2}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className="anno-dot"
            style={{ left: `${a.dx}%`, top: `${a.dy}%` }}
            aria-hidden="true"
          />
          <a
            className="anno-tag"
            href="#menu"
            style={{ left: `${a.lx}%`, top: `${a.ly}%` }}
            onClick={() => flash(a.no)}
          >
            <span className="anno-no">{a.no}</span>
            <span className="anno-label">{a.label}</span>
          </a>
        </div>
      ))}
    </>
  );
}

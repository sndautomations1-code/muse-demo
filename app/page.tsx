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

import PlateImage from "./plate-image";
import CoverObserver from "./cover-observer";

export default function Home() {
  return (
    <>
      <header className="masthead">
        <span className="masthead-mark">MUSE</span>
        <span className="masthead-meta mono">
          <span className="meta-item">The Autumn Edit</span>
          <span className="meta-mid"> · Aesthetic Clinic</span>
          <span className="meta-issue"> · Issue 01</span>
        </span>
      </header>

      <main>
        <section className="hero">
          <CoverObserver />
          <div className="cover-media">
            <div className="cover-media-fade">
              <PlateImage
                src="/plates/hero.jpg"
                alt="Black and white profile portrait, face lifted toward the light"
              />
            </div>
          </div>
          <div className="cover-frame" aria-hidden="true"></div>
          <div className="cover-eyebrow mono">
            <span>Advanced skin &amp; aesthetic treatments</span>
            <span className="cover-eyebrow-rule" aria-hidden="true"></span>
            <span className="cover-eyebrow-no">No. 01–06</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-line">
              <span className="hero-line-inner">The skin</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">
                <em>edit.</em>
              </span>
            </span>
          </h1>
          <p className="hero-lede">
            {
              "Advanced facials, injectables and laser therapy in a private Marylebone clinic. Every plan begins with a consultation — and is edited to your skin."
            }
          </p>
          <div className="cover-band mono">
            <span className="cover-band-left">
              Issue 01<span className="cover-band-ext"> — The Autumn Edit</span>
            </span>
            <span className="cover-band-right">Marylebone, London</span>
          </div>
        </section>

        <p className="trust mono">
          MEDICALLY SUPERVISED · CERTIFIED PRACTITIONERS · CE-MARKED DEVICES
        </p>

        <section className="menu">
          <div className="menu-head">
            <h2 className="section-title">The Menu</h2>
            <p className="menu-hint mono">Hover a treatment for details</p>
          </div>
          <ul className="menu-list">
            {treatments.map((t) => (
              <li className="menu-row" key={t.no}>
                <span className="menu-no mono">{t.no}</span>
                <span className="menu-name-wrap">
                  <span className="menu-name">{t.name}</span>
                  <span className="menu-cat mono">{t.category}</span>
                </span>
                <span className="menu-duration mono">{t.duration}</span>
                <div className="menu-card">
                  <div className="menu-card-inner">
                    <p className="menu-line">{t.line}</p>
                    <p className="menu-spec mono">
                      {`Downtime: ${t.downtime} · From ${t.from} · Best for: ${t.bestFor}`}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="visit">
          <figure className="plate">
            <PlateImage
              src="/plates/plate-01.jpg"
              alt="A private treatment room at the clinic"
            />
            <figcaption className="plate-caption mono">
              PLATE II — TREATMENT ROOM
            </figcaption>
          </figure>
          <div className="visit-text">
            <p className="eyebrow mono">The Visit</p>
            <h2 className="visit-title">
              A private visit, <em>edited</em> to you.
            </h2>
            <p className="visit-p">
              {
                "One client at a time. Your visit opens with a skin consultation and a full medical history, and closes with aftercare you can actually follow."
              }
            </p>
            <p className="visit-p">
              {
                "Treatment rooms are private, devices are medical-grade, and nothing is recommended that your skin doesn't need."
              }
            </p>
            <p className="visit-mono mono">
              PRIVATE ROOMS · TWO PRACTITIONERS · MARYLEBONE, LONDON
            </p>
          </div>
        </section>

        <section className="booking">
          <p className="eyebrow mono booking-eyebrow">Book a consultation</p>
          <h2 className="booking-title">
            Start with a <em>conversation.</em>
          </h2>
          <p className="booking-note">
            {
              "Consultations are unhurried, one-to-one and obligation-free. Tell us what you'd like to change — we'll edit the plan around your skin."
            }
          </p>
          <a
            className="cta mono"
            href="https://splendessa.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a consultation{" "}
            <span className="cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-cols">
          <div className="footer-col">
            <h3 className="footer-head mono">Clinic</h3>
            <p>
              12 Welbeck Street
              <br />
              Marylebone, London W1
            </p>
          </div>
          <div className="footer-col">
            <h3 className="footer-head mono">Hours</h3>
            <p>
              Tue–Fri 10–19 · Sat 10–16
              <br />
              By appointment
            </p>
          </div>
          <div className="footer-col">
            <h3 className="footer-head mono">Contact</h3>
            <p>
              hello@museclinic.example
              <br />
              +44 20 7000 0000
            </p>
          </div>
        </div>
        <div className="footer-bottom mono">
          <span className="footer-mark">MUSE</span>
          <span>The Autumn Edit — Issue 01</span>
          <span>© 2026</span>
          <span>
            Website by{" "}
            <a
              className="footer-credit"
              href="https://splendessa.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Splendessa
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

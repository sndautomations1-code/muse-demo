import Image from "next/image";
import PlateImage from "./plate-image";
import CoverObserver from "./cover-observer";
import HeroAnnotations from "./hero-annotations";
import MenuSheet from "./menu-sheet";

export default function Home() {
  return (
    <>
      <nav className="masthead" aria-label="Main">
        <div className="nav-links">
          <a className="nav-link" href="#menu">
            The Menu
          </a>
          <a className="nav-link" href="#visit">
            The Visit
          </a>
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </div>
        <a className="nav-brand" href="#">
          <svg
            className="nav-mark"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
          </svg>
          <span className="masthead-mark">MUSE</span>
        </a>
        <a
          className="nav-cta"
          href="https://splendessa.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book
        </a>
      </nav>

      <div className="arch-frame" aria-hidden="true"></div>

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
          <HeroAnnotations />
          <div className="cover-eyebrow mono">
            <span>Advanced skin &amp; aesthetic treatments</span>
            <span className="cover-eyebrow-rule" aria-hidden="true"></span>
            <span className="cover-eyebrow-no">No. 01–06</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-line">
              <span className="hero-line-inner">
                <span className="glow-word" data-word="The">
                  The
                </span>{" "}
                <span className="glow-word" data-word="skin">
                  skin
                </span>
              </span>
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

        <MenuSheet />

        <section className="visit" id="visit">
          <figure className="plate">
            <Image
              src="/images/plate-2.jpg"
              alt="Treatment room with black plaster walls"
              fill
              sizes="(min-width: 900px) 45vw, 100vw"
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

      <footer className="footer" id="contact">
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

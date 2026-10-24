import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

/* The top fade is baked into this derivative as real alpha: the top row is
   fully transparent and ramps to opaque over the first ~120px, so the artwork
   melts into the dark section above without a CSS overlay or a hard seam. */
const HERO_SRC = '/Merchandising-fade.webp';
const MX_STORE_URL = 'https://www.alanampudia.tienda?origen=web_oficial';
const US_STORE_URL = 'https://www.alanampudia.store?origen=web_oficial';
const DIALOG_ID = 'merch-store-dialog';
const DIALOG_TITLE_ID = 'merch-store-dialog-title';
const FOCUSABLE = 'a[href], button:not([disabled])';

export default function ProductosPromo() {
  const { t } = useLanguage();
  const ref = useRef();
  const ctaRef = useRef();
  const dialogRef = useRef();
  const [visible, setVisible] = useState(false);
  const [chooserOpen, setChooserOpen] = useState(false);

  const closeChooser = useCallback(() => {
    setChooserOpen(false);
    /* Return focus to the control that opened the chooser so keyboard users
       never lose their place in the page. */
    ctaRef.current?.focus();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!chooserOpen) return;

    const dialog = dialogRef.current;
    const items = () => Array.from(dialog?.querySelectorAll(FOCUSABLE) ?? []);

    /* Land on the first store choice: it is the first actionable item. */
    (items()[0] ?? dialog)?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeChooser();
        return;
      }
      if (event.key !== 'Tab') return;

      /* Keep Tab inside the dialog so it behaves as a real modal. */
      const focusables = items();
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const inside = Boolean(dialog?.contains(active));

      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [chooserOpen, closeChooser]);

  return (
    <section ref={ref} className={`merch-hero${chooserOpen ? ' merch-hero--chooser-open' : ''}`}>
      <style>{`
        /* ===== FULL-BLEED MERCHANDISING HERO ===== */
        .merch-hero {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          min-height: clamp(560px, 84vh, 900px);
          /* Visible breathing room after the preceding section so the hero
             doesn't start flush against it. */
          margin: 2.5rem 0 0;
          padding: 0;
          background: var(--black);
          overflow: hidden;
          isolation: isolate;
        }

        /* Explicit layer order inside the hero: photo 0 < scrim 1 < copy 2.
           The top fade lives in the photo's alpha channel, so it needs no
           layer of its own. Keep these values in sync with the top-fade
           regression test. */
        .merch-hero__img {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* Alan sits right of centre and the merch fills the foreground: keep
             the frame centred so both stay inside the crop on every ratio. */
          object-position: 58% center;
        }

        /* Readability scrim: heavy on the left where the copy lives, light over
             Alan and the hats, darker top and bottom for edge contrast. */
        .merch-hero__scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              rgba(5, 5, 5, 0.88) 0%,
              rgba(5, 5, 5, 0.62) 34%,
              rgba(5, 5, 5, 0.16) 62%,
              rgba(5, 5, 5, 0) 88%
            ),
            linear-gradient(
              180deg,
              rgba(5, 5, 5, 0.72) 0%,
              rgba(5, 5, 5, 0.12) 28%,
              rgba(5, 5, 5, 0) 58%,
              rgba(5, 5, 5, 0.62) 100%
            );
        }

        /* Top blend: the artwork already carries a transparent-to-opaque alpha
           ramp across its first ~120px, which melts the photo's hard top edge
           into the dark page above the hero. There is no extra CSS layer: the
           alpha channel is the fade. */

        .merch-hero__content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: min(38rem, 46vw);
          /* Extra bottom padding lifts the copy so it sits over the truck and
             dusty mid-ground instead of covering the foreground caps. */
          padding: 5rem clamp(1.5rem, 6vw, 6rem) 8rem;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s ease-out, transform 0.9s ease-out;
        }
        .merch-hero__content--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .merch-hero__title {
          font-family: Anton, sans-serif;
          font-size: clamp(2.6rem, 6vw, 5.25rem);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: var(--white);
          text-transform: uppercase;
          text-shadow: 0 6px 40px rgba(0, 0, 0, 0.85), 0 2px 10px rgba(0, 0, 0, 0.7);
        }
        .merch-hero__title::after {
          content: '';
          display: block;
          width: clamp(3rem, 7vw, 6rem);
          height: 4px;
          margin-top: 1.25rem;
          background: var(--magenta);
          box-shadow: 0 0 24px var(--magenta-glow);
        }

        .merch-hero__tagline {
          margin-top: 1.5rem;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: clamp(1.2rem, 2.2vw, 1.85rem);
          line-height: 1.2;
          letter-spacing: 0.02em;
          color: var(--white);
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.8);
        }

        .merch-hero__catalog {
          margin-top: 0.9rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(0.62rem, 1vw, 0.78rem);
          line-height: 1.7;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--white-soft);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.85);
        }

        .merch-hero__cta {
          display: inline-block;
          margin-top: clamp(1.75rem, 3vw, 2.75rem);
          padding: 1rem clamp(1.75rem, 3vw, 2.75rem);
          border: 0;
          border-radius: 0;
          background: var(--magenta);
          color: var(--white);
          font-family: Anton, sans-serif;
          font-size: clamp(0.95rem, 1.6vw, 1.2rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
          transform: skewX(-8deg);
          box-shadow: 0 18px 44px rgba(233, 30, 99, 0.35);
          transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .merch-hero__cta-label { display: inline-block; transform: skewX(8deg); }
        .merch-hero__cta:hover {
          background: var(--magenta-bright);
          transform: skewX(-8deg) translateY(-2px);
          box-shadow: 0 22px 54px rgba(233, 30, 99, 0.5);
        }
        .merch-hero__cta:focus-visible {
          outline: 2px solid var(--white);
          outline-offset: 4px;
        }

        /* ===== STORE CHOOSER =====
           Rendered as a direct child of the section so the fixed overlay is
           viewport-relative instead of being clipped by the hero overflow. */

        /* The fixed navbar paints at z-index 1001 and the hero is an isolated
           stacking context, so the overlay's own z-index cannot clear it. Lift
           the whole section only while the chooser is open. */
        .merch-hero--chooser-open { z-index: 1002; }

        .merch-store-modal {
          position: fixed;
          inset: 0;
          z-index: 90;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: rgba(5, 5, 5, 0.76);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
        }

        .merch-store-dialog {
          position: relative;
          width: min(26rem, 100%);
          padding: clamp(1.75rem, 4vw, 2.5rem);
          background: var(--black);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.75);
        }
        .merch-store-dialog:focus { outline: none; }

        .merch-store-dialog__title {
          font-family: Anton, sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.1rem);
          line-height: 1.02;
          letter-spacing: 0.02em;
          color: var(--white);
          text-transform: uppercase;
        }
        .merch-store-dialog__title::after {
          content: '';
          display: block;
          width: 2.5rem;
          height: 3px;
          margin-top: 0.9rem;
          background: var(--magenta);
        }

        .merch-store-dialog__close {
          position: absolute;
          top: 0.65rem;
          right: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--white-soft);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }
        .merch-store-dialog__close:hover { color: var(--white); }
        .merch-store-dialog__close:focus-visible {
          outline: 2px solid var(--magenta);
          outline-offset: 2px;
        }

        .merch-store-dialog__stores {
          display: grid;
          gap: 0.75rem;
          margin-top: 1.75rem;
          padding: 0;
          list-style: none;
        }

        .merch-store-dialog__store {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: var(--white);
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.15rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .merch-store-dialog__store:hover,
        .merch-store-dialog__store:focus-visible {
          background: var(--magenta);
          border-color: var(--magenta);
          color: var(--white);
        }
        .merch-store-dialog__store:focus-visible {
          outline: 2px solid var(--white);
          outline-offset: 3px;
        }
        /* Decorative flag: visible for sighted users, skipped by assistive
           tech so the link's accessible name stays the country name. */
        .merch-store-dialog__flag {
          flex: 0 0 auto;
          font-size: 1.25em;
          line-height: 1;
          letter-spacing: 0;
        }
        .merch-store-dialog__store-name { flex: 1 1 auto; }
        .merch-store-dialog__arrow { flex: 0 0 auto; }

        /* ===== TABLET: copy may span more of the frame ===== */
        @media (max-width: 1023px) {
          .merch-hero__content { max-width: min(34rem, 72vw); }
        }

        /* ===== MOBILE: copy anchors to the bottom over a vertical scrim ===== */
        @media (max-width: 767px) {
          .merch-hero {
            align-items: flex-end;
            min-height: clamp(520px, 88vh, 780px);
          }
          .merch-hero__img { object-position: 64% center; }
          .merch-hero__scrim {
            background: linear-gradient(
              180deg,
              rgba(5, 5, 5, 0.55) 0%,
              rgba(5, 5, 5, 0.1) 26%,
              rgba(5, 5, 5, 0.62) 62%,
              rgba(5, 5, 5, 0.95) 100%
            );
          }
          .merch-hero__content {
            max-width: 100%;
            padding: 3.5rem 1.5rem 2.75rem;
          }
          .merch-hero__title { font-size: clamp(2.2rem, 11vw, 3.4rem); }
          .merch-hero__catalog { letter-spacing: 0.1em; }
          .merch-hero__cta { width: 100%; text-align: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .merch-hero__content { transition: none; transform: none; }
          .merch-hero__cta { transition: none; }
          .merch-store-dialog__store { transition: none; }
        }
      `}</style>

      <img
        className="merch-hero__img"
        src={HERO_SRC}
        alt={t('promo.hero_alt')}
        loading="lazy"
        decoding="async"
      />
      <div className="merch-hero__scrim" aria-hidden="true" />

      <div className={`merch-hero__content${visible ? ' merch-hero__content--visible' : ''}`}>
        <h2 className="merch-hero__title">{t('promo.hero_title')}</h2>
        <p className="merch-hero__tagline">{t('promo.hero_tagline')}</p>
        <p className="merch-hero__catalog">{t('promo.hero_catalog')}</p>
        <button
          ref={ctaRef}
          type="button"
          className="merch-hero__cta"
          onClick={() => setChooserOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={chooserOpen}
          aria-controls={chooserOpen ? DIALOG_ID : undefined}
        >
          <span className="merch-hero__cta-label">{t('promo.hero_cta')}</span>
        </button>
      </div>

      {chooserOpen && (
        <div className="merch-store-modal" onClick={closeChooser}>
          <div
            id={DIALOG_ID}
            ref={dialogRef}
            className="merch-store-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={DIALOG_TITLE_ID}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="merch-store-dialog__close"
              onClick={closeChooser}
              aria-label={t('promo.store_close')}
            >
              <span aria-hidden="true">✕</span>
            </button>

            <h3 id={DIALOG_TITLE_ID} className="merch-store-dialog__title">
              {t('promo.store_chooser_title')}
            </h3>

            <ul className="merch-store-dialog__stores">
              <li>
                <a className="merch-store-dialog__store" href={US_STORE_URL}>
                  <span className="merch-store-dialog__flag" aria-hidden="true">🇺🇸</span>
                  <span className="merch-store-dialog__store-name">{t('promo.store_us')}</span>
                  <span className="merch-store-dialog__arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a className="merch-store-dialog__store" href={MX_STORE_URL}>
                  <span className="merch-store-dialog__flag" aria-hidden="true">🇲🇽</span>
                  <span className="merch-store-dialog__store-name">{t('promo.store_mx')}</span>
                  <span className="merch-store-dialog__arrow" aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

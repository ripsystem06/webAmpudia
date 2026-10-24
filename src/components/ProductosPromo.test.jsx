import { afterEach, beforeAll, expect, test } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ProductosPromo from './ProductosPromo';
import { LanguageProvider } from '../context/LanguageContext';

const HERO_SRC = '/Merchandising-fade.webp';
const US_FLAG = '🇺🇸';
const MX_FLAG = '🇲🇽';
// Store traffic is attributed to the official website, so each regional link
// keeps its own real host plus the campaign tag, exactly once.
const US_STORE_HOST = 'www.alanampudia.store';
const MX_STORE_HOST = 'www.alanampudia.tienda';
const ORIGEN_PARAM = 'origen';
const ORIGEN_VALUE = 'web_oficial';
const taggedStoreUrl = (host) => `https://${host}?${ORIGEN_PARAM}=${ORIGEN_VALUE}`;
const MX_STORE_URL = taggedStoreUrl(MX_STORE_HOST);
const US_STORE_URL = taggedStoreUrl(US_STORE_HOST);

const ES_COPY = {
  headline: 'MERCANCÍA OFICIAL',
  tagline: 'Visita nuestra tienda en línea',
  catalog: 'Gorras · Jerseys · Playeras · Ediciones limitadas · Colecciones',
  cta: 'COMPRAR AHORA',
  chooserTitle: 'ELIGE TU TIENDA',
  imageAlt: 'Mercancía oficial de Alan Ampudia',
};

const EN_COPY = {
  headline: 'OFFICIAL MERCHANDISE',
  tagline: 'Visit our online store',
  cta: 'BUY NOW',
  chooserTitle: 'SELECT YOUR STORE',
  imageAlt: 'Alan Ampudia official merchandising',
};

// The section reveals itself through IntersectionObserver, which jsdom lacks.
// Mirrors the stub used by the existing Jest suites.
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterEach(() => {
  localStorage.clear();
});

const renderPromo = (lang = 'es') => {
  localStorage.setItem('alan-lang', lang);
  return render(
    <LanguageProvider>
      <ProductosPromo />
    </LanguageProvider>,
  );
};

const heroImage = () => document.querySelector(`img[src="${HERO_SRC}"]`);

// Copy is asserted against rendered text rather than DOM structure, so the hero
// may be laid out however it needs to be. Separator glyphs ("·") must be real
// text, not CSS-generated content. Stylesheets are stripped so decorative rules
// can never satisfy or break a copy assertion.
const heroText = (container) => {
  const clone = container.cloneNode(true);
  clone.querySelectorAll('style, script').forEach((node) => node.remove());
  return (clone.textContent ?? '').replace(/\s+/g, ' ').trim();
};

const ctaButton = (name) => screen.getByRole('button', { name: new RegExp(name, 'i') });

const openChooser = (name) => {
  fireEvent.click(ctaButton(name));
  return screen.getByRole('dialog');
};

// Price, payment, checkout and shipping language belonged to the superseded
// dialog. The store chooser must stay store-selection only.
const SHIPPING_COPY = /env[íi]o|shipping|pago|payment|precio|price|checkout/i;

test('renders the merchandising art as the hero image', () => {
  const { container } = renderPromo('es');

  const hero = heroImage();
  expect(hero).not.toBeNull();
  expect(hero.tagName).toBe('IMG');
  expect(hero.getAttribute('alt') ?? '').not.toBe('');
  expect(hero.closest('section, header, article, div')).not.toBeNull();
  expect(container.querySelectorAll(`img[src="${HERO_SRC}"]`)).toHaveLength(1);
});

// The hero's top fade is baked into the artwork itself as real alpha, so the
// component must load the transparent derivative instead of the opaque source.
// This assertion is deliberately independent of the shared HERO_SRC helper: it
// pins the delivered asset path, not whatever the helper happens to hold.
test('renders the transparent-fade derivative as the hero image', () => {
  const { container } = renderPromo('es');

  const hero = container.querySelector('.merch-hero__img');
  expect(hero).not.toBeNull();
  expect(hero.getAttribute('src')).toBe('/Merchandising-fade.webp');
});

// The user rejected "merchandising" for every Spanish-facing hero string, so the
// alt text must say "mercancía" too. English keeps its existing alt wording.
test('describes the hero image with "mercancía" in Spanish mode', () => {
  renderPromo('es');

  const hero = heroImage();
  expect(hero).not.toBeNull();
  expect(hero.getAttribute('alt')).toBe(ES_COPY.imageAlt);
  expect(hero.getAttribute('alt') ?? '').not.toMatch(/merchandising/i);
});

test('shows the localized Spanish heading and supporting copy', () => {
  const { container } = renderPromo('es');

  const text = heroText(container);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(ES_COPY.headline);
  expect(text).toContain(ES_COPY.headline);
  /* The user rejected "merchandising" in Spanish: the heading must say
     "mercancía" while the English heading keeps "merchandise". */
  expect(text).not.toMatch(/MERCHANDISING OFICIAL/i);
  expect(text).toContain(ES_COPY.tagline);
  expect(text).toContain(ES_COPY.catalog);
  expect(text).not.toContain(EN_COPY.headline);
});

test('shows the English heading in English mode', () => {
  const { container } = renderPromo('en');

  expect(heroImage()).not.toBeNull();
  expect(heroImage().getAttribute('alt')).toBe(EN_COPY.imageAlt);

  const text = heroText(container);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(EN_COPY.headline);
  expect(text).toContain(EN_COPY.headline);
  expect(text).toContain(EN_COPY.tagline);
  expect(text).not.toContain(ES_COPY.headline);
  expect(text).not.toContain('Playeras');
});

test('exposes the localized CTA as a dialog-opening button, not a link', () => {
  const { container } = renderPromo('es');

  const cta = ctaButton(ES_COPY.cta);

  expect(cta.tagName).toBe('BUTTON');
  expect(cta).toHaveAttribute('aria-haspopup', 'dialog');
  expect(cta).toHaveAttribute('aria-expanded', 'false');
  expect(cta).not.toHaveAttribute('href');
  expect(container.querySelector(`a[href="${MX_STORE_URL}"]`)).toBeNull();
  expect(container.querySelector(`a[href="${US_STORE_URL}"]`)).toBeNull();
  expect(heroText(container)).toContain(ES_COPY.cta);
});

test('keeps the store chooser closed by default in both languages', () => {
  const { unmount } = renderPromo('es');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(ctaButton(ES_COPY.cta)).toHaveAttribute('aria-expanded', 'false');
  unmount();

  renderPromo('en');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(ctaButton(EN_COPY.cta)).toHaveAttribute('aria-expanded', 'false');
});

test('opens an accessible store chooser when the CTA is activated', () => {
  renderPromo('es');

  const dialog = openChooser(ES_COPY.cta);

  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAccessibleName(new RegExp(ES_COPY.chooserTitle, 'i'));
  expect(within(dialog).getByRole('heading', { name: new RegExp(ES_COPY.chooserTitle, 'i') })).toBeVisible();
  expect(ctaButton(ES_COPY.cta)).toHaveAttribute('aria-expanded', 'true');
  expect(dialog.contains(document.activeElement)).toBe(true);
});

test('offers the US and Mexico stores as same-tab links inside the chooser', () => {
  renderPromo('es');

  const dialog = openChooser(ES_COPY.cta);
  const usLink = within(dialog).getByRole('link', { name: /estados unidos/i });
  const mxLink = within(dialog).getByRole('link', { name: /m[ée]xico/i });

  expect(usLink).toHaveAttribute('href', US_STORE_URL);
  expect(mxLink).toHaveAttribute('href', MX_STORE_URL);

  for (const link of [usLink, mxLink]) {
    expect(link).not.toHaveAttribute('target');
    expect(link.getAttribute('rel') ?? '').not.toMatch(/noopener|noreferrer|external/);
  }
});

// Each store option must carry its national flag. The flag is decorative, so it
// has to stay out of the link's accessible name while remaining visible.
const flagTextNode = (link, flag) => {
  const carriers = Array.from(link.querySelectorAll('*')).filter((node) =>
    (node.textContent ?? '').includes(flag),
  );
  return carriers.find((node) => !carriers.some((other) => other !== node && node.contains(other))) ?? null;
};

const expectDecorativeFlag = (link, flag, otherFlag) => {
  const linkText = link.textContent ?? '';
  expect(linkText).toContain(flag);
  expect(linkText).not.toContain(otherFlag);

  const glyph = flagTextNode(link, flag);
  expect(glyph).not.toBeNull();
  expect(glyph).toBeVisible();

  const hiddenBy = glyph.closest('[aria-hidden="true"]');
  expect(hiddenBy).not.toBeNull();
  expect(hiddenBy.closest('a')).toBe(link);

  expect(link).not.toHaveAccessibleName(new RegExp(flag));
};

test('shows each country flag beside its store option in the chooser', () => {
  renderPromo('es');

  const dialog = openChooser(ES_COPY.cta);
  const dialogText = dialog.textContent ?? '';

  expect(dialogText).toContain(US_FLAG);
  expect(dialogText).toContain(MX_FLAG);

  const usLink = within(dialog).getByRole('link', { name: /estados unidos/i });
  const mxLink = within(dialog).getByRole('link', { name: /m[ée]xico/i });

  expectDecorativeFlag(usLink, US_FLAG, MX_FLAG);
  expectDecorativeFlag(mxLink, MX_FLAG, US_FLAG);
});

test('keeps the localized store names as the accessible names of the flagged options', () => {
  const es = renderPromo('es');
  const esDialog = openChooser(ES_COPY.cta);

  expect(within(esDialog).getByRole('link', { name: /^estados unidos$/i })).toHaveAttribute('href', US_STORE_URL);
  expect(within(esDialog).getByRole('link', { name: /^m[ée]xico$/i })).toHaveAttribute('href', MX_STORE_URL);
  es.unmount();

  localStorage.clear();
  renderPromo('en');
  const enDialog = openChooser(EN_COPY.cta);

  expect(within(enDialog).getByRole('link', { name: /^united states$/i })).toHaveAttribute('href', US_STORE_URL);
  expect(within(enDialog).getByRole('link', { name: /^mexico$/i })).toHaveAttribute('href', MX_STORE_URL);

  const enText = enDialog.textContent ?? '';
  expect(enText).toContain(US_FLAG);
  expect(enText).toContain(MX_FLAG);
});

test('closes the chooser with its close control and returns focus to the CTA', () => {
  renderPromo('es');

  const dialog = openChooser(ES_COPY.cta);
  fireEvent.click(within(dialog).getByRole('button', { name: /cerrar|close/i }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(ctaButton(ES_COPY.cta)).toHaveFocus();
});

test('closes the chooser with Escape and returns focus to the CTA', () => {
  renderPromo('es');

  openChooser(ES_COPY.cta);
  fireEvent.keyDown(document, { key: 'Escape' });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(ctaButton(ES_COPY.cta)).toHaveFocus();
  expect(ctaButton(ES_COPY.cta)).toHaveAttribute('aria-expanded', 'false');
});

test('localizes the chooser copy in English mode', () => {
  const { container } = renderPromo('en');

  const dialog = openChooser(EN_COPY.cta);

  expect(dialog).toHaveAccessibleName(new RegExp(EN_COPY.chooserTitle, 'i'));
  expect(within(dialog).getByRole('link', { name: /united states/i })).toHaveAttribute('href', US_STORE_URL);
  expect(within(dialog).getByRole('link', { name: /mexico/i })).toHaveAttribute('href', MX_STORE_URL);

  const dialogText = (dialog.textContent ?? '').replace(/\s+/g, ' ').trim();
  expect(dialogText).toContain(EN_COPY.chooserTitle);
  expect(dialogText).not.toContain(ES_COPY.chooserTitle);
  expect(heroText(container)).not.toMatch(/COMPRAR AHORA/i);
});

// The fixed site header paints at z-index 1001. While the chooser is open the
// hero must own a stacking context above it, otherwise the overlay renders
// beneath the navbar and clicks land on the nav instead of the modal.
const NAVBAR_Z_INDEX = 1001;

const stackingIndexOf = (element) => {
  const raw = getComputedStyle(element).zIndex;
  const value = Number.parseInt(raw, 10);
  return Number.isNaN(value) ? 0 : value;
};

test('lifts the hero stacking context above the fixed navbar only while the chooser is open', () => {
  const { container } = renderPromo('es');
  const section = container.querySelector('section');
  const cta = ctaButton(ES_COPY.cta);

  expect(section).not.toBeNull();
  expect(stackingIndexOf(section)).toBeLessThanOrEqual(NAVBAR_Z_INDEX);

  fireEvent.click(cta);

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(stackingIndexOf(section)).toBeGreaterThan(NAVBAR_Z_INDEX);

  fireEvent.keyDown(document, { key: 'Escape' });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(stackingIndexOf(section)).toBeLessThanOrEqual(NAVBAR_Z_INDEX);
});

// Regression: the hero used to sit flush against the preceding section. Keep
// a visible top gap of at least 2rem (32px).
// jsdom resolves rem/em against 16px when it computes styles.
const MIN_HERO_TOP_SPACING_PX = 32;
const CSS_PX_PER_REM = 16;

const lengthInPx = (value) => {
  const match = /^(-?\d*\.?\d+)(px|rem|em)?$/.exec(String(value ?? '').trim());
  if (!match) return Number.NaN;
  const amount = Number.parseFloat(match[1]);
  return (match[2] ?? 'px') === 'px' ? amount : amount * CSS_PX_PER_REM;
};

test('keeps visible top spacing above the merchandising hero', () => {
  const { container } = renderPromo('es');
  const section = container.querySelector('section');

  expect(section).not.toBeNull();
  expect(lengthInPx(getComputedStyle(section).marginTop)).toBeGreaterThanOrEqual(
    MIN_HERO_TOP_SPACING_PX,
  );
});

// Regression: the photo used to butt straight into the dark section above the
// hero, so its top edge read as a hard seam. A decorative CSS gradient layer
// used to paint over the artwork; the fade now lives in the asset itself as a
// real transparent-to-opaque alpha ramp, so no separate node may come back.
test('bakes the top fade into the derivative image instead of a CSS overlay', () => {
  const { container } = renderPromo('es');
  const hero = heroImage();

  expect(hero).not.toBeNull();
  expect(hero.getAttribute('src')).toBe('/Merchandising-fade.webp');
  /* The fade is pixels now: a leftover overlay would double it up. */
  expect(container.querySelector('.merch-hero__top-fade')).toBeNull();

  /* Explicit layer order, bottom to top: photo 0 < scrim 1 < copy 2. */
  const scrim = container.querySelector('.merch-hero__scrim');
  const content = container.querySelector('.merch-hero__content');
  expect(scrim).not.toBeNull();
  expect(content).not.toBeNull();
  expect(stackingIndexOf(scrim)).toBeGreaterThan(stackingIndexOf(hero));
  expect(stackingIndexOf(content)).toBeGreaterThan(stackingIndexOf(scrim));
});

// Store links must keep their own real host and carry the campaign tag once.
const expectTaggedStoreLink = (link, expectedHost) => {
  const rawHref = link.getAttribute('href');
  expect(rawHref).toBeTruthy();

  const url = new URL(rawHref);
  expect(url.host).toBe(expectedHost);
  expect(url.searchParams.getAll(ORIGEN_PARAM)).toEqual([ORIGEN_VALUE]);
  expect(Array.from(url.searchParams.keys())).toEqual([ORIGEN_PARAM]);
};

test('tags both regional store links with the web_oficial origin', () => {
  renderPromo('es');

  const dialog = openChooser(ES_COPY.cta);

  expectTaggedStoreLink(
    within(dialog).getByRole('link', { name: /estados unidos/i }),
    US_STORE_HOST,
  );
  expectTaggedStoreLink(within(dialog).getByRole('link', { name: /m[ée]xico/i }), MX_STORE_HOST);
});

test('drops shipping, payment, price and checkout copy in both languages and states', () => {
  const { container, unmount } = renderPromo('es');

  expect(heroText(container)).not.toMatch(SHIPPING_COPY);
  expect(heroText(container)).not.toMatch(/SELECCIONA A D[ÓO]NDE QUIERES HACER EL ENV[ÍI]O/i);
  expect(heroText(container)).not.toMatch(/🇺🇸|🇲🇽/);

  const dialog = openChooser(ES_COPY.cta);
  expect((dialog.textContent ?? '')).not.toMatch(SHIPPING_COPY);
  expect(dialog.querySelectorAll('img')).toHaveLength(0);
  unmount();

  localStorage.clear();
  const english = renderPromo('en');
  expect(heroText(english.container)).not.toMatch(SHIPPING_COPY);

  const englishDialog = openChooser(EN_COPY.cta);
  expect((englishDialog.textContent ?? '')).not.toMatch(SHIPPING_COPY);
});

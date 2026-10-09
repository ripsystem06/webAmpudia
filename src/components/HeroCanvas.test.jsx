import {
  AUTO_SPEED,
  MASK_UPDATE_INTERVAL_MS,
  REVEAL_RADIUS,
  autoStampPoints,
  fillStamp,
  figureEightPosition,
  isTouchOnlyDevice,
  shouldAutoReveal,
  shouldRefreshMask,
} from './HeroCanvas';

describe('hero reveal geometry', () => {
  test('reveal radius grew by 10% from 55 to 60.5 units', () => {
    expect(REVEAL_RADIUS).toBe(60.5);
  });

  test('the fractional reveal radius still writes reveal pixels', () => {
    const size = 512;
    const data = new Uint8Array(size * size * 4);
    const written = fillStamp(data, 0.5, 0.5, REVEAL_RADIUS, 0.85);

    expect(written).toBeGreaterThan(1000);

    const centre = (256 * size + 256) * 4;
    expect(data[centre]).toBeGreaterThan(0);
    expect(data[centre + 3]).toBe(255);

    const outside = (256 * size + 256 + 100) * 4;
    expect(data[outside]).toBe(0);
  });
});

describe('figureEightPosition', () => {
  test('follows the horizontal infinity midline at the loops', () => {
    const start = figureEightPosition(0);
    const half = figureEightPosition(Math.PI);

    expect(start.y).toBeCloseTo(0.5, 6);
    expect(half.y).toBeCloseTo(0.5, 6);
    expect(start.x).toBeGreaterThan(0.5);
    expect(half.x).toBeLessThan(0.5);
  });

  test('crosses the centre between the two lobes', () => {
    const centre = figureEightPosition(Math.PI / 2);
    expect(centre.x).toBeCloseTo(0.5, 6);
    expect(centre.y).toBeCloseTo(0.5, 6);
  });

  test('is periodic and stays inside the canvas', () => {
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      const point = figureEightPosition(t);
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(1);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThanOrEqual(1);
    }

    const a = figureEightPosition(0.37);
    const b = figureEightPosition(0.37 + Math.PI * 2);
    expect(b.x).toBeCloseTo(a.x, 6);
    expect(b.y).toBeCloseTo(a.y, 6);
  });

  test('moves the vertical axis off-centre on both halves', () => {
    expect(figureEightPosition(Math.PI / 4).y).toBeGreaterThan(0.5);
    expect(figureEightPosition((3 * Math.PI) / 4).y).toBeLessThan(0.5);
  });
});

describe('device and idle gating', () => {
  test('treats coarse pointers and narrow viewports as touch-only tablets', () => {
    expect(isTouchOnlyDevice({ coarsePointer: true, viewportWidth: 1440 })).toBe(true);
    expect(isTouchOnlyDevice({ coarsePointer: false, viewportWidth: 1024 })).toBe(true);
    expect(isTouchOnlyDevice({ coarsePointer: false, viewportWidth: 768 })).toBe(true);
    expect(isTouchOnlyDevice({ coarsePointer: false, viewportWidth: 1280 })).toBe(false);
  });

  test('auto-reveals immediately on touch-only devices', () => {
    expect(
      shouldAutoReveal({ touchOnly: true, reducedMotion: false, now: 100, lastActivityAt: 100 })
    ).toBe(true);
  });

  test('waits out the idle delay after pointer activity on desktop', () => {
    expect(
      shouldAutoReveal({ touchOnly: false, reducedMotion: false, now: 1000, lastActivityAt: 0 })
    ).toBe(false);
    expect(
      shouldAutoReveal({ touchOnly: false, reducedMotion: false, now: 2000, lastActivityAt: 0 })
    ).toBe(true);
    expect(
      shouldAutoReveal({ touchOnly: false, reducedMotion: false, now: 2600, lastActivityAt: 500 })
    ).toBe(true);
  });

  test('never auto-reveals when the user prefers reduced motion', () => {
    expect(
      shouldAutoReveal({ touchOnly: true, reducedMotion: true, now: 5000, lastActivityAt: 0 })
    ).toBe(false);
    expect(
      shouldAutoReveal({ touchOnly: false, reducedMotion: true, now: 9000, lastActivityAt: 0 })
    ).toBe(false);
  });
});

describe('automatic effect cadence', () => {
  test('runs the infinity loop at roughly 3.5 seconds per cycle', () => {
    expect(AUTO_SPEED).toBeGreaterThanOrEqual(1.75);
    const cycleSeconds = (Math.PI * 2) / AUTO_SPEED;
    expect(cycleSeconds).toBeGreaterThan(3.2);
    expect(cycleSeconds).toBeLessThan(3.8);
  });

  test('refreshes the reveal mask about 30 times per second', () => {
    expect(MASK_UPDATE_INTERVAL_MS).toBeGreaterThanOrEqual(32);
    expect(MASK_UPDATE_INTERVAL_MS).toBeLessThanOrEqual(34);
    const updatesPerSecond = 1000 / MASK_UPDATE_INTERVAL_MS;
    expect(updatesPerSecond).toBeGreaterThanOrEqual(29);
    expect(updatesPerSecond).toBeLessThanOrEqual(31.5);
  });

  test('only allows decay/upload work once the cadence elapsed', () => {
    expect(shouldRefreshMask({ now: 1000, lastRefreshAt: 1000 })).toBe(false);
    expect(shouldRefreshMask({ now: 1032, lastRefreshAt: 1000 })).toBe(false);
    expect(shouldRefreshMask({ now: 1033, lastRefreshAt: 1000 })).toBe(true);
    expect(shouldRefreshMask({ now: 1040, lastRefreshAt: 1000, intervalMs: 80 })).toBe(false);
    expect(shouldRefreshMask({ now: 5000, lastRefreshAt: 0, intervalMs: 80 })).toBe(true);
    // A pointer stamp forces an immediate refresh on the next display frame.
    expect(shouldRefreshMask({ now: 12, lastRefreshAt: -Infinity })).toBe(true);
  });

  test('a 60 FPS frame stream only refreshes the mask about 30 times per second', () => {
    let lastRefreshAt = 0;
    let refreshes = 0;

    for (let frame = 0; frame < 60; frame++) {
      const now = frame * (1000 / 60);
      if (shouldRefreshMask({ now, lastRefreshAt })) {
        lastRefreshAt = now;
        refreshes++;
      }
    }

    // 60 display frames in ~1s must not mean 60 full-buffer passes.
    expect(refreshes).toBeGreaterThanOrEqual(28);
    expect(refreshes).toBeLessThanOrEqual(31);
  });
});

describe('deterministic auto stamps', () => {
  test('emits a single clean stamp on the infinity path', () => {
    const points = autoStampPoints(0.75);
    expect(points).toHaveLength(1);

    const expected = figureEightPosition(0.75);
    expect(points[0].x).toBeCloseTo(expected.x, 6);
    expect(points[0].y).toBeCloseTo(expected.y, 6);
    expect(points[0].radius).toBe(REVEAL_RADIUS);
  });

  test('is repeatable for the same phase (no random splatter)', () => {
    expect(autoStampPoints(1.25)).toEqual(autoStampPoints(1.25));
    expect(autoStampPoints(1.25)).not.toEqual(autoStampPoints(2.5));
  });

  test('stamps stay inside the canvas across a full cycle', () => {
    for (let i = 0; i <= 48; i++) {
      const [point] = autoStampPoints((i / 48) * Math.PI * 2);
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(1);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThanOrEqual(1);
    }
  });
});

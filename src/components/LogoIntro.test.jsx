import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import LogoIntro, {
  FINAL_SEASON_TARGET,
  FINAL_SEASON_SESSION_KEY,
  INTRO_DURATION_MS,
  MEDIA_START_TIMEOUT_MS,
  getTimeLeft,
} from './LogoIntro';

// Key used by the retired intro; it must never suppress the current loader.
const LEGACY_SESSION_KEY = 'logo-intro-played';

const startPlayback = () => {
  const video = screen.getByTestId('final-season-video');
  act(() => {
    fireEvent.playing(video);
  });
  return video;
};

// Reads the leading rem value of a clamp()-based font-size, e.g. 16vw -> 16.
const vwOf = (value) => Number((String(value).match(/([\d.]+)vw/) || [])[1]);
const remOf = (value) => Number((String(value).match(/([\d.]+)rem/) || [])[1]);
const remValuesOf = (value) =>
  (String(value).match(/([\d.]+)rem/g) || []).map((token) => Number.parseFloat(token));
const introCss = () =>
  Array.from(document.querySelectorAll('style'))
    .map((node) => node.textContent)
    .join('\n');

const MOBILE_MEDIA_QUERY = '@media (max-width: 600px)';
const MOBILE_VIEWPORT_PX = 390;
// Conservative width model for 'FINAL SEASON' in the condensed Anton face:
// 11 letters at a generous 0.6em advance plus one space at 0.3em.
const FINAL_SEASON_WIDTH_EM = 11 * 0.6 + 0.3;
const COUNTDOWN_UNITS_TOTAL = 4;
const COUNTDOWN_SIDE_PADDING_VW = 6; // '0 clamp(1.25rem, 6vw, 5rem)': two sides
const COUNTDOWN_MIN_GAP_VW = 3; // 'clamp(0.5rem, 3vw, 2.5rem)': three gaps

// Inner text of the balanced `{...}` block that opens at or after `from`.
const braceBody = (text, from) => {
  const open = text.indexOf('{', from);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    if (text[i] === '{') depth += 1;
    else if (text[i] === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(open + 1, i);
    }
  }
  return null;
};

// Declaration bodies of every rule matching `selector`, in document order.
const ruleBodies = (css, selector) => {
  const bodies = [];
  let cursor = 0;
  for (;;) {
    const at = css.indexOf(selector, cursor);
    if (at === -1) break;
    const body = braceBody(css, at);
    if (body === null) break;
    bodies.push(body);
    cursor = at + selector.length;
  }
  return bodies;
};

const mobileBlock = (css) => {
  const at = css.indexOf(MOBILE_MEDIA_QUERY);
  return at === -1 ? null : braceBody(css, at);
};

// jsdom does not implement window.scrollTo; the loader calls it on dismiss.
// Install one empty-implementation spy for the whole file so every dismiss
// path runs silently, and keep it assertable for the scroll-reset case.
beforeEach(() => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

afterEach(() => {
  window.scrollTo.mockRestore();
  jest.useRealTimers();
  sessionStorage.clear();
});

describe('LogoIntro helpers', () => {
  test('exposes the existing Baja 1000 countdown target', () => {
    expect(FINAL_SEASON_TARGET).toBe('2026-11-09T00:00:00-07:00');
  });

  test('exposes the confirmed 9.566-second MP4 duration', () => {
    expect(INTRO_DURATION_MS).toBe(9566);
  });

  test('getTimeLeft breaks the remaining time into d/h/m/s', () => {
    const now = new Date('2026-11-08T23:58:31-07:00').getTime();
    expect(getTimeLeft(FINAL_SEASON_TARGET, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 29,
    });
  });

  test('getTimeLeft clamps to zero once the target has passed', () => {
    const now = new Date('2026-11-09T00:00:01-07:00').getTime();
    expect(getTimeLeft(FINAL_SEASON_TARGET, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});

describe('LogoIntro video lifecycle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-11-08T23:58:31-07:00'));
    sessionStorage.clear();
  });

  test('mounts an autoplay-safe video without a poster or a loop', () => {
    render(<LogoIntro />);
    const video = screen.getByTestId('final-season-video');

    expect(video).toHaveAttribute('src', '/ampudiazom.mp4');
    expect(video).not.toHaveAttribute('poster');
    expect(video).not.toHaveAttribute('loop');
    expect(video.muted).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('preload', 'auto');
  });

  test('keeps the very first frame solid black with the composition hidden', () => {
    render(<LogoIntro />);

    const overlay = screen.getByTestId('logo-intro');
    expect(overlay).toHaveStyle({ backgroundColor: '#000000' });
    expect(overlay).toHaveAttribute('data-phase', 'idle');

    const video = screen.getByTestId('final-season-video');
    expect(video).toHaveAttribute('data-visible', 'false');
    expect(video).toHaveStyle({ opacity: '0', visibility: 'hidden' });

    const announcement = screen.getByTestId('final-season-announcement');
    expect(announcement).toHaveAttribute('data-visible', 'false');
    expect(announcement).toHaveStyle({ opacity: '0' });

    const countdown = screen.getByTestId('final-season-countdown');
    expect(countdown).toHaveAttribute('data-visible', 'false');
    expect(countdown).toHaveStyle({ opacity: '0' });
  });

  test('reveals the video and the choreography only when playback begins', () => {
    render(<LogoIntro />);
    const video = startPlayback();

    expect(screen.getByTestId('logo-intro')).toHaveAttribute('data-phase', 'playing');
    expect(video).toHaveAttribute('data-visible', 'true');
    expect(screen.getByTestId('final-season-announcement')).toHaveAttribute('data-visible', 'true');
    expect(screen.getByTestId('final-season-countdown')).toHaveAttribute('data-visible', 'true');
    expect(screen.getByText('LAST RACE')).toBeInTheDocument();
    expect(screen.getByText('FINAL SEASON')).toBeInTheDocument();
  });

  test('fails open at 5000ms when media never starts', () => {
    const { container } = render(<LogoIntro />);
    act(() => jest.advanceTimersByTime(MEDIA_START_TIMEOUT_MS - 1));
    expect(container.firstChild).not.toBeNull();
    expect(screen.getByTestId('logo-intro')).toHaveAttribute('data-phase', 'idle');
    act(() => jest.advanceTimersByTime(1));
    expect(container.firstChild).toBeNull();
  });

  test('cancels the startup watchdog once playback begins', () => {
    const { container } = render(<LogoIntro />);
    act(() => jest.advanceTimersByTime(MEDIA_START_TIMEOUT_MS - 1));
    startPlayback();
    act(() => jest.advanceTimersByTime(INTRO_DURATION_MS - 1));
    expect(container.firstChild).not.toBeNull();
    act(() => jest.advanceTimersByTime(1));
    expect(container.firstChild).toBeNull();
  });

  test('closes exactly when the media ends', () => {
    const { container } = render(<LogoIntro />);
    const video = startPlayback();

    act(() => {
      fireEvent.ended(video);
    });

    expect(container.firstChild).toBeNull();
  });

  test('closes through the duration fallback once playback started', () => {
    const { container } = render(<LogoIntro />);
    startPlayback();

    act(() => {
      jest.advanceTimersByTime(INTRO_DURATION_MS - 1);
    });
    expect(container.firstChild).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(container.firstChild).toBeNull();
  });

  test('fails open on a media error instead of trapping a black screen', () => {
    const { container } = render(<LogoIntro />);

    act(() => {
      fireEvent.error(screen.getByTestId('final-season-video'));
    });

    expect(container.firstChild).toBeNull();
  });

  test('keeps the countdown ticking every second while visible', () => {
    render(<LogoIntro />);
    expect(screen.getByTestId('countdown-minutes')).toHaveTextContent('01');
    expect(screen.getByTestId('countdown-seconds')).toHaveTextContent('29');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId('countdown-minutes')).toHaveTextContent('01');
    expect(screen.getByTestId('countdown-seconds')).toHaveTextContent('28');
  });
});

describe('LogoIntro session behaviour', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-11-08T23:58:31-07:00'));
    sessionStorage.clear();
  });

  test('uses a versioned final-season key instead of the retired intro key', () => {
    expect(FINAL_SEASON_SESSION_KEY).toBe('final-season-intro-v1-played');
    expect(FINAL_SEASON_SESSION_KEY).not.toBe(LEGACY_SESSION_KEY);
  });

  test('reads the session key synchronously so a reload renders null on the first pass', () => {
    sessionStorage.setItem(FINAL_SEASON_SESSION_KEY, 'true');

    const { container } = render(<LogoIntro />);

    // No one-frame flash: null on the very first render pass, before effects.
    expect(container.firstChild).toBeNull();
  });

  test('writes the session key immediately on the first mount', () => {
    const { container } = render(<LogoIntro />);

    expect(container.firstChild).not.toBeNull();
    expect(sessionStorage.getItem(FINAL_SEASON_SESSION_KEY)).toBe('true');
  });

  test('stays hidden after an F5 reload during the first playback', () => {
    const first = render(<LogoIntro />);
    startPlayback();
    expect(sessionStorage.getItem(FINAL_SEASON_SESSION_KEY)).toBe('true');

    first.unmount();

    const reloaded = render(<LogoIntro />);
    expect(reloaded.container.firstChild).toBeNull();

    act(() => {
      jest.advanceTimersByTime(INTRO_DURATION_MS * 2);
    });

    expect(reloaded.container.firstChild).toBeNull();
    expect(sessionStorage.getItem(FINAL_SEASON_SESSION_KEY)).toBe('true');
  });

  test('still renders when only the legacy intro key is present', () => {
    sessionStorage.setItem(LEGACY_SESSION_KEY, 'true');

    const { container } = render(<LogoIntro />);

    expect(container.firstChild).not.toBeNull();
    expect(screen.getByText('FINAL SEASON')).toBeInTheDocument();
  });

  test('never writes the retired intro key', () => {
    render(<LogoIntro />);
    startPlayback();

    act(() => {
      jest.advanceTimersByTime(INTRO_DURATION_MS);
    });

    expect(sessionStorage.getItem(LEGACY_SESSION_KEY)).toBeNull();
  });
});

describe('LogoIntro skip interactions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-11-08T23:58:31-07:00'));
    sessionStorage.clear();
  });

  test('dismisses immediately when the overlay is clicked', () => {
    const { container } = render(<LogoIntro />);
    const overlay = screen.getByTestId('logo-intro');

    // The root overlay must stay able to receive events.
    expect(overlay.style.pointerEvents).not.toBe('none');

    act(() => {
      fireEvent.click(overlay);
    });

    expect(container.firstChild).toBeNull();
  });

  test('dismisses on a wheel gesture over the overlay', () => {
    const { container } = render(<LogoIntro />);

    act(() => {
      fireEvent.wheel(screen.getByTestId('logo-intro'));
    });

    expect(container.firstChild).toBeNull();
  });

  test('dismisses on a touch gesture over the overlay', () => {
    const { container } = render(<LogoIntro />);

    act(() => {
      fireEvent.touchStart(screen.getByTestId('logo-intro'));
    });

    expect(container.firstChild).toBeNull();
  });

  test('dismisses on a window-level wheel that lands outside the overlay', () => {
    const { container } = render(<LogoIntro />);

    act(() => {
      window.dispatchEvent(new Event('wheel'));
    });

    expect(container.firstChild).toBeNull();
  });

  test('dismisses on a window-level touchmove that lands outside the overlay', () => {
    const { container } = render(<LogoIntro />);

    act(() => {
      window.dispatchEvent(new Event('touchmove'));
    });

    expect(container.firstChild).toBeNull();
  });

  test('dismisses on Escape', () => {
    const { container } = render(<LogoIntro />);

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    expect(container.firstChild).toBeNull();
  });

  test('keeps the session key claimed after an early skip and never replays it', () => {
    const { container, unmount } = render(<LogoIntro />);
    expect(sessionStorage.getItem(FINAL_SEASON_SESSION_KEY)).toBe('true');

    act(() => {
      fireEvent.click(screen.getByTestId('logo-intro'));
    });
    expect(container.firstChild).toBeNull();
    expect(sessionStorage.getItem(FINAL_SEASON_SESSION_KEY)).toBe('true');

    unmount();

    const reloaded = render(<LogoIntro />);
    expect(reloaded.container.firstChild).toBeNull();
  });

  test('registers the skip safety net and removes every listener on unmount', () => {
    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<LogoIntro />);

    const watch = ['wheel', 'touchmove', 'keydown'];
    const added = addSpy.mock.calls.map(([type]) => type);
    watch.forEach((type) => expect(added).toContain(type));

    unmount();

    const removed = removeSpy.mock.calls.map(([type]) => type);
    watch.forEach((type) => expect(removed).toContain(type));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});

describe('LogoIntro scroll containment', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-11-08T23:58:31-07:00'));
    sessionStorage.clear();
  });

  // jsdom cannot really scroll, so a cancelable synthetic event is the honest
  // contract for "the browser never got the gesture".
  const dispatchCancelable = (type) => {
    const event = new Event(type, { cancelable: true });
    act(() => {
      window.dispatchEvent(event);
    });
    return event;
  };

  test('prevents a wheel gesture from scrolling the document behind the loader', () => {
    const { container } = render(<LogoIntro />);

    const event = dispatchCancelable('wheel');

    expect(event.defaultPrevented).toBe(true);
    expect(container.firstChild).toBeNull();
  });

  test('prevents a touchmove gesture from scrolling the document behind the loader', () => {
    const { container } = render(<LogoIntro />);

    const event = dispatchCancelable('touchmove');

    expect(event.defaultPrevented).toBe(true);
    expect(container.firstChild).toBeNull();
  });

  test('resets the document scroll to the top when the loader dismisses', () => {
    render(<LogoIntro />);

    act(() => {
      fireEvent.click(screen.getByTestId('logo-intro'));
    });

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('stops preventing scroll once the loader is dismissed', () => {
    render(<LogoIntro />);

    dispatchCancelable('wheel');

    const after = dispatchCancelable('touchmove');

    expect(after.defaultPrevented).toBe(false);
  });

  test('removes the listener on unmount so the page scrolls normally afterwards', () => {
    const { unmount } = render(<LogoIntro />);
    unmount();

    const event = dispatchCancelable('wheel');

    expect(event.defaultPrevented).toBe(false);
  });
});

describe('LogoIntro full-viewport layout contract', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-11-08T23:58:31-07:00'));
    sessionStorage.clear();
  });

  test('anchors the black overlay to the whole viewport without overflow', () => {
    render(<LogoIntro />);
    const overlay = screen.getByTestId('logo-intro');

    expect(overlay.style.position).toBe('fixed');
    expect(overlay.style.top).toBe('0px');
    expect(overlay.style.left).toBe('0px');
    expect(overlay.style.right).toBe('0px');
    expect(overlay.style.bottom).toBe('0px');
    expect(overlay.style.width).toBe('100%');
    expect(overlay.style.height).toBe('100%');
    expect(overlay.style.overflow).toBe('hidden');
  });

  test('spans the announcement block across the available width and height', () => {
    render(<LogoIntro />);
    const announcement = screen.getByTestId('final-season-announcement');

    expect(announcement.style.position).toBe('absolute');
    expect(announcement.style.top).toBe('0px');
    expect(announcement.style.left).toBe('0px');
    expect(announcement.style.right).toBe('0px');
    expect(announcement.style.bottom).toBe('0px');
    expect(announcement.style.width).toBe('100%');
    expect(announcement.style.minHeight).toBe('100%');
    expect(announcement.style.display).toBe('flex');
    expect(announcement.style.flexDirection).toBe('column');
    expect(announcement.style.justifyContent).toBe('center');
    expect(announcement.style.alignItems).toBe('center');
  });

  test('scales the two headline lines aggressively with the viewport', () => {
    render(<LogoIntro />);

    [screen.getByText('LAST RACE'), screen.getByText('FINAL SEASON')].forEach((line) => {
      expect(line).toHaveClass('intro-headline');
      const size = line.style.getPropertyValue('--intro-headline-size');
      expect(vwOf(size)).toBeGreaterThanOrEqual(14);
      expect(remOf(size)).toBeGreaterThanOrEqual(3);
      expect(line.style.whiteSpace).toBe('nowrap');
    });

    // The viewport-scaled size must be applied by a real rule, not just declared.
    expect(introCss()).toMatch(
      /\.intro-headline\s*\{[^}]*font-size:\s*var\(--intro-headline-size\)/,
    );
  });

  test('distributes a large countdown across the viewport width', () => {
    render(<LogoIntro />);
    const countdown = screen.getByTestId('final-season-countdown');

    expect(countdown.style.position).toBe('absolute');
    expect(countdown.style.left).toBe('0px');
    expect(countdown.style.right).toBe('0px');
    expect(countdown.style.width).toBe('100%');
    expect(countdown.style.justifyContent).toBe('space-between');
    expect(countdown.style.boxSizing).toBe('border-box');

    ['days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
      const digits = screen.getByTestId(`countdown-${unit}`);
      expect(digits).toHaveClass('intro-countdown-digits');
      const size = digits.style.getPropertyValue('--intro-countdown-size');
      expect(vwOf(size)).toBeGreaterThanOrEqual(6);
      expect(remOf(size)).toBeGreaterThanOrEqual(2);
    });

    expect(introCss()).toMatch(
      /\.intro-countdown-digits\s*\{[^}]*font-size:\s*var\(--intro-countdown-size\)/,
    );
  });

  test('separates the headline from the countdown through explicit custom properties', () => {
    render(<LogoIntro />);
    const overlay = screen.getByTestId('logo-intro');
    const countdown = screen.getByTestId('final-season-countdown');

    // Central, reviewable spacing contract lives on the overlay.
    const lift = overlay.style.getPropertyValue('--intro-headline-lift');
    const bottom = overlay.style.getPropertyValue('--intro-countdown-bottom');
    expect(lift).toBeTruthy();
    expect(bottom).toBeTruthy();

    // The announcement consumes the lift as an upward translate instead of
    // hard-coding the offset, so the intent stays obvious and testable.
    const headlineBlock = screen.getByTestId('final-season-headline');
    expect(headlineBlock.style.transform).toMatch(/translateY\(/);
    expect(headlineBlock.style.transform).toMatch(/var\(--intro-headline-lift\)/);
    expect(headlineBlock).toContainElement(screen.getByText('LAST RACE'));
    expect(headlineBlock).toContainElement(screen.getByText('FINAL SEASON'));

    // The countdown consumes the lowered bottom offset through a real rule.
    expect(countdown).toHaveClass('intro-countdown');
    expect(introCss()).toMatch(
      /\.intro-countdown\s*\{[^}]*bottom:\s*var\(--intro-countdown-bottom\)/,
    );

    // The new bottom offset climbs past the previous 5rem ceiling, and the
    // lift is a real positive value.
    expect(Math.max(...remValuesOf(bottom))).toBeGreaterThan(5);
    expect(Math.max(...remValuesOf(lift))).toBeGreaterThan(0);
  });

  describe('mobile composition at 390px (max-width: 600px)', () => {
    test('enlarges and horizontally compresses the headline to fill the narrow viewport', () => {
      render(<LogoIntro />);
      const mobile = mobileBlock(introCss());
      expect(mobile).not.toBeNull();

      const [headlineRule] = ruleBodies(mobile, '.intro-headline');
      expect(headlineRule).toMatch(/font-size:\s*var\(--intro-headline-mobile-size\)/);
      expect(headlineRule).toMatch(/transform:\s*scaleX\(var\(--intro-headline-mobile-scale\)\)/);

      const line = screen.getByText('FINAL SEASON');
      const size = line.style.getPropertyValue('--intro-headline-mobile-size');
      expect(vwOf(size)).toBeGreaterThanOrEqual(24);
      expect(vwOf(size)).toBeLessThanOrEqual(26);

      const scale = Number(line.style.getPropertyValue('--intro-headline-mobile-scale'));
      expect(scale).toBeGreaterThan(0);
      expect(scale).toBeLessThan(1);

      // The horizontal compression must keep FINAL SEASON inside 390px.
      const estimatedWidthPx =
        (FINAL_SEASON_WIDTH_EM * vwOf(size) * scale * MOBILE_VIEWPORT_PX) / 100;
      expect(estimatedWidthPx).toBeLessThanOrEqual(MOBILE_VIEWPORT_PX);
    });

    test('enlarges the mobile countdown without horizontal overflow', () => {
      render(<LogoIntro />);
      const mobile = mobileBlock(introCss());
      expect(mobile).not.toBeNull();

      const [countdownRule] = ruleBodies(mobile, '.intro-countdown-digits');
      expect(countdownRule).toMatch(/font-size:\s*var\(--intro-countdown-mobile-size\)/);

      const digits = screen.getByTestId('countdown-seconds');
      const size = digits.style.getPropertyValue('--intro-countdown-mobile-size');
      expect(vwOf(size)).toBeGreaterThanOrEqual(13);
      expect(vwOf(size)).toBeLessThanOrEqual(14);

      const estimatedCountdownVw =
        COUNTDOWN_UNITS_TOTAL * 2 * 0.6 * vwOf(size) +
        COUNTDOWN_SIDE_PADDING_VW +
        COUNTDOWN_MIN_GAP_VW * (COUNTDOWN_UNITS_TOTAL - 1);
      expect(estimatedCountdownVw).toBeLessThanOrEqual(100);
    });

    test('keeps the base rules desktop-scoped and the overrides inside the media query', () => {
      render(<LogoIntro />);
      const css = introCss();
      const mobile = mobileBlock(css);
      expect(mobile).not.toBeNull();

      const [baseHeadline] = ruleBodies(css, '.intro-headline');
      expect(baseHeadline).toMatch(/font-size:\s*var\(--intro-headline-size\)/);
      expect(baseHeadline).not.toMatch(/mobile/);
      expect(baseHeadline).not.toMatch(/transform:/);

      const [baseCountdown] = ruleBodies(css, '.intro-countdown-digits');
      expect(baseCountdown).toMatch(/font-size:\s*var\(--intro-countdown-size\)/);
      expect(baseCountdown).not.toMatch(/mobile/);

      expect(ruleBodies(mobile, '.intro-headline')).toHaveLength(1);
      expect(ruleBodies(mobile, '.intro-countdown-digits')).toHaveLength(1);
    });
  });
});

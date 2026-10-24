import { useState, useEffect, useCallback } from 'react';

export const FINAL_SEASON_TARGET = '2026-11-09T00:00:00-07:00';
// Confirmed duration of public/ampudiazom.mp4 (9.566s). Used only as a
// playback-started fallback; the media itself owns the real close.
export const INTRO_DURATION_MS = 9566;
// Startup grace before failing open when autoplay is blocked and no media event arrives.
export const MEDIA_START_TIMEOUT_MS = 5000;
// Versioned key for the current loader. The retired intro used the older
// `logo-intro-played` key, so users who already saw it still get this one once per session.
export const FINAL_SEASON_SESSION_KEY = 'final-season-intro-v1-played';

const COUNTDOWN_UNITS = [
  { key: 'days', label: 'D' },
  { key: 'hours', label: 'H' },
  { key: 'minutes', label: 'M' },
  { key: 'seconds', label: 'S' },
];

export function getTimeLeft(targetDate, now = Date.now()) {
  const diff = new Date(targetDate).getTime() - now;
  if (!(diff > 0)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Read synchronously so a reload with the flag already set renders null on the
// very first pass instead of flashing the loader for one frame.
function hasIntroPlayed() {
  try {
    return sessionStorage.getItem(FINAL_SEASON_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

const pad = (value) => String(value).padStart(2, '0');

export default function LogoIntro() {
  const [dismissed, setDismissed] = useState(hasIntroPlayed);
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(FINAL_SEASON_TARGET));

  // Single close path for every dismissal route: reset the document to the top
  // first so the visitor always lands on the initial Home hero, then unmount.
  const dismiss = useCallback(() => {
    window.scrollTo(0, 0);
    setDismissed(true);
  }, []);

  // Claim the session the moment the loader mounts. An F5 mid-playback then
  // finds the flag already written and never replays the intro.
  useEffect(() => {
    if (hasIntroPlayed()) return undefined;
    try {
      sessionStorage.setItem(FINAL_SEASON_SESSION_KEY, 'true');
    } catch {
      // Private mode without storage: the loader still runs once, unremembered.
    }
    return undefined;
  }, []);

  // Fail open if autoplay is blocked and no media event ever arrives.
  useEffect(() => {
    if (dismissed || playing) return undefined;
    const timer = setTimeout(dismiss, MEDIA_START_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [dismissed, playing, dismiss]);

  // Fallback close, armed only after playback actually starts.
  useEffect(() => {
    if (dismissed || !playing) return undefined;
    const timer = setTimeout(dismiss, INTRO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [dismissed, playing, dismiss]);

  // Safety net: a scroll or Escape that lands outside the overlay still skips
  // the intro instead of trapping the visitor on the black screen. The wheel
  // and touchmove listeners are non-passive on purpose: while the loader is
  // mounted they own the gesture, so the same scroll never leaks to the page
  // behind and the visitor lands on the Home hero. Cleanup removes them, which
  // is what keeps the site scrollable once the loader is gone.
  useEffect(() => {
    if (dismissed) return undefined;
    const skip = (event) => {
      event.preventDefault();
      dismiss();
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('wheel', skip, { passive: false });
    window.addEventListener('touchmove', skip, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [dismissed, dismiss]);

  useEffect(() => {
    if (dismissed) return undefined;
    const tick = () => setTimeLeft(getTimeLeft(FINAL_SEASON_TARGET));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const play = () => setPlaying(true);

  return (
    <>
      <style>{`
        @keyframes announceRise {
          0%   { opacity: 0; transform: translateY(20px) scale(0.97); }
          25%  { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes countdownRise {
          0%, 25% { opacity: 0; transform: translateY(14px); }
          60%     { opacity: 1; transform: translateY(0); }
          100%    { opacity: 1; transform: translateY(0); }
        }
        /* Viewport-scaled type so the composition fills the screen instead of
           reading as a small centered block. */
        .intro-headline {
          font-size: var(--intro-headline-size);
        }
        .intro-countdown-digits {
          font-size: var(--intro-countdown-size);
        }
        /* Countdown drops toward the bottom edge, away from the lifted headline. */
        .intro-countdown {
          bottom: var(--intro-countdown-bottom);
        }
        /* Narrow viewports: the width-relative size alone leaves the headline
           short, so scale it up and compress horizontally instead, keeping
           'SEASON FINALE' inside the viewport. */
        @media (max-width: 600px) {
          .intro-headline {
            font-size: var(--intro-headline-mobile-size);
            transform: scaleX(var(--intro-headline-mobile-scale));
          }
          .intro-countdown-digits {
            font-size: var(--intro-countdown-mobile-size);
          }
        }
      `}</style>

      <div
        data-testid="logo-intro"
        data-phase={playing ? 'playing' : 'idle'}
        onClick={dismiss}
        onPointerDown={dismiss}
        onTouchStart={dismiss}
        onTouchMove={dismiss}
        onWheel={dismiss}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 10000,
          background: '#000000',
          isolation: 'isolate',
          overflow: 'hidden',
          // Spacing contract for the two groups: lift the headline block up and
          // drop the countdown toward the bottom edge so they read as separate.
          '--intro-headline-lift': 'clamp(2rem, 7vh, 5.5rem)',
          '--intro-countdown-bottom': 'clamp(2.5rem, 14vh, 8rem)',
        }}
      >
        {/* Revealed only once the media is genuinely playing, so nothing can
            leak a hero frame before the first decoded video frame. */}
        <video
          data-testid="final-season-video"
          data-visible={playing}
          src="/ampudiazom.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlaying={play}
          onEnded={dismiss}
          onError={dismiss}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: playing ? 1 : 0,
            visibility: playing ? 'visible' : 'hidden',
            transition: 'opacity 600ms ease-out',
          }}
        />

        {/* Opaque black plate with white copy; `darken` keeps the video only
            where the glyphs are, hiding it everywhere else. */}
        <div
          data-testid="final-season-announcement"
          data-visible={playing}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            minHeight: '100%',
            zIndex: 2,
            background: '#000000',
            mixBlendMode: 'darken',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 3vw',
            boxSizing: 'border-box',
            opacity: playing ? 1 : 0,
            pointerEvents: 'none',
            animation: playing ? 'announceRise 1.2s ease-out both' : 'none',
          }}
        >
          <div
            data-testid="final-season-headline"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'translateY(calc(-1 * var(--intro-headline-lift)))',
            }}
          >
            <h1 className="intro-headline" style={lineStyle}>
              FINAL RACE
            </h1>
            <h1 className="intro-headline" style={lineStyle}>
              SEASON FINALE
            </h1>
          </div>
        </div>

        {/* Live countdown to the confirmed race date, spread across the viewport width */}
        <div
          data-testid="final-season-countdown"
          data-visible={playing}
          className="intro-countdown"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100%',
            boxSizing: 'border-box',
            zIndex: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 'clamp(0.5rem, 3vw, 2.5rem)',
            padding: '0 clamp(1.25rem, 6vw, 5rem)',
            opacity: playing ? 1 : 0,
            pointerEvents: 'none',
            animation: playing ? 'countdownRise 1.2s ease-out both' : 'none',
          }}
        >
          {COUNTDOWN_UNITS.map(({ key, label }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                className="intro-countdown-digits"
                data-testid={`countdown-${key}`}
                style={{
                  fontFamily: "'Anton', 'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  '--intro-countdown-size': 'clamp(2.4rem, 10vw, 7rem)',
                  '--intro-countdown-mobile-size': 'clamp(2.6rem, 13.5vw, 5rem)',
                  lineHeight: 1,
                  color: '#ffffff',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {pad(timeLeft[key])}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(0.7rem, 2vw, 1.1rem)',
                  letterSpacing: '0.3em',
                  color: 'rgba(233,30,99,1)',
                  marginTop: '0.35rem',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const lineStyle = {
  fontFamily: "'Anton', 'Barlow Condensed', sans-serif",
  fontWeight: 900,
  // Leading coefficient: the longest headline line is 'SEASON FINALE', and 16vw
  // is the desktop scale that keeps the two-line block dominant on wide screens.
  '--intro-headline-size': 'clamp(3.2rem, 16vw, 18rem)',
  // Narrow viewports: taller type, compressed horizontally so the longer
  // 'SEASON FINALE' line still fits inside 390px (see the max-width: 600px rule).
  '--intro-headline-mobile-size': 'clamp(4rem, 25vw, 8.5rem)',
  '--intro-headline-mobile-scale': '0.52',
  lineHeight: 0.9,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  color: '#ffffff',
  margin: 0,
};

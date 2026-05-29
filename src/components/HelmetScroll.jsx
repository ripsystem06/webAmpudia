import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 36;
const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 333;
const frames = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/clean-opt/HBB00${240 + i}.webp`,
);
const LAST_FRAME_SRC = `/clean-opt/HBB00${240 + FRAME_COUNT - 1}.webp`;

function preloadImages(urls) {
  let cancelled = false;
  const images = urls.map(
    (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load ${src}`));
        img.src = src;
      }),
  );

  const promise = Promise.all(images).then((loaded) => {
    if (cancelled) throw new Error('CANCELLED');
    return loaded;
  });

  promise.cancel = () => {
    cancelled = true;
  };

  return promise;
}

export default function HelmetShowcase() {
  const wrapRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef(null);
  const lastFrame = useRef(-1);
  const staticTopRef = useRef(0);
  const [status, setStatus] = useState('loading');
  const [showStatic, setShowStatic] = useState(false);

  // Preload all frames
  useEffect(() => {
    const loader = preloadImages(frames);
    loader
      .then((loaded) => {
        imagesRef.current = loaded;
        setStatus('ready');
      })
      .catch((err) => {
        if (err.message !== 'CANCELLED') {
          console.error('Helmet preload failed:', err);
          setStatus('error');
        }
      });

    return () => loader.cancel();
  }, []);

  // ScrollTrigger — only attach after preload completes
  useEffect(() => {
    if (status !== 'ready') return;

    const wrap = wrapRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !container || !canvas) return;

    const hero = document.querySelector('#hero-section-trigger');
    if (!hero) return;

    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;

    const ctx = canvas.getContext('2d');
    const loaded = imagesRef.current;

    ctx.drawImage(loaded[0], 0, 0, FRAME_WIDTH, FRAME_HEIGHT);

    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'top 1%',
      end: 'center top',
      scrub: 2,
      onUpdate: (self) => {
        const p = Math.min(self.progress, 1);
        const idx = Math.min(Math.floor(p * FRAME_COUNT), FRAME_COUNT - 1);

        if (idx !== lastFrame.current) {
          ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
          ctx.drawImage(loaded[idx], 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
          lastFrame.current = idx;
        }

        const w = 980 - p * 800;
        const h = 644 - p * 524;
        const xPos = -60 + p * 60;
        const br = p * 8;

        const yOff = window.innerWidth < 768 ? '10vh' : '0vh';

        gsap.set(wrap, {
          width: `${w}px`,
          height: `${h}px`,
          x: `${xPos}vw`,
          y: yOff,
          borderRadius: `${br}px`,
        });
      },
      onLeave: () => {
        // Record viewport center at this exact scroll position
        staticTopRef.current = window.scrollY + window.innerHeight / 2;
        setShowStatic(true);
        if (container) {
          container.style.opacity = '0';
        }
      },
      onEnterBack: () => {
        setShowStatic(false);
        ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
        ctx.drawImage(loaded[0], 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
        const isMobileReset = window.innerWidth < 768;
        gsap.set(wrap, {
          width: '980px',
          height: '644px',
          x: '-60vw',
          y: isMobileReset ? '10vh' : '0vh',
          borderRadius: '0px',
        });
        if (container) {
          container.style.opacity = '1';
        }
      },
    });

    // Delay refresh to account for ScrollToTop / browser scroll restoration
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => st.kill();
  }, [status]);

  return (
    <>
      {/* Fixed canvas layer — active during scrub animation */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 15,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          ref={wrapRef}
          style={{
            width: '980px',
            height: '644px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {status === 'error' ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--magenta)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
              }}
            >
              ●
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
          )}
        </div>
      </div>

      {/* Static final frame — absolutely positioned at the spot where animation ended.
          It scrolls away naturally with the page, no longer fixed. */}
      {showStatic && (
        <div
          style={{
            position: 'absolute',
            top: `${staticTopRef.current + (window.innerWidth < 768 ? window.innerHeight * 0.1 : 0)}px`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '180px',
            height: '120px',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {/* Decorative side lines */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '100%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '1px',
            background: 'var(--magenta)',
            boxShadow: '0 0 6px var(--magenta-glow)',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '100%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '1px',
            background: 'var(--magenta)',
            boxShadow: '0 0 6px var(--magenta-glow)',
          }} />
          <img
            src={LAST_FRAME_SRC}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      )}
    </>
  );
}

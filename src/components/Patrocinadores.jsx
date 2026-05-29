import { useEffect, useRef, useState } from 'react';

const sponsors = [
  { name: 'Monster Energy', img: '/patrocinadores/monster.svg' },
  { name: 'Papas and Beer', img: '/patrocinadores/papasbeer.svg' },
  { name: 'Toyo Tires', img: '/patrocinadores/toyotires.svg' },
  { name: 'KMC Wheels', img: '/patrocinadores/kmc.svg' },
  { name: 'King Shocks', img: '/patrocinadores/king.svg' },
  { name: 'Baja Designs', img: '/patrocinadores/bd.svg' },
  { name: 'Bell Helmets', img: '/patrocinadores/bell.svg' },
  { name: 'Polaris', img: '/patrocinadores/polaris.svg' },
  { name: 'RPI', img: '/patrocinadores/rpi.svg' },
  { name: 'OMP', img: '/patrocinadores/omp.svg' },
  { name: 'Diviine', img: '/patrocinadores/diviine.svg' },
  { name: 'La Familia', img: '/patrocinadores/lafamilia.svg' },
  { name: 'Maja', img: '/patrocinadores/maja.svg' },
  { name: 'CL', img: '/patrocinadores/cl.svg' },
];

const row1 = sponsors.slice(0, 7);
const row2 = sponsors.slice(7, 14);
const loop1 = [...row1, ...row1];
const loop2 = [...row2, ...row2];

export default function Patrocinadores() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding: '6rem 0',
      background: 'var(--black)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <style>{`
        @keyframes sponsor-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes sponsor-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .sponsor-track {
          animation: sponsor-scroll 35s linear infinite;
          will-change: transform;
        }
        .sponsor-track.reverse {
          animation: sponsor-scroll-reverse 35s linear infinite;
        }
        .sponsor-track:hover {
          animation-play-state: paused;
        }
        .sponsor-item {
          opacity: 0;
          transition: opacity 0.6s ease, filter 0.3s ease, transform 0.3s ease, background 0.2s ease;
        }
        .sponsor-item.visible {
          opacity: 1;
        }
        .sponsor-item img {
          filter: brightness(0) invert(0.5);
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .sponsor-item:hover img {
          filter: brightness(0) invert(1);
          transform: scale(1.08);
        }
        .sponsor-item:hover {
          background: var(--black-card) !important;
          border-color: rgba(233,30,99,0.3) !important;
        }
          @media (max-width: 767px) {
            .sponsor-track {
              animation-duration: 22s !important;
            }
            .sponsor-item {
              min-width: 156px !important;
              height: 72px !important;
              padding: 0.96rem 1.2rem !important;
            }
          }
      `}</style>

      {/* Header */}
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0 4rem',
        marginBottom: '3rem',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--magenta-bright)',
            marginBottom: '0.8rem',
          }}>◉ ALIADOS & PATROCINADORES</div>
          <h2 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
            lineHeight: 1.15,
            color: 'var(--white)',
          }}>
            MARCAS QUE<br /><span style={{ color: 'var(--magenta)' }}>RESPALDAN</span> EL #1.
          </h2>
        </div>
        <a href="mailto:contacto@alanampudia.com" style={{
          marginTop: '1.5rem',
          padding: '1rem 1.8rem',
          background: 'var(--magenta)',
          color: 'var(--white)',
          fontFamily: 'Anton, sans-serif',
          fontSize: '0.9rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transform: 'skewX(-8deg)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'all 0.2s',
          boxShadow: '0 0 20px rgba(233,30,99,0.3)',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
        >
          <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Ser Patrocinador</span>
        </a>
      </div>

      {/* Two-row infinite carousel — opposite directions */}
      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Row 1 — left */}
        <div className="sponsor-track" style={{
          display: 'flex',
          width: 'max-content',
          gap: '1.5rem',
          padding: '0.5rem 0',
        }}>
          {loop1.map((s, i) => (
            <div
              key={i}
              className={`sponsor-item${visible ? ' visible' : ''}`}
              style={{
                transitionDelay: `${i * 0.04}s`,
                minWidth: '216px',
                height: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.2rem 2.16rem',
                background: 'var(--black-mid)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <img
                src={s.img}
                alt={s.name}
                style={{ height: '48px', maxWidth: '156px', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>

        {/* Row 2 — right */}
        <div className="sponsor-track reverse" style={{
          display: 'flex',
          width: 'max-content',
          gap: '1.5rem',
          padding: '0.5rem 0',
        }}>
          {loop2.map((s, i) => (
            <div
              key={i}
              className={`sponsor-item${visible ? ' visible' : ''}`}
              style={{
                transitionDelay: `${i * 0.04}s`,
                minWidth: '216px',
                height: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.2rem 2.16rem',
                background: 'var(--black-mid)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <img
                src={s.img}
                alt={s.name}
                style={{ height: '48px', maxWidth: '156px', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
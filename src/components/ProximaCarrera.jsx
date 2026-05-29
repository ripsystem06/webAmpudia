import { useEffect, useRef, useState } from 'react';

const nextRace = {
  name: 'SCORE Baja 1000',
  edition: '58° EDICIÓN',
  location: 'Ensenada → La Paz, B.C.',
  date: new Date('2025-11-15T06:00:00-08:00'),
  distance: '1,200 MI',
  category: 'TROPHY TRUCK',
};

export default function ProximaCarrera() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);

    const tick = () => {
      const diff = nextRace.date - new Date();
      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setCountdown({ d, h, m, s });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => { obs.disconnect(); clearInterval(interval); };
  }, []);

  return (
    <section ref={ref} style={{
      padding: '6rem 4rem',
      background: 'var(--magenta)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid var(--black)',
      borderBottom: '1px solid var(--black)',
    }}>
      {/* Diagonal stripes texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        background: `repeating-linear-gradient(135deg, transparent 0, transparent 60px, rgba(0,0,0,0.3) 60px, rgba(0,0,0,0.3) 61px)`,
      }} />

      {/* Massive watermark */}
      <div style={{
        position: 'absolute', right: '-2%', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Anton, sans-serif',
        fontSize: 'clamp(12rem, 25vw, 28rem)',
        color: 'transparent',
        WebkitTextStroke: '2px rgba(0,0,0,0.1)',
        lineHeight: 0.85, userSelect: 'none', pointerEvents: 'none',
      }}>1000</div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left side info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.4rem 0.9rem',
              background: 'var(--black)',
              marginBottom: '1.5rem',
            }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--magenta-bright)', borderRadius: '50%', animation: 'blink 1.5s infinite' }} />
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                letterSpacing: '0.3em', color: 'var(--white)', fontWeight: 700,
              }}>PRÓXIMA CARRERA</span>
            </div>

            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              letterSpacing: '0.25em', color: 'var(--black)', marginBottom: '0.5rem',
              fontWeight: 700,
            }}>
              {nextRace.edition}
            </div>

            <h2 style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(3.5rem, 7vw, 6rem)',
              lineHeight: 1.15, color: 'var(--white)',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              {nextRace.name}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--black)', fontWeight: 700, minWidth: '90px' }}>UBICACIÓN</span>
                <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--white)', letterSpacing: '0.02em' }}>{nextRace.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--black)', fontWeight: 700, minWidth: '90px' }}>DISTANCIA</span>
                <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--white)', letterSpacing: '0.02em' }}>{nextRace.distance}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--black)', fontWeight: 700, minWidth: '90px' }}>CATEGORÍA</span>
                <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--white)', letterSpacing: '0.02em' }}>{nextRace.category}</span>
              </div>
            </div>

            <a href="/calendario" style={{
              padding: '1rem 1.8rem',
              background: 'var(--black)', color: 'var(--white)',
              fontFamily: 'Anton, sans-serif', fontSize: '0.9rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              transform: 'skewX(-8deg)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--white)' + ',' + (e.currentTarget.style.color = 'var(--black)')}
            >
              <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Ver Calendario Completo</span>
            </a>
          </div>

          {/* Right side: countdown */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              letterSpacing: '0.3em', color: 'var(--black)',
              fontWeight: 700, marginBottom: '1rem',
            }}>
              CUENTA REGRESIVA / COUNTDOWN
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: 'var(--black)',
              border: '2px solid var(--black)',
            }}>
              {[
                { num: countdown.d, label: 'DÍAS' },
                { num: countdown.h, label: 'HORAS' },
                { num: countdown.m, label: 'MIN' },
                { num: countdown.s, label: 'SEG' },
              ].map((item, i) => (
                <div key={item.label} style={{
                  background: 'var(--black)',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--magenta-bright)',
                    lineHeight: 1, marginBottom: '0.3rem',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{String(item.num).padStart(2, '0')}</div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem', letterSpacing: '0.25em',
                    color: 'var(--white-dim)', fontWeight: 700,
                  }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'var(--black)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--white-dim)', fontWeight: 700 }}>
                FECHA DE LARGADA
              </span>
              <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta-bright)', letterSpacing: '0.03em' }}>
                15 NOV 2025 / 06:00 PT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

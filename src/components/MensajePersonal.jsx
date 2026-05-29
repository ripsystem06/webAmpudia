import { useEffect, useRef, useState } from 'react';

export default function MensajePersonal() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding: '8rem 4rem', background: 'var(--black)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      

      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '4rem', alignItems: 'center' }}>
        <div style={{
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}>
          <div style={{
            position: 'absolute', top: '-12px', left: '-12px',
            background: 'var(--magenta)', color: 'var(--white)',
            padding: '0.3rem 0.8rem',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.2em', fontWeight: 700, zIndex: 2,
            transform: 'skewX(-8deg)',
          }}>EL HOMBRE</div>

          <div style={{
            aspectRatio: '4/5', position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(233,30,99,0.3)',
          }}>
            <img src="/images/08-helmet.webp" alt="Alan con casco"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

            {[
              { top: 0, left: 0, borderTop: '2px solid var(--magenta)', borderLeft: '2px solid var(--magenta)' },
              { top: 0, right: 0, borderTop: '2px solid var(--magenta)', borderRight: '2px solid var(--magenta)' },
              { bottom: 0, left: 0, borderBottom: '2px solid var(--magenta)', borderLeft: '2px solid var(--magenta)' },
              { bottom: 0, right: 0, borderBottom: '2px solid var(--magenta)', borderRight: '2px solid var(--magenta)' },
            ].map((style, i) => (
              <div key={i} style={{ position: 'absolute', width: '24px', height: '24px', ...style }} />
            ))}

            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(5,5,5,1), transparent)',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--magenta-bright)' }}>
                ID: 35YR / ENSENADA / B.C.
              </div>
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: '-15px', right: '20px',
            padding: '0.4rem 1rem', background: 'var(--white)', color: 'var(--black)',
            fontFamily: 'Anton, sans-serif', fontSize: '0.85rem',
            letterSpacing: '0.05em', transform: 'rotate(-3deg)',
          }}>VERIFIED CHAMPION</div>
        </div>

        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.3em', color: 'var(--magenta)',
            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--magenta)' }} />
            Manifiesto
          </div>

          <h2 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.155,
            color: 'var(--white)', marginBottom: '1.5rem',
          }}>
            "TIENES QUE SER<br />
            <span style={{ color: 'var(--magenta)' }}>EGOÍSTA</span> Y PENSAR<br />
            QUE TÚ ERES<br />
            EL <span style={{
              background: 'var(--magenta)', color: 'var(--white)',
              padding: '0 0.3em', display: 'inline-block', transform: 'skewX(-6deg)',
            }}>MEJOR.</span>"
          </h2>

          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '1.1rem', lineHeight: 1.7,
            color: 'var(--white-soft)', marginBottom: '2.5rem',
            maxWidth: '500px',
          }}>
            Ensenada, B.C. — 35 años. Desde los 7 años con kart en mano. Tres palabras le dictan cada metro recorrido en el desierto:
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Felicidad', 'Adrenalina', 'Amor'].map((word, i) => (
              <div key={word} style={{
                padding: '0.8rem 1.4rem',
                background: i === 1 ? 'var(--magenta)' : 'transparent',
                border: i === 1 ? '1px solid var(--magenta)' : '1px solid rgba(255,255,255,0.2)',
                color: 'var(--white)',
                fontFamily: 'Anton, sans-serif', fontSize: '1.2rem',
                letterSpacing: '0.05em', textTransform: 'uppercase',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${0.6 + i * 0.1}s`,
              }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', marginRight: '0.4rem', opacity: 0.6 }}>0{i+1}</span>
                {word}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '2.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.2em', color: 'var(--white-dim)',
          }}>
            <div style={{ width: '50px', height: '1px', background: 'var(--magenta)' }} />
            ALAN AMPUDIA / DRIVER
          </div>
        </div>
      </div>
    </section>
  );
}

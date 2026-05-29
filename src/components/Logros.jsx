import { useEffect, useRef, useState } from 'react';

const logros = [
  { code: 'WC.2024', num: '2024', title: 'Campeón Mundial', detail: 'Trophy Truck — Primer ensenadense en lograr el título absoluto. 1 punto sobre Vildósola.', highlight: true },
  { code: 'TC.3X', num: '3X', title: 'Triple Corona', detail: 'Baja 1000, Baja 500 y SF250. Al lado de Ivan Stewart, Robby Gordon y Rob MacCachren.', highlight: true },
  { code: 'B1K.2019', num: '2019', title: 'Baja 1000 Absoluta', detail: 'Victoria histórica en las 1,000 millas peninsulares.' },
  { code: 'REC.SF250', num: '70.71', unit: 'mph', title: 'Récord SF250', detail: 'Velocidad promedio más alta en la historia. En solitario. 2024.' },
  { code: 'STK.2025', num: '3/3', title: 'Racha 2025', detail: 'Primer mexicano: SF250 + Baja 500 + Baja 400 consecutivas.' },
  { code: 'NIGHT.0', num: '0', title: 'Ponchadas Nocturnas', detail: 'Junto a Ken Block. Toda la noche entre polvo. Cero fallas.' },
];

export default function Logros() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="logros" ref={ref} style={{
      padding: '8rem 4rem', background: 'var(--black)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '3.5rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s',
        }}>
          <div>
            
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', lineHeight: 1.15, color: 'var(--white)' }}>
              LEGADO EN<br /><span style={{ color: 'var(--magenta)' }}>NÚMEROS.</span>
            </h2>
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
            letterSpacing: '0.2em', color: 'var(--white-dim)', textAlign: 'right',
          }}>
            VERIFIED ★★★★★<br />CAREER STATS / 2025
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(233,30,99,0.2)',
          border: '1px solid rgba(233,30,99,0.2)',
        }}>
          {logros.map((logro, i) => (
            <div key={i} style={{
              padding: '2.5rem',
              background: logro.highlight ? 'var(--black-card)' : 'var(--black)',
              position: 'relative',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.7s ease ${i * 0.08}s`,
              overflow: 'hidden',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.25em', color: 'var(--magenta-bright)',
                marginBottom: '1.5rem',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>[{logro.code}]</span>
                {logro.highlight && <span style={{ color: 'var(--magenta-bright)' }}>★</span>}
              </div>

              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '0.4rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: logro.highlight ? '5rem' : '3.5rem',
                  color: 'var(--white)', lineHeight: 1.15,
                }}>{logro.num}</div>
                {logro.unit && (
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem',
                    letterSpacing: '0.15em', color: 'var(--magenta-bright)',
                  }}>{logro.unit}</div>
                )}
              </div>

              <div style={{
                width: '40px', height: '3px', background: 'var(--magenta)',
                marginBottom: '1rem', boxShadow: '0 0 10px var(--magenta)',
              }} />

              <div style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: logro.highlight ? '1.3rem' : '1.1rem',
                color: 'var(--white)', marginBottom: '0.6rem',
                letterSpacing: '0.02em',
              }}>{logro.title}</div>

              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.9rem',
                color: 'var(--white-soft)', lineHeight: 1.5,
              }}>{logro.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

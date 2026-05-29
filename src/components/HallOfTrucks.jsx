import { useState } from 'react';

const trucks = [
  { num: '#1', year: '2025', name: 'Ford Raptor AWD', subtitle: 'Nuevos colores — Temporada Campeón', img: '/images/04-truck-action-front.webp', specs: { engine: 'V8 / Mason', drive: 'AWD', tires: 'Toyo', lights: 'Baja Designs' } },
  { num: '#1', year: '2025', name: 'Ford Raptor AWD', subtitle: 'Acción lateral — Polvo y velocidad', img: '/images/02-truck-action-side.webp', specs: { engine: 'V8 / Mason', drive: 'AWD', tires: 'Toyo', lights: 'Baja Designs' } },
  { num: '#1', year: '2025', name: 'Ford Raptor AWD', subtitle: 'Pit stop — La precisión del Team Papas', img: '/images/06-pit-stop.webp', specs: { engine: 'V8 / Mason', drive: 'AWD', tires: 'Toyo', lights: 'Baja Designs' } },
];

export default function HallOfTrucks() {
  const [selected, setSelected] = useState(0);
  const active = trucks[selected];

  return (
    <section style={{
      padding: '8rem 4rem', background: 'var(--black-soft)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        position: 'absolute', right: '-3%', top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Anton, sans-serif',
        fontSize: 'clamp(20rem, 40vw, 45rem)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(233,30,99,0.08)',
        lineHeight: 0.85, userSelect: 'none', pointerEvents: 'none',
      }}>{active.num}</div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: '4rem' }}>
          
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', lineHeight: 1.15, color: 'var(--white)' }}>
            HALL OF<br /><span style={{ color: 'var(--magenta)' }}>TRUCKS.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem', alignItems: 'flex-start' }}>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
              letterSpacing: '0.25em', color: 'var(--white-dim)',
              marginBottom: '1.5rem', paddingBottom: '1rem',
              borderBottom: '1px solid rgba(233,30,99,0.3)',
              display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem',
            }}>
              <span>NUM</span><span>VEHÍCULO / VISTA</span><span>→</span>
            </div>

            {trucks.map((truck, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                  gap: '1rem', alignItems: 'center', width: '100%',
                  padding: '1.2rem 0', background: 'transparent', border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer', textAlign: 'left', position: 'relative',
                }}
              >
                {selected === i && (
                  <div style={{
                    position: 'absolute', left: '-1rem', top: 0, bottom: 0,
                    width: '3px', background: 'var(--magenta)',
                    boxShadow: '0 0 10px var(--magenta)',
                  }} />
                )}

                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '1.6rem',
                  color: selected === i ? 'var(--magenta-bright)' : 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.02em', minWidth: '50px',
                }}>{truck.num}</div>

                <div>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: '1.05rem',
                    color: selected === i ? 'var(--white)' : 'var(--white-dim)',
                    letterSpacing: '0.03em',
                  }}>{truck.name} / {truck.year}</div>
                  <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.78rem',
                    color: 'rgba(255,255,255,0.4)',
                  }}>{truck.subtitle}</div>
                </div>

                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
                  color: selected === i ? 'var(--magenta-bright)' : 'rgba(255,255,255,0.2)',
                }}>{selected === i ? '◉' : '○'}</div>
              </button>
            ))}
          </div>

          <div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              padding: '0 0 1.2rem',
              borderBottom: '1px solid var(--magenta)', marginBottom: '1rem',
            }}>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginBottom: '0.3rem' }}>
                  SEASON {active.year}
                </div>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '2rem', color: 'var(--white)', lineHeight: 1 }}>
                  {active.name}
                </div>
              </div>
              <div style={{
                fontFamily: 'Anton, sans-serif', fontSize: '4rem',
                color: 'var(--magenta)', lineHeight: 1,
                textShadow: '0 0 30px var(--magenta-glow)',
              }}>{active.num}</div>
            </div>

            <div style={{
              aspectRatio: '16/9',
              border: '1px solid rgba(233,30,99,0.3)',
              position: 'relative', overflow: 'hidden', marginBottom: '1rem',
            }}>
              <img src={active.img} alt={`Ford Raptor ${active.year}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              <div style={{
                position: 'absolute', top: '1rem', left: '1rem',
                padding: '0.3rem 0.7rem', background: 'rgba(5,5,5,0.85)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.2em', color: 'var(--magenta-bright)',
                backdropFilter: 'blur(8px)',
              }}>◉ FORD RAPTOR AWD</div>
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                padding: '0.3rem 0.7rem', background: 'rgba(5,5,5,0.85)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.2em', color: 'var(--magenta-bright)',
                backdropFilter: 'blur(8px)',
              }}>BUILD: MASON</div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: 'rgba(233,30,99,0.2)',
              border: '1px solid rgba(233,30,99,0.2)',
            }}>
              {Object.entries(active.specs).map(([key, val]) => (
                <div key={key} style={{ background: 'var(--black)', padding: '1rem' }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                    letterSpacing: '0.25em', color: 'var(--magenta-bright)',
                    textTransform: 'uppercase', marginBottom: '0.4rem',
                  }}>{key === 'engine' ? 'MOTOR' : key === 'drive' ? 'TRACCIÓN' : key === 'tires' ? 'NEUMÁTICOS' : 'ILUMINACIÓN'}</div>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: '1rem',
                    color: 'var(--white)', letterSpacing: '0.02em',
                  }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

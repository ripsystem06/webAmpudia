import { useState } from 'react';

const photos = [
  { code: 'SF250-24', label: 'San Felipe 250', year: '2024', stat: '70.71 MPH', caption: 'Récord de velocidad promedio. Carrera completa en solitario.', img: '/images/02-truck-action-side.webp', big: true },
  { code: 'B500-24', label: 'Baja 500', year: '2024', stat: '1° ABS', caption: 'Acción en el desierto — polvo, velocidad, agresividad.', img: '/images/04-truck-action-front.webp' },
  { code: 'PIT-24', label: 'Pit Stop', year: '2024', stat: '< 60s', caption: 'El equipo trabaja con precisión militar.', img: '/images/06-pit-stop.webp' },
  { code: 'WC-24', label: 'Campeonato Mundial', year: '2024', stat: '+1 PT', caption: 'Primer ensenadense en lograr el título absoluto.', img: '/images/10-victory-flag.webp', quote: '"Si no piensas que eres el mejor, ¿cómo vas a salir a ganarles?"' },
  { code: 'PREP-25', label: 'Preparación', year: '2025', stat: 'COCKPIT', caption: 'Configuración técnica antes de la carrera.', img: '/images/03-cockpit-prep.webp' },
  { code: 'TEAM-25', label: 'Con Kyle Craft', year: '2025', stat: 'CO-PILOT', caption: 'El #1 y su co-piloto listos para la batalla.', img: '/images/07-alan-with-craft.webp' },
];

export default function GaleriaNarrativa() {
  const [active, setActive] = useState(null);

  return (
    <section style={{
      padding: '6rem 0 8rem', background: 'var(--black-mid)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ padding: '0 4rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6.5vw, 6rem)', lineHeight: 1.15, color: 'var(--white)' }}>
            MOMENTOS<br /><span style={{ color: 'var(--magenta)' }}>DEFINITIVOS.</span>
          </h2>
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
          letterSpacing: '0.2em', color: 'var(--white-dim)', textAlign: 'right',
        }}>
          [{photos.length.toString().padStart(2, '0')}] ARCHIVOS<br />
          <span style={{ color: 'var(--magenta)' }}>↓ DESLIZA →</span>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: '1.2rem', padding: '0 4rem 2rem',
        overflowX: 'auto', scrollSnapType: 'x mandatory',
      }}>
        {photos.map((photo, i) => (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              flexShrink: 0,
              width: photo.big ? '420px' : (photo.quote ? '320px' : '280px'),
              scrollSnapAlign: 'start',
            }}
          >
            <div style={{
              aspectRatio: photo.big ? '4/5' : '3/4',
              background: 'var(--black-card)',
              border: active === i ? '1px solid var(--magenta)' : '1px solid rgba(255,255,255,0.08)',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s',
              transform: active === i ? 'translateY(-6px)' : 'translateY(0)',
              cursor: 'pointer',
            }}>
              <img src={photo.img} alt={photo.label}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.4s',
                  transform: active === i ? 'scale(1.05)' : 'scale(1)',
                }} />

              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.4) 100%)',
              }} />

              <div style={{
                position: 'absolute', top: '1rem', left: '1rem',
                padding: '0.25rem 0.6rem', background: 'var(--magenta)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.15em', color: 'var(--white)',
                fontWeight: 700, zIndex: 2,
              }}>{photo.code}</div>

              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                fontFamily: 'Anton, sans-serif', fontSize: '2rem',
                color: 'rgba(255,255,255,0.4)', lineHeight: 1, zIndex: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}>{photo.year}</div>

              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.5rem', zIndex: 3,
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  letterSpacing: '0.2em', color: 'var(--magenta-bright)', marginBottom: '0.3rem',
                }}>{photo.label.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '1.4rem',
                  color: 'var(--white)', lineHeight: 1, marginBottom: '0.6rem',
                }}>{photo.stat}</div>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem',
                  color: 'var(--white-soft)', lineHeight: 1.4,
                  opacity: active === i ? 1 : 0.85, transition: 'opacity 0.3s',
                }}>{photo.caption}</div>
              </div>

              {active === i && (
                <div style={{
                  position: 'absolute', top: '50%', right: '1rem',
                  transform: 'translateY(-50%)',
                  width: '40px', height: '40px', background: 'var(--magenta)',
                  color: 'var(--white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', zIndex: 3,
                }}>→</div>
              )}
            </div>

            {photo.quote && (
              <div style={{
                marginTop: '1rem', padding: '1.5rem', background: 'var(--black)',
                border: '1px solid rgba(233,30,99,0.3)',
                borderLeft: '3px solid var(--magenta)',
              }}>
                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '1.15rem',
                  color: 'var(--white)', lineHeight: 1.3,
                }}>{photo.quote}</div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                  letterSpacing: '0.25em', color: 'var(--magenta-bright)',
                  marginTop: '0.6rem', textTransform: 'uppercase',
                }}>— A. Ampudia</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

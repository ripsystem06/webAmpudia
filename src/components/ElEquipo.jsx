import { useEffect, useRef, useState } from 'react';

const miembros = [
  { rol: 'PILOTO #1', nombre: 'Alan Ampudia', detail: '35 años — Ensenada, B.C. Campeón Mundial 2024.', code: 'P.001' },
  { rol: 'TEAM PRINCIPAL', nombre: 'Rodrigo Ampudia Sr.', detail: 'El cerebro técnico. Responsable de la fiabilidad del vehículo.', code: 'T.002' },
  { rol: 'CO-PILOTO', nombre: 'Aaron Ampudia', detail: 'Hermano. Parte esencial de la dinastía familiar.', code: 'C.003' },
  { rol: 'CO-PILOTO', nombre: 'Rodrigo Ampudia Jr.', detail: 'Hermano. El automovilismo corre en la sangre.', code: 'C.004' },
];

export default function ElEquipo() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="equipo" ref={ref} style={{
      padding: '8rem 4rem', background: 'var(--black-mid)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', opacity: visible ? 1 : 0, transition: 'opacity 0.8s' }}>
          
          <h2 style={{
            fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
            lineHeight: 1.15, color: 'var(--white)',
          }}>
            TEAM <span style={{
              background: 'var(--magenta)', color: 'var(--white)',
              padding: '0 0.3em', display: 'inline-block', transform: 'skewX(-6deg)',
            }}>PAPAS.</span>
          </h2>
        </div>

        <div style={{
          marginBottom: '4rem', position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s ease 0.2s',
        }}>
          <div style={{
            aspectRatio: '21/9',
            border: '1px solid rgba(233,30,99,0.3)',
            position: 'relative', overflow: 'hidden',
          }}>
            <img src="/images/05-team-group.webp" alt="Team Papas grupo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '2rem',
              background: 'linear-gradient(to top, rgba(5,5,5,0.95), transparent)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginBottom: '0.3rem' }}>
                  CREW.PHOTO / PRE-RACE
                </div>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', color: 'var(--white)' }}>
                  EL EQUIPO COMPLETO
                </div>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--white-dim)' }}>
                BENDICIÓN PRE-CARRERA
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem', alignItems: 'flex-start' }}>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease 0.4s' }}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem', color: 'var(--white-soft)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Detrás del número #1 hay una escudería familiar forjada en el desierto de Baja California. El equipo no solo compite — perfecciona.
            </p>

            <div style={{
              padding: '1.8rem', background: 'var(--black)',
              border: '1px solid rgba(233,30,99,0.3)',
              borderLeft: '4px solid var(--magenta)', marginBottom: '2rem',
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginBottom: '0.6rem',
              }}>// PROTOCOL</div>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.5rem' }}>
                LA OBSESIÓN POR LA PERFECCIÓN
              </div>
              <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.92rem', color: 'var(--white-soft)', lineHeight: 1.5 }}>
                Tras cada carrera, el equipo desarma el Ford Raptor por completo e instala tornillos nuevos en todo el vehículo — sin excepciones.
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: 'rgba(233,30,99,0.2)',
              border: '1px solid rgba(233,30,99,0.2)',
            }}>
              {[
                { num: '18h', label: 'SOLO BAJA 1000' },
                { num: '100%', label: 'POST-RACE CHECK' },
                { num: '03', label: 'HERMANOS' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--black-mid)', padding: '1.2rem' }}>
                  <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '2rem', color: 'var(--magenta-bright)', lineHeight: 1, marginBottom: '0.3rem' }}>{s.num}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--white-dim)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
              letterSpacing: '0.25em', color: 'var(--white-dim)',
              padding: '1rem 0', borderTop: '1px solid var(--magenta)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'grid', gridTemplateColumns: 'auto auto 1fr auto', gap: '1rem',
            }}>
              <span style={{ color: 'var(--magenta-bright)' }}>ID</span>
              <span style={{ width: '60px' }}>ROL</span>
              <span>NOMBRE / INFO</span>
              <span>ESTADO</span>
            </div>

            {miembros.map((m, i) => (
              <div key={i} style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'grid', gridTemplateColumns: 'auto auto 1fr auto',
                gap: '1.5rem', alignItems: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(30px)',
                transition: `all 0.6s ease ${0.5 + i * 0.1}s`,
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--magenta-bright)' }}>{m.code}</div>
                <div style={{
                  width: '52px', height: '52px', background: 'var(--black)',
                  border: '1px solid var(--magenta)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta-bright)',
                }}>{m.nombre.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--magenta-bright)', marginBottom: '0.2rem' }}>{m.rol}</div>
                  <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: 'var(--white)', marginBottom: '0.2rem' }}>{m.nombre}</div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem', color: 'var(--white-soft)' }}>{m.detail}</div>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--magenta-bright)' }}>● ACTIVE</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

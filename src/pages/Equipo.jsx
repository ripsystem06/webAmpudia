import { useState, useEffect, useRef } from 'react';

const miembros = [
  { rol: 'PILOTO #1', nombre: 'Alan Ampudia', detail: '35 años — Ensenada, B.C.', bio: 'Campeón Mundial SCORE Trophy Truck 2024. El primer ensenadense en lograr el título absoluto. Lleva las riendas del Ford Raptor #1.', code: 'P.001', img: '/images/01-alan-portrait.webp' },
  { rol: 'TEAM PRINCIPAL', nombre: 'Rodrigo Ampudia Sr.', detail: 'Cerebro técnico — Padre', bio: 'El líder absoluto y el cerebro detrás de la escudería. Su filosofía prioriza la fiabilidad técnica por encima de todo: después de cada carrera, desarman el Trophy Truck por completo, revisan cada componente y lo reensamblan con tornillos completamente nuevos.', code: 'T.002', img: '/images/team/papa-alan.webp' },
  { rol: 'CO-PILOTO', nombre: 'Kyle "El K"', detail: 'Navegante Principal', bio: 'El estratega a bordo del Trophy Truck #1. Su precisión implacable al cantar las notas de navegación a velocidades extremas ha sido un pilar fundamental para las victorias consecutivas del equipo en la temporada 2025. Detrás de cada rey del Off-Road hay un navegante que nunca pierde el rumbo.', code: 'C.003', img: '/images/copiloto/copiloto.webp' },
  { rol: 'MECÁNICO LÍDER', nombre: '"El Pollo"', detail: 'Pits — Confianza absoluta', bio: 'Uno de los mecánicos de mayor confianza mencionados recurrentemente por Alan. Su capacidad para trabajar bajo presión y resolver problemas mecánicos complejos en minutos marca la diferencia entre ganar y abandonar.', code: 'M.005', img: '/images/team/accion.webp' },
  { rol: 'MECÁNICO', nombre: 'Gael', detail: 'Pits — Especialista', bio: 'Junto a "El Pollo", forma el dúo de mecánicos de élite que mantiene el Trophy Truck #1 en condiciones de victoria. Pieza clave en las reparaciones de emergencia que han salvado carreras.', code: 'M.006', img: '/images/team/06-pit-stop.webp' },
];

const teamGallery = [
  { src: '/images/team/team-papas.webp', alt: 'Team Papas unido en los pits' },
  { src: '/images/team/06-pit-stop.webp', alt: 'Pit stop cronometrado del Trophy Truck #1' },
  { src: '/images/team/accion.webp', alt: 'Mecánicos en acción durante carrera' },
  { src: '/images/team/papa-alan.webp', alt: 'Rodrigo Ampudia Sr. y Alan Ampudia' },
];

function AnimatedSection({ children, style, delay = 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.8s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function Equipo() {
  return (
    <div style={{ paddingTop: '67px', minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        padding: '5rem 4rem 4rem',
        background: 'linear-gradient(135deg, #1a0a14 0%, var(--black) 60%)',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', right: '1rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(6rem, 16vw, 14rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.08)',
          lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap',
        }}>TEAM PAPAS</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.35em',
            color: 'var(--magenta-bright)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            Escudería Oficial
          </div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            lineHeight: 1.15,
            color: 'var(--white)',
            margin: 0,
          }}>
            EL <span style={{ color: 'var(--magenta)' }}>EQUIPO</span>
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '1rem',
            color: 'var(--white-soft)',
            lineHeight: 1.6,
            marginTop: '1.5rem',
            maxWidth: '600px',
          }}>
            El equipo detrás del éxito de Alan Ampudia, conocido oficialmente como Team Papas,
            es una escudería de clase mundial fuertemente arraigada en los valores familiares
            y respaldada por su icónico negocio, Papas &amp; Beer, ubicado en Ensenada y Rosarito.
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <AnimatedSection style={{ padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem)', background: 'var(--black-mid)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(233,30,99,0.3)',
          }}>
            <img
              src="/images/team/05-team-group.webp"
              alt="Team Papas — equipo completo de Alan Ampudia"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 100%)',
            }}>
              <div style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: 'var(--white)',
              }}>
                EL EQUIPO COMPLETO
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Philosophy + Stats */}
      <div style={{
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
          }}>
            <AnimatedSection delay={0.1}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                color: 'var(--magenta-bright)',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}>
                El Cerebro y la Filosofía del Equipo
              </div>
              <h3 style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: 'var(--white)',
                lineHeight: 1.1,
                margin: 0,
                marginBottom: '1rem',
              }}>
                RODRIGO AMPUDIA SR.
              </h3>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '1.05rem',
                color: 'var(--white-soft)',
                lineHeight: 1.7,
              }}>
                El padre de Alan es el líder absoluto y el cerebro detrás de la escudería.
                Su filosofía prioriza la fiabilidad técnica por encima de todo: después de
                cada carrera, el equipo desarma el Trophy Truck por completo, revisa cada
                componente a detalle y lo reensambla utilizando tornillos completamente nuevos.
                Es la obsesión por la perfección mecánica lo que mantiene al #1 en la cima.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { num: '100%', label: 'Desarme post-carrera', desc: 'Cada componente inspeccionado' },
                  { num: '0', label: 'Fallas mecánicas 2025', desc: 'Temporada perfecta del Trophy Truck' },
                  { num: '03:30', label: 'AM — San Felipe 250', desc: 'Reparación de emergencia nocturna' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.2rem',
                    background: 'rgba(233,30,99,0.06)',
                    borderLeft: '3px solid var(--magenta)',
                  }}>
                    <span style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      color: 'var(--magenta)',
                      lineHeight: 1,
                      minWidth: '70px',
                    }}>{stat.num}</span>
                    <div>
                      <div style={{
                        fontFamily: 'Anton, sans-serif',
                        fontSize: '0.9rem',
                        color: 'var(--white)',
                        letterSpacing: '0.04em',
                        marginBottom: '0.15rem',
                      }}>{stat.label}</div>
                      <div style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: '0.8rem',
                        color: 'var(--white-dim)',
                      }}>{stat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Members */}
      <div style={{
        padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black-mid)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {miembros.map((m, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.1}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '280px 1fr',
                  gap: 'clamp(1.5rem, 4vw, 3rem)',
                  padding: 'clamp(2rem, 3vw, 3rem) 0',
                  borderBottom: '1px solid rgba(233,30,99,0.1)',
                  alignItems: 'center',
                }}>
                  <div style={{
                    aspectRatio: '4/5',
                    background: 'var(--black-card)',
                    border: '1px solid rgba(233,30,99,0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    maxWidth: '280px',
                    margin: window.innerWidth < 768 ? '0 auto' : undefined,
                  }}>
                    <img src={m.img} alt={m.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', top: '0.8rem', left: '0.8rem',
                      padding: '0.3rem 0.6rem', background: 'var(--magenta)',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                      letterSpacing: '0.2em', color: 'var(--white)', fontWeight: 700,
                    }}>{m.code}</div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.7rem',
                      letterSpacing: '0.3em',
                      color: 'var(--magenta-bright)',
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem',
                    }}>
                      {m.rol}
                    </div>
                    <h2 style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      color: 'var(--white)',
                      lineHeight: 1,
                      marginBottom: '0.4rem',
                    }}>
                      {m.nombre.toUpperCase()}
                    </h2>
                    <div style={{
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontSize: '0.95rem',
                      color: 'var(--white-dim)',
                      marginBottom: '1.5rem',
                    }}>
                      {m.detail}
                    </div>
                    <div style={{
                      width: '60px',
                      height: '3px',
                      background: 'var(--magenta)',
                      marginBottom: '1.5rem',
                    }} />
                    <p style={{
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontSize: '1.05rem',
                      color: 'var(--white-soft)',
                      lineHeight: 1.7,
                      maxWidth: '600px',
                      margin: 0,
                    }}>
                      {m.bio}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <AnimatedSection style={{
        padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black)',
      }} delay={0.3}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: 'clamp(0.5rem, 1.5vw, 1rem)',
          }}>
            {teamGallery.map((img, i) => (
              <div key={i} style={{
                aspectRatio: '4/3',
                overflow: 'hidden',
                borderRadius: '3px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* San Felipe 250 Anecdote */}
      <AnimatedSection style={{
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black)',
      }} delay={0.4}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'rgba(233,30,99,0.05)',
            border: '1px solid rgba(233,30,99,0.2)',
            borderRadius: '4px',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--magenta-bright)',
              marginBottom: '0.6rem',
              textTransform: 'uppercase',
            }}>
              // SAN FELIPE 250 — 2025
            </div>
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '1.05rem',
              color: 'var(--white-soft)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              margin: 0,
            }}>
              La noche antes de la carrera, el vehículo de Alan sufrió daños graves tras golpear
              una gran piedra durante las clasificaciones. El equipo de mecánicos, sumando
              esfuerzos con Neil Mason —el constructor de los vehículos—, trabajó a contrarreloj
              hasta las 3:30 de la madrugada. Cambiaron desde el diferencial delantero hasta la
              flecha trasera, salvando el carro y permitiendo que Alan ganara la carrera horas después.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Post-Race Protocol */}
      <AnimatedSection style={{
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black)',
      }} delay={0.5}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            padding: 'clamp(2rem, 3vw, 3rem)',
            background: 'rgba(233,30,99,0.06)',
            border: '1px solid rgba(233,30,99,0.2)',
            borderLeft: '4px solid var(--magenta)',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'var(--magenta-bright)',
              marginBottom: '0.8rem',
            }}>
              // PROTOCOL POST-RACE
            </div>
            <div style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              color: 'var(--white)',
              marginBottom: '0.8rem',
            }}>
              LA OBSESIÓN POR LA PERFECCIÓN
            </div>
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '1rem',
              color: 'var(--white-soft)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              Tras cada carrera, el equipo desarma el Ford Raptor por completo e instala
              tornillos nuevos en todo el vehículo, sin excepciones. Es la firma del Team
              Papas: cada milla compite con un coche prácticamente nuevo.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Countdown — same as En Pista */}
      <CountdownInline targetDate="June 3, 2026 00:00:00" />
    </div>
  );
}

function CountdownInline({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 4rem)',
      background: 'linear-gradient(180deg, #0a0612 0%, var(--black) 40%, #0a0612 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        gap: 'clamp(0.6rem, 2.5vw, 1.8rem)',
        flexWrap: 'wrap',
      }}>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.days)}</span>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>D</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.hours)}</span>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>H</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.minutes)}</span>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>MIN</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.seconds)}</span>
          <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(6rem, 14vw, 12rem)', color: 'var(--white)', lineHeight: 1 }}>S</span>
        </span>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-12deg)',
        fontFamily: "'Permanent Marker', cursive",
        fontSize: 'clamp(2.5rem, 8vw, 7rem)',
        color: 'var(--magenta)',
        textShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.6)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        lineHeight: 1,
        opacity: 0.85,
      }}>
        PRÓXIMA CARRERA
      </div>
    </div>
  );
}

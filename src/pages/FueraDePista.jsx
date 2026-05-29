import { useRef, useState, useEffect } from 'react';

const filosofia = [
  { palabra: 'Felicidad', desc: 'La pasión que lo impulsa desde los 7 años.' },
  { palabra: 'Adrenalina', desc: 'El combustible de cada carrera.' },
  { palabra: 'Amor', desc: 'Por su familia, su tierra y su deporte.' },
];

const citas = [
  {
    cita: 'Yo soy muy competitivo en lo que sea. Yo siempre busco salir a ganar. En mi categoría, somos solo dos mexicanos compitiendo contra 15 o 16 americanos, así que quiero representar a México. Yo pienso que soy el mejor. Tienes que ser egoísta y pensar que tú eres el mejor, si no, ¿cómo vas a salir a ganarles?',
    tema: 'Mentalidad Ganadora',
  },
  {
    cita: 'La presión mental, yo no sé si será un don o qué, pero no siento mucha presión. Yo iba tranquilo. No era como que tenía presión de hacerlo, pero quería. Obviamente, ser el primer mexicano en lograrlo es algo increíble, algo de lo que me siento muy orgulloso, y también mi equipo y mi familia.',
    tema: 'Representar a México',
  },
  {
    cita: 'Esta es la más grande, es nuestro Super Bowl, nuestra final de la Champions. Si no ganas esta, sientes que no ganaste ninguna.',
    tema: 'La Baja 1000',
  },
  {
    cita: 'Estando en la cima es cuando más alto puedes caer. Ahorita tenemos un blanco pegado en la cabeza; todos nos quieren ganar. No nos lo tomamos a la ligera. Queremos seguir siendo los mejores.',
    tema: 'Defender el Campeonato',
  },
  {
    cita: 'Quiero ser una inspiración para los jóvenes. Que vean que trabajando duro, sabiendo trabajar en equipo y nunca rindiéndose, es posible. Que se sepa que se puede luchar, nada es imposible si te lo pones como meta.',
    tema: 'Inspirar a México',
  },
];

function AnimatedBlock({ children, style, delay = 0 }) {
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

export default function FueraDePista() {
  return (
    <div style={{ paddingTop: '67px', minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        padding: '5rem 4rem 4rem',
        background: 'var(--black)',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Hero background image */}
        <img
          src="/fueradepista/LOPZ7005.webp"
          alt=""
          style={{
            position: 'absolute',
            top: 0, right: 0,
            width: '55%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.5,
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{
          position: 'absolute', top: '50%', right: '1rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(5rem, 14vw, 12rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.05)',
          lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap',
        }}>FUERA DE PISTA</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.35em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>El Hombre detrás del #1</div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.1, color: 'var(--white)',
          }}>
            FUERA<br />DE <span style={{ color: 'var(--magenta)' }}>PISTA</span>
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem',
            color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem',
            maxWidth: '520px',
          }}>
            El motor se apaga, pero el personaje sigue. La biografía, la mentalidad y la filosofía de Alan Ampudia más allá del desierto.
          </p>
        </div>
      </div>

      {/* Biografía */}
      <div style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)', background: 'var(--black)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <AnimatedBlock>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              letterSpacing: '0.35em', color: 'var(--magenta-bright)',
              textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              Pasado y Presente
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--white)', lineHeight: 1.15, marginBottom: '2rem',
            }}>
              BIO<span style={{ color: 'var(--magenta)' }}>GRAFÍA</span>
            </h2>
          </AnimatedBlock>

          {/* Sus Orígenes */}
          <AnimatedBlock delay={0.1} style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={{
              borderLeft: '3px solid var(--magenta)',
              paddingLeft: 'clamp(1rem, 2vw, 1.5rem)',
            }}>
              <h3 style={{
                fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: 'var(--white)', margin: 0, marginBottom: '1rem',
              }}>
                SUS ORÍGENES
              </h3>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
                color: 'var(--white-soft)', lineHeight: 1.8,
              }}>
                Alan Ampudia es un destacado piloto originario de Ensenada, Baja California.
                Creció frente al volante instruido por su padre, Rodrigo Ampudia Sr., quien es
                también el líder y cerebro detrás de la escudería familiar Team Papas. Alan forma
                parte de una dinastía de corredores junto a sus hermanos Aaron y Rodrigo, con
                quienes ha competido para desafiar a la élite de este deporte.
              </p>
            </div>
          </AnimatedBlock>

          {/* El Presente */}
          <AnimatedBlock delay={0.2} style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={{
              borderLeft: '3px solid var(--magenta)',
              paddingLeft: 'clamp(1rem, 2vw, 1.5rem)',
            }}>
              <h3 style={{
                fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: 'var(--white)', margin: 0, marginBottom: '1rem',
              }}>
                EL PRESENTE
              </h3>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
                color: 'var(--white-soft)', lineHeight: 1.8,
              }}>
                Actualmente, Alan vive el mejor momento de toda su carrera deportiva. Es el
                Campeón Mundial del Desierto 2024 en la categoría SCORE Trophy Truck, habiendo
                vencido por solo un punto a Tavo Vildósola tras las cuatro carreras del año. Su
                dominio se ha extendido de manera espectacular hacia la temporada 2025, logrando
                múltiples victorias absolutas. Además, su nombre ya está escrito en la historia al
                ser de los pocos pilotos que han ganado la Triple Corona de Baja —conquistando la
                Baja 1000, la Baja 500 y la San Felipe 250.
              </p>
            </div>
          </AnimatedBlock>

          {/* El Pasado */}
          <AnimatedBlock delay={0.3} style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={{
              borderLeft: '3px solid var(--magenta)',
              paddingLeft: 'clamp(1rem, 2vw, 1.5rem)',
            }}>
              <h3 style={{
                fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: 'var(--white)', margin: 0, marginBottom: '1rem',
              }}>
                EL PASADO EN LA MÁXIMA CATEGORÍA
              </h3>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
                color: 'var(--white-soft)', lineHeight: 1.8,
              }}>
                Su consolidación como leyenda comenzó a gestarse fuertemente con su histórica
                victoria absoluta en la mítica SCORE Baja 1000 del año 2019, la cual demostró
                su capacidad para dominar las exigencias del terreno desértico durante largas
                distancias.
              </p>
            </div>
          </AnimatedBlock>

          {/* Stats row */}
          <AnimatedBlock delay={0.4}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap: '1px',
              background: 'rgba(233,30,99,0.15)',
              border: '1px solid rgba(233,30,99,0.15)',
            }}>
              {[
                { num: '2024', label: 'Campeón Mundial' },
                { num: '2019', label: 'Baja 1000 — 1° Absoluto' },
                { num: '3X', label: 'Triple Corona de Baja' },
                { num: '#1', label: 'Dorsal del Campeón' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--black-mid)',
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    color: 'var(--magenta-bright)', lineHeight: 1, marginBottom: '0.3rem',
                  }}>{s.num}</div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                    letterSpacing: '0.2em', color: 'var(--white-dim)',
                    textTransform: 'uppercase',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </div>

      {/* Más Que Un Color */}
      <div style={{
        padding: 'clamp(3rem, 8vw, 7rem) clamp(1rem, 4vw, 4rem)',
        background: 'linear-gradient(180deg, #0d0510 0%, #14081a 30%, #0a040d 100%)',
        borderTop: '1px solid rgba(233,30,99,0.1)',
        borderBottom: '1px solid rgba(233,30,99,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle pink ambient glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(233,30,99,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedBlock>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              letterSpacing: '0.35em', color: 'var(--magenta-bright)',
              textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              La historia detrás del color
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--white)', lineHeight: 1.15, marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}>
              MÁS QUE<br /><span style={{ color: 'var(--magenta)' }}>UN COLOR</span>
            </h2>
          </AnimatedBlock>

          {/* Two-column: image + text */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1.2fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}>
            {/* Images column */}
            <AnimatedBlock delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  aspectRatio: window.innerWidth < 768 ? '16/9' : '4/5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid rgba(233,30,99,0.3)',
                  boxShadow: '0 0 40px rgba(233,30,99,0.1)',
                  maxHeight: window.innerWidth < 768 ? '400px' : undefined,
                }}>
                  <img
                    src="/images/mom/alanymama.webp"
                    alt="Alan Ampudia con su madre"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                }}>
                  <div style={{
                    aspectRatio: '1/1',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    border: '1px solid rgba(233,30,99,0.15)',
                  }}>
                    <img
                      src="/images/mom/alanymama2.webp"
                      alt="Alan y su mamá"
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{
                    aspectRatio: '1/1',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    border: '1px solid rgba(233,30,99,0.15)',
                  }}>
                    <img
                      src="/images/mom/alanymama3.webp"
                      alt="Alan Ampudia familia"
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </AnimatedBlock>

            {/* Text column */}
            <AnimatedBlock delay={0.2}>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: 'var(--white-soft)',
                lineHeight: 1.9,
              }}>
                <p style={{ marginTop: 0 }}>
                  Hay colores que identifican una marca.
                </p>
                <p>
                  Y hay colores que <span style={{ color: 'var(--white)' }}>cuentan una historia</span>.
                </p>
                <p>
                  El <span style={{ color: 'var(--magenta-bright)', fontWeight: 600 }}>rosa</span> que acompaña a Alan Ampudia no fue elegido para llamar
                  la atención ni para destacar entre la multitud. Fue elegido para recordar.
                </p>
                <p>
                  Recordar la fuerza de una mujer que enfrentó uno de los momentos más difíciles
                  de su vida con valentía, determinación y una sonrisa que nunca desapareció.
                </p>
                <p>
                  Cuando el cáncer tocó la puerta de la familia Ampudia, todo cambió. Lo que
                  parecía una batalla imposible se convirtió en una lección de amor, resiliencia
                  y esperanza. Una lección que dejó una huella permanente en quienes la vivieron.
                </p>
                <p>
                  <span style={{ color: 'var(--white)' }}>Por eso el rosa está presente.</span>
                </p>
                <p>
                  Porque representa a todas las madres, hijas, hermanas, esposas y amigas
                  que han enfrentado esta enfermedad.
                </p>
                <p>
                  Porque representa a quienes siguen luchando.
                </p>
                <p>
                  Y también a quienes lucharon antes.
                </p>
                <p>
                  Más que un color, es una promesa de no olvidar. Un recordatorio de que incluso
                  en los momentos más difíciles existe la posibilidad de encontrar fuerza donde
                  menos la imaginamos.
                </p>
                <p>
                  Detrás de cada tono de rosa hay una historia.
                </p>
                <p>
                  Y detrás de esta historia hay una mujer que inspiró a toda una familia
                  a seguir adelante.
                </p>
                <p>
                  Con <span style={{ color: 'var(--white)' }}>esperanza</span>.
                </p>
                <p>
                  Con <span style={{ color: 'var(--white)' }}>amor</span>.
                </p>
                <p>
                  Y con la convicción de que ninguna batalla debe enfrentarse sola.
                </p>
              </div>

              {/* Pink ribbon closer */}
              <div style={{
                marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}>
                <div style={{
                  width: '40px',
                  height: '2px',
                  background: 'var(--magenta)',
                }} />
                                  <img src="/lasorosa.png" alt="Lazo rosa" style={{ width: '32px', height: 'auto', display: 'block' }} />
                <div style={{
                  width: '40px',
                  height: '2px',
                  background: 'var(--magenta)',
                }} />
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </div>

      {/* Citas — Mentalidad del Campeón */}
      <div style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black-mid)',
        borderTop: '1px solid rgba(233,30,99,0.08)',
        borderBottom: '1px solid rgba(233,30,99,0.08)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <AnimatedBlock>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              letterSpacing: '0.35em', color: 'var(--magenta-bright)',
              textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              En sus propias palabras
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--white)', lineHeight: 1.15, marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}>
              LA MENTALIDAD<br /><span style={{ color: 'var(--magenta)' }}>DEL CAMPEÓN</span>
            </h2>
          </AnimatedBlock>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {citas.map((item, i) => {
              const citasImgs = [
                '/fueradepista/SanFelipe250-DSchenkelberg-348.webp',
                '/fueradepista/SanFelipe250-04032025-DSchenkelberg-716.webp',
                '/fueradepista/SanFelipe250-03262026-DSchenkelberg2062.webp',
                '/fueradepista/SanFelipe250-04052025-DSchenkelberg-060.webp',
                '/fueradepista/LOPZ2890.webp',
              ];
              const isEven = i % 2 === 0;

              return (
                <AnimatedBlock key={i} delay={0.1 + i * 0.08}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
                    gap: 'clamp(1rem, 2vw, 1.5rem)',
                    background: 'rgba(233,30,99,0.03)',
                    border: '1px solid rgba(233,30,99,0.1)',
                    borderLeft: '4px solid var(--magenta)',
                  }}>
                    {/* Image */}
                    <div style={{
                      aspectRatio: window.innerWidth < 768 ? '16/9' : 'auto',
                      minHeight: window.innerWidth < 768 ? 'auto' : '100%',
                      overflow: 'hidden',
                      order: isEven ? 0 : 1,
                    }}>
                      <img
                        src={citasImgs[i]}
                        alt={item.tema}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          minHeight: window.innerWidth < 768 ? '200px' : '280px',
                        }}
                      />
                    </div>

                    {/* Quote text */}
                    <div style={{
                      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      order: isEven ? 1 : 0,
                    }}>
                      <div style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                        letterSpacing: '0.2em', color: 'var(--magenta-bright)',
                        textTransform: 'uppercase', marginBottom: '0.8rem',
                      }}>
                        {item.tema}
                      </div>
                      <blockquote style={{
                        fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                        color: 'var(--white-soft)', lineHeight: 1.7, fontStyle: 'italic',
                        margin: 0,
                      }}>
                        &ldquo;{item.cita}&rdquo;
                      </blockquote>
                      <div style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
                        letterSpacing: '0.15em', color: 'var(--magenta-bright)',
                        marginTop: '1rem',
                      }}>
                        — ALAN AMPUDIA
                      </div>
                    </div>
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filosofía */}
      <div style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <img
          src="/fueradepista/BAJA400-2025-148.webp"
          alt=""
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <AnimatedBlock>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              letterSpacing: '0.35em', color: 'var(--magenta-bright)',
              textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              El lema del campeón
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--white)', marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}>
              Tres palabras que<br /><span style={{ color: 'var(--magenta)' }}>lo definen todo</span>
            </h2>
          </AnimatedBlock>

          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {filosofia.map((item, i) => (
              <AnimatedBlock key={i} delay={0.1 + i * 0.1}>
                <div style={{
                  padding: 'clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2vw, 2.5rem)',
                  background: 'var(--black-soft)',
                  border: '1px solid rgba(233,30,99,0.15)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    color: 'var(--magenta-bright)', lineHeight: 1, marginBottom: '1rem',
                  }}>{item.palabra.toUpperCase()}</div>
                  <div style={{ width: '30px', height: '2px', background: 'var(--magenta)', marginBottom: '1rem' }} />
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.95rem', color: 'var(--white-soft)', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '1px solid var(--magenta)', borderLeft: '1px solid var(--magenta)' }} />
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube — Último Video */}
      <div style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black)',
        borderTop: '1px solid rgba(233,30,99,0.08)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <AnimatedBlock>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
              letterSpacing: '0.35em', color: 'var(--magenta-bright)',
              textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              Canal de YouTube
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--white)', lineHeight: 1.15, marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            }}>
              ÚLTIMO <span style={{ color: 'var(--magenta)' }}>VIDEO</span>
            </h2>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid rgba(233,30,99,0.25)',
              boxShadow: '0 0 30px rgba(233,30,99,0.1)',
            }}>
              <iframe
                src="https://www.youtube.com/embed/v3wKjg6ZvX8?rel=0"
                title="Alan Ampudia — Último video"
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 'clamp(0.8rem, 1.5vw, 1.2rem)',
            }}>
              <a
                href="https://www.youtube.com/@alanampudia"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'Anton, sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  color: 'var(--magenta-bright)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
              >
                Ver más en YouTube → 
              </a>
            </div>
          </AnimatedBlock>
        </div>
      </div>

      {/* Instagram — Últimas Publicaciones */}
      <div style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)',
        background: 'var(--black-mid)',
        borderTop: '1px solid rgba(233,30,99,0.08)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <AnimatedBlock>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <div>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
                  letterSpacing: '0.35em', color: 'var(--magenta-bright)',
                  textTransform: 'uppercase', marginBottom: '0.5rem',
                }}>
                  Instagram
                </div>
                <h2 style={{
                  fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--white)', lineHeight: 1.15, margin: 0,
                }}>
                  <span style={{ color: 'var(--magenta)' }}>@ALAN_AMP</span>
                </h2>
              </div>
              <a
                href="https://www.instagram.com/alan_amp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.7rem 1.5rem',
                  background: 'var(--magenta)',
                  color: 'var(--white)',
                  fontFamily: 'Anton, sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transform: 'skewX(-8deg)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
              >
                <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>SEGUIR EN INSTAGRAM ↗</span>
              </a>
            </div>
          </AnimatedBlock>

          {/* Instagram grid — previews de publicaciones */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768
              ? 'repeat(2, 1fr)'
              : 'repeat(4, 1fr)',
            gap: 'clamp(0.5rem, 1.5vw, 1rem)',
          }}>
            {[
              { post: 'https://www.instagram.com/p/C5y6U9OS2QK/', img: '/fueradepista/corriendo.webp', label: 'Competencia' },
              { post: 'https://www.instagram.com/p/DY2owLGPc5m/', img: '/fueradepista/BAJA500-06072025-DSchenkelberg-1725.webp', label: 'Behind the Scenes' },
              { post: 'https://www.instagram.com/p/DYz7-b4PIrG/', img: '/fueradepista/fiesta.webp', label: 'StreetParty' },
              { post: 'https://www.instagram.com/p/DYf_qRfJV94/', img: '/fueradepista/BAJA400-2025-148.webp', label: 'Highlights' },
            ].map((item, i) => (
              <AnimatedBlock key={i} delay={0.1 + i * 0.08}>
                <a
                  href={item.post}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    position: 'relative',
                    aspectRatio: '4/5',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s, transform 0.2s',
                    cursor: 'pointer',
                    background: 'var(--black-card)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--magenta)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Instagram post image */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <img
                      src={item.img}
                      alt={item.label}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {/* Instagram icon top-right */}
                    <div style={{
                      position: 'absolute',
                      top: '0.6rem',
                      right: '0.6rem',
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Post info footer */}
                  <div style={{
                    padding: '0.7rem 0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                  }}>
                    <div style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: '0.8rem',
                      color: 'var(--white)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.2,
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: 'var(--white-dim)',
                      letterSpacing: '0.1em',
                    }}>
                      @alan_amp • Instagram
                    </div>
                  </div>
                </a>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

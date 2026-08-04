import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import VideoSocialsBlock from '../components/VideoSocialsBlock';

const citas = [
  {
    citaKey: 'fueradepista.cita_ganadora_text',
    temaKey: 'fueradepista.cita_ganadora',
  },
  {
    citaKey: 'fueradepista.cita_mexico_text',
    temaKey: 'fueradepista.cita_mexico',
  },
  {
    citaKey: 'fueradepista.cita_baja1000_text',
    temaKey: 'fueradepista.cita_baja1000',
  },
  {
    citaKey: 'fueradepista.cita_campeonato_text',
    temaKey: 'fueradepista.cita_campeonato',
  },
  {
    citaKey: 'fueradepista.cita_inspirar_text',
    temaKey: 'fueradepista.cita_inspirar',
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
  const { t } = useLanguage();
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
        }}>{t('fueradepista.title')}</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.35em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>{t('fueradepista.label')}</div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.1, color: 'var(--white)',
          }}>
            {t('fueradepista.title').split('\n').map((line, li) => (
              <span key={li} style={{ display: 'block', color: li === 1 ? 'var(--magenta)' : undefined }}>{line}</span>
            ))}
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem',
            color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem',
            maxWidth: '520px',
          }}>
            {t('fueradepista.sub')}
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
              {t('fueradepista.pasado_presente')}
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--white)', lineHeight: 1.15, marginBottom: '2rem',
            }}>
              {t('fueradepista.biografia')}
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
                {t('fueradepista.origenes')}
              </h3>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
                color: 'var(--white-soft)', lineHeight: 1.8,
              }}>
                {t('fueradepista.origenes_text')}
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
                {t('fueradepista.presente')}
              </h3>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
                color: 'var(--white-soft)', lineHeight: 1.8,
              }}>
                {t('fueradepista.presente_text')}
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
                {t('fueradepista.pasado_max')}
              </h3>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
                color: 'var(--white-soft)', lineHeight: 1.8,
              }}>
                {t('fueradepista.pasado_max_text')}
              </p>
            </div>
          </AnimatedBlock>

          {/* Stats row */}
          <AnimatedBlock delay={0.4}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr 1fr 1fr' : 'repeat(5, 1fr)',
              gap: '1px',
              background: 'rgba(233,30,99,0.15)',
              border: '1px solid rgba(233,30,99,0.15)',
            }}>
              {[
                { num: '2025', label: t('fueradepista.campeon_mundial') },
                { num: '2024', label: t('fueradepista.campeon_mundial') },
                { num: '2019', label: t('fueradepista.baja1000_absoluto') },
                { num: '3X', label: t('fueradepista.triple_corona_baja') },
                { num: '#1', label: t('fueradepista.dorsal_campeon') },
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
              {t('fueradepista.historia_label')}
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--white)', lineHeight: 1.15, marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}>
              {t('fueradepista.mas_que_color')}<br /><span style={{ color: 'var(--magenta)' }}>{t('fueradepista.un_color')}</span>
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
                      alt={t('fueradepista.alt_madre')}
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
                        alt={t('fueradepista.alt_mama')}
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
                        alt={t('fueradepista.alt_familia')}
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
                  {t('fueradepista.color_texto')}
                </p>

                <h3 style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)',
                  color: 'var(--white)',
                  marginBottom: '1rem',
                  marginTop: '1.8rem',
                  letterSpacing: '0.02em',
                }}>
                  {t('fueradepista.historia_heading')}
                </h3>

                <p>
                  {t('fueradepista.historia_texto')}
                </p>

                <p style={{ marginTop: '1.5rem' }}>
                  {t('fueradepista.compromiso_texto')}
                </p>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '1rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--magenta-bright)', fontSize: '1.1rem', lineHeight: 1.5 }}>◆</span>
                    <span>
                      <span style={{ color: 'var(--white)', fontWeight: 600 }}>{t('fueradepista.concientizacion')}</span>
                      {' '}{t('fueradepista.concientizacion_desc')}
                    </span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--magenta-bright)', fontSize: '1.1rem', lineHeight: 1.5 }}>◆</span>
                    <span>
                      <span style={{ color: 'var(--white)', fontWeight: 600 }}>{t('fueradepista.homenaje')}</span>
                      {' '}{t('fueradepista.homenaje_desc')}
                    </span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--magenta-bright)', fontSize: '1.1rem', lineHeight: 1.5 }}>◆</span>
                    <span>
                      <span style={{ color: 'var(--white)', fontWeight: 600 }}>{t('fueradepista.solidaridad_comunidad')}</span>
                      {' '}{t('fueradepista.solidaridad_comunidad_desc')}
                    </span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--magenta-bright)', fontSize: '1.1rem', lineHeight: 1.5 }}>◆</span>
                    <span>
                      <span style={{ color: 'var(--white)', fontWeight: 600 }}>{t('fueradepista.mensaje_union')}</span>
                      {' '}{t('fueradepista.mensaje_union_desc')}
                    </span>
                  </li>
                </ul>

                <h3 style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)',
                  color: 'var(--white)',
                  marginBottom: '1rem',
                  marginTop: '1.8rem',
                  letterSpacing: '0.02em',
                }}>
                  {t('fueradepista.sumate_heading')}
                </h3>

                <p>
                  {t('fueradepista.sumate_texto')}
                </p>

                {/* Event cards */}
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                  {/* Golf card */}
                  <a href="https://lafamiliainvitational.com/" target="_blank" rel="noopener noreferrer" style={{
                    border: '1px solid rgba(233,30,99,0.4)',
                    padding: '1.2rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                    background: 'rgba(233,30,99,0.03)',
                  }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--magenta-bright)', marginBottom: '0.5rem' }}>
                      {t('fueradepista.golf_titulo')}
                    </div>
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.9rem', color: 'var(--white-soft)', lineHeight: 1.5 }}>
                      {t('fueradepista.golf_desc')}
                    </div>
                  </a>

                  {/* Bingo card */}
                  <a href="https://www.instagram.com/p/DQFUOKIksT3/" target="_blank" rel="noopener noreferrer" style={{
                    border: '1px solid rgba(233,30,99,0.4)',
                    padding: '1.2rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                    background: 'rgba(233,30,99,0.03)',
                  }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--magenta-bright)', marginBottom: '0.5rem' }}>
                      {t('fueradepista.bingo_titulo')}
                    </div>
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.9rem', color: 'var(--white-soft)', lineHeight: 1.5 }}>
                      {t('fueradepista.bingo_desc')}
                    </div>
                  </a>
                </div>
              </div>

              {/* F*CK Cancer logo */}
              <div style={{
                marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: 'var(--magenta)',
                }} />
                <img src="/Logo_FckCancer.png" alt={t('fueradepista.alt_fckcancer')} style={{ width: '220px', height: 'auto', display: 'block' }} />
                <div style={{
                  width: '60px',
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
              {t('fueradepista.palabras_label')}
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--white)', lineHeight: 1.15, marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}>
              {t('fueradepista.mentalidad_heading').split('\n').map((line, li) => (
                <span key={li} style={{ display: 'block', color: li === 1 ? 'var(--magenta)' : undefined }}>{line}</span>
              ))}
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
                        alt={t(item.temaKey)}
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
                        {t(item.temaKey)}
                      </div>
                      <blockquote style={{
                        fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                        color: 'var(--white-soft)', lineHeight: 1.7, fontStyle: 'italic',
                        margin: 0,
                      }}>
                        &ldquo;{t(item.citaKey)}&rdquo;
                      </blockquote>
                      <div style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
                        letterSpacing: '0.15em', color: 'var(--magenta-bright)',
                        marginTop: '1rem',
                      }}>
                        {t('fueradepista.cita_alan')}
                      </div>
                    </div>
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>
        </div>
      </div>

      <VideoSocialsBlock
        videoId="QCDvZGz-Xps"
        instagramLinks={[
          { post: 'https://www.instagram.com/p/C5y6U9OS2QK/', img: '/fueradepista/corriendo.webp', label: 'Competencia' },
          { post: 'https://www.instagram.com/p/DY2owLGPc5m/', img: '/fueradepista/BAJA500-06072025-DSchenkelberg-1725.webp', label: 'Behind the Scenes' },
          { post: 'https://www.instagram.com/p/DYz7-b4PIrG/', img: '/fueradepista/fiesta.webp', label: 'StreetParty' },
          { post: 'https://www.instagram.com/p/DYf_qRfJV94/', img: '/fueradepista/BAJA400-2025-148.webp', label: 'Highlights' },
          null, null, null, null, null,
        ]}
      />

    </div>
  );
}

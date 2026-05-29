import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CASCO = '/footerleements/casctofront.webp';
const FIRMA = '/firmafooter.webp';

const pages = [
  { label: 'En Pista', to: '/en-pista' },
  { label: 'Fuera de Pista', to: '/fuera-de-pista' },
  { label: 'Calendario', to: '/calendario' },
  { label: 'Equipo', to: '/equipo' },
];

const socials = [
  { name: 'Facebook', href: 'https://facebook.com/alanampudia' },
  { name: 'TikTok', href: 'https://tiktok.com/@alanampudia' },
  { name: 'YouTube', href: 'https://youtube.com/@alanampudia' },
  { name: 'Instagram', href: 'https://instagram.com/alanampudia' },
];

export default function Footer() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);

    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => { obs.disconnect(); window.removeEventListener('resize', onResize); };
  }, []);

  const aspectRatio = isMobile ? '382 / 628' : '1688 / 896';

  return (
    <footer ref={ref} style={{
      position: 'relative',
      background: 'var(--black)',
      overflow: 'hidden',
    }}>
      {/* ── Top area: background + content ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        overflow: 'hidden',
      }}>
        {/* Magenta background — 59% height, rounded top corners, textile pattern */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '59%',
          borderRadius: '40px 40px 0 0',
          backgroundImage: 'url(/texture-contrast.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px',
        }} />

        {/* ── Desktop / Tablet layout ── */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 6% 4% 6%',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}>
            {/* LEFT — firma + casco */}
            <div style={{
              flex: '1 1 55%',
              position: 'relative',
              height: '100%',
            }}>
              {/* firmafooter.svg — white */}
              <img
                src={FIRMA}
                alt=""
                style={{
                  position: 'absolute',
                  bottom: '-100px',
                  left: '25%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '75%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  filter: 'none',
                }}
              />
              {/* casco — centrado sobre firma, anclado bottom */}
              <img
                src={CASCO}
                alt="Alan Ampudia"
                style={{
                  position: 'absolute',
                  bottom: '-100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '85%',
                  height: 'auto',
                  maxHeight: '80%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  zIndex: 1,
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                  transition: 'opacity 1s ease-out 0.3s',
                }}
              />
            </div>

            {/* RIGHT — links */}
            <div style={{
              flex: '1 1 45%',
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(2rem, 5vw, 5rem)',
              paddingLeft: '2rem',
            }}>
              {/* Column 1 — Páginas + Tienda */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.4rem, 0.9vw, 0.8rem)',
              }}>
                <h4 style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(0.55rem, 1vw, 0.85rem)',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.5)',
                  margin: '0 0 0.4rem 0',
                  textTransform: 'uppercase',
                }}>Páginas</h4>
                {pages.map(p => (
                  <Link key={p.label} to={p.to} style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(0.8rem, 1.4vw, 1.25rem)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                  >{p.label.toUpperCase()}</Link>
                ))}
                <a
                  href="https://www.alanampudia.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.35rem)',
                    color: 'var(--magenta-bright)',
                    textDecoration: 'none',
                    letterSpacing: '0.06em',
                    marginTop: '0.3rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
                >TIENDA ↗</a>
                <Link to="/legal" style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
                  color: 'var(--white-dim)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  marginTop: '0.5rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--white-dim)'}
                >TÉRMINOS Y CONDICIONES</Link>
              </div>

              {/* Column 2 — Redes Sociales */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.4rem, 0.9vw, 0.8rem)',
              }}>
                <h4 style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(0.55rem, 1vw, 0.85rem)',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.5)',
                  margin: '0 0 0.4rem 0',
                  textTransform: 'uppercase',
                }}>Redes</h4>
                {socials.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(0.8rem, 1.4vw, 1.25rem)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
                  >{s.name.toUpperCase()}</a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Mobile layout — firma + casco centered, menus top ── */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            inset: 0,
          }}>
            {/* Background magenta with texture — top covered */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '85%',
              borderRadius: '40px 40px 0 0',
              backgroundImage: 'url(/texture-contrast.svg)',
              backgroundRepeat: 'repeat',
              backgroundSize: '60px 60px',
            }} />
            {/* Content overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 1,
            }}>
              {/* Menús arriba */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                paddingTop: '2rem',
                flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'center' }}>
                  <h4 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase' }}>Páginas</h4>
                  {pages.map(p => (
                    <Link key={p.label} to={p.to} style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#FFFFFF', textDecoration: 'none', letterSpacing: '0.04em' }}>{p.label.toUpperCase()}</Link>
                  ))}
                  <a href="https://www.alanampudia.store" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.9rem', color: 'var(--magenta-bright)', textDecoration: 'none', letterSpacing: '0.06em' }}>TIENDA ↗</a>
                  <Link to="/legal" style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: 'var(--white-dim)', textDecoration: 'none', letterSpacing: '0.04em', marginTop: '0.5rem' }}>TÉRMINOS Y CONDICIONES</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'center' }}>
                  <h4 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase' }}>Redes</h4>
                  {socials.map(s => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.85rem', color: '#FFFFFF', textDecoration: 'none', letterSpacing: '0.04em' }}>{s.name.toUpperCase()}</a>
                  ))}
                </div>
              </div>
              {/* firma + casco abajo */}
              <div style={{ position: 'relative', width: '80%', flex: 1 }}>
                <img
                  src={FIRMA}
                  alt=""
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '60%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    filter: 'none',
                  }}
                />
                <img
                  src={CASCO}
                  alt="Alan Ampudia"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '85%',
                    height: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    zIndex: 1,
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '2rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.15em',
        }}>
          © 2025 ALAN AMPUDIA / ALL RIGHTS RESERVED
        </div>

        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.15em',
        }}>
          <a href="https://www.xant.online" target="_blank" rel="noopener noreferrer" style={{
            color: 'inherit', textDecoration: 'none', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
          >DESARROLLADO POR XANT</a>
        </div>

        <Link to="/legal" style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: '0.85rem',
          color: 'var(--white)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          fontWeight: 700,
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta-bright)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--white)'}
      >TÉRMINOS Y CONDICIONES</Link>
      </div>
    </footer>
  );
}

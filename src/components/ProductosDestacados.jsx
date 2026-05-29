import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const productos = [
  { code: 'TS.001', name: 'Playera Oficial #1', tagline: 'Team Papas / Negra', price: '$650', img: '/images/hero-person.webp', tag: 'NEW' },
  { code: 'CP.002', name: 'Gorra Monster Black', tagline: 'Snapback ajustable', price: '$450', img: '/images/01-alan-portrait.webp', tag: 'TOP' },
  { code: 'HD.003', name: 'Hoodie Champion 2024', tagline: 'Edición Campeón Mundial', price: '$890', img: '/images/07-alan-with-craft.webp', tag: 'LIMITED' },
  { code: 'AC.004', name: 'Sticker Pack Ampudia', tagline: 'Set de 6 — Team Papas', price: '$120', img: '/images/10-victory-flag.webp', tag: 'NEW' },
];

const tagColor = { 'NEW': 'var(--magenta)', 'TOP': 'var(--monster-green)', 'LIMITED': 'var(--white)' };

export default function ProductosDestacados() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding: '8rem 4rem', background: 'var(--black-soft)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '3rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s',
        }}>
          <div>
            
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', lineHeight: 1.15, color: 'var(--white)' }}>
              PRODUCTOS<br /><span style={{ color: 'var(--magenta)' }}>DESTACADOS.</span>
            </h2>
          </div>
          <Link to="/tienda" style={{
            padding: '1rem 1.8rem',
            background: 'transparent',
            border: '1px solid var(--magenta)', color: 'var(--magenta-bright)',
            fontFamily: 'Anton, sans-serif', fontSize: '0.9rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            transform: 'skewX(-8deg)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--magenta)'; e.currentTarget.style.color = 'var(--white)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--magenta-bright)'; }}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Ver Tienda Completa</span>
          </Link>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
        }}>
          {productos.map((producto, i) => (
            <div
              key={producto.code}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'var(--black-card)',
                border: hovered === i ? '1px solid var(--magenta)' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.1}s, border-color 0.3s`,
              }}
            >
              <div style={{
                aspectRatio: '1/1', position: 'relative', overflow: 'hidden',
                background: 'var(--black-mid)',
              }}>
                <img src={producto.img} alt={producto.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered === i ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s',
                  }} />

                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '0.8rem', left: '0.8rem',
                  padding: '0.25rem 0.6rem',
                  background: tagColor[producto.tag],
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: producto.tag === 'TOP' ? 'var(--black)' : (producto.tag === 'LIMITED' ? 'var(--black)' : 'var(--white)'),
                  fontWeight: 700, zIndex: 2,
                }}>{producto.tag}</div>

                <div style={{
                  position: 'absolute', top: '0.8rem', right: '0.8rem',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  letterSpacing: '0.2em', color: 'var(--white)',
                  background: 'rgba(5,5,5,0.7)', padding: '0.2rem 0.5rem',
                  backdropFilter: 'blur(8px)', zIndex: 2,
                }}>{producto.code}</div>

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(233,30,99,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: hovered === i ? 1 : 0,
                  transition: 'opacity 0.3s',
                  zIndex: 3,
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: '1.4rem',
                    letterSpacing: '0.08em', color: 'var(--white)',
                  }}>VER DETALLE →</div>
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '1.1rem',
                  color: 'var(--white)', letterSpacing: '0.02em',
                  marginBottom: '0.3rem', lineHeight: 1.2,
                }}>{producto.name.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem',
                  color: 'var(--white-dim)', marginBottom: '1rem',
                }}>{producto.tagline}</div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(233,30,99,0.2)',
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: '1.4rem',
                    color: 'var(--magenta-bright)',
                  }}>{producto.price}</div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                    letterSpacing: '0.2em', color: 'var(--white-dim)',
                  }}>MXN</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

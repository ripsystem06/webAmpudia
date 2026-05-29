import { useEffect, useRef, useState } from 'react';

const productos = [
  {
    name: 'Gorra Calaverita',
    tagline: 'Edición Limited — Snapback',
    img: '/images/productosPromo/GORRA-CALAVERITA2-FRONT.webp',
    tag: 'NEW',
  },
  {
    name: 'Gorra WDC',
    tagline: 'World Desert Champion 2025',
    img: '/images/productosPromo/GORRA-WDC.webp',
    tag: 'TOP',
  },
  {
    name: 'Jersey WDC',
    tagline: 'Champion Edition — Back Print',
    img: '/images/productosPromo/WDC-2526-BACK.webp',
    tag: 'LIMITED',
  },
  {
    name: 'Sponsors 2025',
    tagline: 'Colección Oficial — Team Papas',
    img: '/images/productosPromo/AA-SPONSORS-2026.webp',
    tag: 'EXCLUSIVE',
  },
];

const tagColor = {
  NEW: 'var(--magenta)',
  TOP: 'var(--monster-green)',
  LIMITED: 'var(--white)',
  EXCLUSIVE: 'var(--magenta-bright)',
};

const STORE_URL = 'https://www.alanampudia.store';

export default function ProductosPromo() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="productos-section" style={{
      background: 'var(--black)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        .productos-section { padding: 8rem 4rem; }
        .productos-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 1023px) {
          .productos-section { padding: 5rem 2rem; }
          .productos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .productos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      {/* Background watermark */}
      <div style={{
        position: 'absolute',
        right: '-5%',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Anton, sans-serif',
        fontSize: 'clamp(18rem, 35vw, 40rem)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(233,30,99,0.06)',
        lineHeight: 0.85,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>STORE</div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '4rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'var(--magenta-bright)',
              marginBottom: '0.8rem',
            }}>◉ TIENDA OFICIAL</div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
              lineHeight: 1.15,
              color: 'var(--white)',
            }}>
              LO<br /><span style={{ color: 'var(--magenta)' }}>MEJOR.</span>
            </h2>
          </div>

          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" style={{
            padding: '1rem 1.8rem',
            background: 'transparent',
            border: '1px solid var(--magenta)',
            color: 'var(--magenta-bright)',
            fontFamily: 'Anton, sans-serif',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            transform: 'skewX(-8deg)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--magenta)'; e.currentTarget.style.color = 'var(--white)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--magenta-bright)'; }}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Ver Tienda</span>
          </a>
        </div>

        {/* Product grid */}
        <div className="productos-grid">
          {productos.map((producto, i) => (
            <a
              key={i}
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textDecoration: 'none',
                background: 'var(--black-card)',
                border: hovered === i ? '1px solid var(--magenta)' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease ${i * 0.12}s, border-color 0.3s`,
                display: 'block',
              }}
            >
              {/* Image */}
              <div style={{
                aspectRatio: '1/1',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--black-mid)',
              }}>
                <img src={producto.img} alt={producto.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: hovered === i ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s ease',
                  }} />

                {/* Tag */}
                <div style={{
                  position: 'absolute',
                  top: '0.8rem',
                  left: '0.8rem',
                  padding: '0.25rem 0.6rem',
                  background: tagColor[producto.tag],
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: producto.tag === 'TOP' || producto.tag === 'LIMITED' ? 'var(--black)' : 'var(--white)',
                  fontWeight: 700,
                  zIndex: 2,
                }}>{producto.tag}</div>

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(233,30,99,0.9) 0%, rgba(176,20,74,0.85) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: hovered === i ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 3,
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: '1.3rem',
                    letterSpacing: '0.08em',
                    color: 'var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    IR A TIENDA <span style={{ fontSize: '1.6rem' }}>→</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: '1.1rem',
                  color: 'var(--white)',
                  letterSpacing: '0.02em',
                  marginBottom: '0.3rem',
                  lineHeight: 1.2,
                }}>{producto.name.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '0.85rem',
                  color: 'var(--white-dim)',
                }}>{producto.tagline}</div>
                <div style={{
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(233,30,99,0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: '1.2rem',
                    color: 'var(--magenta-bright)',
                    letterSpacing: '0.02em',
                  }}>SHOP NOW</span>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '1rem',
                    color: 'var(--magenta-bright)',
                  }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
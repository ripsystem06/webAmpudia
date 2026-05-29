import { useState } from 'react';

const productos = [
  { code: 'TS.001', name: 'Playera Oficial #1', tagline: 'Team Papas / Negra', price: '$650', cat: 'Playeras', img: '/images/hero-person.webp', tag: 'NEW' },
  { code: 'CP.002', name: 'Gorra Monster Black', tagline: 'Snapback ajustable', price: '$450', cat: 'Gorras', img: '/images/01-alan-portrait.webp', tag: 'TOP' },
  { code: 'HD.003', name: 'Hoodie Champion 2024', tagline: 'Edición Campeón Mundial', price: '$890', cat: 'Sudaderas', img: '/images/07-alan-with-craft.webp', tag: 'LIMITED' },
  { code: 'AC.004', name: 'Sticker Pack Ampudia', tagline: 'Set de 6 — Team Papas', price: '$120', cat: 'Accesorios', img: '/images/10-victory-flag.webp', tag: 'NEW' },
  { code: 'TS.005', name: 'Playera Racing Pink', tagline: 'Edición magenta', price: '$650', cat: 'Playeras', img: '/images/02-truck-action-side.webp', tag: 'NEW' },
  { code: 'CP.006', name: 'Gorra Trucker White', tagline: 'Estilo retro 5-panel', price: '$420', cat: 'Gorras', img: '/images/08-helmet.webp', tag: null },
  { code: 'HD.007', name: 'Sudadera Crewneck Negra', tagline: 'Logo bordado Team Papas', price: '$780', cat: 'Sudaderas', img: '/images/06-pit-stop.webp', tag: null },
  { code: 'AC.008', name: 'Llavero Metálico #1', tagline: 'Edición coleccionable', price: '$180', cat: 'Accesorios', img: '/images/04-truck-action-front.webp', tag: 'TOP' },
];

const categorias = ['Todos', 'Playeras', 'Gorras', 'Sudaderas', 'Accesorios'];
const tagColor = { 'NEW': 'var(--magenta)', 'TOP': 'var(--monster-green)', 'LIMITED': 'var(--white)' };

export default function Tienda() {
  const [filtro, setFiltro] = useState('Todos');
  const [hovered, setHovered] = useState(null);

  const filtrados = filtro === 'Todos' ? productos : productos.filter(p => p.cat === filtro);

  const goExternal = () => {
    window.open('https://shop.alanampudia.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ paddingTop: '98px', minHeight: '100vh', background: 'var(--black)' }}>
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
          fontSize: 'clamp(7rem, 18vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.08)',
          lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap',
        }}>TIENDA #1</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Productos Oficiales
          </div>
          <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.15, color: 'var(--white)' }}>
            <span style={{ color: 'var(--magenta)' }}>TIENDA</span> #1
          </h1>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem', maxWidth: '500px' }}>
            Merch oficial de Alan Ampudia y Team Papas. Cada compra te conecta con la dinastía del off-road mexicano.
          </p>

          <button onClick={goExternal} style={{
            marginTop: '2rem',
            padding: '1rem 2rem', background: 'var(--magenta)', color: 'var(--white)',
            fontFamily: 'Anton, sans-serif', fontSize: '0.95rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            border: 'none', transform: 'skewX(-8deg)',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 0 20px rgba(233,30,99,0.4)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Ir a Tienda Oficial</span>
          </button>
        </div>
      </div>

      <div style={{
        padding: '1.5rem 4rem',
        background: 'var(--black-mid)',
        borderBottom: '1px solid rgba(233,30,99,0.1)',
        display: 'flex', gap: '0.6rem', flexWrap: 'wrap',
      }}>
        {categorias.map(cat => (
          <button key={cat} onClick={() => setFiltro(cat)}
            style={{
              padding: '0.6rem 1.2rem',
              background: filtro === cat ? 'var(--magenta)' : 'transparent',
              border: '1px solid ' + (filtro === cat ? 'var(--magenta)' : 'rgba(233,30,99,0.3)'),
              color: filtro === cat ? 'var(--white)' : 'var(--white-dim)',
              fontFamily: 'Anton, sans-serif', fontSize: '0.85rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >{cat}</button>
        ))}
      </div>

      <div style={{ padding: '4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
        }}>
          {filtrados.map((p, i) => (
            <div key={p.code}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={goExternal}
              style={{
                background: 'var(--black-card)',
                border: hovered === i ? '1px solid var(--magenta)' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s',
              }}>
              <div style={{
                aspectRatio: '1/1', position: 'relative', overflow: 'hidden',
                background: 'var(--black-mid)',
              }}>
                <img src={p.img} alt={p.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: hovered === i ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s',
                  }} />

                {p.tag && (
                  <div style={{
                    position: 'absolute', top: '0.8rem', left: '0.8rem',
                    padding: '0.25rem 0.6rem',
                    background: tagColor[p.tag],
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: p.tag === 'TOP' ? 'var(--black)' : (p.tag === 'LIMITED' ? 'var(--black)' : 'var(--white)'),
                    fontWeight: 700, zIndex: 2,
                  }}>{p.tag}</div>
                )}

                <div style={{
                  position: 'absolute', top: '0.8rem', right: '0.8rem',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  letterSpacing: '0.2em', color: 'var(--white)',
                  background: 'rgba(5,5,5,0.7)', padding: '0.2rem 0.5rem',
                  backdropFilter: 'blur(8px)', zIndex: 2,
                }}>{p.code}</div>

                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(233,30,99,0.85)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: hovered === i ? 1 : 0,
                  transition: 'opacity 0.3s', zIndex: 3,
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: '1.3rem',
                    letterSpacing: '0.08em', color: 'var(--white)',
                  }}>COMPRAR →</div>
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                  letterSpacing: '0.25em', color: 'var(--magenta-bright)',
                  marginBottom: '0.5rem',
                }}>{p.cat.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'Anton, sans-serif', fontSize: '1.1rem',
                  color: 'var(--white)', letterSpacing: '0.02em',
                  marginBottom: '0.3rem', lineHeight: 1.2,
                }}>{p.name.toUpperCase()}</div>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: '0.85rem',
                  color: 'var(--white-dim)', marginBottom: '1rem',
                }}>{p.tagline}</div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(233,30,99,0.2)',
                }}>
                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: '1.4rem',
                    color: 'var(--magenta-bright)',
                  }}>{p.price}</div>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                    letterSpacing: '0.2em', color: 'var(--white-dim)',
                  }}>MXN</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '4rem', padding: '3rem',
          background: 'var(--black-soft)',
          border: '1px solid rgba(233,30,99,0.2)',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--magenta-bright)', marginBottom: '1rem' }}>
            // CHECKOUT EXTERNO
          </div>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--white)', marginBottom: '1rem', lineHeight: 1.1 }}>
            COMPRAS SEGURAS EN LA TIENDA OFICIAL
          </div>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Todos los productos se procesan a través de nuestra tienda oficial con envío a toda la República Mexicana.
          </p>
          <button onClick={goExternal} style={{
            padding: '1rem 2rem', background: 'var(--magenta)', color: 'var(--white)',
            fontFamily: 'Anton, sans-serif', fontSize: '0.95rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            border: 'none', transform: 'skewX(-8deg)', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--magenta-bright)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--magenta)'}
          >
            <span style={{ transform: 'skewX(8deg)', display: 'inline-block' }}>→ Visitar Tienda Oficial</span>
          </button>
        </div>
      </div>
    </div>
  );
}

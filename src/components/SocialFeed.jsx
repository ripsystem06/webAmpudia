import { useEffect, useRef, useState } from 'react';

const posts = [
  { img: '/images/04-truck-action-front.webp', label: 'San Felipe 250 — Acción frontal', tag: 'TRACK', code: 'IG.001' },
  { img: '/images/05-team-group.webp', label: 'Team Papas — Pre-carrera', tag: 'CREW', code: 'YT.002' },
  { img: '/images/01-alan-portrait.webp', label: 'El #1 — Ensenada B.C.', tag: 'LIFE', code: 'TT.003' },
  { img: '/images/10-victory-flag.webp', label: 'Bandera de meta 2024', tag: 'TRACK', code: 'IG.004' },
  { img: '/images/07-alan-with-craft.webp', label: 'Con Kyle Craft, co-piloto', tag: 'CREW', code: 'IG.005' },
  { img: '/images/02-truck-action-side.webp', label: 'Polvo y velocidad', tag: 'TRACK', code: 'YT.006' },
  { img: '/images/06-pit-stop.webp', label: 'Pit stop precision', tag: 'CREW', code: 'IG.007' },
  { img: '/images/09-alan-cockpit.webp', label: 'Listo para arrancar', tag: 'LIFE', code: 'TT.008' },
];

const tagColor = { 'TRACK': 'var(--magenta-bright)', 'CREW': 'var(--white)', 'LIFE': 'var(--monster-green)' };

export default function SocialFeed() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding: '8rem 4rem', background: 'var(--black-soft)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '3rem',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s',
        }}>
          <div>
            
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.15, color: 'var(--white)' }}>
              ÚLTIMAS<br /><span style={{ color: 'var(--magenta)' }}>TRANSMISIONES.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {[{ name: 'INSTAGRAM', code: 'IG' }, { name: 'YOUTUBE', code: 'YT' }, { name: 'TIKTOK', code: 'TT' }, { name: 'FACEBOOK', code: 'FB' }].map(s => (
              <a key={s.name} href="#" style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                fontWeight: 700, letterSpacing: '0.2em', color: 'var(--white-dim)',
                textDecoration: 'none', padding: '0.4rem 0.7rem',
                border: '1px solid rgba(233,30,99,0.3)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.color = 'var(--magenta-bright)'; e.target.style.borderColor = 'var(--magenta)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--white-dim)'; e.target.style.borderColor = 'rgba(233,30,99,0.3)'; }}
              >{s.code}</a>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 240px)', gap: '6px',
          background: 'rgba(233,30,99,0.15)',
          border: '1px solid rgba(233,30,99,0.15)',
        }}>
          {posts.map((post, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                gridColumn: i === 0 ? 'span 2' : 'span 1',
                gridRow: i === 0 ? 'span 2' : 'span 1',
                position: 'relative', overflow: 'hidden', cursor: 'pointer',
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.95)',
                transition: `all 0.6s ease ${i * 0.05}s`,
              }}
            >
              <img src={post.img} alt={post.label} style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transform: hovered === i ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.5s ease',
              }} />

              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,5,0.85), transparent 60%)',
              }} />

              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(233,30,99,0.85)',
                opacity: hovered === i ? 1 : 0, transition: 'opacity 0.3s', zIndex: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '0.5rem',
              }}>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '2rem', color: 'var(--white)' }}>VER →</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--white)' }}>{post.code}</div>
              </div>

              <div style={{
                position: 'absolute', top: '0.8rem', left: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
                letterSpacing: '0.2em', color: 'var(--white)',
                background: 'rgba(5,5,5,0.7)', padding: '0.2rem 0.5rem',
                backdropFilter: 'blur(8px)', zIndex: 2,
              }}>{post.code}</div>

              <div style={{
                position: 'absolute', top: '0.8rem', right: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
                letterSpacing: '0.2em', color: tagColor[post.tag],
                padding: '0.2rem 0.5rem', background: 'rgba(5,5,5,0.7)',
                border: `1px solid ${tagColor[post.tag]}`,
                backdropFilter: 'blur(8px)', zIndex: 2,
              }}>{post.tag}</div>

              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1rem', zIndex: 1,
              }}>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: i === 0 ? '0.95rem' : '0.78rem',
                  color: 'var(--white)', fontWeight: 500,
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                }}>{post.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

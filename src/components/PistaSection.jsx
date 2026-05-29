import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PistaSection() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const blocks = [
    {
      id: 'en-pista', to: '/en-pista',
      title: 'EN\nPISTA',
      description: 'Resultados, estadísticas, victorias y momentos desde el desierto.',
      img: '/images/onoftrack/ontrack.webp',
      side: 'left',
    },
    {
      id: 'fuera-pista', to: '/fuera-de-pista',
      title: 'FUERA\nDE PISTA',
      description: 'El piloto, el hombre, la familia. Lo que sucede cuando se apaga el motor.',
      img: '/images/onoftrack/oftrack.webp',
      side: 'right',
    },
  ];

  const isActive = (i) => selected === i;

  return (
    <section ref={sectionRef} style={{ background: 'var(--black)' }}>
      <style>{`
        /* ===== DESKTOP BASE ===== */
        .pista-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }
        .pista-card {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          min-height: 600px;
        }
        .pista-card.active {
          overflow: visible;
        }

        /* ===== MOBILE ONLY (max-width: 767px) ===== */
        @media (max-width: 767px) {
          .pista-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .pista-card {
            min-height: 50vh !important;
          }
          .pista-card.active {
            overflow: visible !important;
          }
          .pista-img {
            left: 50% !important;
            right: auto !important;
            transform: translate(-50%, -50%) !important;
            transition: transform 0.5s ease, opacity 0.4s ease !important;
            object-fit: contain !important;
            height: 100% !important;
          }
          /* En pista: slide LEFT on tap */
          .pista-card--en.active .pista-img {
            transform: translate(calc(-50% - 25vw), -50%) scale(0.9) !important;
            opacity: 0.5 !important;
          }
          /* Fuera de pista: slide RIGHT on tap */
          .pista-card--fuera.active .pista-img {
            transform: translate(calc(-50% + 25vw), -50%) scale(0.9) !important;
            opacity: 0.5 !important;
          }
          .pista-text {
            opacity: 0 !important;
            transform: translateY(30px) !important;
            transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s !important;
            position: relative !important;
            top: auto !important;
            left: 0 !important;
            right: 0 !important;
            text-align: center !important;
            align-items: center !important;
            max-width: 100% !important;
            padding: 2rem 1rem;
          }
          .pista-card.active .pista-text {
            opacity: 1 !important;
            transform: translateY(0) !important;
            z-index: 5 !important;
          }
        }
      `}</style>

      <div className="pista-grid">
        {blocks.map((block, i) => (
          <div key={block.id}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`pista-card pista-card--${i === 0 ? 'en' : 'fuera'}${isActive(i) ? ' active' : ''}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? 'translateX(0)'
                : `translateX(${block.side === 'left' ? '-80px' : '80px'})`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            {/* Glow */}
            <div style={{
              position: 'absolute',
              inset: '-10%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,99,0.3) 0%, transparent 50%)',
              opacity: isActive(i) ? 1 : 0.4,
              transition: 'opacity 0.6s ease',
              zIndex: 0,
              pointerEvents: 'none',
            }} />

            {/* Image — both sides offset, contain to avoid cropping */}
            <img src={block.img} alt={block.title}
              className="pista-img" style={{
              position: 'absolute',
              top: '50%',
              width: '100%',
              height: '100%',
              [block.side === 'left' ? 'left' : 'right']: '-30%',
              transform: isActive(i)
                  ? 'translateY(-50%) scale(1.04)'
                  : 'translateY(-50%) scale(1)',
              objectFit: 'contain',
              objectPosition: 'center',
              opacity: 1,
              transition: 'transform 0.6s ease, opacity 0.6s ease',
              zIndex: 0,
            }} />

            {/* Bottom fade */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '35%',
              background: 'linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            {/* Text — aligned toward screen center on desktop */}
            <div className="pista-text" style={{
              position: 'absolute',
              zIndex: 2,
              top: '50%',
              transform: 'translateY(-50%)',
              right: block.side === 'left' ? '5%' : undefined,
              left: block.side === 'right' ? '5%' : undefined,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '55%',
            }}>
              <h2 style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 7.2rem)',
                lineHeight: 1.15,
                color: 'var(--white)',
                whiteSpace: 'pre-line',
                marginBottom: '1.5rem',
                textShadow: isActive(i)
                  ? '0 4px 30px rgba(233,30,99,0.5), 0 2px 10px rgba(0,0,0,0.8)'
                  : '0 2px 10px rgba(0,0,0,0.8)',
                transition: 'text-shadow 0.4s ease, opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}>
                {block.title.split('\n').map((line, li) => (
                  <span key={li} style={{ display: 'block' }}>{line}</span>
                ))}
              </h2>

              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '1.1rem',
                color: 'var(--white)',
                lineHeight: 1.5,
                maxWidth: '280px',
                textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
              }}>
                {block.description}
              </p>

              <Link to={block.to} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontFamily: 'Anton, sans-serif', fontSize: '1rem',
                letterSpacing: '0.1em', color: 'var(--magenta-bright)',
                marginTop: '1rem', textDecoration: 'none',
                transition: 'all 0.3s, opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}>
                <span>EXPLORAR</span>
                <span style={{ fontSize: '1.4rem' }}>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
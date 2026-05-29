import { useState, useEffect, useRef } from 'react';
import TrackGlowSVG from '../components/TrackGlowSVG';
import HelmetShowcase from '../components/HelmetScroll';

const temporadas = [
  {
    year: '2025',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2025', posicion: '1°', clase: '1° TT', tiempo: '03:55:13', estado: 'Victoria', nota: '3 victorias consecutivas iniciadas' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2025', posicion: '1°', clase: '1° TT', tiempo: '08:39:34', estado: 'Victoria', nota: 'Segunda consecutiva del año' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2025', posicion: '1°', clase: '1° TT', tiempo: '08:12:11', estado: 'Victoria', nota: 'Tercer mexicano en lograrlo' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2025', posicion: '11°', clase: '4° TT', tiempo: '17:17:33', estado: 'Completada', nota: '' },
    ],
  },
  {
    year: '2024',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2024', posicion: '1°', clase: '1° TT', tiempo: '', estado: 'Victoria', nota: 'Récord: 70.71 mph promedio' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2024', posicion: '16°', clase: '2° TT', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2024', posicion: '2°', clase: '1° TT', tiempo: '', estado: 'Victoria', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2024', posicion: '4°', clase: '1° TT', tiempo: '', estado: 'Victoria', nota: 'Campeonato asegurado por 1 punto' },
    ],
  },
  {
    year: '2023',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2023', posicion: '2°', clase: '1° TT', tiempo: '', estado: 'Victoria', nota: '' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2023', posicion: '202°', clase: '', tiempo: '', estado: 'DNF', nota: '' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2023', posicion: '4°', clase: '2° TT', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2023', posicion: '17°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
    ],
  },
  {
    year: '2022',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2022', posicion: '7°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2022', posicion: '5°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2022', posicion: '4°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2022', posicion: 'DNF', clase: '', tiempo: '', estado: 'DNF', nota: 'Con Ken Block — 0 ponchadas en noche completa' },
    ],
  },
  {
    year: '2021',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2021', posicion: '4°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2021', posicion: 'DNF', clase: '', tiempo: '', estado: 'DNF', nota: '' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2021', posicion: '4°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2021', posicion: '4°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
    ],
  },
  {
    year: '2020',
    carreras: [
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2020', posicion: '4°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2020', posicion: '7°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
    ],
  },
  {
    year: '2019',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2019', posicion: '15°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2019', posicion: '4°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2019', posicion: '5°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2019', posicion: '1°', clase: '', tiempo: '', estado: 'Victoria', nota: 'Victoria histórica absoluta — 1,000 millas' },
    ],
  },
  {
    year: '2018',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2018', posicion: '8°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2018', posicion: '12°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'Desert Challenge', fecha: '2018', posicion: '22°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2018', posicion: '9°', clase: '', tiempo: '', estado: 'Completada', nota: '' },
    ],
  },
];

// Position-based color coding (not estado-based)
const positionColor = (posicion, estado) => {
  if (estado === 'DNF') return '#ff4444';
  const num = parseInt(posicion.replace(/[^\d]/g, ''));
  if (isNaN(num)) return 'var(--white-dim)';
  if (num === 1) return 'var(--magenta-bright)'; // 1st place → magenta
  if (num <= 3) return 'var(--white)';             // 2nd-3rd → white podium
  return 'var(--white-dim)';                        // 4th+ → dim
};

const estadoColor = {
  'Victoria': 'var(--magenta-bright)',
  'Completada': 'var(--white-soft)',
  'DNF': '#ff4444',
};

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{ display: 'flex', gap: 'clamp(0.4rem, 1.5vw, 1.5rem)', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {[
        { value: timeLeft.days, label: 'Días' },
        { value: timeLeft.hours, label: 'Horas' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Seg' },
      ].map((item, i) => (
        <div key={item.label} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: 'var(--magenta)',
            lineHeight: 1,
            background: 'rgba(233,30,99,0.1)',
            border: '1px solid rgba(233,30,99,0.3)',
            padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.4rem, 1.5vw, 1rem)',
            minWidth: 'clamp(55px, 12vw, 80px)',
          }}>
            {pad(item.value)}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'var(--white-dim)',
            marginTop: '0.5rem',
            textTransform: 'uppercase',
          }}>
            {item.label}
          </div>
        </div>
      ))}
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
      {/* Inline countdown — white numbers + letters, no boxes */}
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

      {/* PRÓXIMA CARRERA layered on top */}
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

const teamGallery = [
  { src: '/images/team/team-papas.webp', alt: 'Team Papas en los pits' },
  { src: '/images/team/06-pit-stop.webp', alt: 'Pit stop cronometrado del Trophy Truck #1' },
  { src: '/images/team/accion.webp', alt: 'Mecánicos en acción durante carrera' },
  { src: '/images/team/papa-alan.webp', alt: 'Rodrigo Ampudia Sr. y Alan Ampudia' },
];

function TeamSection() {
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
    <section ref={ref} style={{
      padding: 'clamp(2rem, 6vw, 5rem) clamp(1rem, 4vw, 4rem)',
      background: 'linear-gradient(180deg, var(--black) 0%, #0a0612 30%, var(--black) 100%)',
      borderTop: '1px solid rgba(233,30,99,0.12)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            color: 'var(--magenta-bright)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            Escudería Oficial
          </div>
          <h2 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            lineHeight: 1.15,
            color: 'var(--white)',
            margin: 0,
          }}>
            TEAM <span style={{ color: 'var(--magenta)' }}>PAPAS</span>
          </h2>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--white-soft)',
            lineHeight: 1.6,
            marginTop: 'clamp(0.8rem, 2vw, 1.5rem)',
            maxWidth: '700px',
          }}>
            El equipo detrás del éxito de Alan Ampudia, conocido oficialmente como Team Papas,
            es una escudería de clase mundial fuertemente arraigada en los valores familiares
            y respaldada por su icónico negocio, Papas &amp; Beer, ubicado en Ensenada y Rosarito.
          </p>
        </div>

        {/* Hero Image */}
        <div style={{
          position: 'relative',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid rgba(233,30,99,0.25)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s ease 0.15s',
        }}>
          <img
            src="/images/team/05-team-group.webp"
            alt="Team Papas — equipo completo de Alan Ampudia"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
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

        {/* Two-column: Philosophy + Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
        }}>
          {/* Left: El Cerebro */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s ease 0.3s',
          }}>
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
          </div>

          {/* Right: Stats & Protocol */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.4s',
          }}>
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
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768
            ? '1fr 1fr'
            : 'repeat(4, 1fr)',
          gap: 'clamp(0.5rem, 1.5vw, 1rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
        }}>
          {teamGallery.map((img, i) => (
            <div key={i} style={{
              aspectRatio: '4/3',
              overflow: 'hidden',
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.7s ease ${0.5 + i * 0.1}s`,
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

        {/* Pit Crew Heroes + Anecdote */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          background: 'rgba(233,30,99,0.05)',
          border: '1px solid rgba(233,30,99,0.2)',
          borderRadius: '4px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s ease 0.6s',
        }}>
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'var(--magenta-bright)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}>
              Los Héroes en los Pits
            </div>
            <h3 style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              color: 'var(--white)',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: '1rem',
            }}>
              MECÁNICOS DE ÉLITE
            </h3>
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '1.05rem',
              color: 'var(--white-soft)',
              lineHeight: 1.7,
            }}>
              &ldquo;El Pollo&rdquo; y &ldquo;Gael&rdquo; son dos de los mecánicos de mayor confianza,
              mencionados recurrentemente por Alan como piezas clave del equipo. Su capacidad
              para trabajar bajo presión y resolver problemas mecánicos complejos en minutos
              —no en horas— marca la diferencia entre ganar y abandonar.
            </p>
          </div>

          <div style={{
            padding: 'clamp(1rem, 2vw, 1.5rem)',
            background: 'var(--black)',
            borderLeft: '4px solid var(--magenta)',
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
              fontSize: '0.95rem',
              color: 'var(--white-soft)',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}>
              La noche antes de la carrera, el vehículo de Alan sufrió daños graves tras golpear
              una gran piedra durante las clasificaciones. El equipo de mecánicos, sumando
              esfuerzos con Neil Mason —el constructor de los vehículos—, trabajó a contrarreloj
              hasta las 3:30 de la madrugada. Cambiaron desde el diferencial delantero hasta la
              flecha trasera, salvando el carro y permitiendo que Alan ganara la carrera horas después.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function HeroSection() {
  const heroRef = useRef();
  const [heroVisible, setHeroVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <div ref={heroRef} id="hero-section-trigger" style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, rgba(20,2,20,1) 60%, rgba(233,30,99,0.12) 100%)',
      overflow: 'hidden',
    }}>
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'stretch',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: isMobile ? '4rem 2rem' : '4rem clamp(2rem, 6vw, 6rem)',
        textAlign: isMobile ? 'center' : 'left',
      }}>
        {/* Left column */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
          justifyContent: 'center',
        }}>
        {/* Event Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.2rem',
          background: 'rgba(233,30,99,0.15)',
          border: '1px solid rgba(233,30,99,0.4)',
          marginBottom: '2rem',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: 'var(--magenta)',
            borderRadius: '50%',
            animation: 'blink 1.5s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            color: 'var(--magenta-bright)',
            textTransform: 'uppercase',
          }}>
            Próxima Carrera
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          lineHeight: 0.95,
          color: 'var(--white)',
          margin: 0,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          58th<br />
          <span style={{ color: 'var(--magenta)' }}>SCORE BAJA 500</span>
        </h1>

        {/* Event Details */}
        <div style={{
          marginTop: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.4s',
        }}>
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: 'var(--white-soft)',
            letterSpacing: '0.05em',
          }}>
            460+ miles of Baja terrain
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            color: 'var(--white-dim)',
            letterSpacing: '0.15em',
          }}>
            Ensenada, Baja California — June 3–7, 2026
          </div>
        </div>

        {/* Countdown */}
        <div style={{
          marginTop: '3rem',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.6s',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: 'var(--magenta-bright)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Tiempo hasta la salida
          </div>
          <CountdownTimer targetDate="June 3, 2026 00:00:00" />
        </div>
        </div>{/* end left column */}

        {/* Track glow SVG */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '1rem 0' : '2rem',
          width: isMobile ? '100%' : undefined,
          maxWidth: isMobile ? '400px' : undefined,
          margin: isMobile ? '0 auto' : undefined,
          marginTop: isMobile ? '1.8rem' : 0,
        }}>
          <TrackGlowSVG />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(233,30,99,0.4); }
          50% { box-shadow: 0 0 20px 5px rgba(233,30,99,0.2); }
        }
      `}</style>
    </div>
  );
}

export default function EnPista() {
  const [activeYear, setActiveYear] = useState('2025');
  const [expandedRace, setExpandedRace] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeSlide, setActiveSlide] = useState(0);
  const specTTImages = [
    '/specTT/SanFelipe250-DSchenkelberg-153.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-174.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-191.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-201.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-205.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-524.jpg',
  ];

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-advance specTT slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % specTTImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [specTTImages.length]);
  const headerRef = useRef();
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true); }, { threshold: 0.2 });
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  const temporada = temporadas.find(t => t.year === activeYear);

  return (
    <div style={{ paddingTop: '0', minHeight: '100vh', background: 'var(--black)' }}>
      {/* Hero Section */}
      <HeroSection />
      <HelmetShowcase />

      {/* Stats Header */}
      <div ref={headerRef} style={{
        padding: '5rem 4rem 4rem',
        background: 'linear-gradient(180deg, rgba(233,30,99,0.12) 0%, rgba(20,2,20,1) 40%, #0a0a0a 100%)',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', right: isMobile ? '-1rem' : '2rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.08)',
          lineHeight: 1, userSelect: 'none',
        }}>EN PISTA</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.35em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', marginBottom: '0.5rem',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s',
          }}>Historial de Competencia</div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.15, color: 'var(--white)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.1s',
          }}>
            EN<br /><span style={{ color: 'var(--magenta)' }}>PISTA</span>
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem',
            color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem',
            maxWidth: '500px',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s',
          }}>
            Resultados, victorias y momentos definitorios en la máxima categoría del off-road mundial.
          </p>
        </div>

        <div style={{
          display: 'flex', gap: 'clamp(1rem, 3vw, 3rem)', marginTop: '3rem',
          flexWrap: 'wrap',
          opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s',
        }}>
          {[
            { num: '1', label: 'Campeonato Mundial' },
            { num: '1', label: 'Triple Corona' },
            { num: '70.71', label: 'mph Récord SF250' },
            { num: '18h', label: 'Baja 1000 solitario' },
          ].map(s => (
            <div key={s.label} style={isMobile ? {} : { display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: isMobile ? '2.2rem' : '2.42rem', color: 'var(--magenta-bright)', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: isMobile ? '0.7rem' : '0.77rem', letterSpacing: '0.15em', color: 'var(--white-dim)', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Year Navigation */}
      {isMobile ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 3rem)',
          borderBottom: '1px solid rgba(233,30,99,0.2)',
          background: 'var(--black-mid)', padding: '0.75rem clamp(1rem, 4vw, 4rem)',
        }}>
          <button
            onClick={() => {
              const idx = temporadas.findIndex(t => t.year === activeYear);
              if (idx < temporadas.length - 1) setActiveYear(temporadas[idx + 1].year);
            }}
            disabled={temporadas.findIndex(t => t.year === activeYear) >= temporadas.length - 1}
            style={{
              background: 'transparent', border: 'none',
              color: temporadas.findIndex(t => t.year === activeYear) >= temporadas.length - 1
                ? 'rgba(233,30,99,0.2)' : 'var(--magenta-bright)',
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              cursor: 'pointer', padding: '0.25rem 0.5rem', lineHeight: 1,
              transition: 'color 0.2s',
            }}
            aria-label="Año anterior"
          >←</button>

          <span style={{
            fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            color: 'var(--magenta-bright)', letterSpacing: '0.05em',
            minWidth: '80px', textAlign: 'center',
          }}>{activeYear}</span>

          <button
            onClick={() => {
              const idx = temporadas.findIndex(t => t.year === activeYear);
              if (idx > 0) setActiveYear(temporadas[idx - 1].year);
            }}
            disabled={temporadas.findIndex(t => t.year === activeYear) <= 0}
            style={{
              background: 'transparent', border: 'none',
              color: temporadas.findIndex(t => t.year === activeYear) <= 0
                ? 'rgba(233,30,99,0.2)' : 'var(--magenta-bright)',
              fontFamily: 'Anton, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              cursor: 'pointer', padding: '0.25rem 0.5rem', lineHeight: 1,
              transition: 'color 0.2s',
            }}
            aria-label="Año siguiente"
          >→</button>
        </div>
      ) : (
        <div style={{
          display: 'flex', gap: '0',
          borderBottom: '1px solid rgba(233,30,99,0.2)',
          background: 'var(--black-mid)', padding: '0 clamp(1rem, 4vw, 4rem)',
          overflowX: 'auto',
        }}>
          {temporadas.map(t => (
            <button key={t.year} onClick={() => setActiveYear(t.year)}
              style={{
                flex: 1, padding: '1rem 0.5rem', background: 'transparent', border: 'none',
                borderBottom: activeYear === t.year ? '2px solid var(--magenta)' : '2px solid transparent',
                color: activeYear === t.year ? 'var(--magenta-bright)' : 'var(--white-dim)',
                fontFamily: 'Anton, sans-serif', fontSize: '1.4rem',
                letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >{t.year}</button>
          ))}
        </div>
      )}

      {/* Race List - Accordion Style */}
      <div style={{ padding: 'clamp(1.5rem, 4vw, 4rem)', maxWidth: '1000px', margin: '0 auto' }}>
        {activeYear === '2025' && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'rgba(233,30,99,0.12)',
            border: '1px solid rgba(233,30,99,0.3)', marginBottom: '2rem',
          }}>
            <div style={{ width: '6px', height: '6px', background: 'var(--magenta)', borderRadius: '50%', animation: 'blink 2s infinite' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--magenta-bright)', textTransform: 'uppercase' }}>
              Temporada en curso
            </span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {temporada.carreras.map((carrera, i) => {
            const isExpanded = expandedRace === `${activeYear}-${i}`;
            const positionNum = parseInt(carrera.posicion.replace(/[^\d]/g, ''));
            const isGold = positionNum === 1;
            const isPodium = positionNum > 1 && positionNum <= 3;
            const isDNF = carrera.estado === 'DNF';
            const posColor = positionColor(carrera.posicion, carrera.estado);

            return (
              <div key={i}>
                {/* Race Row - Clickable Accordion Header */}
                <div
                  onClick={() => setExpandedRace(isExpanded ? null : `${activeYear}-${i}`)}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto',
                    alignItems: 'center', gap: '2rem',
                    padding: 'clamp(1rem, 2vw, 1.8rem) clamp(1rem, 2vw, 2rem)',
                    background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)',
                    border: isExpanded ? '1px solid rgba(233,30,99,0.3)' : '1px solid rgba(233,30,99,0.06)',
                    position: 'relative', overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: '3px',
                    background: posColor,
                  }} />

                  <div style={{ paddingLeft: '1rem' }}>
                    <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: 'var(--white)', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {carrera.nombre}
                      {isDNF && (
                        <span style={{
                          padding: '0.15rem 0.5rem',
                          background: 'rgba(255,68,68,0.2)',
                          border: '1px solid rgba(255,68,68,0.5)',
                          borderRadius: '2px',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.65rem',
                          color: '#ff4444',
                          letterSpacing: '0.1em',
                        }}>
                          DNF
                        </span>
                      )}
                      {/* Expand indicator */}
                      <span style={{
                        fontSize: '0.8rem',
                        color: 'var(--white-dim)',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}>▼</span>
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--white-dim)', marginTop: '0.2rem', letterSpacing: '0.1em' }}>
                      {carrera.fecha}
                      {carrera.clase && (
                        <span style={{ color: 'var(--magenta-bright)', marginLeft: '1rem' }}>
                          #{carrera.clase.split('°')[0]} clase
                        </span>
                      )}
                      {carrera.tiempo && (
                        <span style={{ color: 'var(--white-soft)', marginLeft: '1rem' }}>
                          {carrera.tiempo}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{
                    fontFamily: 'Anton, sans-serif', fontSize: '2rem',
                    color: posColor, lineHeight: 1,
                  }}>{carrera.posicion}</div>

                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
                    fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    padding: '0.3rem 0.8rem',
                    border: `1px solid ${posColor}40`,
                    color: posColor, whiteSpace: 'nowrap',
                  }}>{carrera.estado}</div>
                </div>

                {/* Expanded Detail Panel */}
                {isExpanded && (
                  <div style={{
                    background: 'rgba(233,30,99,0.05)',
                    border: '1px solid rgba(233,30,99,0.2)',
                    borderTop: 'none',
                    padding: '2rem 2rem 2rem 3rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                  }}>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Carrera</div>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--white)' }}>{carrera.nombre}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Posición Absoluta</div>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: posColor }}>{carrera.posicion}</div>
                    </div>
                    {carrera.clase && (
                      <div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Posición Clase</div>
                        <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--white)' }}>{carrera.clase}</div>
                      </div>
                    )}
                    {carrera.tiempo && (
                      <div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Tiempo</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'var(--white-soft)' }}>{carrera.tiempo}</div>
                      </div>
                    )}
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Estado</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: estadoColor[carrera.estado] }}>{carrera.estado}</div>
                    </div>
                    {carrera.nota && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Notas</div>
                        <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)', lineHeight: 1.5 }}>{carrera.nota}</div>
                      </div>
                    )}
                    {carrera.estado === 'DNF' && (
                      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)' }}>
                        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', color: '#ff4444' }}>DNF</span>
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)' }}>No completó la carrera</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trophy Truck Section */}
      <div style={{
        position: 'relative',
        padding: 'clamp(2rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)',
        background: 'linear-gradient(180deg, var(--black) 0%, #0a0612 50%, var(--black) 100%)',
        overflow: 'hidden',
      }}>
        {/* Background drone video — desktop only */}
        {!isMobile && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/specTT/dronclip.mp4"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              background: 'linear-gradient(to bottom, var(--black) 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.35) 65%, var(--black) 88%)',
            }} />
          </>
        )}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 4rem' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Specs</div>
          <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.15, color: 'var(--white)', margin: 0 }}>
            TROPHY<br /><span style={{ color: 'var(--magenta)' }}>TRUCK</span>
          </h2>
        </div>

        {/* Photo Gallery — Auto Slider */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 4rem' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: 'clamp(300px, 50vw, 500px)',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(233,30,99,0.2)',
          }}>
            {specTTImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Trophy Truck ${i + 1}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: i === activeSlide ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              />
            ))}
            {/* Vignette overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)',
              pointerEvents: 'none',
            }} />
            {/* Dots indicator */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.5rem',
              zIndex: 2,
            }}>
              {specTTImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Imagen ${i + 1}`}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: i === activeSlide ? 'var(--magenta)' : 'rgba(233,30,99,0.3)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Spec Table */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Chassis & Dimensions */}
            <div style={{ background: 'var(--black-mid)', border: '1px solid var(--magenta)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta)', padding: '1rem 1.5rem', background: 'rgba(233,30,99,0.1)', borderBottom: '1px solid rgba(233,30,99,0.3)', letterSpacing: '0.05em' }}>CHASSIS & DIMENSIONS</div>
              {[
                ['Builder', 'Mason Motorsports'],
                ['Material', '4130 chromoly tube'],
                ['Drivetrain', 'AWD'],
                ['Wheelbase', '125–126"'],
                ['Track', '92–94"'],
                ['Weight', '~7000–7450 lbs'],
                ['Body', 'Carbon fiber'],
                ['Fuel', '110–140 gal'],
              ].map(([label, value], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '0.75rem 1.5rem', background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--magenta)' }}>{label}</span>
                  <span style={{ color: 'var(--white-soft)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Front Suspension */}
            <div style={{ background: 'var(--black-mid)', border: '1px solid var(--magenta)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta)', padding: '1rem 1.5rem', background: 'rgba(233,30,99,0.1)', borderBottom: '1px solid rgba(233,30,99,0.3)', letterSpacing: '0.05em' }}>FRONT SUSPENSION</div>
              {[
                ['Type', 'Independent'],
                ['Travel', '24–25"'],
                ['Shocks', '3.0" coilover + 4.0" bypass'],
                ['Steering', 'Mason box'],
                ['Diff', 'Mason AWD'],
                ['Portals', 'Gen 2 billet'],
              ].map(([label, value], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '0.75rem 1.5rem', background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--magenta)' }}>{label}</span>
                  <span style={{ color: 'var(--white-soft)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Rear Suspension */}
            <div style={{ background: 'var(--black-mid)', border: '1px solid var(--magenta)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta)', padding: '1rem 1.5rem', background: 'rgba(233,30,99,0.1)', borderBottom: '1px solid rgba(233,30,99,0.3)', letterSpacing: '0.05em' }}>REAR SUSPENSION</div>
              {[
                ['Type', '4-link solid axle'],
                ['Travel', '30–32"'],
                ['Shocks', '3.0" coilover + 4.5" bypass'],
                ['Axles', '36-spline 300M'],
                ['Housing', 'Mason twin-drive'],
                ['Arms', 'Billet 7075/fab chromoly'],
              ].map(([label, value], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '0.75rem 1.5rem', background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--magenta)' }}>{label}</span>
                  <span style={{ color: 'var(--white-soft)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Transmission */}
            <div style={{ background: 'var(--black-mid)', border: '1px solid var(--magenta)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta)', padding: '1rem 1.5rem', background: 'rgba(233,30,99,0.1)', borderBottom: '1px solid rgba(233,30,99,0.3)', letterSpacing: '0.05em' }}>TRANSMISSION</div>
              {[
                ['Type', 'Masonmatic Xtrac sequential'],
                ['Speeds', '5'],
                ['Transfer', 'Integrated AWD'],
                ['Driveshafts', '1480 heavy-duty'],
                ['Diffs', 'Mason billet'],
              ].map(([label, value], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '0.75rem 1.5rem', background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--magenta)' }}>{label}</span>
                  <span style={{ color: 'var(--white-soft)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Brakes */}
            <div style={{ background: 'var(--black-mid)', border: '1px solid var(--magenta)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta)', padding: '1rem 1.5rem', background: 'rgba(233,30,99,0.1)', borderBottom: '1px solid rgba(233,30,99,0.3)', letterSpacing: '0.05em' }}>BRAKES</div>
              {[
                ['Calipers', 'Brembo 6-piston'],
                ['Rotors', '15"'],
                ['Wheels', '18" beadlocks'],
                ['Tires', '40" BFGoodrich Toyo M/T'],
              ].map(([label, value], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '0.75rem 1.5rem', background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--magenta)' }}>{label}</span>
                  <span style={{ color: 'var(--white-soft)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Electronics */}
            <div style={{ background: 'var(--black-mid)', border: '1px solid var(--magenta)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.2rem', color: 'var(--magenta)', padding: '1rem 1.5rem', background: 'rgba(233,30,99,0.1)', borderBottom: '1px solid rgba(233,30,99,0.3)', letterSpacing: '0.05em' }}>ELECTRONICS</div>
              {[
                ['Cooling', 'CBR/PWR'],
                ['Wiring', 'James Lin Motorsports'],
                ['ECU', 'MoTeC'],
                ['Data', 'MoTeC'],
                ['Radios', 'PCI'],
                ['Fire', 'Safecraft'],
              ].map(([label, value], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', padding: '0.75rem 1.5rem', background: i % 2 === 0 ? 'var(--black-soft)' : 'var(--black-mid)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--magenta)' }}>{label}</span>
                  <span style={{ color: 'var(--white-soft)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        {/* Mobile: drone video below specs */}
        {isMobile && (
          <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 clamp(1rem, 4vw, 2rem)' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/specTT/dronclip.mp4"
              style={{
                width: '100%',
                borderRadius: '4px',
                border: '1px solid rgba(233,30,99,0.15)',
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* Co-Driver Section */}
      <div style={{
        padding: 'clamp(2rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)',
        background: 'linear-gradient(180deg, var(--black) 0%, #0a0612 50%, var(--black) 100%)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>El Equipo</div>
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.15, color: 'var(--white)', margin: 0 }}>
              <span style={{ color: 'var(--magenta)' }}>CO-DRIVER</span>
            </h2>
          </div>

          {/* Two-column layout — stacks on mobile */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 400px) 1fr',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            alignItems: 'center',
          }}>
            {/* Image */}
            <div style={{
              position: 'relative',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '2px solid var(--magenta)',
              boxShadow: '0 0 40px rgba(233,30,99,0.3)',
            }}>
              <img
                src="/images/copiloto/copiloto.webp"
                alt="Kyle 'El K' - Co-Driver"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              }}>
                <div style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: '1.5rem',
                  color: 'var(--white)',
                  WebkitTextStroke: '1.5px var(--magenta)',
                  letterSpacing: '0.05em',
                }}>KYLE "EL K"</div>
              </div>
            </div>

            {/* Bio content */}
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                color: 'var(--magenta-bright)',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                Copiloto y Navegante Principal del Trophy Truck #1
              </div>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '1.2rem',
                lineHeight: 1.7,
                color: 'var(--white-soft)',
                marginTop: '1.5rem',
              }}>
                "El estratega a bordo del Trophy Truck #1. Mientras Alan Ampudia domina el volante y desafía los límites del desierto, 'El K' domina la ruta. Su precisión implacable al cantar las notas de navegación a velocidades extremas ha sido un pilar fundamental para las victorias consecutivas del equipo en la temporada 2025. Como el copiloto de confianza que acompaña al campeón en sus extenuantes desafíos sin relevos, Kyle demuestra que detrás de cada rey del Off-Road hay un navegante que nunca pierde el rumbo."
              </p>
            </div>
          </div>

          {/* Co-Driver mini gallery */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
            gap: 'clamp(0.5rem, 1.5vw, 1rem)',
            marginTop: 'clamp(1rem, 3vw, 2rem)',
          }}>
            <div style={{
              aspectRatio: '16/10',
              overflow: 'hidden',
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <img
                src="/images/copiloto/celebracion.webp"
                alt="Kyle celebrando victoria con el equipo"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{
              aspectRatio: '16/10',
              overflow: 'hidden',
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <img
                src="/images/copiloto/festejobandera.webp"
                alt="Kyle con la bandera tras carrera"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section — before countdown */}
      <TeamSection />

      {/* Countdown Section — minimal inline, no boxes */}
      <CountdownInline targetDate="June 3, 2026 00:00:00" />
    </div>
  );
}

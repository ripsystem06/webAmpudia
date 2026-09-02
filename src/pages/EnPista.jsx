import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TrackGlowSVG from '../components/TrackGlowSVG';
import VideoSocialsBlock from '../components/VideoSocialsBlock';

const temporadas = [
  {
    year: '2026',
    carreras: [
      { nombre: 'SCORE BAJA 500', fecha: 'Jun 2026', posicion: '2°', clase: 'Trophy Truck', tiempo: '9:11:06.665', estado: 'Completada', millas: '—', mph: '—' },
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2026', posicion: '10°', clase: '4WD Vehicles - Pro', tiempo: '6:48:20.865', estado: 'Completada', millas: '281.85', mph: '43.50' },
    ],
  },
  {
    year: '2025',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2025', posicion: '1°', clase: '1° TT', tiempo: '3:55:13.133', estado: 'Victoria', millas: '250.06', mph: '70.44' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2025', posicion: '1°', clase: '1° TT', tiempo: '8:39:34.422', estado: 'Victoria', millas: '461.03', mph: '54.95' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2025', posicion: '1°', clase: '1° TT', tiempo: '8:12:29', estado: 'Victoria', millas: '400.00', mph: '49.26' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2025', posicion: '6°', clase: '1° TT', tiempo: '17:30:51.297', estado: 'Completada', millas: '854.00', mph: '49.36' },
    ],
  },
  {
    year: '2024',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2024', posicion: '1°', clase: '1° TT', tiempo: '4:02:20.708', estado: 'Victoria', millas: '285.62', mph: '71.05' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2024', posicion: '10°', clase: '2° TT', tiempo: '10:30:47', estado: 'Completada', millas: '473.00', mph: '45.92' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2024', posicion: '2°', clase: '1° TT', tiempo: '7:56:51.317', estado: 'Victoria', millas: '424.00', mph: '56.08' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2024', posicion: '3°', clase: '1° TT', tiempo: '17:12:58.161', estado: 'Victoria', millas: '864.13', mph: '50.47' },
    ],
  },
  {
    year: '2023',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2023', posicion: '2°', clase: '1° TT', tiempo: '5:51:46.755', estado: 'Victoria', millas: '286.00', mph: '51.91' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2023', posicion: 'DNF', clase: '', tiempo: 'DNF', estado: 'DNF', millas: '473.67', mph: '—' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2023', posicion: '4°', clase: '2° TT', tiempo: '8:01:01.388', estado: 'Completada', millas: '417.00', mph: '52.06' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2023', posicion: '10°', clase: '', tiempo: '26:37:14.098', estado: 'Completada', millas: '1,310.94', mph: '49.71' },
    ],
  },
  {
    year: '2022',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2022', posicion: '7°', clase: '', tiempo: '4:42:03.589', estado: 'Completada', millas: '277.00', mph: '62.67' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2022', posicion: '5°', clase: '', tiempo: '9:45:09.024', estado: 'Completada', millas: '463.72', mph: '49.07' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2022', posicion: '4°', clase: '', tiempo: '8:11:06.566', estado: 'Completada', millas: '394.00', mph: '48.58' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2022', posicion: 'DNF', clase: '', tiempo: 'DNF', estado: 'DNF', millas: '828.25', mph: '—' },
    ],
  },
  {
    year: '2021',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2021', posicion: '4°', clase: '', tiempo: '4:36:55.643', estado: 'Completada', millas: '280.00', mph: '64.22' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2021', posicion: 'DNF', clase: '', tiempo: 'DNF', estado: 'DNF', millas: '466.00', mph: '—' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2021', posicion: '4°', clase: '', tiempo: '8:41:54.288', estado: 'Completada', millas: '400.00', mph: '47.56' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2021', posicion: '4°', clase: '', tiempo: '22:45:50.078', estado: 'Completada', millas: '1,226.35', mph: '54.63' },
    ],
  },
  {
    year: '2020',
    carreras: [
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2020', posicion: '4°', clase: '', tiempo: '8:47:05.130', estado: 'Completada', millas: '493.00', mph: '58.21' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2020', posicion: '6°', clase: '', tiempo: '20:53:45.887', estado: 'Completada', millas: '898.40', mph: '43.76' },
    ],
  },
  {
    year: '2019',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2019', posicion: '14°', clase: '', tiempo: '6:47:13.779', estado: 'Completada', millas: '349.91', mph: '54.08' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2019', posicion: '4°', clase: '', tiempo: '10:38:18.319', estado: 'Completada', millas: '496.00', mph: '47.78' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2019', posicion: '5°', clase: '', tiempo: '8:30:47.564', estado: 'Completada', millas: '400.00', mph: '48.19' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2019', posicion: '1°', clase: '', tiempo: '16:10:35.879', estado: 'Victoria', millas: '846.00', mph: '52.55' },
    ],
  },
  {
    year: '2018',
    carreras: [
      { nombre: 'SCORE San Felipe 250', fecha: 'Mar 2018', posicion: '8°', clase: '', tiempo: '5:40:16.008', estado: 'Completada', millas: '319.00', mph: '59.07' },
      { nombre: 'SCORE Baja 500', fecha: 'Jun 2018', posicion: '12°', clase: '', tiempo: '12:12:08.426', estado: 'Completada', millas: '542.12', mph: '44.73' },
      { nombre: 'SCORE Baja 400', fecha: 'Sep 2018', posicion: 'DNF', clase: '', tiempo: 'DNF', estado: 'DNF', millas: '—', mph: '—' },
      { nombre: 'SCORE Baja 1000', fecha: 'Nov 2018', posicion: '9°', clase: '', tiempo: '17:11:59.357', estado: 'Completada', millas: '806.76', mph: '47.15' },
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
  const { t } = useLanguage();
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
        { value: timeLeft.days, label: t('common.dias_short') },
        { value: timeLeft.hours, label: t('common.horas_short') },
        { value: timeLeft.minutes, label: t('common.min_short') },
        { value: timeLeft.seconds, label: t('common.seg_short') },
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
  const { t } = useLanguage();
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
        {t('common.proxima_carrera')}
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
  const { t } = useLanguage();
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
            {t('common.escuderia_oficial')}
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
            {t('enpista.team_desc')}
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
              {t('enpista.team_overlay')}
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
              {t('enpista.cerebro_label')}
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
              {t('enpista.rodrigo_bio')}
            </p>
          </div>

          {/* Right: Stats & Protocol — Kyle Craft stats removed, see Jira ticket */}
          {/* Previous stats: 100% post-race teardown, 0 mechanical failures 2025, 03:30 AM San Felipe 250 emergency repair */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s ease 0.4s',
          }} />
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

        {/* Pit Crew Heroes */}
        <div style={{
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          background: 'rgba(233,30,99,0.05)',
          border: '1px solid rgba(233,30,99,0.2)',
          borderRadius: '4px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s ease 0.6s',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--magenta-bright)',
            textTransform: 'uppercase',
            marginBottom: '0.8rem',
          }}>
            {t('enpista.heroes_label')}
          </div>
          <h3 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--white)',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: '1rem',
          }}>
            {t('enpista.heroes_heading')}
          </h3>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '1.05rem',
            color: 'var(--white-soft)',
            lineHeight: 1.7,
            marginBottom: '1rem',
          }}>
            {t('enpista.heroes_desc')}
          </p>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '1rem',
            color: 'var(--magenta-bright)',
            lineHeight: 1.6,
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            {t('enpista.heroes_mission')}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.6rem',
          }}>
            {[
              'Jesús Fabián Lara',
              'Miguel Castelán',
              'David Echeverría',
              'Jesús Ferniza',
              'Ulises Meneces',
              'Geovanny Mozo',
              'Edzon Bojorjes',
            ].map(name => (
              <div key={name} style={{
                background: 'var(--black-mid)',
                border: '1px solid rgba(233,30,99,0.15)',
                borderLeft: '3px solid var(--magenta)',
                padding: '0.8rem 1rem',
                borderRadius: '3px',
                fontFamily: 'Anton, sans-serif',
                fontSize: '0.9rem',
                color: 'var(--white)',
                letterSpacing: '0.03em',
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function HeroSection() {
  const { t } = useLanguage();
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
            {t('common.proxima_carrera')}
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
          7th<br />
          <span style={{ color: 'var(--magenta)' }}>SCORE BAJA 400</span>
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
            400+ miles of Baja terrain
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            color: 'var(--white-dim)',
            letterSpacing: '0.15em',
          }}>
            Ensenada, Baja California — Sept 9–13, 2026
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
            {t('common.tiempo_salida')}
          </div>
          <CountdownTimer targetDate="September 9, 2026 00:00:00" />
        </div>
        </div>{/* end left column */}

        {/* SCORE Logo + reveal message */}
        <div style={{
          flex: isMobile ? 'none' : '0 0 50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '1rem 0' : '2rem',
          width: isMobile ? '100%' : undefined,
          maxWidth: isMobile ? '400px' : undefined,
          margin: isMobile ? '0 auto' : undefined,
          marginTop: isMobile ? '1.8rem' : 0,
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.3s',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
            letterSpacing: '0.3em',
            color: 'var(--magenta-bright)',
            textTransform: 'uppercase',
            textAlign: 'center',
            animation: 'blink 2s infinite',
          }}>
            {t('enpista.revelacion_pista')}
          </div>
          <img
            src="/scorelogo.svg"
            alt="SCORE International"
            style={{
              width: '100%',
              maxWidth: '308px',
              height: 'auto',
              filter: 'drop-shadow(0 0 30px rgba(233,30,99,0.3))',
            }}
          />
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
  const { t } = useLanguage();
  const [activeYear, setActiveYear] = useState('2026');
  const [expandedRace, setExpandedRace] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeSlide, setActiveSlide] = useState(0);
  const specTTImages = [
    '/specTT/SanFelipe250-DSchenkelberg-153.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-174.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-191.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-201.jpg',
    '/specTT/SanFelipe250-DSchenkelberg-205.jpg',
    '/images/onoftrack/thropy1.jpeg',
  ];

  const estadoT = (estado) => {
    if (estado === 'Victoria') return t('enpista.estado_victoria');
    if (estado === 'Completada') return t('enpista.estado_completada');
    if (estado === 'DNF') return t('enpista.estado_dnf');
    return estado;
  };

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
        }}>{t('enpista.title')}</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.35em', color: 'var(--magenta-bright)',
            textTransform: 'uppercase', marginBottom: '0.5rem',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s',
          }}>{t('enpista.historial_label')}</div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1.15, color: 'var(--white)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.1s',
          }}>
            {t('enpista.title').split('\n').map((line, li) => (
              <span key={li} style={{ display: 'block', color: li === 1 ? 'var(--magenta)' : undefined }}>{line}</span>
            ))}
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem',
            color: 'var(--white-soft)', lineHeight: 1.6, marginTop: '1.5rem',
            maxWidth: '500px',
            opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.3s',
          }}>
            {t('enpista.sub')}
          </p>
        </div>

        <div style={{
          display: 'flex', gap: 'clamp(1rem, 3vw, 3rem)', marginTop: '3rem',
          flexWrap: 'wrap',
          opacity: headerVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s',
        }}>
          {[
            { num: '2', label: t('enpista.campeonatos_mundiales') },
            { num: '1', label: t('enpista.triple_corona') },
            { num: '8', label: t('enpista.podiums') },
            { num: '290:54', label: t('enpista.total_horas') },
            { num: '16,267', label: t('enpista.total_millas') },
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
        {activeYear === temporadas[0].year && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'rgba(233,30,99,0.12)',
            border: '1px solid rgba(233,30,99,0.3)', marginBottom: '2rem',
          }}>
            <div style={{ width: '6px', height: '6px', background: 'var(--magenta)', borderRadius: '50%', animation: 'blink 2s infinite' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--magenta-bright)', textTransform: 'uppercase' }}>
              {t('enpista.temporada_curso')}
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
                          {t('enpista.estado_dnf')}
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
                          #{carrera.clase.split('°')[0]} {t('enpista.clase_label')}
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
                  }}>{estadoT(carrera.estado)}</div>
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
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.carrera')}</div>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: 'var(--white)' }}>{carrera.nombre}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.posicion')}</div>
                      <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', color: posColor }}>{carrera.posicion}</div>
                    </div>
                    {carrera.tiempo && (
                      <div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.tiempo')}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'var(--white-soft)' }}>{carrera.tiempo}</div>
                      </div>
                    )}
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.estado')}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: estadoColor[carrera.estado] }}>{estadoT(carrera.estado)}</div>
                    </div>
                    {carrera.millas && (
                      <div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.millas')}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'var(--white-soft)' }}>{carrera.millas}</div>
                      </div>
                    )}
                    {carrera.mph && (
                      <div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.mph')}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'var(--white-soft)' }}>{carrera.mph}</div>
                      </div>
                    )}
                    {carrera.estado === 'DNF' && (
                      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.3)' }}>
                        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', color: '#ff4444' }}>{t('enpista.estado_dnf')}</span>
                        <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1rem', color: 'var(--white-soft)' }}>{t('enpista.no_completo')}</span>
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
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.specs')}</div>
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

        {/* Spec infographic */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Rines', value: 'KMC 17"' },
              { label: 'Llantas', value: '40" Toyo Tires' },
              { label: 'Gasolina', value: '100 galones' },
              { label: 'Material', value: 'Fibra de Carbono' },
              { label: 'Transmisión', value: '5 speed' },
              { label: 'Motor', value: '1200 HP' },
              { label: 'Suspensión', value: '30"' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--black-mid)',
                border: '1px solid rgba(233,30,99,0.2)',
                borderLeft: '3px solid var(--magenta)',
                padding: '1rem 1.2rem',
                borderRadius: '4px',
                flex: '0 1 240px',
                minWidth: '180px',
                transition: 'border-color 0.3s, background 0.3s',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--white-dim)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{s.label}</div>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.4rem', color: 'var(--white)', lineHeight: 1.1 }}>{s.value}</div>
              </div>
            ))}
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
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--magenta-bright)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('enpista.codriver_label')}</div>
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.15, color: 'var(--white)', margin: 0 }}>
              <span style={{ color: 'var(--magenta)' }}>{t('enpista.codriver_heading')}</span>
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
                }}>KYLE CRAFT</div>
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
                {t('enpista.codriver_role')}
              </div>
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '1.2rem',
                lineHeight: 1.7,
                color: 'var(--white-soft)',
                marginTop: '1.5rem',
              }}>
                {t('enpista.codriver_bio')}
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

      {/* VideoSocialsBlock */}
      <VideoSocialsBlock
        videoId="Ak92K-G7E9E"
        instagramLinks={[
          { post: 'https://www.instagram.com/p/C5y6U9OS2QK/', img: '/fueradepista/corriendo.webp', label: 'Competencia' },
          { post: 'https://www.instagram.com/p/DY2owLGPc5m/', img: '/fueradepista/BAJA500-06072025-DSchenkelberg-1725.webp', label: 'Behind the Scenes' },
          { post: 'https://www.instagram.com/p/DYz7-b4PIrG/', img: '/fueradepista/fiesta.webp', label: 'StreetParty' },
          { post: 'https://www.instagram.com/p/DYf_qRfJV94/', img: '/fueradepista/BAJA400-2025-148.webp', label: 'Highlights' },
          null, null, null, null, null,
        ]}
      />

      {/* Countdown Section — minimal inline, no boxes */}
      <CountdownInline targetDate="September 9, 2026 00:00:00" />
    </div>
  );
}

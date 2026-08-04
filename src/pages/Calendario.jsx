import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const carreras2026 = [
  {
    num: '01',
    nombre: 'SCORE San Felipe 250',
    lugar: 'San Felipe, B.C.',
    fecha: '25 – 29 Marzo 2026',
    targetDate: 'March 25, 2026 00:00:00',
    descKey: 'calendario.sanfelipe250_desc',
  },
  {
    num: '02',
    nombre: 'SCORE Baja 500',
    lugar: 'Ensenada, B.C.',
    fecha: '3 – 7 Junio 2026',
    targetDate: 'June 3, 2026 00:00:00',
    descKey: 'calendario.baja500_desc',
  },
  {
    num: '03',
    nombre: 'SCORE Baja 400',
    lugar: 'Ensenada, B.C.',
    fecha: '9 – 13 Septiembre 2026',
    targetDate: 'September 9, 2026 00:00:00',
    descKey: 'calendario.baja400_desc',
  },
  {
    num: '04',
    nombre: 'SCORE Baja 1000',
    lugar: 'Ensenada → La Paz, B.C.',
    fecha: '9 – 15 Noviembre 2026',
    targetDate: 'November 9, 2026 00:00:00',
    descKey: 'calendario.baja1000_desc',
  },
];

function RaceCountdown({ targetDate }) {
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
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calc();
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem' }}>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.days)}</span>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: 'var(--magenta)', lineHeight: 1 }}>D</span>
      </span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem' }}>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.hours)}</span>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: 'var(--magenta)', lineHeight: 1 }}>H</span>
      </span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem' }}>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.minutes)}</span>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: 'var(--magenta)', lineHeight: 1 }}>M</span>
      </span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem' }}>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.3rem', color: 'var(--white)', lineHeight: 1 }}>{pad(timeLeft.seconds)}</span>
        <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '0.7rem', color: 'var(--magenta)', lineHeight: 1 }}>S</span>
      </span>
    </div>
  );
}

export default function Calendario() {
  const { t } = useLanguage();
  const now = new Date();
  const firstUpcomingIdx = carreras2026.findIndex(c => new Date(c.targetDate) > now);
  return (
    <div style={{ paddingTop: '67px', minHeight: '100vh', background: 'var(--black)' }}>
      {/* Header */}
      <div style={{
        padding: '5rem 4rem 4rem',
        background: 'linear-gradient(135deg, #1a0a14 0%, var(--black) 60%)',
        borderBottom: '1px solid rgba(233,30,99,0.2)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', right: '1rem',
          transform: 'translateY(-50%)',
          fontFamily: 'Anton, sans-serif', fontSize: 'clamp(8rem, 20vw, 14rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(233,30,99,0.06)',
          lineHeight: 1, userSelect: 'none',
        }}>2026</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.35em',
            color: 'var(--magenta-bright)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            {t('calendario.temporada')}
          </div>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            lineHeight: 1.15,
            color: 'var(--white)',
            margin: 0,
          }}>
            {t('calendario.title').split('\n').map((line, li) => (
              <span key={li} style={{ color: li === 1 ? 'var(--magenta)' : undefined }}>{line}</span>
            ))}
          </h1>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '1rem',
            color: 'var(--white-soft)',
            lineHeight: 1.6,
            marginTop: '1.5rem',
            maxWidth: '500px',
          }}>
            {t('calendario.sub')}
          </p>
        </div>
      </div>

      {/* Race Cards */}
      <div style={{
        padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 4vw, 4rem)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
          {carreras2026.map((carrera, i) => {
            const isPast = new Date(carrera.targetDate) < now;
            const isNext = i === firstUpcomingIdx;
            return (
            <div key={i} style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              background: isNext
                ? 'rgba(233,30,99,0.08)'
                : isPast
                  ? 'rgba(233,30,99,0.02)'
                  : 'rgba(233,30,99,0.04)',
              border: isNext
                ? '1px solid rgba(233,30,99,0.4)'
                : isPast
                  ? '1px solid rgba(233,30,99,0.06)'
                  : '1px solid rgba(233,30,99,0.12)',
              position: 'relative',
              overflow: 'hidden',
              opacity: isPast ? 0.65 : 1,
            }}>
              {/* Left accent bar for next race */}
              {isNext && (
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: '3px',
                  background: 'var(--magenta-bright)',
                  boxShadow: '0 0 12px var(--magenta)',
                }} />
              )}

              {/* Top row: number + name + status */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                  <span style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                    color: 'rgba(233,30,99,0.25)',
                    lineHeight: 1,
                  }}>
                    {carrera.num}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                      color: 'var(--white)',
                      letterSpacing: '0.03em',
                      lineHeight: 1.1,
                      margin: 0,
                    }}>
                      {carrera.nombre}
                    </h3>
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      color: 'var(--white-dim)',
                      letterSpacing: '0.1em',
                      marginTop: '0.3rem',
                    }}>
                      {carrera.lugar}
                    </div>
                  </div>
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '0.4rem 0.9rem',
                  border: isPast ? '1px solid rgba(233,30,99,0.3)' : '1px solid var(--magenta-bright)',
                  color: isPast ? 'rgba(233,30,99,0.5)' : 'var(--magenta-bright)',
                }}>
                  {!isPast && (
                    <span style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: 'var(--magenta-bright)',
                      animation: 'blink 2s infinite',
                    }} />
                  )}
                  {isPast ? t('calendario.completada') : isNext ? t('calendario.proxima') : t('calendario.preparacion')}
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '0.9rem',
                color: 'var(--white-soft)',
                lineHeight: 1.5,
                marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
              }}>
                {t(carrera.descKey)}
              </p>

              {/* Bottom row: date + countdown */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
              }}>
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  color: isPast ? 'var(--white-dim)' : 'var(--magenta-bright)',
                  letterSpacing: '0.08em',
                }}>
                  {carrera.fecha}
                </div>
                {!isPast && <RaceCountdown targetDate={carrera.targetDate} />}
              </div>
            </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div style={{
          marginTop: 'clamp(2rem, 4vw, 4rem)',
          padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          background: 'rgba(233,30,99,0.04)',
          border: '1px solid rgba(233,30,99,0.1)',
        }}>
          <div style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: '1rem',
            color: 'var(--magenta-bright)',
            marginBottom: '0.6rem',
            letterSpacing: '0.04em',
          }}>
            {t('calendario.championship')}
          </div>
          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '0.9rem',
            color: 'var(--white-soft)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            {t('calendario.footer')}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function LogoIntro() {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'done'

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('logo-intro-played');
    if (hasPlayed) {
      setPhase('done');
      return;
    }
    const timer = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('logo-intro-played', 'true');
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  if (phase === 'done') return null;

  return (
    <>
      <style>{`
        @keyframes introFadeOut {
          0%, 83% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes hlLeft {
          0%   { left: 45%;  width: 8px;   height: 8px;   opacity: 0; filter: blur(2px); }
          6%   { opacity: 0.7; filter: blur(3px); }
          15%  { opacity: 1;   filter: blur(4px); }
          35%  { left: 30%;  width: 80px;  height: 80px;  filter: blur(12px); }
          55%  { left: 18%;  width: 220px; height: 220px; filter: blur(28px); }
          72%  { left: 8%;   width: 400px; height: 400px; filter: blur(45px); opacity: 0.85; }
          82%  { left: 3%;   width: 550px; height: 550px; filter: blur(55px); opacity: 0.7; }
          92%  { left: 0%;   width: 700px; height: 700px; filter: blur(70px); opacity: 0.3; }
          100% { left: -5%;  width: 900px; height: 900px; filter: blur(90px); opacity: 0; }
        }
        @keyframes hlRight {
          0%   { left: 55%;  width: 8px;   height: 8px;   opacity: 0; filter: blur(2px); }
          6%   { opacity: 0.7; filter: blur(3px); }
          15%  { opacity: 1;   filter: blur(4px); }
          35%  { left: 70%;  width: 80px;  height: 80px;  filter: blur(12px); }
          55%  { left: 82%;  width: 220px; height: 220px; filter: blur(28px); }
          72%  { left: 92%;  width: 400px; height: 400px; filter: blur(45px); opacity: 0.85; }
          82%  { left: 97%;  width: 550px; height: 550px; filter: blur(55px); opacity: 0.7; }
          92%  { left: 100%; width: 700px; height: 700px; filter: blur(70px); opacity: 0.3; }
          100% { left: 105%; width: 900px; height: 900px; filter: blur(90px); opacity: 0; }
        }
        @keyframes logoReveal {
          0%, 35%  { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
          50%  { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
          65%  { opacity: 1; transform: translate(-50%, -50%) scale(1.02); }
          78%  { opacity: 1; transform: translate(-50%, -50%) scale(1.0); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.0); }
        }
        @keyframes flashBurst {
          0%, 78%   { opacity: 0; }
          81%  { opacity: 0.95; }
          87%   { opacity: 0; }
          100%  { opacity: 0; }
        }
        @keyframes lightCone {
          0%, 20%  { opacity: 0; }
          40% { opacity: 0.06; }
          65% { opacity: 0.12; }
          82% { opacity: 0.18; }
          92% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#000000',
        animation: 'introFadeOut 4.2s ease-out forwards',
      }}>
        {/* Ambient light cones */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '45%',
          background: 'linear-gradient(to right, rgba(255,255,255,0.12) 0%, transparent 100%)',
          opacity: 0,
          animation: 'lightCone 4.2s ease-out forwards',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '45%',
          background: 'linear-gradient(to left, rgba(255,255,255,0.12) 0%, transparent 100%)',
          opacity: 0,
          animation: 'lightCone 4.2s ease-out forwards',
        }} />

        {/* Left headlight - starts small center, grows and spreads left with blur */}
        <div style={{
          position: 'absolute', top: '50%',
          left: '45%', width: '8px', height: '8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,0.2) 55%, transparent 75%)',
          boxShadow: '0 0 30px 8px rgba(255,255,255,0.5), 0 0 60px 16px rgba(255,255,255,0.3), 0 0 120px 40px rgba(255,255,255,0.1)',
          transform: 'translate(-50%, -50%)',
          animation: 'hlLeft 4.2s ease-in-out forwards',
        }} />

        {/* Right headlight - starts small center, grows and spreads right with blur */}
        <div style={{
          position: 'absolute', top: '50%',
          left: '55%', width: '8px', height: '8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,0.2) 55%, transparent 75%)',
          boxShadow: '0 0 30px 8px rgba(255,255,255,0.5), 0 0 60px 16px rgba(255,255,255,0.3), 0 0 120px 40px rgba(255,255,255,0.1)',
          transform: 'translate(-50%, -50%)',
          animation: 'hlRight 4.2s ease-in-out forwards',
        }} />

        {/* Flash */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, #ffffff 0%, rgba(233,30,99,0.45) 45%, transparent 100%)',
          opacity: 0,
          animation: 'flashBurst 4.2s ease-out forwards',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) scale(0.85)',
          opacity: 0,
          animation: 'logoReveal 4.2s ease-out forwards',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
        }}>
          <img
            src="/logo2calavera.svg"
            alt="Alan Ampudia"
            style={{
              width: '170px', height: 'auto',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.4rem', letterSpacing: '0.08em', color: '#ffffff' }}>AMPUDIA</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', letterSpacing: '0.32em', color: 'rgba(233,30,99,1)', marginTop: '6px' }}>OFFROAD #1</span>
          </div>
        </div>
      </div>
    </>
  );
}
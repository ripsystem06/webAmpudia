import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// 8-bit first-person Baja desert racer (prototype)
// Self-contained HTML5 canvas game. No assets, no network. Everything is drawn
// with filled rectangles onto a low-res offscreen canvas (320×180) and upscaled
// with `image-rendering: pixelated`.
// ─────────────────────────────────────────────────────────────────────────────

// Low-res internal resolution
const VIEW_W = 320;
const VIEW_H = 180;

// Camera / world constants (arbitrary world units; treat 1 unit ≈ 1 meter)
const HORIZON_Y = 76;     // screen y of the horizon line
const CAM_HEIGHT = 55;    // camera height above the ground
const FOCAL = 95;         // projection focal length (px)
const ROAD_HALF = 70;     // half road width (world units)
const Z_NEAR = 46;        // nearest rendered distance
const Z_FAR = 2400;       // farthest rendered distance
const SEGS = 132;         // number of road strips

// Physics (m/s; 1 unit ≈ 1 m)
const MAX_SPEED = 62;     // ≈ 223 km/h
const ACCEL = 26;
const BRAKE = 60;
const DRAG = 9;           // natural rolling resistance
const OFFTRACK_MAX = 26;  // top speed while sliding in the sand
const STEER = 34;         // lateral speed at full velocity (units/s)

// Strip lengths for the scrolling rumble stripes / center dashes
const RUMBLE_LEN = 40;
const DASH_LEN = 55;

const MAX_HAZARDS = 7;

// 8-bit palette (Baja desert + site magenta accent)
const SKY_TOP = '#5db8d6';
const SKY_HORIZON = '#a8dbe8';
const HILL = '#c98d4b';
const SAND = '#e0b96a';
const SAND_NEAR = '#e8c67f';
const ROAD = '#9a6a3c';
const RUMBLE_MAGENTA = '#e91e63';
const RUMBLE_WHITE = '#f4e6c8';
const ROCK = '#8f8f8f';
const ROCK_DARK = '#5f5f5f';
const ROCK_LIGHT = '#b5b5b5';
const CACTUS = '#3f9b3f';
const CACTUS_DARK = '#2c6e2c';
const TRUCK = '#141414';
const TRUCK_MID = '#202020';
const MAGENTA = '#e91e63';

const KEYMAP = {
  ArrowUp: 'up',
  KeyW: 'up',
  ArrowDown: 'down',
  KeyS: 'down',
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
};

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

export default function Simulador() {
  const { t } = useLanguage();
  const canvasRef = useRef(null);
  const speedRef = useRef(null);
  const distRef = useRef(null);
  const [status, setStatus] = useState('on');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Low-res offscreen render target
    const off = document.createElement('canvas');
    off.width = VIEW_W;
    off.height = VIEW_H;
    const g = off.getContext('2d');
    g.imageSmoothingEnabled = false;

    // ── Game state ──
    let position = 0;      // forward distance (world units)
    let carX = 0;          // lateral position (world units)
    let speed = 0;
    let shake = 0;         // seconds of screen shake left
    let flash = 0;         // seconds of red crash flash left
    let invuln = 0;        // post-crash invulnerability (recovery)
    let crashMsg = 0;      // seconds to keep the "CRASH" HUD state
    let offTrack = false;
    let time = 0;
    let hudStatus = 'on';
    const hazards = [];
    const keys = { up: false, down: false, left: false, right: false };

    // The road centre drifts left/right with distance. Zero at the start so the
    // truck begins centred; the player must steer to follow the gentle S-curves.
    const roadCenter = (z) =>
      150 * Math.sin(z * 0.0009) + 190 * Math.sin(z * 0.00023);

    // Exponentially-spaced road strip distances (far → near)
    const zAt = (i) =>
      Z_NEAR * Math.pow(Z_FAR / Z_NEAR, (SEGS - 1 - i) / (SEGS - 1));

    const spawnHazard = () => {
      const z = position + 620 + Math.random() * 580;
      const x = roadCenter(z) + (Math.random() * 2 - 1) * ROAD_HALF * 0.85;
      hazards.push({ z, x, type: Math.random() < 0.55 ? 'rock' : 'cactus' });
    };

    // ── Update ──
    function update(dt) {
      const steer = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      const throttle = keys.up;
      const brake = keys.down;

      // Steer, scaled by speed so you can't turn from a standstill
      const ratio = speed / MAX_SPEED;
      carX += steer * STEER * (0.3 + 0.7 * ratio) * dt;

      // Off-track: beyond the dirt road edges → driving on sand
      offTrack = Math.abs(carX - roadCenter(position)) > ROAD_HALF * 0.9;

      if (throttle) speed += ACCEL * dt;
      else if (brake) speed -= BRAKE * dt;
      else speed -= DRAG * dt;

      if (offTrack) {
        if (speed > OFFTRACK_MAX) speed -= 90 * dt; // heavy slowdown in sand
        shake = Math.max(shake, 0.08);
      }
      speed = clamp(speed, 0, MAX_SPEED);
      position += speed * dt;

      // Timers
      shake = Math.max(0, shake - dt);
      flash = Math.max(0, flash - dt);
      invuln = Math.max(0, invuln - dt);
      crashMsg = Math.max(0, crashMsg - dt);
      time += dt;

      // Hazards: spawn ahead, collide, cull once passed
      if (hazards.length < MAX_HAZARDS) spawnHazard();
      for (let i = hazards.length - 1; i >= 0; i--) {
        const hz = hazards[i];
        const dz = hz.z - position;
        if (dz < -40) {
          hazards.splice(i, 1);
          continue;
        }
        if (invuln <= 0 && dz < 26 && Math.abs(hz.x - carX) < 20) {
          // Crash: shake + big speed drop + brief red flash, then recover
          speed *= 0.22;
          shake = 0.55;
          flash = 0.42;
          invuln = 1.1;
          crashMsg = 1.1;
          hazards.splice(i, 1);
        }
      }

      // HUD numbers (updated via refs to avoid re-rendering at 60fps)
      if (speedRef.current) speedRef.current.textContent = String(Math.round(speed * 3.6));
      if (distRef.current) distRef.current.textContent = (position / 1000).toFixed(2);

      const s = crashMsg > 0 ? 'crash' : offTrack ? 'off' : 'on';
      if (s !== hudStatus) {
        hudStatus = s;
        setStatus(s);
      }
    }

    // ── Drawing helpers (filled rects only) ──
    function drawHills(g2) {
      g2.fillStyle = HILL;
      const ridge = [8, 14, 10, 18, 12, 20, 9, 16, 11, 22, 8, 15, 19, 10, 24, 9, 13, 18, 8, 21, 11, 16, 9];
      let x = 0;
      let i = 0;
      while (x < VIEW_W) {
        const h = ridge[i % ridge.length];
        g2.fillRect(x, HORIZON_Y - h, 16, h);
        x += 16;
        i += 1;
      }
    }

    function drawRoad(g2) {
      let prevY = HORIZON_Y;
      for (let i = 0; i < SEGS; i++) {
        if (prevY >= VIEW_H) break;
        const relZ = zAt(i);
        const scale = FOCAL / relZ;
        const y = HORIZON_Y + CAM_HEIGHT * scale;
        if (y <= prevY) continue;

        const z = position + relZ;
        const cx = VIEW_W / 2 + (roadCenter(z) - carX) * scale;
        const half = ROAD_HALF * scale;
        const left = cx - half;
        const right = cx + half;
        const h = y - prevY;

        // Dirt road strip
        g2.fillStyle = ROAD;
        g2.fillRect(left, prevY, right - left, h);

        // Alternating rumble stripes along both edges (magenta / white)
        const alt = Math.floor(z / RUMBLE_LEN) % 2;
        const edgeW = Math.max(1, half * 0.1);
        g2.fillStyle = alt ? RUMBLE_MAGENTA : RUMBLE_WHITE;
        g2.fillRect(left, prevY, edgeW, h);
        g2.fillRect(right - edgeW, prevY, edgeW, h);

        // Dashed centre line (magenta — brand accent)
        if (Math.floor(z / DASH_LEN) % 2 === 0) {
          const dashW = Math.max(1, half * 0.06);
          g2.fillStyle = MAGENTA;
          g2.fillRect(cx - dashW / 2, prevY, dashW, h);
        }

        prevY = y;
      }
    }

    function drawRock(g2, sx, sy, s) {
      const w = Math.max(2, 15 * s);
      g2.fillStyle = ROCK_DARK;
      g2.fillRect(Math.round(sx - w * 0.6), Math.round(sy - w * 0.4), Math.round(w * 1.2), Math.round(w * 0.4));
      g2.fillStyle = ROCK;
      g2.fillRect(Math.round(sx - w * 0.45), Math.round(sy - w * 0.85), Math.round(w * 0.95), Math.round(w * 0.55));
      g2.fillStyle = ROCK_LIGHT;
      g2.fillRect(Math.round(sx - w * 0.3), Math.round(sy - w * 0.85), Math.round(w * 0.4), Math.round(w * 0.2));
    }

    function drawCactus(g2, sx, sy, s) {
      const h = Math.max(3, 20 * s);   // total height
      const w = Math.max(2, 5 * s);    // trunk width
      const x = Math.round(sx);
      const baseY = Math.round(sy);
      const armW = Math.max(1, 3 * s);
      const armL = Math.max(1, Math.round(5 * s));

      g2.fillStyle = CACTUS;
      // trunk
      g2.fillRect(x - Math.round(w / 2), baseY - h, w, h);
      // left arm
      g2.fillRect(x - Math.round(w / 2) - armL, baseY - Math.round(h * 0.75), armL, armW);
      g2.fillRect(x - Math.round(w / 2) - armL, baseY - Math.round(h * 0.9), armW, Math.round(h * 0.4));
      // right arm
      g2.fillRect(x + Math.round(w / 2), baseY - Math.round(h * 0.8), armL, armW);
      g2.fillRect(x + Math.round(w / 2) + armL - armW, baseY - Math.round(h * 0.95), armW, Math.round(h * 0.4));
      // shading
      g2.fillStyle = CACTUS_DARK;
      g2.fillRect(x + Math.round(w / 2) - Math.max(1, Math.round(w * 0.3)), baseY - h, Math.max(1, Math.round(w * 0.3)), h);
    }

    function drawSprites(g2) {
      const list = hazards.slice().sort((a, b) => b.z - a.z); // far → near
      for (const hz of list) {
        const dz = hz.z - position;
        if (dz <= 0) continue;
        const scale = FOCAL / dz;
        const sx = VIEW_W / 2 + (hz.x - carX) * scale;
        const sy = HORIZON_Y + CAM_HEIGHT * scale;
        if (hz.type === 'rock') drawRock(g2, sx, sy, scale);
        else drawCactus(g2, sx, sy, scale);
      }
    }

    function drawTruck(g2) {
      // A-pillars (windshield frame)
      g2.fillStyle = TRUCK;
      g2.fillRect(0, VIEW_H - 52, 22, 52);
      g2.fillRect(VIEW_W - 22, VIEW_H - 52, 22, 52);
      // Hood bump
      g2.fillStyle = TRUCK_MID;
      g2.fillRect(96, VIEW_H - 40, 128, 40);
      g2.fillStyle = TRUCK;
      g2.fillRect(96, VIEW_H - 40, 128, 6);
      // Dashboard
      g2.fillStyle = TRUCK;
      g2.fillRect(0, VIEW_H - 34, VIEW_W, 34);
      // Magenta dashboard accent
      g2.fillStyle = MAGENTA;
      g2.fillRect(0, VIEW_H - 38, VIEW_W, 3);
      // Steering wheel hint
      g2.fillStyle = '#3a3a3a';
      g2.fillRect(150, VIEW_H - 26, 20, 6);
    }

    // ── Render ──
    function render() {
      g.globalAlpha = 1;

      // Sky
      g.fillStyle = SKY_TOP;
      g.fillRect(0, 0, VIEW_W, HORIZON_Y - 6);
      g.fillStyle = SKY_HORIZON;
      g.fillRect(0, HORIZON_Y - 6, VIEW_W, 6);

      // Sun
      g.fillStyle = '#ffe9a8';
      g.fillRect(252, 26, 14, 14);
      g.fillStyle = '#f7cf6b';
      g.fillRect(256, 30, 6, 6);

      // Distant hills at the horizon
      drawHills(g);

      // Desert sand
      g.fillStyle = SAND;
      g.fillRect(0, HORIZON_Y, VIEW_W, VIEW_H - HORIZON_Y);
      g.fillStyle = SAND_NEAR;
      g.fillRect(0, HORIZON_Y, VIEW_W, Math.floor((VIEW_H - HORIZON_Y) * 0.35));

      // Screen shake (translate the world, not the HUD)
      g.save();
      let shX = 0;
      let shY = 0;
      if (shake > 0) {
        const a = 4 * (shake / 0.55);
        shX = Math.round((Math.random() * 2 - 1) * a);
        shY = Math.round((Math.random() * 2 - 1) * a);
      }
      g.translate(shX, shY);

      drawRoad(g);
      drawSprites(g);
      drawTruck(g);

      g.restore();

      // Off-track warning tint
      if (offTrack && crashMsg <= 0) {
        g.globalAlpha = 0.16 + 0.08 * Math.sin(time * 18);
        g.fillStyle = MAGENTA;
        g.fillRect(0, 0, VIEW_W, VIEW_H);
        g.globalAlpha = 1;
      }

      // Crash red flash
      if (flash > 0) {
        g.globalAlpha = clamp(flash / 0.42, 0, 1) * 0.5;
        g.fillStyle = '#ff2233';
        g.fillRect(0, 0, VIEW_W, VIEW_H);
        g.globalAlpha = 1;
      }

      // Upscale the low-res frame to the visible canvas (pixelated)
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(off, 0, 0, VIEW_W, VIEW_H, 0, 0, canvas.width, canvas.height);
    }

    // ── Canvas sizing (responsive, letterboxed 16:9, fixed internal res) ──
    const fitCanvas = () => {
      const cw = canvas.clientWidth;
      if (!cw) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(cw * dpr * VIEW_H / VIEW_W);
    };

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(fitCanvas);
      ro.observe(canvas);
    } else {
      window.addEventListener('resize', fitCanvas);
    }
    fitCanvas();

    // ── Keyboard ──
    const onKeyDown = (e) => {
      if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
      const action = KEYMAP[e.code];
      if (action) keys[action] = true;
    };
    const onKeyUp = (e) => {
      const action = KEYMAP[e.code];
      if (action) keys[action] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // ── Game loop ──
    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', fitCanvas);
    };
  }, []);

  // HUD status label / color
  const statusKey =
    status === 'crash' ? 'simulador.hud_crash'
    : status === 'off' ? 'simulador.hud_off_track'
    : 'simulador.hud_on_track';
  const statusColor =
    status === 'on' ? '#A4D233' : status === 'off' ? '#ffb020' : '#ff2233';

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}>
      {/* Header */}
      <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 4vw, 4rem) 1.5rem' }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
          letterSpacing: '0.3em', color: 'var(--magenta-bright)',
          textTransform: 'uppercase', marginBottom: '0.5rem',
        }}>
          Prototipo 8-bit · Baja Desert
        </div>
        <h1 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          lineHeight: 1.05, color: 'var(--white)', margin: 0,
        }}>
          {t('simulador.title')}
        </h1>
        <p style={{
          fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.05rem',
          color: 'var(--white-soft)', lineHeight: 1.5, marginTop: '0.75rem',
          maxWidth: '620px',
        }}>
          {t('simulador.sub')}
        </p>
      </div>

      {/* Game */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 clamp(1rem, 4vw, 4rem) 4rem' }}>
        <div style={{
          position: 'relative', width: '100%',
          background: 'var(--black-mid)',
          border: '1px solid rgba(233,30,99,0.3)',
          boxShadow: '0 0 40px rgba(233,30,99,0.12)',
        }}>
          <canvas
            ref={canvasRef}
            tabIndex={0}
            aria-label={t('simulador.title')}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              aspectRatio: '16 / 9',
              imageRendering: 'pixelated',
              outline: 'none',
              cursor: 'crosshair',
            }}
          />

          {/* HUD overlay */}
          <div style={{
            position: 'absolute', top: '0.6rem', left: '0.75rem', right: '0.75rem',
            display: 'flex', justifyContent: 'space-between', gap: '1rem',
            pointerEvents: 'none',
          }}>
            <div style={hudBox}>
              <span style={hudLabel}>{t('simulador.hud_speed')}</span>
              <span ref={speedRef} style={hudValue}>0</span>
              <span style={hudUnit}>km/h</span>
            </div>
            <div style={hudBox}>
              <span style={hudLabel}>{t('simulador.hud_distance')}</span>
              <span ref={distRef} style={hudValue}>0.00</span>
              <span style={hudUnit}>km</span>
            </div>
            <div style={{ ...hudBox, minWidth: '120px' }}>
              <span style={{ ...hudValue, color: statusColor }}>{t(statusKey)}</span>
            </div>
          </div>
        </div>

        {/* Controls hint */}
        <div style={{
          marginTop: '1rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.06em',
          color: 'var(--white-dim)',
          textTransform: 'uppercase',
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem',
          alignItems: 'baseline',
        }}>
          <span style={{ color: 'var(--magenta-bright)' }}>{t('simulador.controls_label')}</span>
          <span>{t('simulador.controls')}</span>
          <span style={{ color: 'var(--white-dim)', opacity: 0.7 }}>{t('simulador.tip')}</span>
        </div>
      </div>
    </div>
  );
}

const hudBox = {
  background: 'rgba(0,0,0,0.55)',
  border: '1px solid rgba(233,30,99,0.35)',
  padding: '0.3rem 0.6rem',
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'baseline',
  gap: '0.4rem',
  fontFamily: 'JetBrains Mono, monospace',
};

const hudLabel = {
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  color: 'var(--magenta-bright)',
  textTransform: 'uppercase',
};

const hudValue = {
  fontSize: '0.9rem',
  fontWeight: 700,
  color: 'var(--white)',
  lineHeight: 1,
};

const hudUnit = {
  fontSize: '0.6rem',
  color: 'var(--white-dim)',
};

import React, { Suspense } from 'react'

const HeroCanvas = React.lazy(() => import('./HeroCanvas'))

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: '#ffffff',
        marginTop: '95px',
      }}
    >
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0 }}>
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(to right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.0) 38%, rgba(255,255,255,0.0) 62%, rgba(255,255,255,0.72) 100%), ' +
            'linear-gradient(to top,   rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.0) 40%)',
        }}
      />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30vh',
        background: 'linear-gradient(to bottom, transparent, var(--black))',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
    </section>
  )
}
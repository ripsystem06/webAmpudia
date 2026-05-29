import { useEffect, useRef, useState } from 'react'

export default function CitaSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const common = {
    display: 'block',
    fontFamily: "'Permanent Marker', cursive",
    fontSize: 'clamp(2.5rem, 6vw, 53px)',
    lineHeight: 1.15,
    letterSpacing: '0.02em',
    color: 'var(--white)',
  }

  const magenta = { color: 'var(--magenta)' }

  // Each line alternates left/right entry
  const lines = [
    { text: 'TRABAJO EN EQUIPO' },
    { text: 'Y SIN RENDIRSE' },
    { text: 'PARA DEMOSTRAR A' },
    { text: 'LOS JÓVENES' },
    { text: 'QUE SER EL REY' },
    { text: 'DE LA BAJA' },
    { text: 'NO ES', color: 'magenta' },
    { text: 'IMPOSIBLE', color: 'magenta', big: true },
  ]

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--black)',
        padding: '1.5rem 2rem 3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '700px', textAlign: 'center' }}>
        {lines.map((line, i) => (
          <span
            key={i}
            style={{
              ...common,
              ...(line.big ? { fontSize: 'clamp(3rem, 7vw, 73px)' } : {}),
              ...(line.color === 'magenta' ? magenta : {}),
              opacity: visible ? 1 : 0,
              transform: visible
                ? 'translateX(0)'
                : `translateX(${i % 2 === 0 ? '-80px' : '80px'})`,
              transition: `opacity 0.7s ease-out ${0.15 * i}s, transform 0.7s ease-out ${0.15 * i}s`,
            }}
          >
            {line.text}
          </span>
        ))}
      </div>
    </section>
  )
}
import { useEffect, useRef } from 'react'

const allImages = [
  '01-alan-portrait.webp', '02-truck-action-side.webp', '03-cockpit-prep.webp',
  '04-truck-action-front.webp', '05-team-group.webp', '06-pit-stop.webp',
  '07-alan-with-craft.webp', '08-helmet.webp', '09-alan-cockpit.webp',
  '10-victory-flag.webp',
  'BAJA400-2025-1562.webp', 'BAJA400-2025-295.webp', 'BAJA400-2025-354.webp',
  'BAJA500-06072025-DSchenkelberg-1510.webp', 'BAJA500-06072025-DSchenkelberg-1742.webp',
  'BAJA500-06072025-DSchenkelberg-609.webp',
  'SanFelipe250-04032025-DSchenkelberg-166.webp', 'SanFelipe250-04032025-DSchenkelberg-391.webp',
  'SanFelipe250-04032025-DSchenkelberg-745.webp', 'SanFelipe250-04032025-DSchenkelberg-807.webp',
]

const base = '/images/galeria1/'
const phrases = [
  'Donde otros ven\npolvo y ruido,\nnosotros vemos\nperfección.',
  'Cada desierto\nes una lección\nde humildad.',
  'La velocidad\nse mide en\nsegundos, la\npasión en\nkilómetros.',
  'El miedo se\nqueda en la\nlínea de\narranque.',
  'La Baja no\nperdona,\nenseña.',
  'Un trophy truck\nno se maneja,\nse baila.',
  'Las victorias\nse ganan en\nel taller,\nno en la meta.',
  'Cinco minutos\nen el desierto\nvalen más que\nun año en la\noficina.',
  'Cuando todo\nfalla, queda\nel corazón.',
  'El polvo se\nasienta, la\nleyenda no.',
]

const spans = [
  { col: 2, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 2 },
]

const items = []
let phraseIdx = 0
allImages.forEach((img, i) => {
  const s = spans[i % spans.length]
  items.push({ type: 'image', src: base + img, col: s.col, row: s.row })
  if ((i + 1) % 4 === 0 && phraseIdx < phrases.length) {
    items.push({ type: 'phrase', col: 3, row: 1, text: phrases[phraseIdx] })
    phraseIdx++
  }
  // Repeat phrases if needed
  if (phraseIdx >= phrases.length) phraseIdx = 0
})

// Ensure last item is not a phrase
if (items.length > 0 && items[items.length - 1].type === 'phrase') {
  items.pop()
}

export default function GallerySection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.gallery-card')
    const observer = new IntersectionObserver(
(entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observer.unobserve(entry.target)
            }
          })
        },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--black)',
        position: 'relative',
        zIndex: 2,
        paddingBottom: '3rem',
      }}
    >
      <style>{`
        .gallery-inner { max-width: 1600px; margin: 0 auto; padding: 2rem 1rem 0; }

        .gallery-masonry { columns: 2; column-gap: 0.8rem; }

        .gallery-card {
          break-inside: avoid;
          margin-bottom: 0.8rem;
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
          border: 1px solid rgba(233,30,99,0.12);
          overflow: hidden; position: relative;
          aspect-ratio: 3 / 4;
        }
        .gallery-card.revealed { opacity: 1; transform: translateX(0); }
        .gallery-card img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          filter: saturate(0.8) contrast(1.05);
        }
        .gallery-card.image::after {
          content: ''; position: absolute; inset: 0;
          background: #E91E63; mix-blend-mode: multiply;
          opacity: 0.2; pointer-events: none;
        }

        .gallery-card.phrase {
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 1.2rem; text-align: center;
          background: var(--black-mid);
          overflow: visible;
          width: fit-content;
          min-width: 100%;
          border: none;
        }
        @media (min-width: 768px) {
          .gallery-card.phrase {
            min-width: auto;
            justify-self: center;
            width: fit-content;
            padding: 2rem 2.5rem;
          }
        }
.gallery-card.phrase p {
          font-family: 'Permanent Marker', cursive;
          font-size: 13px; color: var(--white);
          line-height: 1.4; white-space: pre-line; margin: 0;
        }
        @media (min-width: 768px) {
          .gallery-card.phrase p { font-size: clamp(16px, 1.8vw, 20px); }
        }
        @media (min-width: 768px) {
          .gallery-masonry {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-auto-rows: 120px;
            grid-auto-flow: dense;
            gap: 1.6rem;
            padding: 0 2rem;
            columns: unset;
          }
          .gallery-card {
            margin-bottom: 0;
            transform: translateX(60px);
          }
          .gallery-card.phrase p { font-size: clamp(16px, 1.8vw, 20px); }
        }
        @media (min-width: 1200px) {
          .gallery-masonry { grid-auto-rows: 150px; gap: 2rem; }
        }

        /* Card size variants — all screens */
        .gallery-card.gc-2-2, .gallery-card.gc-3-2 { aspect-ratio: 4 / 5; }
        .gallery-card.gc-1-2 { aspect-ratio: 2 / 3; }
        .gallery-card.gc-2-1, .gallery-card.gc-3-1 { aspect-ratio: 3 / 2; }
        .gallery-card.gc-6-1 { aspect-ratio: 4 / 1; }
        .gallery-card.gc-1-1 { aspect-ratio: 3 / 4; }

        /* Grid spans — desktop */
        @media (min-width: 768px) {
          .gallery-card.gc-1-1 { grid-column: span 1; grid-row: span 1; aspect-ratio: auto; }
          .gallery-card.gc-2-1 { grid-column: span 2; grid-row: span 1; aspect-ratio: auto; }
          .gallery-card.gc-3-1 { grid-column: span 3; grid-row: span 1; aspect-ratio: auto; }
          .gallery-card.gc-1-2 { grid-column: span 1; grid-row: span 2; aspect-ratio: auto; }
          .gallery-card.gc-2-2 { grid-column: span 2; grid-row: span 2; aspect-ratio: auto; }
          .gallery-card.gc-3-2 { grid-column: span 3; grid-row: span 2; aspect-ratio: auto; }
          .gallery-card.gc-6-1 { grid-column: span 6; grid-row: span 1; aspect-ratio: auto; }
        }
      `}</style>

      <div className="gallery-inner">
        <div className="gallery-masonry">
          {items.map((item, i) => (
            <div key={i} className={`gallery-card ${item.type} gc-${item.col}-${item.row}`}>
              {item.type === 'image' ? (
                <img src={item.src} alt="" loading="lazy" />
              ) : (
                <p>{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
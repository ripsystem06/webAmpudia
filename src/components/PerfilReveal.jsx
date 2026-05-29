import { useEffect, useRef, useState, Fragment } from 'react'

const SIGNATURE_PATH = "M454.544,2283.294c0.171,-14.625 0.804,-28.614 1.705,-41.637c33.72,-487.418 38.747,-510.136 229.936,-849.621c132.069,-234.51 331.741,-420.509 516.323,-530.031c76.988,-45.681 279.391,-145.861 458.342,-147.185c75.813,-0.561 147.418,16.609 203.528,63.136c16.465,-50.774 33.319,-94.58 49.866,-127.036c175.344,-343.941 586.742,-401.191 729.2,-130.204c68.27,129.865 109.282,235.815 93.387,343.225c-15.894,107.404 -88.688,216.298 -248.149,352.028c-123.574,105.184 -251.466,210.625 -611.455,369.389c-4.489,13.747 -9.1,27.346 -13.824,40.763c-35.426,100.622 -77.198,191.007 -121.423,256.72c1.019,92.724 -3.795,195.256 -13.301,299.872c-0.024,0.265 -0.251,0.465 -0.517,0.454c-0.266,-0.01 -0.477,-0.227 -0.481,-0.493c-0.95,-66.982 -3.303,-156.937 -4.091,-274.141c-26.351,34.476 -53.371,59.749 -80.258,72.911c-78.898,38.622 -147.323,45.509 -205.937,33.224c-87.913,-18.425 -153.769,-79.994 -199.796,-142.415c-15.073,-20.441 -28.019,-40.973 -38.917,-60.106c-10.497,2.335 -20.992,4.625 -31.488,6.875c-12.803,32.137 -26.043,65.541 -40.889,96.666c-107.012,224.353 -166.976,315.865 -214.002,394.097c-64.462,107.238 -121.215,183.823 -174.181,227.93c-53.118,44.232 -102.456,55.843 -151.945,33.077c-63.598,-29.256 -97.9,-85.484 -115.386,-147.462c-12.908,-45.753 -16.65,-94.638 -16.267,-138.086c-82.464,138.139 -159.031,253.981 -213.86,310.6c-0.192,0.198 -0.509,0.203 -0.707,0.011c-0.198,-0.192 -0.203,-0.509 -0.011,-0.707c54.992,-56.788 131.854,-173.164 214.598,-311.856Zm711.48,-464.02c-40.711,8.716 -81.46,16.834 -122.57,24.602c-0.271,0.051 -0.533,-0.127 -0.584,-0.398c-0.051,-0.271 0.127,-0.533 0.398,-0.584c41.323,-7.808 82.28,-15.97 123.201,-24.738c5.123,-12.856 10.177,-25.508 15.236,-37.726c-15.44,-30.734 -24.336,-54.063 -27.155,-61.191c-36.083,-91.218 -61.956,-165.552 -105.293,-277.524c-11.473,-29.642 -23.576,-51.509 -36.584,-63.887c-8.579,-8.164 -17.541,-12.18 -26.976,-11.508c-15.839,1.129 -32.924,15.377 -51.695,44.948c-39.358,62.003 -276.397,533.539 -478.462,872.273c-0.497,43.787 3.161,93.256 16.213,139.518c17.408,61.702 51.528,117.701 114.842,146.825c49.151,22.61 98.133,10.992 150.888,-32.937c52.905,-44.055 109.577,-120.563 173.964,-227.676c47.016,-78.215 106.967,-169.707 213.956,-394.012c14.741,-30.905 27.901,-64.056 40.622,-95.985Zm32.141,-8.035c-5.891,-10.379 -11.176,-20.337 -15.869,-29.636c-4.867,11.772 -9.73,23.94 -14.656,36.303c10.175,-2.183 20.349,-4.404 30.525,-6.666Zm525.415,95.661c-0.457,-69.429 -0.363,-148.385 0.897,-237.752c-1.042,-6.082 -2.136,-12.039 -3.283,-17.866c-82.179,32.913 -160.069,60.572 -235.46,84.355c-6.702,14.323 -13.927,28.017 -21.857,40.644c-22.576,35.948 -50.861,63.249 -88.965,71.873c-0.08,0.018 -0.162,0.016 -0.241,-0.005c-18.569,-5.033 -28.639,-18.985 -34.426,-37.267c-3.018,-9.533 -4.869,-20.247 -6.166,-31.474c-45.139,11.857 -89.789,22.585 -134.376,32.513c10.849,19.026 23.723,39.427 38.701,59.74c45.894,62.24 111.539,123.658 199.196,142.03c58.432,12.247 126.64,5.358 205.292,-33.143c27.042,-13.238 54.202,-38.79 80.687,-73.647Zm17.421,-22.608c-1.207,1.782 -2.416,3.546 -3.627,5.292c-3.496,5.039 -7.006,9.921 -10.528,14.641l1.693,268.849c8.888,-100.727 13.385,-199.298 12.462,-288.782Zm134.996,-298.392c-33.117,14.595 -68.194,29.64 -105.408,45.178c-15.086,6.298 -30.022,12.418 -44.819,18.368c-0.104,6.603 -0.202,13.15 -0.293,19.643c10.291,60.114 15.543,132.411 16.483,211.988c43.885,-65.552 85.321,-155.369 120.5,-255.288c4.624,-13.133 9.139,-26.44 13.538,-39.889Zm-10.798,-807.259c31.926,26.709 58.79,62.993 78.496,111.012c24.21,58.993 30.875,147.012 24.272,248.065c-9.021,138.063 -42.794,300.467 -90.324,446.364c359.213,-158.497 486.959,-263.811 610.39,-368.874c159.202,-135.51 231.94,-244.184 247.808,-351.413c15.867,-107.223 -25.131,-212.973 -93.283,-342.613c-142.121,-270.346 -552.494,-212.935 -727.424,130.193c-16.57,32.502 -33.449,76.393 -49.935,127.267Zm-1409.635,1502.94c201.857,-338.594 438.291,-808.935 477.593,-870.849c19.014,-29.954 36.424,-44.266 52.468,-45.41c9.695,-0.691 18.922,3.392 27.737,11.781c13.085,12.451 25.287,34.433 36.827,64.25c43.336,111.969 69.209,186.302 105.29,277.517c2.792,7.058 11.551,30.027 26.731,60.338c10.848,-26.135 21.735,-50.248 33.396,-70.102c20.744,-35.317 43.985,-57.157 73.715,-53.224c18.566,2.456 28.625,14.494 34.403,31.517c5.726,16.866 7.237,38.649 8.746,60.753c0.688,10.078 1.376,20.222 2.468,29.994c49.254,-12.956 99.096,-27.258 150.079,-43.334c21.733,-46.544 37.946,-99.691 54.837,-144.382c12.324,-32.606 25.015,-60.718 40.447,-78.528c15.55,-17.945 33.876,-25.487 57.38,-16.799c31.143,11.511 54.594,47.868 71.264,102.26c4.906,16.009 9.228,33.581 12.992,52.541c0.947,-0.38 1.894,-0.76 2.843,-1.141c0.924,-58.447 2.349,-121.222 4.436,-188.559c4.191,-135.197 66.07,-468.73 134.824,-681.213c-55.976,-46.567 -127.479,-63.734 -203.185,-63.174c-178.758,1.323 -380.934,101.413 -457.839,147.045c-184.453,109.445 -383.985,295.315 -515.962,529.661c-191.093,339.315 -196.106,362.025 -229.81,849.2c-0.864,12.492 -1.482,25.875 -1.681,39.855Zm878.399,-503.177c-1.104,-9.832 -1.798,-20.041 -2.491,-30.182c-1.503,-22.011 -2.993,-43.704 -8.695,-60.5c-5.648,-16.638 -15.441,-28.447 -33.588,-30.847c-29.374,-3.886 -52.225,17.845 -72.721,52.739c-11.76,20.022 -22.731,44.377 -33.669,70.769c4.822,9.584 10.279,19.882 16.385,30.629c44.72,-9.954 89.503,-20.713 134.779,-32.608Zm407.018,104.129c-0.864,-77.722 -5.832,-148.535 -15.582,-207.88l1.435,227.911c3.25,-4.38 6.49,-8.899 9.717,-13.551c1.479,-2.132 2.956,-4.292 4.43,-6.48Zm-256.541,-146.489c-50.742,15.983 -100.356,30.212 -149.389,43.108c1.289,11.212 3.132,21.911 6.145,31.428c5.665,17.897 15.473,31.605 33.615,36.571c37.788,-8.597 65.817,-35.733 88.218,-71.402c7.756,-12.35 14.836,-25.722 21.411,-39.705Zm236.555,-85.76c-3.766,-18.993 -8.093,-36.594 -13.006,-52.626c-16.553,-54.009 -39.731,-90.184 -70.654,-101.615c-23.057,-8.523 -41.024,-1.088 -56.278,16.516c-15.371,17.739 -27.993,45.75 -40.267,78.227c-16.799,44.448 -32.936,97.248 -54.484,143.621c75.15,-23.73 152.788,-51.317 234.689,-84.123Zm3.557,13.514c0.067,-4.622 0.138,-9.271 0.211,-13.948c-0.877,0.352 -1.753,0.704 -2.628,1.055c0.833,4.23 1.639,8.528 2.417,12.893Zm140.31,-884.117c-68.676,212.385 -130.459,545.495 -134.646,680.557c-2.082,67.17 -3.505,129.8 -4.429,188.123c14.665,-5.899 29.467,-11.965 44.416,-18.206c37.516,-15.663 72.859,-30.826 106.211,-45.532c47.651,-146.037 81.522,-308.715 90.555,-446.971c6.591,-100.87 -0.033,-188.733 -24.199,-247.62c-19.572,-47.691 -46.23,-83.764 -77.907,-110.352Z";

const TOTAL_LENGTH = 27930;
const END_OFFSET = 20384;
const DURATION = 4.7;
const STROKE_WIDTH = 42;

export default function PerfilReveal() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const firmaRef = useRef(null)
  const firmaStarted = useRef(false)
  const [firmaAnimating, setFirmaAnimating] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    const firma = firmaRef.current
    if (!section || !card) return

    const mob = window.innerWidth < 768
    const targetW = mob ? 63 : 35
    const targetMaxW = mob ? 405 : 600

    const handleScroll = () => {
      const vh = window.innerHeight
      const rect = section.getBoundingClientRect()
      // Progress: 0 when section top hits viewport bottom, 1 when section top hits viewport top
      const raw = 1 - (rect.top / vh)
      const p = Math.min(1, Math.max(0, raw))

      // Phase 1 (0 - 0.4): image fades in, starts large (slower)
      // Phase 2 (0.4 - 1.0): image shrinks to card, goes grayscale (slower)
      const fadeIn = Math.min(1, p / 0.4)
      const shrink = p < 0.4 ? 0 : (p - 0.4) / 0.6 // 0 to 1
      const t = shrink // eased version for dimensions

      // Interpolate size: from ~90vw full-screen feel to card
      const currentW = lerp(90, targetW, t)
      const currentMaxW = lerp(9999, targetMaxW, t)
      const br = lerp(0, 12, t)
      const grayscale = lerp(0, 100, t)
      const contrast = lerp(100, 110, t)
      const bgAlpha = lerp(0, 1, t)
      const shadowAlpha = lerp(0, 0.5, t)
      const padding = lerp(0, mob ? 8 : 12, t)

      card.style.opacity = fadeIn
      card.style.width = `${currentW}vw`
      card.style.maxWidth = `${currentMaxW}px`
      card.style.borderRadius = `${br}px`
      card.style.filter = t > 0 ? `grayscale(${grayscale}%) contrast(${contrast}%)` : `grayscale(${grayscale}%)`
      card.style.background = `rgba(255,255,255,${bgAlpha})`
      card.style.boxShadow = `0 0 60px rgba(0,0,0,${shadowAlpha}), 0 0 30px rgba(233,30,99,${shadowAlpha * 0.1})`
      card.style.padding = `${padding}px`

      // Firma: fade in during last 15% of shrink
      if (firma) {
        const firmaT = Math.max(0, (t - 0.85) / 0.15)
        firma.style.opacity = firmaT
      }

      // Start firma draw when transition is complete
      if (p >= 0.95 && !firmaStarted.current) {
        firmaStarted.current = true
        setTimeout(() => setFirmaAnimating(true), 800)
      }
    }

    function lerp(a, b, t) { return a + (b - a) * t }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const marqueeWords = ['FELICIDAD', 'AMOR', 'ADRENALINA']
  const normalColor = 'rgba(255,255,255,0.85)'
  const dashArray = `${END_OFFSET} ${TOTAL_LENGTH - END_OFFSET}`

  return (
    <section
      ref={sectionRef}
      className="perfil-reveal-section"
    >
      <style>{`
        .perfil-reveal-section {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          background: var(--black);
          margin-bottom: -8vh;
        }
        .perfil-reveal-inner {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .perfil-card {
          position: relative;
          z-index: 2;
          overflow: hidden;
          background: transparent;
          will-change: width, max-width, filter, opacity, border-radius, background, box-shadow, padding;
        }
        .perfil-card img {
          display: block;
          width: 100%;
          object-fit: cover;
          aspect-ratio: auto 3300 / 2538;
        }
        .perfil-marquee-row {
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
          line-height: 1;
        }
        .perfil-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .perfil-firma {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70vw;
          max-width: 450px;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
        }
        @media (min-width: 768px) {
          .perfil-firma {
            width: 35vw;
            max-width: 600px;
          }
        }
      `}</style>

      <div className="perfil-reveal-inner">

        {/* Marquee Row 1 */}
        <div className="perfil-marquee-row" style={{ top: 'calc(50% - 5.5rem)' }}>
          <div className="perfil-marquee-track" style={{ animation: 'marquee-ltr 18s linear infinite' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={`m1-${i}`} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {marqueeWords.map((word, wi) => (
                  <Fragment key={wi}>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: word === 'AMOR' ? 'var(--magenta)' : normalColor }}>{word}</span>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: normalColor, margin: '0 0.3em' }}>—</span>
                  </Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 */}
        <div className="perfil-marquee-row" style={{ top: 'calc(50% + 2.5rem)' }}>
          <div className="perfil-marquee-track" style={{ animation: 'marquee-rtl 18s linear infinite' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={`m2-${i}`} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {marqueeWords.map((word, wi) => (
                  <Fragment key={wi}>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: word === 'AMOR' ? 'var(--magenta)' : normalColor }}>{word}</span>
                    <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 9vw, 7rem)', color: normalColor, margin: '0 0.3em' }}>—</span>
                  </Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Photo card — shrinks from large to card */}
        <div ref={cardRef} className="perfil-card" style={{ opacity: 0 }}>
          <img
            src="/hero2.webp"
            alt="Alan Ampudia"
            draggable="false"
          />
        </div>

        {/* Signature */}
        <div ref={firmaRef} className="perfil-firma">
          <svg
            viewBox="160 270 2660 2406"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <defs>
              <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E91E63" />
                <stop offset="50%" stopColor="#FF2D7E" />
                <stop offset="100%" stopColor="#E91E63" />
              </linearGradient>
            </defs>
            <path d={SIGNATURE_PATH} fill="none" stroke="rgba(233,30,99,0.06)" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
            <path d={SIGNATURE_PATH} fill="none" stroke="rgba(255,45,126,0.15)" strokeWidth={STROKE_WIDTH + 20} strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'blur(8px)', strokeDasharray: dashArray, strokeDashoffset: firmaAnimating ? 0 : END_OFFSET, transition: firmaAnimating ? `stroke-dashoffset ${DURATION}s cubic-bezier(0.3,0,0.2,1)` : 'none' }} />
            <path d={SIGNATURE_PATH} fill="none" stroke="url(#sigGrad)" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashArray} strokeDashoffset={firmaAnimating ? 0 : END_OFFSET} style={{ transition: firmaAnimating ? `stroke-dashoffset ${DURATION}s cubic-bezier(0.3,0,0.2,1)` : 'none' }} />
          </svg>
        </div>
      </div>
    </section>
  )
}
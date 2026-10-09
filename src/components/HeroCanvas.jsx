import { useEffect, useRef, useCallback } from 'react'

const VERT = `
attribute vec2 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_uv;
}
`

const FRAG = `
precision highp float;
uniform sampler2D u_base;
uniform sampler2D u_reveal;
uniform sampler2D u_disp;
uniform float     u_time;
uniform vec2      u_resolution;
uniform vec2      u_imgSize;

vec2 coverUV(vec2 uv, vec2 canvasSize, vec2 imgSize, float zoom) {
  float canvasAspect = canvasSize.x / canvasSize.y;
  float imgAspect    = imgSize.x / imgSize.y;

  vec2 scale;
  if (canvasAspect > imgAspect) {
    scale = vec2(1.0, imgAspect / canvasAspect);
  } else {
    scale = vec2(canvasAspect / imgAspect, 1.0);
  }
  scale *= zoom;

  vec2 offset = vec2((1.0 - scale.x) * 0.5, 1.0 - scale.y);
  return offset + uv * scale;
}

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  vec2 texUV = coverUV(uv, u_resolution, u_imgSize, 1.1);

  float ink = texture2D(u_disp, uv).r;

  vec4 base   = texture2D(u_base,   texUV);
  vec4 reveal = texture2D(u_reveal, texUV);

  // Composite over white where PNG is transparent
  base.rgb   = mix(vec3(1.0), base.rgb,   base.a);
  reveal.rgb = mix(vec3(1.0), reveal.rgb, reveal.a);

  float mixFactor = smoothstep(0.05, 0.80, ink);

  // Subtle animated shimmer at the edge of the brush stroke — magenta
  float edge = smoothstep(0.04, 0.18, ink) * (1.0 - smoothstep(0.18, 0.50, ink));
  float shimmer = sin(uv.x * 40.0 + u_time * 5.0) * 0.5 + 0.5;
  vec3 glowColor = mix(vec3(0.91, 0.12, 0.38), vec3(1.0, 0.5, 0.7), shimmer);

  vec4 blended = mix(base, reveal, mixFactor);
  blended.rgb  = mix(blended.rgb, glowColor, edge * 0.28);

  gl_FragColor = blended;
}
`

function compileShader(gl, type, src) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
  }
  return shader
}

function createProgram(gl) {
  const prog = gl.createProgram()
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog))
  }
  return prog
}

function loadTex(gl, img, unit) {
  const tex = gl.createTexture()
  gl.activeTexture(gl.TEXTURE0 + unit)
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return tex
}

const DISP_W = 512
const DISP_H = 512

// 10% larger than the original 55-unit reveal brush.
export const REVEAL_RADIUS = 60.5
// A pointer that has been quiet this long lets the idle path take over.
export const IDLE_DELAY_MS = 2000
export const TABLET_MAX_WIDTH = 1024
// Lemniscate (infinity) angular speed in radians per second.
// One full loop is 2*PI / AUTO_SPEED ~= 3.5s.
export const AUTO_SPEED = 1.8
// The CPU mask pass (stamp + decay + texture upload) runs on this cadence
// (~30 FPS) while the shader keeps drawing every display frame.
export const MASK_UPDATE_INTERVAL_MS = 33
// Ink strength of an automatic stamp.
export const AUTO_STAMP_STRENGTH = 0.85

// Lemniscate of Bernoulli, normalised to the 0..1 canvas space.
export function figureEightPosition(t, { cx = 0.5, cy = 0.5, ax = 0.35, ay = 0.98 } = {}) {
  const sinT = Math.sin(t)
  const denom = 1 + sinT * sinT
  return {
    x: cx + ax * (Math.cos(t) / denom),
    y: cy + ay * ((sinT * Math.cos(t)) / denom),
  }
}

// Deterministic stamp set for the automatic path: one clean brush dot on the
// infinity curve, no random splatter, so the pass is stable and repeatable.
export function autoStampPoints(phase, { radius = REVEAL_RADIUS, strength = AUTO_STAMP_STRENGTH } = {}) {
  const { x, y } = figureEightPosition(phase)
  return [{ x, y, radius, strength }]
}

// The mask pass is skipped on display frames that land inside the cadence
// window, so a 60 FPS loop never scans/uploads the whole buffer every frame.
// `lastRefreshAt: -Infinity` is used to force a pass on the next frame
// (pointer stamps stay visually immediate).
export function shouldRefreshMask({ now, lastRefreshAt, intervalMs = MASK_UPDATE_INTERVAL_MS } = {}) {
  return now - lastRefreshAt >= intervalMs
}

// Coarse pointers and narrow viewports get the automatic, non-interactive path.
export function isTouchOnlyDevice({
  coarsePointer = false,
  viewportWidth = TABLET_MAX_WIDTH,
  tabletMaxWidth = TABLET_MAX_WIDTH,
} = {}) {
  return Boolean(coarsePointer) || viewportWidth <= tabletMaxWidth
}

// The idle path runs on touch-only devices, and on desktop only after inactivity.
export function shouldAutoReveal({
  touchOnly = false,
  reducedMotion = false,
  now = 0,
  lastActivityAt = -Infinity,
  idleDelayMs = IDLE_DELAY_MS,
} = {}) {
  if (reducedMotion) return false
  if (touchOnly) return true
  return now - lastActivityAt >= idleDelayMs
}

// Paint one radial reveal stamp into an RGBA buffer and return how many
// pixels were written. Kept pure so the pixel maths is testable without WebGL.
export function fillStamp(data, normX, normY, radius = REVEAL_RADIUS, strength = 0.85, width = DISP_W, height = DISP_H) {
  const cx  = Math.round(normX * width)
  const cy  = Math.round(normY * height)
  const r   = Math.max(1, radius)
  const r2  = r * r
  // radius can be fractional (60.5), so walk integer pixels and test against r2.
  const min = Math.floor(-r)
  const max = Math.ceil(r)
  let written = 0

  for (let dy = min; dy <= max; dy++) {
    for (let dx = min; dx <= max; dx++) {
      const dist2 = dx * dx + dy * dy
      if (dist2 > r2) continue
      const px = cx + dx
      const py = cy + dy
      if (px < 0 || px >= width || py < 0 || py >= height) continue
      const idx = (py * width + px) * 4
      const t       = Math.sqrt(dist2) / r
      const falloff = Math.exp(-t * t * 3.5)
      const inkAdd  = Math.round(strength * falloff * 255)
      data[idx]     = Math.min(255, data[idx]     + inkAdd)
      data[idx + 1] = Math.min(255, data[idx + 1] + inkAdd)
      data[idx + 2] = Math.min(255, data[idx + 2] + inkAdd)
      data[idx + 3] = 255
      written++
    }
  }

  return written
}

export default function HeroCanvas({ className }) {
  const canvasRef    = useRef(null)
  const rafRef       = useRef(0)
  const dispDataRef  = useRef(new Uint8Array(DISP_W * DISP_H * 4))
  const dispTexRef   = useRef(null)
  const glRef        = useRef(null)
  const progRef      = useRef(null)
  const isHoveringRef  = useRef(false)
  const needsUploadRef = useRef(false)
  const lastActivityRef  = useRef(-Infinity)
  const touchOnlyRef     = useRef(false)
  const reducedMotionRef = useRef(false)
  const autoPhaseRef     = useRef(0)
  const lastMaskRefreshRef = useRef(0)
  const pointerDirtyRef    = useRef(false)
  const lastFrameRef     = useRef(0)

  const stamp = useCallback((normX, normY, radius = REVEAL_RADIUS, strength = 0.85) => {
    fillStamp(dispDataRef.current, normX, normY, radius, strength)
    needsUploadRef.current = true
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) { console.warn('[Hero] canvas ref null'); return }

    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, failIfMajorPerformanceCaveat: false })
      || canvas.getContext('webgl', { antialias: true, alpha: true, failIfMajorPerformanceCaveat: false })
      || canvas.getContext('webgl2')
      || canvas.getContext('webgl')
      || canvas.getContext('experimental-webgl')
    if (!gl) {
      // WebGL unavailable (GPU disabled, old browser, etc.) → show image fallback
      const fallback = document.createElement('img')
      fallback.src = '/hero3.webp'
      fallback.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:top center'
      canvas.parentNode?.replaceChild(fallback, canvas)
      return
    }
    glRef.current = gl

    const prog = createProgram(gl)
    progRef.current = prog
    gl.useProgram(prog)

    const buf = (data) => {
      const b = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, b)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      return b
    }

    const posBuf = buf(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]))
    const aPos   = gl.getAttribLocation(prog, 'a_position')
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uvBuf = buf(new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]))
    const aUv   = gl.getAttribLocation(prog, 'a_uv')
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
    gl.enableVertexAttribArray(aUv)
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0)

    gl.uniform1i(gl.getUniformLocation(prog, 'u_base'),   0)
    gl.uniform1i(gl.getUniformLocation(prog, 'u_reveal'), 1)
    gl.uniform1i(gl.getUniformLocation(prog, 'u_disp'),   2)

    const dispTex = gl.createTexture()
    dispTexRef.current = dispTex
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, dispTex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, DISP_W, DISP_H, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, dispDataRef.current
    )
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    function resize() {
      if (!canvas || !gl || !prog) return
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = w * Math.min(window.devicePixelRatio, 2)
      canvas.height = h * Math.min(window.devicePixelRatio, 2)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(gl.getUniformLocation(prog, 'u_resolution'), canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let loaded = 0
    const tryStart = (img) => {
      if (++loaded === 2) {
        gl.uniform2f(gl.getUniformLocation(prog, 'u_imgSize'), img.naturalWidth, img.naturalHeight)
        startRender()
      }
    }

    const imgBase = new Image()
    imgBase.src = '/hero3.webp'
    imgBase.onload = () => { loadTex(gl, imgBase, 0); tryStart(imgBase) }

    const imgReveal = new Image()
    imgReveal.src = '/hero5.webp'
    imgReveal.onload = () => { loadTex(gl, imgReveal, 1); tryStart(imgReveal) }

    const startTime = performance.now()

    const coarseQuery   = typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: coarse)') : null
    const reducedQuery  = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null

    const syncDevice = () => {
      touchOnlyRef.current = isTouchOnlyDevice({
        coarsePointer: coarseQuery ? coarseQuery.matches : false,
        viewportWidth: window.innerWidth,
      })
      reducedMotionRef.current = reducedQuery ? reducedQuery.matches : false
    }
    syncDevice()
    window.addEventListener('resize', syncDevice)
    coarseQuery?.addEventListener?.('change', syncDevice)
    reducedQuery?.addEventListener?.('change', syncDevice)

    function startRender() {
      const uTime = gl.getUniformLocation(prog, 'u_time')

      function decayBuffer() {
        const data = dispDataRef.current
        // 6 units per display frame at ~60 FPS == ~360 units/s; scaled to the
        // mask cadence so the trail lifetime stays the same.
        const decayAmount = Math.round(360 * (MASK_UPDATE_INTERVAL_MS / 1000))
        const len = data.length
        let changed = false
        for (let i = 0; i < len; i += 4) {
          if (data[i] > 0) {
            data[i]     = Math.max(0, data[i]     - decayAmount)
            data[i + 1] = Math.max(0, data[i + 1] - decayAmount)
            data[i + 2] = Math.max(0, data[i + 2] - decayAmount)
            changed = true
          }
        }
        if (changed) needsUploadRef.current = true
      }

      function frame() {
        if (!gl || !prog) return

        const now = performance.now()
        const dt = lastFrameRef.current ? Math.min((now - lastFrameRef.current) / 1000, 0.1) : 0
        lastFrameRef.current = now

        const autoReveal = shouldAutoReveal({
          touchOnly: touchOnlyRef.current,
          reducedMotion: reducedMotionRef.current,
          now,
          lastActivityAt: lastActivityRef.current,
        })

        // The phase advances every display frame so motion stays smooth, but
        // the buffer work only runs on the mask cadence below.
        if (autoReveal) autoPhaseRef.current += dt * AUTO_SPEED

        const refreshMask = pointerDirtyRef.current
          || shouldRefreshMask({ now, lastRefreshAt: lastMaskRefreshRef.current })

        if (refreshMask) {
          pointerDirtyRef.current = false
          lastMaskRefreshRef.current = now

          if (autoReveal) {
            for (const point of autoStampPoints(autoPhaseRef.current)) {
              stamp(point.x, point.y, point.radius, point.strength)
            }
          }

          decayBuffer()

          if (needsUploadRef.current) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
            gl.activeTexture(gl.TEXTURE2)
            gl.bindTexture(gl.TEXTURE_2D, dispTexRef.current)
            gl.texSubImage2D(
              gl.TEXTURE_2D, 0, 0, 0, DISP_W, DISP_H,
              gl.RGBA, gl.UNSIGNED_BYTE, dispDataRef.current
            )
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
            needsUploadRef.current = false
          }
        }

        const t = (performance.now() - startTime) / 1000
        gl.uniform1f(uTime, t)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        rafRef.current = requestAnimationFrame(frame)
      }
      rafRef.current = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('resize', syncDevice)
      coarseQuery?.removeEventListener?.('change', syncDevice)
      reducedQuery?.removeEventListener?.('change', syncDevice)
    }
  }, [stamp])

  const handleMove = useCallback(
    (e) => {
      const canvas = canvasRef.current
      if (!canvas) return
      // Touch/tablet devices are driven by the idle path only.
      if (touchOnlyRef.current) return
      lastActivityRef.current = performance.now()
      const rect = canvas.getBoundingClientRect()
      let clientX, clientY
      if ('touches' in e) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top)  / rect.height
      stamp(x, y, REVEAL_RADIUS, 0.85)
      // Keep pointer feedback on the very next display frame.
      pointerDirtyRef.current = true
    },
    [stamp]
  )

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseEnter={() => { isHoveringRef.current = true }}
      onMouseLeave={() => { isHoveringRef.current = false }}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}

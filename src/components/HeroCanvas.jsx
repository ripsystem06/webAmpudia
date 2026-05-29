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

export default function HeroCanvas({ className }) {
  const canvasRef    = useRef(null)
  const rafRef       = useRef(0)
  const dispDataRef  = useRef(new Uint8Array(DISP_W * DISP_H * 4))
  const dispTexRef   = useRef(null)
  const glRef        = useRef(null)
  const progRef      = useRef(null)
  const isHoveringRef  = useRef(false)
  const needsUploadRef = useRef(false)

  const stamp = useCallback((normX, normY, radius = 55, strength = 0.85) => {
    const data = dispDataRef.current
    const cx   = Math.round(normX  * DISP_W)
    const cy   = Math.round(normY  * DISP_H)
    const r2   = radius * radius

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const dist2 = dx * dx + dy * dy
        if (dist2 > r2) continue
        const px = cx + dx
        const py = cy + dy
        if (px < 0 || px >= DISP_W || py < 0 || py >= DISP_H) continue
        const idx = (py * DISP_W + px) * 4
        const t       = Math.sqrt(dist2) / radius
        const falloff = Math.exp(-t * t * 3.5)
        const inkAdd  = Math.round(strength * falloff * 255)
        data[idx]     = Math.min(255, data[idx]     + inkAdd)
        data[idx + 1] = Math.min(255, data[idx + 1] + inkAdd)
        data[idx + 2] = Math.min(255, data[idx + 2] + inkAdd)
        data[idx + 3] = 255
      }
    }
    needsUploadRef.current = true
  }, [])

  const paint = useCallback((normX, normY, radius = 55, strength = 0.85) => {
    stamp(normX, normY, radius, strength)
    const count = 2 + Math.floor(Math.random() * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * radius * 0.5
      const sx = normX + (dist / DISP_W) * Math.cos(angle)
      const sy = normY + (dist / DISP_H) * Math.sin(angle)
      const sr = radius * (0.3 + Math.random() * 0.3)
      const ss = strength * (0.3 + Math.random() * 0.4)
      stamp(sx, sy, sr, ss)
    }
  }, [stamp])

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
    imgReveal.src = '/hero2.webp'
    imgReveal.onload = () => { loadTex(gl, imgReveal, 1); tryStart(imgReveal) }

    const startTime = performance.now()

    function startRender() {
      const uTime = gl.getUniformLocation(prog, 'u_time')

      function decayBuffer() {
        const data = dispDataRef.current
        const decayAmount = 6
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
    }
  }, [])

  const handleMove = useCallback(
    (e) => {
      const canvas = canvasRef.current
      if (!canvas) return
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
      stamp(x, y, 55, 0.85)
    },
    [paint]
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

# Alan Ampudia — Sitio Web Oficial

Sitio web oficial del piloto profesional de off-road **Alan Ampudia**, Campeón Mundial SCORE Trophy Truck 2024 y piloto del dorsal #1 del Team Papas.

## 🏁 Stack

- **React 19** + **React Router 7**
- **Vite 7** (build tool)
- **pnpm** (package manager)
- **GSAP** + ScrollTrigger (animaciones)
- **WebGL** (hero interactivo con shaders)
- CSS-in-JS (estilos inline)

## 📄 Páginas

| Ruta | Página |
|------|--------|
| `/` | Home — Hero interactivo, perfil, galería, patrocinadores |
| `/en-pista` | En Pista — Carreras, stats, animación de casco, Team Papas, cuenta regresiva |
| `/fuera-de-pista` | Fuera de Pista — Biografía, mentalidad, Más Que Un Color, YouTube, Instagram |
| `/calendario` | Calendario 2026 — Próximas carreras con countdowns individuales |
| `/equipo` | Equipo — Miembros del Team Papas, galería, protocolo post-race |
| `/legal` | Términos Legales — MX, US y Global (privacidad, cookies, DMCA, CCPA) |

## 🚀 Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # producción → dist/
pnpm preview    # previsualizar build
```

## 📦 Despliegue

Optimizado para **Vercel**:
- Framework: Vite
- Build: `npx vite build`
- Output: `dist`
- Install: `pnpm install`
- SPA fallback configurado (react-router)

## 🎨 Diseño

- Paleta: negro (#050505), magenta (#E91E63), blanco
- Tipografías: Anton (títulos), Barlow Condensed (texto), JetBrains Mono (código), Permanent Marker (detalles)
- Tema oscuro con acentos magenta
- Animaciones de entrada con IntersectionObserver
- Carruseles infinitos de patrocinadores
- Efectos WebGL en hero (liquid ink reveal)

## 📁 Estructura

```
public/
├── fueradepista/     # Imágenes para Fuera de Pista
├── images/
│   ├── copiloto/     # Kyle "El K"
│   ├── mom/          # Alan con su mamá
│   └── team/         # Team Papas
├── patrocinadores/   # Logos SVG sponsors
├── specTT/           # Fotos y video del Trophy Truck
└── clean-opt/        # Frames animación de casco (36 frames)

src/
├── components/       # Componentes React
├── pages/            # Páginas (rutas)
└── App.js            # Router + ScrollToTop
```

## 👤 Autor

Desarrollado para **Alan Ampudia / Team Papas Racing** — Ensenada, Baja California, México.

---

© 2026 Alan Ampudia. Todos los derechos reservados.

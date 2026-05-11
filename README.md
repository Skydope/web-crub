<div align="center">

  <img src="public/svg/logo.svg" alt="CRUB" width="160" />

  # web-crub

  > Sitio web institucional del Centro Regional Universitario Bolívar.
  > Portal de oferta académica, noticias, extensión y servicios estudiantiles.

  [![Astro](https://img.shields.io/badge/Astro-5.15-BC52EE?logo=astro&logoColor=white)](https://astro.build)
  [![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![License](https://img.shields.io/badge/licencia-privada-red)](LICENSE)

</div>

---

<details>
<summary>English</summary>

> **web-crub** is the institutional website for the _Centro Regional Universitario Bolívar_ (CRUB),
> a municipal university center in Bolívar, Buenos Aires, Argentina. Built with Astro 5 and
> Tailwind CSS 3, it serves as the main digital hub for academic offerings, institutional news,
> extension courses, student residences, and community contact.

</details>

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [Rutas y Páginas](#rutas-y-páginas)
- [Content Collections](#content-collections)
- [Instalación y Desarrollo](#instalación-y-desarrollo)
- [Build y Deploy](#build-y-deploy)
- [Documentación](#documentación)
- [Créditos Institucionales](#créditos-institucionales)

---

## Descripción General

**web-crub** es el portal web del Centro Regional Universitario Bolívar, una iniciativa de la
Municipalidad de Bolívar que articula con universidades nacionales para ofrecer carreras de grado,
diplomaturas y cursos de extensión en la región.

**Audiencia**: Estudiantes de Bolívar y zona de influencia, docentes, comunidad en general.

**Funcionalidades principales**:
- Catálogo de carreras y diplomaturas con fichas detalladas por programa
- Sección de noticias institucionales con contenido Markdown
- Buscador full-text con Fuse.js (búsqueda difusa en todas las páginas)
- Formulario de contacto, inscripciones, información de residencias estudiantiles
- Mapa interactivo del campus y sedes
- FAQ con acordeones nativos HTML (`<details>`)

---

## Stack Tecnológico

| Capa | Tecnología | Versión | Rol |
|------|-----------|---------|-----|
| Framework | [Astro](https://astro.build) | 5.15 | Static Site Generator, routing, content collections |
| Estilos | [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first CSS, tema institucional personalizado |
| Lenguaje | [TypeScript](https://www.typescriptlang.org) | 5.x | Tipado estático, schemas Zod para contenido |
| Búsqueda | [Fuse.js](https://fusejs.io) | 7.1 | Búsqueda difusa client-side |
| PostCSS | [PostCSS](https://postcss.org) | 8.5 | Procesamiento CSS, Autoprefixer |
| SEO | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | 3.7 | Generación automática de sitemap |
| Package Manager | [pnpm](https://pnpm.io) | — | Gestión de dependencias |

---

## Estructura del Proyecto

```
web-crub/
├── public/                    # Activos estáticos servidos tal cual
│   ├── favicon.svg
│   ├── robots.txt
│   ├── img/
│   │   ├── foto-banner.jpg              # Imagen hero del homepage
│   │   ├── fotos-noticias/              # 14 imágenes de artículos
│   │   └── logos-universidades/         # 11 logos de universidades socias
│   └── svg/
│       ├── logo.svg                     # Logo CRUB (header)
│       ├── logo-nuevo.svg               # Logo CRUB (footer)
│       ├── logo-muni.svg                # Logo Municipalidad de Bolívar
│       └── logo-edu.svg                 # Logo Educación
│
├── src/
│   ├── assets/                # Assets procesados por Astro (vacíos tras limpieza)
│   │
│   ├── components/            # 14 componentes reutilizables
│   │   ├── Banner.astro                # Hero section configurable
│   │   ├── Carousel.astro              # Carrusel infinito de propuestas
│   │   ├── Faq.astro                   # Acordeón FAQ nativo
│   │   ├── Footer.astro                # Footer institucional 3 columnas
│   │   ├── Header.astro                # Header sticky con nav y menú mobile
│   │   ├── HeroSectionCursadas.astro   # Carrusel de cursadas en la home
│   │   ├── Map.astro                   # Iframe de Google Maps
│   │   ├── MobileSubmenu.astro         # Acordeón para menú mobile
│   │   ├── Navegacion.astro            # Menú desktop + mobile
│   │   ├── Noticias.astro              # Grid de últimas 6 noticias (home)
│   │   ├── SearchToggle.astro          # Búsqueda desktop con dropdown
│   │   ├── ShareButtons.astro          # Links para compartir en redes
│   │   ├── TodasNoticias.astro         # Listado paginado de noticias
│   │   └── Ubicacion.astro             # Sección de ubicación y contacto
│   │
│   ├── content/               # Content Collections de Astro
│   │   ├── config.ts                   # Schema Zod para noticias y propuestas
│   │   ├── noticias/                   # 9 artículos en Markdown
│   │   └── propuestas/
│   │       ├── grado/                  # 11 carreras de grado
│   │       └── diplomaturas/           # 4 diplomaturas
│   │
│   ├── data/                  # Datos estáticos de la app
│   │   └── menu.ts                     # Estructura del menú de navegación
│   │
│   ├── layouts/               # Layouts de página
│   │   └── BaseLayout.astro            # Shell HTML (head, header, footer)
│   │
│   ├── pages/                 # 17 páginas (estáticas + SSG dinámicas)
│   │   ├── index.astro                 # Home
│   │   ├── 404.astro                   # Página no encontrada
│   │   ├── buscar.astro                # Buscador full-page
│   │   ├── buscar.json.ts              # Endpoint JSON del índice de búsqueda
│   │   ├── contacto.astro              # Formulario de contacto
│   │   ├── extension.astro             # Cursos de extensión
│   │   ├── inscripciones.astro         # Info de inscripciones
│   │   ├── institucional.astro         # Página institucional
│   │   ├── noticias.astro              # Listado de noticias
│   │   ├── oferta.astro                # Hub de oferta académica
│   │   ├── uba-xxi.astro               # Programa UBA XXI
│   │   ├── ensenanza/
│   │   │   ├── [categoria].astro       # Listado por categoría (SSG)
│   │   │   └── [categoria]/[slug].astro # Detalle de propuesta (SSG)
│   │   ├── institucional/
│   │   │   └── historia.astro          # Historia del CRUB
│   │   ├── noticias/
│   │   │   └── [slug].astro            # Detalle de noticia (SSG)
│   │   └── residencias/                # 4 páginas de residencias
│   │
│   ├── scripts/               # Scripts client-side
│   │   └── fuse-search.js              # Factory de Fuse.js
│   │
│   ├── styles/                # Estilos globales
│   │   └── global.css                  # Directivas Tailwind + Google Fonts
│   │
│   └── utils/                 # Utilidades TypeScript
│       ├── date.ts                      # Formateo y ordenamiento de fechas
│       └── niveles.ts                   # Mapeo URL ↔ carpeta de contenido
│
├── astro.config.mjs           # Config de Astro (site, redirects, sitemap)
├── tailwind.config.mjs        # Tema Tailwind (colores, fuentes)
├── tsconfig.json              # TypeScript strict
├── postcss.config.cjs         # PostCSS + Tailwind + Autoprefixer
└── package.json               # Dependencias y scripts
```

---

## Arquitectura

### Patrón General: Layout → Page → Components

```
BaseLayout (HTML shell + SEO + Header + Footer)
  └── Page (rutas en src/pages/)
        └── Components (Banner, Faq, Map, Carousel...)
```

Cada página sigue el mismo patrón:
1. **Frontmatter** (`---`): imports, fetch de datos (`getCollection`), lógica
2. **Template** (`<Layout>`): composición de componentes con props
3. **Script** (`<script>`): JS vanilla para interactividad client-side

### Estrategia de Build: Static Site Generation

Todas las páginas son pre-renderizadas a HTML estático en build time. No hay SSR ni
hidratación de frameworks. Las rutas dinámicas (`[categoria]`, `[slug]`) usan
`getStaticPaths()` que genera exhaustivamente todas las combinaciones posibles.

El build produce **41 páginas estáticas** en `dist/`.

### Flujo de Búsqueda

```
Usuario escribe en SearchToggle o /buscar
  → fetch /buscar.json (generado en build time, cacheado 24h)
  → Fuse.js (threshold 0.35, 4 campos: título, descripción, categoría, contenido)
  → Resultados renderizados en DOM
```

### Content Collections

El contenido se gestiona como archivos Markdown con frontmatter tipado (Zod):

```
src/content/
├── config.ts          # Schemas
├── noticias/*.md      # Artículos
└── propuestas/
    ├── grado/*.md     # Carreras
    └── diplomaturas/*.md
```

- **Noticias**: `titulo`, `descripcion`, `categoria`, `fecha` (DD-MM-AAAA), `imagen`
- **Propuestas**: `titulo`, `categoria`, `nivel`, `universidad`, `img`, `duracion`, `modalidad`, `financiamiento`, `url`

El body en Markdown se renderiza con `propuesta.render()` (prosa estilizada con `@tailwindcss/typography` inline).

### Mapeo URL ↔ Contenido

Por legado, las URLs usan nombres en español mientras que las carpetas internas usan
nombres más genéricos. El mapeo está centralizado en `src/utils/niveles.ts`:

| URL | Carpeta de contenido |
|-----|---------------------|
| `/ensenanza/carreras` | `propuestas/grado` |
| `/ensenanza/diplomaturas` | `propuestas/diplomaturas` |

---

## Rutas y Páginas

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Estática | Home: banner, carrusel de cursadas, noticias, ubicación |
| `/oferta` | Estática | Hub de oferta académica con cards a carreras y diplomaturas |
| `/ensenanza/carreras` | SSG | Listado de carreras de grado |
| `/ensenanza/diplomaturas` | SSG | Listado de diplomaturas |
| `/ensenanza/{categoria}/{slug}` | SSG | Detalle de carrera o diplomatura con sidebar + FAQ |
| `/institucional` | Estática | Misión, objetivos y descripción del CRUB |
| `/institucional/historia` | Estática | Línea de tiempo (1997, 2017, 2022) |
| `/noticias` | Estática | Listado paginado de noticias (6 por página) |
| `/noticias/{slug}` | SSG | Artículo completo con hero image y share buttons |
| `/buscar` | Estática | Buscador full-page (SPA-like con Fuse.js) |
| `/buscar.json` | Endpoint | JSON con todas las noticias y propuestas indexadas |
| `/inscripciones` | Estática | Requisitos, fechas, FAQ de inscripción |
| `/contacto` | Estática | Formulario, datos de contacto, mapa, FAQ |
| `/extension` | Estática | Cursos de extensión (arte, justicia, emprendedores) |
| `/uba-xxi` | Estática | Programa UBA XXI: descripción y materias |
| `/residencias/residencia-la-plata` | Estática | Residencias en La Plata (3 casas) |
| `/residencias/casas-la-plata` | Estática | Detalle de casas en La Plata |
| `/residencias/residencia-azul` | Estática | Residencia en Azul |
| `/residencias/complejo-azul` | Estática | Detalle del complejo UNICEN Azul |
| `/404` | Estática | Página no encontrada con links de navegación |

### Redirects

| De | A |
|----|----|
| `/propuestas` | `/ensenanza/carreras` |
| `/propuestas/grado` | `/ensenanza/carreras` |
| `/propuestas/pregrado` | `/ensenanza/carreras` |
| `/propuestas/diplomaturas` | `/ensenanza/diplomaturas` |

---

## Instalación y Desarrollo

### Prerrequisitos

- [Node.js](https://nodejs.org) ≥ 18.x
- [pnpm](https://pnpm.io) (recomendado) o npm

### Setup

```bash
# Clonar el repositorio
git clone https://github.com/Skydope/web-crub.git
cd web-crub

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
# → http://localhost:4321
```

El servidor de desarrollo tiene hot reload. Los cambios en archivos `.astro` y `.md`
se reflejan instantáneamente.

---

## Build y Deploy

```bash
# Build de producción
pnpm build
# → Genera 41 páginas estáticas en dist/

# Previsualizar el build
pnpm preview
```

### Estrategia de Deploy

El sitio es completamente estático. La carpeta `dist/` puede servirse desde:

- **Apache / Nginx**: subir `dist/` como document root
- **Netlify / Vercel**: conectar el repo, build command `pnpm build`, publish directory `dist`
- **GitHub Pages**: GitHub Action con `peaceiris/actions-gh-pages`

Los redirects (`/propuestas/*` → `/ensenanza/*`) están definidos en `astro.config.mjs`
y se generan como archivos HTML con meta refresh. Para hosts que soportan redirects
server-side (Netlify, Vercel), agregar configuración adicional.

---

## Documentación

- [Guía de Arquitectura](docs/ARQUITECTURA.md) — Decisiones de diseño, flujo de datos, dependencias
- [Guía de Contenido](docs/GUIA-CONTENIDO.md) — Cómo agregar noticias, carreras, cursos sin tocar código

---

## Créditos Institucionales

<div align="center">

  **Centro Regional Universitario Bolívar (CRUB)**

  Bolívar, Buenos Aires, Argentina

  [crub@bolivar.gob.ar](mailto:crub@bolivar.gob.ar)

  ---

  En articulación con:

  **UNICEN** · **UNTREF** · **UNLP** · **UNLPam** · **UNSAM** · **UNGS** · **UNQ** · **UNMdP** · **UNAJ** · **UBA**

  ---

  <img src="public/svg/logo-muni.svg" alt="CRUB" width="200" />

</div>

---

## Licencia

Software privado de uso institucional. Todos los derechos reservados.
El contenido (textos, imágenes, logos) es propiedad del CRUB y la Municipalidad de Bolívar.

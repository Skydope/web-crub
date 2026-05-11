# Arquitectura — web-crub

> Documento de arquitectura para desarrolladores. Explica las decisiones de diseño,
> el flujo de datos y la estructura interna del proyecto.

---

## Índice

- [Visión General](#visión-general)
- [Árbol de Componentes](#árbol-de-componentes)
- [Estrategia de Rendering](#estrategia-de-rendering)
- [Content Collections](#content-collections)
- [Flujo de Búsqueda](#flujo-de-búsqueda)
- [Sistema de Navegación](#sistema-de-navegación)
- [SEO y Metadatos](#seo-y-metadatos)
- [Pipeline de Build](#pipeline-de-build)
- [Dependencias y Justificación](#dependencias-y-justificación)
- [Decisiones de Diseño](#decisiones-de-diseño)

---

## Visión General

**web-crub** es un sitio estático generado con **Astro 5** usando el modo **SSG** (Static Site Generation).
No tiene backend, base de datos ni servidor de aplicaciones. Todo el contenido se compila a HTML, CSS y
JavaScript vanilla en tiempo de build.

### Principios

- **Contenido en Markdown**: las noticias y carreras se escriben como archivos `.md` con frontmatter YAML.
- **Zero JavaScript por defecto**: las páginas no hidratan frameworks. Solo los componentes interactivos (buscador, carrusel, paginación) tienen JS vanilla.
- **Build-time data fetching**: todo `getCollection()` se ejecuta durante el build. No hay llamadas a APIs en runtime.
- **Tipado estricto**: TypeScript con `astro/tsconfigs/strict` y schemas Zod para validar contenido.

---

## Árbol de Componentes

```
BaseLayout.astro (layout raíz)
│
├── <head>
│   ├── Meta tags (charset, viewport, description, canonical)
│   ├── Open Graph (title, description, image, type, site_name)
│   ├── Twitter Card (summary_large_image)
│   └── Google Fonts (Montserrat + Inter) via global.css
│
├── Header.astro
│   ├── Logo CRUB (svg/logo.svg)
│   ├── Navegacion.astro (desktop)
│   │   ├── menuItems[] desde src/data/menu.ts
│   │   ├── SearchToggle.astro → /buscar.json → Fuse.js
│   │   └── MobileSubmenu.astro (mobile accordion)
│   └── Mobile menu toggle + search (JS vanilla)
│
├── <main>
│   └── <slot /> ← Contenido de la página
│
└── Footer.astro
    ├── Logos institucionales (CRUB, Educación, Municipalidad)
    ├── Datos de contacto (dirección, teléfono, email)
    └── Enlaces internos + horarios
```

### Composición típica de una página

```
<BaseLayout title="..." description="...">
  <Banner title={...} description={...} />
  <section>
    <!-- Contenido específico de la página -->
  </section>
  <Faq faqs={...} />
</BaseLayout>
```

---

## Estrategia de Rendering

### Static Site Generation (SSG)

El build genera **41 páginas HTML estáticas**. No hay server-side rendering ni hidratación.

#### Páginas completamente estáticas

Definidas en archivos sin parámetros dinámicos: `index.astro`, `contacto.astro`, `404.astro`, etc.
Se renderizan una vez en build time.

#### Rutas dinámicas (SSG con `getStaticPaths`)

Tres páginas usan rutas paramétricas:

| Archivo | Parámetros | Genera |
|---------|-----------|--------|
| `ensenanza/[categoria].astro` | `categoria: "carreras" \| "diplomaturas"` | 2 páginas |
| `ensenanza/[categoria]/[slug].astro` | combinación de todas las propuestas (filtra `pregrado`) | 15 páginas |
| `noticias/[slug].astro` | una página por cada noticia | 9 páginas |

`getStaticPaths()` itera todas las entradas de la colección y devuelve `{ params, props }` para cada ruta.

#### Endpoint JSON

`buscar.json.ts` exporta una función `GET()` que devuelve todas las noticias y propuestas como JSON.
Este endpoint se ejecuta en build time (SSG) y genera un archivo estático `/buscar.json`.
Incluye headers de cache: `Cache-Control: public, max-age=3600, s-maxage=86400`.

### Sin islas interactivas

No se usa el patrón de _islands_ de Astro. La interactividad client-side es vanilla JS
embebido en componentes vía `<script>` inline o imports de módulos `.js`.

---

## Content Collections

### Definición

`src/content/config.ts` define dos colecciones con schemas **Zod**:

```typescript
const noticiasCollection = defineCollection({
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    categoria: z.string(),
    fecha: z.string(),       // DD-MM-AAAA
    imagen: z.string(),      // /img/fotos-noticias/imagenX.jpg
  }),
});

const propuestasCollection = defineCollection({
  schema: z.object({
    titulo: z.string(),
    categoria: z.string(),
    nivel: z.enum(["grado", "pregrado", "diplomaturas"]),
    universidad: z.string(),
    img: z.string(),          // clave del logo (ej: "ungs")
    duracion: z.string(),
    modalidad: z.string(),
    financiamiento: z.string(),
    url: z.string(),          // slug amigable
  }),
});
```

### Cómo se consumen

```typescript
// En frontmatter de cualquier .astro:
import { getCollection } from "astro:content";
const noticias = await getCollection("noticias");

// Acceso tipado:
noticias[0].data.titulo    // string
noticias[0].body           // string (Markdown crudo)
noticias[0].slug           // string (desde el nombre de archivo)
noticias[0].render()       // Promise<{ Content: AstroComponent }>
```

### Mapeo de URLs

Las URLs públicas usan nombres en español, las carpetas internas usan nombres genéricos.
El mapeo está centralizado en `src/utils/niveles.ts`:

```typescript
export const URL_A_CARPETA: Record<string, string> = {
  carreras: "grado",
  diplomaturas: "diplomaturas",
};

export const CARPETA_A_URL: Record<string, string> = {
  grado: "carreras",
  diplomaturas: "diplomaturas",
};
```

---

## Flujo de Búsqueda

### End-to-end

```
1. BUILD TIME
   └── buscar.json.ts: getCollection("noticias") + getCollection("propuestas")
       → normaliza ambos a { slug, titulo, descripcion, categoria, imagen, content }
       → propuestas: carpeta "grado" → URL "carreras", `p.data.img` → `/img/logos-universidades/{img}.jpg`
       → devuelve JSON con Cache-Control headers

2. CLIENT-SIDE (SearchToggle.astro)
   └── Usuario hace click en la lupa
       → fetch("/buscar.json") (solo la primera vez, lazy load)
       → createFuse(data) con keys: ["titulo", "descripcion", "categoria", "content"], threshold: 0.35
       → input.addEventListener("input", ...) → fuse.search(query)
       → Top 5 resultados como dropdown + "Ver todos los resultados" link

3. CLIENT-SIDE (/buscar)
   └── fetch("/buscar.json") + createFuse(data)
       → Lee ?q= de la URL para búsqueda inicial
       → Input con debounce 300ms → actualiza URL con history.replaceState
       → Resultados como cards con título, categoría, descripción, imagen
```

### Configuración de Fuse.js

```javascript
// src/scripts/fuse-search.js
new Fuse(data, {
  keys: ["titulo", "descripcion", "categoria", "content"],
  threshold: 0.35,   // 0 = coincidencia exacta, 1 = cualquier cosa
});
```

---

## Sistema de Navegación

### Datos

`src/data/menu.ts` exporta un array tipado de `SeccionMenu`:

```typescript
interface SeccionMenu {
  nombre: string;
  url?: string;
  subcategorias?: { nombre: string; url: string }[];
}
```

### Renderizado

**Desktop** (`Navegacion.astro`):
- Menú horizontal con dropdowns al hover (CSS `group-hover`)
- Transiciones: `opacity-0 invisible group-hover:opacity-100 group-hover:visible`
- Botón "Inscribite" destacado con `bg-institucional-oro`

**Mobile** (`Header.astro` + `MobileSubmenu.astro`):
- Hamburguesa toggle con JS vanilla
- Submenús expandibles con animación `max-height`
- Formulario de búsqueda inline
- Click outside para cerrar

### Re-inicialización

`MobileSubmenu` y `Carousel` se re-inicializan en el evento `astro:page-load`
para soportar View Transitions de Astro.

---

## SEO y Metadatos

### Por página

Cada página pasa `title` y `description` (obligatorios) e `image` (opcional) a `BaseLayout`:

```astro
<BaseLayout title="Carreras" description="Explora nuestras carreras disponibles" image="/img/carreras-og.jpg">
```

### Tags generados

```html
<title>CRUB - {title}</title>
<meta name="description" content="{description}" />
<link rel="canonical" href="{Astro.url.href}" />

<!-- Open Graph -->
<meta property="og:title" content="CRUB - {title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{ogImageUrl}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="CRUB" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="CRUB - {title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{ogImageUrl}" />
```

La imagen OG por defecto es `/img/foto-banner.jpg`. Se construye como URL absoluta:
```typescript
const ogImageUrl = new URL(ogImage, Astro.site).href;
```

### Sitemap

`@astrojs/sitemap` genera `sitemap-index.xml` automáticamente en cada build.
Referenciado desde `robots.txt`.

---

## Pipeline de Build

```
1. astro build
   ├── [content] Syncing content → valida schemas Zod
   ├── [types] Generated → tipos para content collections
   ├── [build] Collecting build info
   ├── [build] Building static entrypoints
   ├── [vite] Bundling client-side JS (fuse-search.js, SearchToggle, buscar.astro scripts)
   └── [build] Generating static routes
       ├── Páginas estáticas (index, 404, contacto, etc.)
       ├── Rutas SSG (noticias/[slug], ensenanza/*)
       ├── Endpoints (buscar.json)
       └── Redirects (propuestas/* → ensenanza/*)
2. [@astrojs/sitemap] sitemap-index.xml → dist/
3. Complete → 41 páginas en ~1.8s
```

### Output

```
dist/
├── index.html
├── 404.html
├── oferta/index.html
├── contacto/index.html
├── buscar/index.html
├── buscar.json
├── ensenanza/
│   ├── carreras/index.html
│   ├── carreras/{slug}/index.html    (×10)
│   ├── diplomaturas/index.html
│   └── diplomaturas/{slug}/index.html (×4)
├── noticias/
│   ├── index.html
│   └── {slug}/index.html             (×9)
├── residencias/
│   └── ...                           (×4)
├── propuestas/...                    (redirects, ×5)
├── _astro/                           (JS y CSS bundles)
├── img/                              (copiado de public/)
├── svg/                              (copiado de public/)
├── favicon.svg
├── robots.txt
└── sitemap-index.xml
```

---

## Dependencias y Justificación

| Dependencia | Rol | Por qué |
|-------------|-----|---------|
| `astro` 5.15 | Framework | Mejor SSG del ecosistema JS. Content collections nativas. Zero JS por defecto. |
| `tailwindcss` 3.4 | Estilos | Utility-first, bajo acoplamiento, tema personalizable. Sin runtime CSS-in-JS. |
| `fuse.js` 7.1 | Búsqueda | Búsqueda difusa client-side sin servidor. Liviano (~18KB gzip). Threshold configurable. |
| `@astrojs/sitemap` | SEO | Generación automática de sitemap. Sin configuración adicional. |
| `autoprefixer` | CSS | Vendor prefixes automáticos para Tailwind. |
| `postcss` | CSS | Requerido por Tailwind y Autoprefixer. |
| `typescript` | Lenguaje | Tipado estático para content collections y utilidades. |

### Lo que NO se usa (y por qué)

| Tecnología | Por qué no |
|------------|-----------|
| React / Vue / Svelte | El sitio no necesita interactividad compleja. JS vanilla es suficiente para búsqueda, carrusel y menú mobile. |
| CMS headless | El contenido cabe en archivos Markdown. Sin costo de infraestructura ni curva de aprendizaje para editores. |
| Base de datos | Sin necesidad de datos dinámicos. Todo es estático y pre-renderizado. |
| Tailwind Typography | Los estilos de prosa están definidos manualmente con clases `prose prose-lg prose-slate`. |
| `tailwindcss-animate` | Las animaciones se hacen con transiciones CSS nativas y clases utility de Tailwind (`transition-all`, `duration-300`). |

---

## Decisiones de Diseño

### 1. Astro SSG puro sin SSR

**Decisión**: Static Site Generation sin server-side rendering.

**Racional**: El contenido cambia con baja frecuencia (noticias semanales, carreras por cuatrimestre).
El deploy estático es gratuito en cualquier host (Netlify, Vercel, GitHub Pages, nginx). No requiere
mantener un servidor Node.js.

**Trade-off**: Cada cambio de contenido requiere un rebuild completo (~1.8s para 41 páginas).
Para un sitio de este tamaño, es aceptable.

### 2. Búsqueda client-side con Fuse.js

**Decisión**: Índice pre-generado como JSON estático, búsqueda en el navegador.

**Racional**: Sin necesidad de un servidor de búsqueda (Elasticsearch, Algolia, Meilisearch).
Fuse.js pesa ~18KB gzip. El índice completo ocupa ~30KB. La búsqueda es instantánea (<10ms).

**Trade-off**: No escala a cientos de miles de documentos. Para el volumen actual (~24 documentos), es más que suficiente.

### 3. Markdown + Content Collections en vez de CMS

**Decisión**: Archivos `.md` con frontmatter en el repositorio.

**Racional**: Los editores pueden escribir en Markdown sin curva de aprendizaje. El versionado con
Git da trazabilidad completa. No hay costo de hosting para un CMS. Los schemas Zod validan el
frontmatter en build time.

**Trade-off**: Sin interfaz gráfica para editar contenido. Requiere acceso al repositorio Git.

### 4. Vanilla JS sin frameworks de UI

**Decisión**: JavaScript vanilla para interactividad client-side (menú mobile, carrusel, búsqueda, paginación).

**Racional**: La interactividad es acotada y específica. Un framework (React, Vue) agregaría
~40KB+ de overhead sin beneficio real. El JS vanilla es más rápido de cargar y más fácil de mantener
para un equipo que puede no tener experiencia en frameworks modernos.

### 5. Tailwind utility-first con tema institucional

**Decisión**: Tailwind CSS con colores y fuentes personalizadas en `tailwind.config.mjs`.

**Racional**: Los tokens de diseño institucionales (`institucional-azul`, `institucional-oro`,
`institucional-gris`) están definidos como colores de Tailwind. Las clases utility evitan
la acumulación de CSS muerto. El output final es ~10KB de CSS.

### 6. Fuentes desde Google Fonts

**Decisión**: Montserrat (encabezados) e Inter (cuerpo) cargadas desde Google Fonts CDN.

**Racional**: Son fuentes gratuitas, visualmente similares a Gotham (la fuente original deseada,
que es comercial). Se cargan con `display=swap` para evitar FOIT (flash of invisible text).
Las fuentes se cachean en el CDN de Google.

**Trade-off**: Dependencia externa del CDN de Google. Si se cae, el sitio usa `system-ui` como fallback.
Si la institución adquiere una licencia de Gotham, se pueden reemplazar agregando `@font-face`
en `global.css`.

# Guía de Contenido — web-crub

> Guía práctica para mantener y actualizar el contenido del sitio web del CRUB
> sin necesidad de conocimientos de programación.

---

## Índice

- [Introducción](#introducción)
- [Agregar una Noticia](#agregar-una-noticia)
- [Agregar una Carrera o Diplomatura](#agregar-una-carrera-o-diplomatura)
- [Modificar Cursos de Extensión](#modificar-cursos-de-extensión)
- [Cambiar las FAQs](#cambiar-las-faqs)
- [Modificar el Menú de Navegación](#modificar-el-menú-de-navegación)
- [Gestionar Imágenes](#gestionar-imágenes)
- [Probar Cambios Localmente](#probar-cambios-localmente)
- [Desplegar a Producción](#desplegar-a-producción)

---

## Introducción

El sitio del CRUB almacena su contenido en **archivos Markdown** (`.md`) dentro de la carpeta
`src/content/`. Cada tipo de contenido (noticias, carreras) tiene su propia carpeta y un formato
específico.

**Markdown** es un formato de texto simple. Se escribe como texto plano con algunos símbolos
para formato (títulos, negrita, listas). No requiere conocimientos de HTML.

### Estructura de un archivo de contenido

Cada archivo `.md` tiene dos partes:

```markdown
---
titulo: "TÍTULO DEL ARTÍCULO"
descripcion: "Breve descripción que aparece en las vistas previas"
categoria: "Institucional"
fecha: "15-04-2025"
imagen: "/img/fotos-noticias/imagen10.jpg"
---

Acá va el contenido del artículo en Markdown.

## Subtítulo

Texto del párrafo. **Texto en negrita**. *Texto en cursiva*.

- Lista
- con
- viñetas
```

- **Frontmatter**: datos estructurados entre `---`. Define título, fecha, categoría, etc.
- **Body**: contenido libre en Markdown que se muestra en la página de detalle.

---

## Agregar una Noticia

### Paso 1: Crear el archivo

Crear un archivo nuevo en `src/content/noticias/` con un nombre descriptivo en minúsculas
usando guiones:

```
src/content/noticias/mi-nueva-noticia.md
```

### Paso 2: Completar el frontmatter

```yaml
---
titulo: "TÍTULO DE LA NOTICIA EN MAYÚSCULAS"
descripcion: "Una descripción corta (1-2 oraciones) que resume la noticia."
categoria: "Institucional"
fecha: "DD-MM-AAAA"
imagen: "/img/fotos-noticias/imagenXX.jpg"
---
```

#### Campos requeridos

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `titulo` | Título de la noticia (convención: MAYÚSCULAS) | `"SE GRADUARON SEIS NUEVOS PROFESIONALES"` |
| `descripcion` | Resumen de 1-2 oraciones para vistas previas y SEO | `"El CRUB fue sede de una jornada emocionante..."` |
| `categoria` | Una de las categorías válidas (ver abajo) | `"Institucional"` |
| `fecha` | Fecha en formato DD-MM-AAAA | `"11-07-2025"` |
| `imagen` | Ruta a la imagen del artículo | `"/img/fotos-noticias/imagen9.jpg"` |

#### Categorías válidas

- `Academico` — información sobre carreras, inscripciones, programas
- `Institucional` — noticias del CRUB como institución
- `Educacion` — jardines maternales, formación docente
- `Feria` — participación en ferias y exposiciones
- `Expo` — Expo Bolívar Educa y eventos similares
- `Politica` — anuncios de gestión, convenios

### Paso 3: Escribir el cuerpo

El cuerpo se escribe en Markdown. Acá va el contenido completo del artículo.

```markdown
Este jueves, el Centro Regional Universitario de Bolívar fue sede de una jornada
muy emocionante para los estudiantes de Abogacía.

## Detalles del evento

Las instalaciones del CRUB recibieron a las familias que acompañaron a los estudiantes.

- Punto importante 1
- Punto importante 2
- Punto importante 3
```

### Paso 4: Agregar la imagen

Subir la imagen a `public/img/fotos-noticias/`. Usar numeración consecutiva:

```
public/img/fotos-noticias/imagen15.jpg   ← siguiente número disponible
```

> [!NOTE]
> Las imágenes deben ser `.jpg`. Tamaño recomendado: 1200×630 píxeles (relación 1.91:1
> para Open Graph). Peso máximo: 500 KB. Comprimir con [Squoosh](https://squoosh.app)
> o [TinyPNG](https://tinypng.com) antes de subir.

---

## Agregar una Carrera o Diplomatura

### Paso 1: Determinar la carpeta

- **Carreras de grado** → `src/content/propuestas/grado/`
- **Diplomaturas** → `src/content/propuestas/diplomaturas/`

### Paso 2: Crear el archivo

Usar un nombre descriptivo con el formato de las existentes:

```
src/content/propuestas/grado/licenciatura-administracion.md
src/content/propuestas/diplomaturas/diplomatura-gestion-cultural.md
```

### Paso 3: Completar el frontmatter

```yaml
---
titulo: "NOMBRE COMPLETO DE LA CARRERA EN MAYÚSCULAS"
categoria: "licenciatura"
nivel: "grado"
universidad: "Nombre de la Universidad"
img: "clave-del-logo"
duracion: "X años"
modalidad: "Presencial"
financiamiento: "Programa PUENTES"
url: "slug-amigable"
---
```

#### Campos requeridos

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `titulo` | Nombre completo en MAYÚSCULAS | `"LICENCIATURA EN PSICOLOGÍA"` |
| `categoria` | Tipo: `"licenciatura"`, `"tecnicatura"`, `"ingenieria"`, `"diplomatura"` | `"licenciatura"` |
| `nivel` | `"grado"` o `"diplomaturas"` | `"grado"` |
| `universidad` | Nombre completo de la universidad | `"Universidad Nacional de Mar del Plata"` |
| `img` | Clave del logo (sin extensión ni ruta) | `"mardel"` |
| `duracion` | Duración estimada | `"5 años"` |
| `modalidad` | `"Presencial"`, `"Virtual"`, `"Híbrida"` | `"Híbrida"` |
| `financiamiento` | Fuente de financiamiento | `"Municipalidad de Bolívar"` |
| `url` | Slug para la URL (sin espacios, con guiones) | `"licenciatura-psicologia"` |

#### Claves de logo disponibles

La clave `img` debe coincidir con un archivo en `public/img/logos-universidades/`.

| Clave | Universidad |
|-------|-------------|
| `uba` | Universidad de Buenos Aires |
| `unicen` | UNICEN |
| `unlp` | Universidad Nacional de La Plata |
| `unlpam` | Universidad Nacional de La Pampa |
| `ungs` | Universidad Nacional General Sarmiento |
| `untref` | Universidad Nacional de Tres de Febrero |
| `san-martin` | Universidad Nacional de San Martín |
| `quilmes` | Universidad Nacional de Quilmes |
| `mardel` | Universidad Nacional de Mar del Plata |
| `floreal-ferrara` | Escuela de Gobierno Floreal Ferrara |
| `arturo-jau` | Universidad Nacional Arturo Jauretche |

> [!NOTE]
> Si la universidad no está en la lista, agregar su logo en
> `public/img/logos-universidades/{clave}.jpg` y usar esa clave en el campo `img`.

### Paso 4: Escribir el cuerpo (opcional)

El cuerpo de la carrera puede incluir:

```markdown
## Perfil del egresado

Descripción de las competencias y habilidades que desarrolla el graduado.

## Plan de estudios

### Primer año
- Materia 1
- Materia 2

### Segundo año
- Materia 3
- Materia 4

## Campo laboral

Ámbitos donde puede desempeñarse el egresado.
```

El cuerpo es opcional. Si se deja vacío, la página mostrará solo la información
del frontmatter en la barra lateral y las FAQs genéricas.

---

## Modificar Cursos de Extensión

Los cursos de extensión están definidos en un array dentro de `src/pages/extension.astro`.

### Agregar un curso nuevo

Editar `src/pages/extension.astro` y agregar un objeto al array `cursos` en el frontmatter:

```javascript
const cursos = [
  // ... cursos existentes ...
  {
    titulo: "Nombre del nuevo curso",
    año: "2026",
    descripcion: "Descripción detallada del curso.",
    docente: {
      nombre: "Nombre del docente",
      detalle: "Títulos y afiliación institucional.",
    },
    financiamiento: "Fuente de financiamiento",
    icono: "arte",   // "arte", "justicia", o "emprendedores"
  },
];
```

Campos del objeto curso:

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `titulo` | ✅ | Nombre completo del curso |
| `año` | ✅ | Año o período |
| `descripcion` | ✅ | Descripción del curso |
| `docente` | ❌ | Objeto con `nombre` y `detalle` |
| `modalidad` | ❌ | Modalidad de cursada |
| `financiamiento` | ❌ | Fuente de financiamiento |
| `icono` | ✅ | `"arte"`, `"justicia"`, o `"emprendedores"` |

El conteo de "Cursos disponibles" se actualiza automáticamente.

---

## Cambiar las FAQs

Las preguntas frecuentes están definidas como arrays en cada página que las usa.

### FAQs de carreras

Editar `src/pages/ensenanza/[categoria]/[slug].astro`, array `faqsCarrera` (línea ~34):

```typescript
const faqsCarrera = [
  {
    question: "¿Qué necesito para inscribirme?",
    answer: "Necesitás: certificado de secundario completo..."
  },
  // Agregar más objetos { question, answer }
];
```

### FAQs de contacto

Editar `src/pages/contacto.astro`, array `faqsContacto` (línea ~7).

### FAQs de inscripciones

Editar `src/pages/inscripciones.astro`, array en frontmatter.

> [!WARNING]
> Las FAQs de carreras son **compartidas** entre todas las carreras. Si una FAQ
> no aplica a un programa específico, considerar moverla a contenido individual
> dentro del body de la carrera.

---

## Modificar el Menú de Navegación

Editar `src/data/menu.ts`. El menú es un array de secciones:

```typescript
export const menuItems = [
  {
    nombre: "Institucional",
    url: "/institucional",
    subcategorias: [
      { nombre: "Historia", url: "/institucional/historia" },
      { nombre: "Contacto", url: "/contacto" },
    ],
  },
  // ... más secciones ...
];
```

Para agregar un nuevo ítem:

```typescript
{
  nombre: "Nueva Sección",
  url: "/ruta",                         // Link principal (escritorio)
  subcategorias: [                      // Submenú (opcional)
    { nombre: "Sub ítem", url: "/ruta/sub" },
  ],
},
```

---

## Gestionar Imágenes

### Dónde va cada tipo de imagen

| Tipo | Carpeta | Formato | Tamaño recomendado |
|------|---------|---------|-------------------|
| Fotos de noticias | `public/img/fotos-noticias/` | `.jpg` | 1200×630 px, <500 KB |
| Logos de universidades | `public/img/logos-universidades/` | `.jpg` | 400×200 px, <100 KB |
| Foto del banner | `public/img/foto-banner.jpg` | `.jpg` | 1920×600 px, <300 KB |
| Logos institucionales | `public/svg/` | `.svg` | Vector (cualquier tamaño) |
| Favicon | `public/favicon.svg` | `.svg` | 32×32 px |

### Cómo referenciar imágenes

- **En frontmatter**: usar la ruta completa desde `public/`
  ```yaml
  imagen: "/img/fotos-noticias/imagen10.jpg"
  ```

- **En el body Markdown**: usar ruta relativa
  ```markdown
  ![Descripción](/img/fotos-noticias/imagen10.jpg)
  ```

> [!TIP]
> Siempre comprimir las imágenes antes de subirlas. Herramientas recomendadas:
> [Squoosh](https://squoosh.app) (web, gratuito) o `pnpm sharp` (línea de comandos).

---

## Probar Cambios Localmente

### Requisitos previos

1. Tener [Node.js](https://nodejs.org) instalado (≥ 18.x)
2. Tener Git instalado
3. Clonar el repositorio: `git clone https://github.com/Skydope/web-crub.git`

### Iniciar el servidor de desarrollo

```bash
cd web-crub
pnpm install      # Solo la primera vez
pnpm dev          # Inicia en http://localhost:4321
```

El servidor muestra los cambios en tiempo real:
- Al modificar un archivo `.md`, la página se actualiza automáticamente
- Al modificar un componente `.astro`, también

### Verificar antes de publicar

```bash
pnpm build        # Genera la versión de producción en dist/
pnpm preview      # Previsualiza el build en http://localhost:4321
```

Revisar que:
- Todas las páginas carguen sin errores
- Las imágenes se vean correctamente
- Los links funcionen
- Las fechas y categorías sean correctas

---

## Desplegar a Producción

### Flujo estándar

```bash
# 1. Hacer los cambios en el contenido (archivos .md)
# 2. Probar localmente con pnpm dev
# 3. Verificar el build con pnpm build
# 4. Commitear los cambios
git add -A
git commit -m "contenido: nueva noticia sobre X"
git push

# 5. El deploy se hace desde el build más reciente
pnpm build
# → Subir carpeta dist/ al servidor de producción
```

### Servidores soportados

La carpeta `dist/` contiene HTML, CSS y JS estático. Puede servirse desde:

- **Apache / Nginx**: Copiar `dist/` al document root
- **Netlify**: Conectar el repo, build command `pnpm build`, publish dir `dist`
- **Vercel**: Conectar el repo, detecta Astro automáticamente
- **GitHub Pages**: Usar GitHub Action con `peaceiris/actions-gh-pages@v3`

> [!NOTE]
> El build genera 41 páginas. Si agregaste contenido nuevo (noticias, carreras),
> el número de páginas aumentará.

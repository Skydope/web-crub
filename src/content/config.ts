import { z, defineCollection } from "astro:content";

const noticiasCollection = defineCollection({
  type: "content",
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    categoria: z.string(),
    fecha: z.string(),
    imagen: z.string().url(),
  }),
});

const propuestasCollection = defineCollection({
  type: "content",
  schema: z.object({
    titulo: z.string(),
    categoria: z.string(),
    nivel: z.enum(["grado", "pregrado", "diplomaturas"]),
    universidad: z.string(),
    img: z.string(),
    duracion: z.string(),
    modalidad: z.string(),
    financiamiento: z.string(),
  }),
});

export const collections = {
  noticias: noticiasCollection,
  propuestas: propuestasCollection,
};



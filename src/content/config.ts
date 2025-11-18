import { z, defineCollection } from "astro:content";

const noticiasCollection = defineCollection({
  type: "content",
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    categoria: z.string(),
    fecha: z.date(),
    imagen: z.string().url(),
  }),
});

export const collections = {
  noticias: noticiasCollection,
};

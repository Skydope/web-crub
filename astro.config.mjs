// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://crub.edu.ar',
  integrations: [sitemap()],
  redirects: {
    '/propuestas': '/ensenanza/carreras',
    '/propuestas/grado': '/ensenanza/carreras',
    '/propuestas/pregrado': '/ensenanza/carreras',
    '/propuestas/diplomaturas': '/ensenanza/diplomaturas',
    '/ensenanza/carreras/tecnicatura-administacion-agropecuaria': '/ensenanza/carreras/tecnicatura-administracion-agropecuaria',
  },
});

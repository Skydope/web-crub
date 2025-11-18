/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'institucional-azul': {
          DEFAULT: '#007a97',
          100: '#c9e7eb',
          200: '#8ccdd5',
          300: '#4ab8c7',
          400: '#00c3d4',
          500: '#00c0d1',
          600: '#00b0c8',
          700: '#009ac1',
          800: '#008db0',
          900: '#0084a0',
        },

        'institucional-gris': {
          DEFAULT: '#3d3d3d',
          50: '#f6f6f6',
          100: '#e8e8e8',
          200: '#d4d4d4',
          300: '#c0c0c0',
          400: '#a7a7a7',
          500: '#939393',
          600: '#7d7d7d',
          700: '#666666',
          800: '#525252',
          900: '#3d3d3d',
        },
      },
      fontFamily: {
        'encabezado': ['Gotham Roundedb', 'sans-serif'],
        'cuerpo': ['Gotham Roundedm', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


export interface Subcategoria {
    nombre: string;
    url: string;
}

export interface SeccionMenu {
    nombre: string;
    url: string;
    subcategorias?: Subcategoria[];
}

const menuItems: SeccionMenu[] = [
    {
        nombre: "Institucional",
        url: "/institucional",
        subcategorias: [
            { nombre: "Historia", url: "/institucional/historia" },
            { nombre:"Contacto", url: "/contacto" },
        ],
    },
    {
        nombre: "Oferta Académica",
        url: "/propuestas",
        subcategorias: [
            { nombre: "Grado", url: "/propuestas/grado" },
            { nombre: "Pregrado", url: "/propuestas/pregrado" },
            { nombre: "Diplomaturas", url: "/propuestas/diplomaturas" },
        ],
    },
    {
        nombre: "Residencias Estudiantiles",
        url: "/residencias",
        subcategorias: [
            { nombre: "Casas en Azul", url: "/residencias/residencia-azul" },
            { nombre: "Casas en La Plata", url: "/residencias/residencia-la-plata" },
        ],
    },
    {
        nombre: "Extensión",
        url: "/extension-crub",
        subcategorias: [
            { nombre: "Arte, historia y cultura: territorios y prácticas en la Provincia de Buenos Aires", url: "/extension-crub/arte" },
            { nombre: "Actualización para la Justicia de Paz Bonaerense", url: "/extension-crub/bonaerense" },
        ],
    },
     {
        nombre: "Programas",
        url: "/propuestas",
        subcategorias: [
            { nombre: "Proyecto preparatoria", url: "/propuestas/grado" },
        ],
    },

];

export default menuItems;
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
        ],
    },
    {
        nombre: "Propuesta Académica",
        url: "/oferta",
        subcategorias: [
            { nombre: "Grado", url: "/oferta/grado" },
            { nombre: "Pregrado", url: "/oferta/pregrado" },
            { nombre: "Diplomaturas", url: "/oferta/diplomaturas" },
        ],
    },
    {
        nombre: "Casas Estudiantiles",
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

];

export default menuItems;
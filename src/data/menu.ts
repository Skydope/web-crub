export interface Subcategoria {
    nombre: string;
    url: string;
}

export interface SeccionMenu {
    nombre: string;
    url: string;
    subcategorias?: Subcategoria[];
    nivel?: string;
    enlaceBase?: string;
    carreras?: { nombre: string; slug: string; url: string; }[];

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
        nombre: "Enseñanza",
        url: "/enseñanza-categoria",
        subcategorias: [
            { nombre: "Diplomaturas", url: "/enseñanza-categoria/diplomaturas" },
            { nombre: "Grado", url: "/enseñanza-categoria/grado" },
            { nombre: "Pregrado", url: "/enseñanza-categoria/pregrado" },
        ],
    },
    {
        nombre: "Proyectos",
        url: "/proyectos",
        subcategorias: [
            { nombre: "Proyecto Preparatoria", url: "/proyectos/preparatoria" },
            { nombre: "Expo-Bolivar Educa", url: "/proyectos/expo-Bolivar-educa" },
        ],
    },
    {
        nombre: "Casas Estudiantiles",
        url: "/casas-estudiantiles",
        subcategorias: [
            { nombre: "Casas en Azul", url: "/casas-estudiantiles/casa-azul" },
            { nombre: "Casas en La Plata", url: "/casas-estudiantiles/casas-la-plata" },
        ],
    },
    {
        nombre: "Extensión",
        url: "/extension-crub",
        subcategorias: [
            { nombre: "Arte, historia y cultura: territorios y prácticas en la Provincia de Buenos Aires", url: "/extension-crub/arte" },
            { nombre: "Actualización para la Justicia de Paz Bonaerense", url: "/extension-crub/justicia" },
            { nombre: "Curso para emprendedores", url: "/extension-crub/emprendedores" },
        ],
    },
];


export default menuItems;
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
        nombre: "Enseñanza",
        url: "/ensenanza/carreras",
        subcategorias: [
            { nombre: "Carreras", url: "/ensenanza/carreras" },
            { nombre: "Diplomaturas", url: "/ensenanza/diplomaturas" },
            { nombre: "UBA XXI", url: "/uba-xxi" },
        ],
    },
      {
        nombre: "Extensión",
        url: "/extension",
        subcategorias: [
            { nombre: "Arte, historia y cultura", url: "/extension" },
            { nombre: "Justicia de Paz Bonaerense", url: "/extension" },
            { nombre: "Curso para Emprendedores", url: "/extension" },
        ],
    },
    {
        nombre: "Residencias Estudiantiles",
        url: "/residencias/residencia-azul",
        subcategorias: [
            { nombre: "Casas en Azul", url: "/residencias/residencia-azul" },
            { nombre: "Casas en La Plata", url: "/residencias/residencia-la-plata" },
        ],
    },
];

export default menuItems;

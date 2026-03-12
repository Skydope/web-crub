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
        url: "/propuestas",
        subcategorias: [
            { nombre: "Carreras", url: "/propuestas/grado" },
            { nombre: "Diplomaturas", url: "/propuestas/diplomaturas" },
            { nombre: "UBA XXI", url: "/uba-xxi" },
        ],
    },
      {
        nombre: "Extensión",
        url: "/extension",
        subcategorias: [
            { nombre: "Arte, historia y cultura: territorios y prácticas en la Provincia de Buenos Aires", url: "/extension" },
            { nombre: "Actualización para la Justicia de Paz Bonaerense", url: "/extension" },
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
        nombre: "Programas",
        url: "/propuestas",
        subcategorias: [
            { nombre: "Proyecto preparatoria", url: "/propuestas/grado" },
        ],
    },

];

export default menuItems;
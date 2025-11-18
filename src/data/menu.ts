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
        nombre: "Institución",
        url: "/institucion",
        subcategorias: [
            { nombre: "Historia", url: "/institucion/historia" },
        ],
    },
    {
        nombre: "Oferta Académica",
        url: "/oferta",
        subcategorias: [
            { nombre: "Diplomaturas", url: "/oferta/diplomaturas" },
            { nombre: "Tecnicaturas", url: "/oferta/tecnicaturas" },
            { nombre: "Licenciaturas", url: "/oferta/licenciaturas" },
            { nombre: "Ingenierías", url: "/oferta/ingenierias" },
        ],
    },
    {
        nombre: "Residencias",
        url: "/residencias",
        subcategorias: [
            { nombre: "Residencias en Azul", url: "/residencias/residencia-azul" },
            { nombre: "Residencias en La Plata", url: "/residencias/residencia-la-plata" },
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
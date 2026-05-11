import { getCollection } from "astro:content";

export async function GET() {
    const noticias = await getCollection("noticias");
    const propuestas = await getCollection("propuestas");

    const items = [
        ...noticias.map((n) => ({
            slug: `noticias/${n.slug}`,
            titulo: n.data.titulo,
            descripcion: n.data.descripcion,
            categoria: n.data.categoria,
            imagen: n.data.imagen,
            content: n.body,
        })),
        ...propuestas.map((p) => {
            const carpeta = p.id.split("/")[0];
            const urlCarpeta = carpeta === "grado" ? "carreras" : carpeta;

            return {
                slug: `ensenanza/${urlCarpeta}/${p.slug.split("/").pop()}`,
                titulo: p.data.titulo,
                descripcion: p.data.universidad,
                categoria: p.data.categoria,
                imagen: p.data.img,
                content: p.body,
            };
        }),
    ];

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
    });
}

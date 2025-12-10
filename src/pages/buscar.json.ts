import matter from "gray-matter";

export async function GET() {
    // Astro importa TODOS los .md recursivamente
    const modules = import.meta.glob("/src/content/**/*.md", {
        eager: true,
        query: "?raw" // Importamos el archivo crudo como texto
    });

    const items = [];

    for (const [filepath, module] of Object.entries(modules)) {
        const raw = module.default as string;

        const parsed = matter(raw);

        const slug = filepath
            .replace("/src/content/", "")
            .replace(".md", "");

        items.push({
            slug,
            titulo: parsed.data.titulo || "",
            descripcion: parsed.data.descripcion || "",
            categoria: parsed.data.categoria || "",
            imagen: parsed.data.img || parsed.data.imagen || null,
            content: parsed.content || ""
        });
    }

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" }
    });
}

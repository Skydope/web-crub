import { createFuse } from "./fuse-search.js";

document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("search-button");
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const resultsBox = document.getElementById("search-results");
    const submitButton = document.getElementById("search-submit");
    const lupa = document.getElementById("svg-lupa")

    // Fix mobile cache
    const data = await fetch(`/buscar.json?ts=${Date.now()}`, {
        cache: "no-store",
    }).then(res => res.json());

    const fuse = createFuse(data);

    // Abrir/cerrar
    button.addEventListener("click", () => {
        const isOpen = !form.classList.contains("scale-0");

        if (isOpen) {
            form.classList.add("scale-0", "opacity-0", "invisible");
            resultsBox.classList.add("hidden");
            lupa.classList.remove("scale-0", "opacity-0", "invisible")
           
        } else {
            form.classList.remove("scale-0", "opacity-0", "invisible");
             lupa.classList.add("scale-0", "opacity-0", "invisible");
            setTimeout(() => input.focus({ preventScroll: true }), 150);
        }
    });

    // Cerrar al hacer click afuera
    document.addEventListener("pointerdown", (event) => {
        const container = document.getElementById("search-toggle-container");
        if (!container.contains(event.target)) {
            form.classList.add("scale-0", "opacity-0", "invisible");
            resultsBox.classList.add("hidden");
            lupa.classList.remove("scale-0", "opacity-0", "invisible")
        }
    });

    // Búsqueda en dropdown
    const handleQuery = () => {
        const query = input.value.trim();

        if (query.length < 2) {
            resultsBox.classList.add("hidden");
            return;
        }

        const results = fuse.search(query);

        if (results.length === 0) {
            resultsBox.innerHTML = `<div class="p-2 text-sm text-gray-500">Sin resultados</div>`;
            resultsBox.classList.remove("hidden");
            return;
        }

        resultsBox.innerHTML = results
            .slice(0, 5) // Limitar a 5 resultados en dropdown
            .map(
                (r) => `
                <a href="/${r.item.slug}" class="block p-2 rounded hover:bg-gray-200 transition">
                    <p class="font-semibold">${r.item.titulo}</p>
                    <p class="text-xs text-gray-600">${r.item.categoria}</p>
                </a>
            `
            )
            .join("");

        // Agregar link para ver todos los resultados
        if (results.length > 5) {
            resultsBox.innerHTML += `
                <a href="/buscar?q=${encodeURIComponent(query)}" 
                   class="block p-2 text-center text-sm text-institucional-azul-600 hover:bg-gray-100 border-t border-gray-200 font-medium">
                    Ver todos los resultados (${results.length})
                </a>
            `;
        }

        resultsBox.classList.remove("hidden");
    };

    input.addEventListener("input", handleQuery);
    input.addEventListener("keyup", handleQuery);

    // Submit button - redirige a página de resultados
    submitButton.addEventListener("click", () => {
        const query = input.value.trim();
        if (query) {
            window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
        }
    });

    // Enter en el input también va a la página de resultados
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = input.value.trim();
            if (query) {
                window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
            }
        }
    });
});
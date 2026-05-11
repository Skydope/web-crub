export function formatearFecha(fechaStr: string): string {
  const [dia, mes, anio] = fechaStr.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);

  return fecha.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ordenarPorFecha<T extends { data: { fecha: string } }>(items: T[], orden: "asc" | "desc" = "desc"): T[] {
  return [...items].sort((a, b) => {
    const [diaA, mesA, anioA] = a.data.fecha.split("-").map(Number);
    const [diaB, mesB, anioB] = b.data.fecha.split("-").map(Number);

    const fechaA = new Date(anioA, mesA - 1, diaA).getTime();
    const fechaB = new Date(anioB, mesB - 1, diaB).getTime();

    return orden === "desc" ? fechaB - fechaA : fechaA - fechaB;
  });
}

export function formatearFecha(fechaStr: string): string {
  const partes = fechaStr.split("-").map(Number);
  if (partes.length !== 3 || partes.some(isNaN)) return fechaStr;
  const [dia, mes, anio] = partes;
  const fecha = new Date(anio, mes - 1, dia);

  return fecha.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ordenarPorFecha<T extends { data: { fecha: string } }>(items: T[], orden: "asc" | "desc" = "desc"): T[] {
  return [...items].sort((a, b) => {
    const partesA = a.data.fecha.split("-").map(Number);
    const partesB = b.data.fecha.split("-").map(Number);
    if (partesA.length !== 3 || partesB.length !== 3 || partesA.some(isNaN) || partesB.some(isNaN)) return 0;

    const [diaA, mesA, anioA] = partesA;
    const [diaB, mesB, anioB] = partesB;

    const fechaA = new Date(anioA, mesA - 1, diaA).getTime();
    const fechaB = new Date(anioB, mesB - 1, diaB).getTime();

    return orden === "desc" ? fechaB - fechaA : fechaA - fechaB;
  });
}

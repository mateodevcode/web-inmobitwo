// Disponibilidad del inmueble según sus ofertas (estado comercial que marca el CRM):
// active | sold | rented | inactive | expired. Devuelve null si está disponible sin matices.

const OPERACION = { venta: "la venta", alquiler: "el arriendo" };

export function avisoDisponibilidad(inmueble) {
  if (!inmueble) return null;
  if (inmueble.estado && inmueble.estado !== "publicado") {
    return { tono: "info", titulo: "Borrador", texto: "Este anuncio no está publicado: solo tú lo ves." };
  }
  const ofertas = Array.isArray(inmueble.ofertas) ? inmueble.ofertas : [];
  if (ofertas.length === 0) return null;
  const activas = ofertas.filter((o) => o.listing_status === "active");
  const estados = new Set(ofertas.map((o) => o.listing_status));

  if (activas.length === 0) {
    if (estados.has("sold")) return { tono: "cerrado", titulo: "Vendido", texto: "Este inmueble ya se vendió." };
    if (estados.has("rented")) return { tono: "cerrado", titulo: "Arrendado", texto: "Este inmueble ya se arrendó." };
    if (estados.has("expired")) return { tono: "pausa", titulo: "Anuncio vencido", texto: "Este anuncio venció y ya no recibe contactos." };
    return { tono: "pausa", titulo: "No disponible", texto: "El anunciante pausó este anuncio por ahora." };
  }

  // "Ambas" con una operación cerrada: avisar cuál sigue disponible.
  const cerrada = ofertas.find((o) => o.listing_status === "sold" || o.listing_status === "rented");
  if (cerrada && activas.length) {
    const sigue = OPERACION[activas[0].operation] ?? "otra operación";
    const termino = cerrada.listing_status === "sold" ? "La venta ya se cerró" : "El arriendo ya se cerró";
    return { tono: "info", titulo: "Disponible", texto: `${termino}; sigue disponible para ${sigue}.` };
  }
  return null;
}

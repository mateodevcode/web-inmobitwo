// src/views/seleccionar-zona/components/map/zonaCard.js
// HTML de la card del hover (popup de MapLibre) en el mapa principal.
// Helper puro: sin estado ni efectos. `total: null` = cargando,
// `undefined` = no mostrar conteo, número = mostrar conteo.

const nf = new Intl.NumberFormat("es-CO");

const SUB = {
  region: ["departamento", "departamentos"],
  departamento: ["municipio", "municipios"],
  municipio: ["barrio", "barrios"],
};

const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

export function zonaCardHTML({ name, level, total, children }) {
  let countLine = "";
  if (total === null) {
    countLine = `<p class="text-xs opacity-60">Cargando…</p>`;
  } else if (typeof total === "number") {
    countLine = `<p class="text-sm"><span class="font-semibold text-tercero">${nf.format(total)}</span> ${total === 1 ? "anuncio" : "anuncios"}</p>`;
  }
  const labels = SUB[level];
  const subLine =
    labels && children
      ? `<p class="text-xs opacity-60">${nf.format(children)} ${labels[children === 1 ? 0 : 1]} dentro</p>`
      : "";
  return `<div class="font-poppins text-segundo min-w-[150px]"><p class="text-sm font-semibold">${esc(name)}</p>${countLine}${subLine}</div>`;
}

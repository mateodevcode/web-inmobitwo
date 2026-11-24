// Estilos MapLibre del mapa principal. El estado de cada polígono vive en
// feature-state (sel = seleccionado, anc = padre de algo seleccionado,
// hover = bajo el mouse): cambiarlo NO vuelve a subir el GeoJSON, solo
// repinta. Puros, sin estado.

export const SELECTED_COLOR = "#e6007a"; // rosa (seleccionado)
export const HOVER_DARK_PINK = "#99004d"; // rosa oscuro (hover en municipio/barrio)
export const HOVER_DARK = "#1a1a1a"; // hover en región/departamento
export const SELECTED_OPACITY = 0.4;
export const ANCESTOR_OPACITY = 0.18; // "rosa claro" del nivel padre
export const HOVER_OPACITY = 0.1;

// Propiedad que identifica cada polígono en cada fuente (promoteId).
export const ID_POR_FUENTE = {
  region: "slug",
  dpto: "DPTO_CCDGO",
  mpio: "MPIO_CCNCT",
  barrio: "BAR_COD",
};

const SEL = ["boolean", ["feature-state", "sel"], false];
const ANC = ["boolean", ["feature-state", "anc"], false];
const HOV = ["boolean", ["feature-state", "hover"], false];

const FILL_OPACITY = [
  "case",
  SEL,
  SELECTED_OPACITY,
  ANC,
  ANCESTOR_OPACITY,
  HOV,
  HOVER_OPACITY,
  0,
];
const LINE_WIDTH = ["case", SEL, 3.5, HOV, 3.5, 1.5];

function lineColorFor(hoverColor) {
  return ["case", SEL, SELECTED_COLOR, HOV, hoverColor, HOVER_DARK];
}

export function makeFill(id) {
  return {
    id: `${id}-fill`,
    type: "fill",
    source: id,
    paint: { "fill-color": SELECTED_COLOR, "fill-opacity": FILL_OPACITY },
  };
}

export function makeLine(id, hoverColor) {
  return {
    id: `${id}-line`,
    type: "line",
    source: id,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": lineColorFor(hoverColor),
      "line-width": LINE_WIDTH,
      "line-opacity": 1,
    },
  };
}

export function setLineOpacity(map, id, val) {
  try {
    if (map.getLayer(`${id}-line`))
      map.setPaintProperty(`${id}-line`, "line-opacity", val);
  } catch {
    /* capa no disponible */
  }
}

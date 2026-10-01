// Estilos MapLibre basados en una única propiedad "state"
// (selected / ancestor / none) + hover. Puros, sin estado.

export const SELECTED_COLOR = "#e6007a"; // rosa normal (nivel seleccionado)
export const HOVER_DARK_PINK = "#99004d"; // rosa oscuro (hover en municipio/barrio)
export const HOVER_DARK = "#1a1a1a"; // hover en departamento (sin cambios)
export const SELECTED_OPACITY = 0.4;
export const ANCESTOR_OPACITY = 0.18; // "rosa claro" del nivel padre

const FILL_COLOR = [
  "case",
  ["==", ["get", "state"], "selected"],
  SELECTED_COLOR,
  ["==", ["get", "state"], "ancestor"],
  SELECTED_COLOR,
  "transparent",
];
const FILL_OPACITY = [
  "case",
  ["==", ["get", "state"], "selected"],
  SELECTED_OPACITY,
  ["==", ["get", "state"], "ancestor"],
  ANCESTOR_OPACITY,
  0,
];
const LINE_WIDTH = [
  "case",
  [
    "any",
    ["==", ["get", "state"], "selected"],
    ["==", ["get", "isHovered"], true],
  ],
  4,
  2,
];

function lineColorFor(hoverColor) {
  return [
    "case",
    ["==", ["get", "state"], "selected"],
    SELECTED_COLOR,
    ["==", ["get", "isHovered"], true],
    hoverColor,
    HOVER_DARK,
  ];
}

export function makeFill(id) {
  return {
    id: `${id}-fill`,
    type: "fill",
    source: id,
    paint: { "fill-color": FILL_COLOR, "fill-opacity": FILL_OPACITY },
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

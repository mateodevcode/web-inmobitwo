// src/components/map/mapPins.js — elementos HTML de las chinchetas del mapa.
// Estilos en app/globals.css (.it-marker, .it-grupo, .it-pin).
//
// Cada función devuelve el CONTENEDOR (.it-marker) que se le pasa a
// maplibregl.Marker: MapLibre lo posiciona con un transform inline, así que
// la chincheta visible va dentro (animaciones/hover sin romper la posición).
// `pinDe(el)` devuelve la chincheta interna para cambiarle el estado.
import { formatPrecioPin } from "@/utils/formatPrecio";

const CASITA =
  '<svg class="it-grupo__icono" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z"/></svg>';

const formatoConteo = new Intl.NumberFormat("es-CO");

function envolver(pin) {
  const el = document.createElement("div");
  el.className = "it-marker";
  el.appendChild(pin);
  return el;
}

export const pinDe = (el) => el?.firstElementChild ?? null;

function tamanoGrupo(count) {
  if (count < 10) return "s";
  if (count < 100) return "m";
  if (count < 1000) return "l";
  return "xl";
}

// Grupo de inmuebles: burbuja-chincheta con casita y cantidad. Crece con el
// número para que se lea de un vistazo dónde hay más oferta.
export function createGroupPin(count) {
  const pin = document.createElement("button");
  pin.type = "button";
  pin.className = `it-grupo it-grupo--${tamanoGrupo(count)}`;
  pin.setAttribute("aria-label", `${count} inmuebles, acercar`);
  pin.innerHTML = `${CASITA}<span>${formatoConteo.format(count)}</span>`;
  return envolver(pin);
}

// Operación normalizada del inmueble (el endpoint del mapa manda `op`; los
// listados mandan `operacion_slug` o la etiqueta `operacion`).
export function operacionDe(props) {
  return (props?.op || props?.operacion_slug || props?.operacion || "")
    .toString()
    .toLowerCase();
}

// Marca/desmarca los estados de una chincheta de precio ya creada.
export function setEstadoPin(el, { seleccionado = false, visto = false } = {}) {
  const pin = pinDe(el);
  if (!pin) return;
  pin.classList.toggle("is-selected", seleccionado);
  pin.classList.toggle("is-visto", visto && !seleccionado);
  el.classList.toggle("is-top", seleccionado);
}

// Chincheta con precio. Estados: seleccionada (invertida) y vista (gris).
export function createPricePin(props, isSelected = false, visto = false) {
  const pin = document.createElement("button");
  pin.type = "button";
  pin.className = "it-pin";
  const base = formatPrecioPin(props.precio, operacionDe(props));
  const precio = base ? `$${base}` : "Consultar";
  pin.textContent = precio;
  pin.setAttribute("aria-label", `Inmueble de ${precio}`);
  const el = envolver(pin);
  setEstadoPin(el, { seleccionado: !!isSelected, visto: !!visto });
  return el;
}

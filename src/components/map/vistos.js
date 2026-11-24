// src/components/map/vistos.js — inmuebles ya abiertos desde el mapa.
// Se guardan en localStorage para pintar su chincheta en gris al volver.
const CLAVE = "mapa_inmuebles_vistos";
const MAXIMO = 500;

let vistos = null;

function cargar() {
  if (vistos) return vistos;
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(CLAVE) : null;
    vistos = new Set(raw ? JSON.parse(raw) : []);
  } catch {
    vistos = new Set();
  }
  return vistos;
}

export const esVisto = (id) => cargar().has(String(id));

export function marcarVisto(id) {
  const set = cargar();
  const key = String(id);
  set.delete(key); // re-insertar al final = más reciente
  set.add(key);
  while (set.size > MAXIMO) set.delete(set.values().next().value);
  try {
    localStorage.setItem(CLAVE, JSON.stringify([...set]));
  } catch {}
}

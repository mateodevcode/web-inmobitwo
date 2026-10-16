// views/seleccionar-zona/lib/zonaPersistente.js
// Persistencia de la "zona activa" del MAPA PRINCIPAL en localStorage.
// Una sola zona activa (lo último que armó el usuario, sea dibujo o
// selección): al volver al mapa (atrás desde la ficha, "Seleccionar en
// Mapa", recarga) se precarga sola.
//
// Reglas:
//  - dibujar o seleccionar algo nuevo → reemplaza lo guardado.
//  - borrar el polígono o limpiar la zona → se borra lo guardado.
//  - solo se restaura si coincide operación+tipo (evita mezclar
//    p. ej. un dibujo de venta-casa en alquiler-apartamento).

const CLAVE = "inmobitwo:zona_activa:v1";

export function leerZonaGuardada() {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || (parsed.kind !== "dibujo" && parsed.kind !== "seleccion")) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function guardarZona(zona) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(zona));
  } catch {}
}

export function limpiarZonaGuardada() {
  try {
    localStorage.removeItem(CLAVE);
  } catch {}
}

export function esZonaCompatible(guardada, operation, tipoInmueble) {
  if (!guardada) return false;
  return (
    guardada.operation === operation && guardada.tipoInmueble === tipoInmueble
  );
}

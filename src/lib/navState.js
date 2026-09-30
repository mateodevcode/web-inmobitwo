// src/lib/navState.js
// Sustituto Next.js del `location.state` de react-router (que no existe aquí).
// Guarda el estado de navegación carrusel (listaIds, posicion, ...) en
// sessionStorage (por pestaña, sobrevive a router.push pero no a recargas
// compartidas) y el flag del visor de fotos via query param `?visor=`.
"use client";

const CLAVE = "inmobitwo:navState";

export function saveNavState(state) {
  if (typeof window === "undefined") return;
  try {
    if (state) window.sessionStorage.setItem(CLAVE, JSON.stringify(state));
  } catch {
    /* almacenamiento lleno o bloqueado: no crítico */
  }
}

export function readNavState() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(CLAVE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Navega a /inmueble/:id guardando el estado carrusel y opcional ?visor=. */
export function irAInmueble(router, id, navState = {}, visor = null) {
  saveNavState(navState);
  router.push(visor ? `/inmueble/${id}?visor=${visor}` : `/inmueble/${id}`);
}

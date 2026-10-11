// hooks/descartadosStore.js
//
// Store externo de DESCARTADOS del usuario (solo ids).
// Mismo patrón que favoritosStore: al descartar/restaurar solo se
// re-renderizan los componentes suscritos con `useDescartadosStore()`
// (tarjetas del feed, listados, anuncio, pestaña Descartados).
//
// Uso:
//   const descartados = useDescartadosStore();

import { useSyncExternalStore } from "react";

const EMPTY = [];
let snapshot = EMPTY;
const listeners = new Set();

const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => snapshot;

export const setDescartadosStore = (ids) => {
  snapshot = (ids ?? []).map(Number);
  emit();
};
export const addDescartadoStore = (id) => {
  id = Number(id);
  if (!snapshot.includes(id)) {
    snapshot = [...snapshot, id];
    emit();
  }
};
export const removeDescartadoStore = (id) => {
  id = Number(id);
  if (snapshot.includes(id)) {
    snapshot = snapshot.filter((x) => x !== id);
    emit();
  }
};
export const clearDescartadosStore = () => {
  snapshot = EMPTY;
  emit();
};

export const useDescartadosStore = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

export default useDescartadosStore;

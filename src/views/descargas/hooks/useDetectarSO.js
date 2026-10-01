import { useSyncExternalStore } from "react";
import { detectarSO } from "@/data/descargas";

let cached = null;

const subscribe = () => () => {};
const getSnapshot = () => (cached ??= detectarSO());
const getServerSnapshot = () => null;

/**
 * Detecta el SO una vez por sesión. En el servidor es null (misma
 * conducta que el `useState(null)` anterior: se muestra el fallback de
 * Windows + "Tu descarga recomendada") y el cliente se sincroniza tras
 * hidratar, sin setState en efectos.
 */
export const useDetectarSO = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

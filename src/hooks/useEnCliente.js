// src/hooks/useEnCliente.js — false en el render del servidor y en la
// hidratación, true después. Para pintar lo que depende de localStorage sin
// errores de hidratación (el HTML del servidor no puede conocerlo).
import { useSyncExternalStore } from "react";

const suscribir = () => () => {};

export function useEnCliente() {
  return useSyncExternalStore(
    suscribir,
    () => true,
    () => false,
  );
}

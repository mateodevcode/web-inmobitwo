// src/views/publicar-anuncio/paso-2/components/VolverPaso1.jsx
// Barra inferior del paso 2 con el botón "Volver" (al paso 1). Antes solo
// existía el botón Continuar (encima, en TituloDescripcion) y quedaban
// atrapados si faltaban datos básicos. Mirrors el footer del paso 3.
// Los datos del paso 1 ya persisten (formdata en contexto + snapshot).

import { ChevronLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { actualizarPaso, PASO_DATOS_BASICOS } from "@/views/publicar-anuncio/anuncioProgreso";

export default function VolverPaso1() {
  const { setContentNumber } = useAppContext();

  const volver = () => {
    actualizarPaso(PASO_DATOS_BASICOS);
    setContentNumber(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 w-full bg-primero left-0">
      <div className="flex items-center justify-between border-t border-black/10 px-5 py-2">
        <button
          type="button"
          onClick={volver}
          className="flex items-center gap-1 text-base text-black/80 hover:text-black/60 cursor-pointer select-none font-semibold"
        >
          <ChevronLeft className="h-5 w-5" />
          Volver (corregir datos básicos)
        </button>
        <span className="text-xs text-black/40">Paso 2 de 3 · Detalles</span>
      </div>
    </div>
  );
}

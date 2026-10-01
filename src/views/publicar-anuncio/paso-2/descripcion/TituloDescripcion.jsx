import { useState } from "react";
import Bloque from "@/views/publicar-anuncio/components/ui/Bloque";
import DescriptionEditor from "./DescriptionEditor";
import FormatoSelector from "./FormatoSelector";
import { TituloAuto } from "./TituloAuto";
import { DescripcionTabs } from "./DescripcionTabs";
import { IaGeneratePanel } from "./IaGeneratePanel";
import { useRefinarDescripcion } from "./useRefinarDescripcion";
import useDetalles from "@/hooks/useDetalles";
import { irArriba } from "@/utils/irArriba";

const TituloDescripcion = () => {
  const {
    formDataPropiedad,
    setCampo,
    onSubmit,
    loading,
    descripcionesIA,
    generandoIA,
    generarDescripcionesIA,
    usarDescripcionIA,
    tituloGenerado,
  } = useDetalles();

  const [vistaActiva, setVistaActiva] = useState("selector"); // "selector" | "editor"
  const [descripcionEditada, setDescripcionEditada] = useState(
    formDataPropiedad.description ?? "",
  );

  // Guardar cambios mientras edita
  const handleDescripcionChange = (valor) => {
    setDescripcionEditada(valor);
    setCampo("description")(valor);
  };

  const { errorRefinar, cargandoRefinar, refinar } = useRefinarDescripcion({
    descripcionesIA,
    onDescripcionChange: handleDescripcionChange,
    onUsarEditor: () => setVistaActiva("editor"),
  });

  // Usar descripción de IA
  const handleUsarDescripcionIA = (formato) => {
    usarDescripcionIA(formato.descripcion);
    handleDescripcionChange(formato.descripcion);
    setVistaActiva("editor");
  };

  return (
    <Bloque numero={8} titulo="Título y descripción">
      <div className="flex flex-col gap-6 max-w-4xl">
        <TituloAuto tituloGenerado={tituloGenerado} />

        <div>
          <label className="mb-3 block text-xl font-semibold text-slate-900">
            Descripción
          </label>

          <DescripcionTabs
            vistaActiva={vistaActiva}
            onChange={setVistaActiva}
            hasIa={!!descripcionesIA}
          />

          {vistaActiva === "selector" && !descripcionesIA && (
            <IaGeneratePanel
              generando={generandoIA}
              onGenerar={generarDescripcionesIA}
            />
          )}

          {vistaActiva === "selector" && descripcionesIA && (
            <FormatoSelector
              formatos={descripcionesIA.formatos}
              onSeleccionar={handleUsarDescripcionIA}
              onRegenerar={generarDescripcionesIA}
              onRefinar={refinar}
              cargando={generandoIA || cargandoRefinar}
              error={errorRefinar}
            />
          )}

          {vistaActiva === "editor" && (
            <DescriptionEditor
              value={descripcionEditada}
              onChange={handleDescripcionChange}
              placeholder="Describe el inmueble: zona, acabados, estado, cercanía a servicios, ventajas, etc..."
            />
          )}

          {vistaActiva === "editor" && !descripcionesIA && (
            <button
              type="button"
              onClick={generarDescripcionesIA}
              disabled={generandoIA}
              className="mt-4 w-full rounded-md border border-segundo bg-segundo/10 px-6 py-3 text-base font-semibold text-segundo hover:bg-segundo/20 disabled:opacity-50 cursor-pointer select-none active:scale-[0.99] duration-75 transition"
            >
              {generandoIA
                ? "🤖 Creando descripciones..."
                : "💡 O genera con IA"}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={async (e) => {
            onSubmit(e);
            await new Promise((resolve) => setTimeout(resolve, 50));
            irArriba();
          }}
          disabled={loading}
          className="w-full rounded-md bg-tercero px-6 py-3 text-base font-bold text-white hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none disabled:opacity-50 transition"
        >
          {loading ? "Publicando…" : "Continuar a fotos del anuncio →"}
        </button>
      </div>
    </Bloque>
  );
};

export default TituloDescripcion;

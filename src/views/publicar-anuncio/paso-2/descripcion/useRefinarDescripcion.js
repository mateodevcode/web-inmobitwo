import { useState } from "react";
import { apiBackend } from "@/actions/apiBackend";

export const useRefinarDescripcion = ({
  descripcionesIA,
  onDescripcionChange,
  onUsarEditor,
}) => {
  const [errorRefinar, setErrorRefinar] = useState(null);
  const [cargandoRefinar, setCargandoRefinar] = useState(false);

  const refinar = async (formatoId, tonePersonalizado) => {
    setCargandoRefinar(true);
    setErrorRefinar(null);

    try {
      const response = await apiBackend("/ia/refinar-descripcion", "POST", {
        descripcion: descripcionesIA.formatos.find((f) => f.id === formatoId)
          ?.descripcion,
        tone: tonePersonalizado,
        formato: formatoId,
      });

      if (response.success) {
        onDescripcionChange(response.data.descripcionRefinada);
        onUsarEditor();
      } else {
        setErrorRefinar(response.error || "Error al refinar");
      }
    } catch {
      setErrorRefinar("Error al conectar con el servidor");
    } finally {
      setCargandoRefinar(false);
    }
  };

  return { errorRefinar, cargandoRefinar, refinar };
};

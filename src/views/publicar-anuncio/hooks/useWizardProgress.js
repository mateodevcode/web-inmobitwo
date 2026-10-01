import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import useResetForm, {
  mapearApiAFormDataPropiedad,
} from "@/hooks/useResetForm";
import { useRouter, useSearchParams } from "next/navigation";
import { apiBackend } from "@/actions/apiBackend";
import {
  guardarProgreso,
  guardarSnapshot,
  leerProgreso,
  leerSnapshot,
  limpiarTodo,
  PASO_DATOS_BASICOS,
  PASO_DETALLES,
  PASO_FOTOS,
} from "../anuncioProgreso";

export const useWizardProgress = () => {
  const {
    contentNumber,
    setContentNumber,
    setFormDataPropiedad,
    formDataPropiedad,
    iniciarCarga,
    terminarCarga,
  } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { resetFormDataPropiedad } = useResetForm();

  // Progreso guardado (aplica solo cuando NO hay ?id en la URL). Se lee una vez
  // al montar; los cambios de ?id se manejan en el efecto de abajo.
  const [progresoInicial] = useState(() => (id ? null : leerProgreso()));

  const [modalContinuar, setModalContinuar] = useState(
    () => !!progresoInicial?.id,
  );
  const [anuncioGuardado] = useState(() =>
    progresoInicial?.id ? progresoInicial : null,
  );

  const cargarPropiedad = async (anuncioId) => {
    try {
      iniciarCarga();
      const res = await apiBackend(`/propiedades/${anuncioId}`);
      const { success, data } = res;

      if (success && data) {
        // Si ya tiene imagen principal, el proceso ya terminó.
        // No tiene sentido volver al wizard — mandar a la lista.
        if (data.imagen_principal_url) {
          limpiarTodo();
          router.replace("/usuario/mis-anuncios");
          return;
        }

        // Respeta el paso guardado (ej: si el usuario iba de vuelta a "Detalles").
        const progreso = leerProgreso();
        const paso = progreso?.step ?? PASO_FOTOS;
        guardarProgreso({ id: anuncioId, step: paso });
        setFormDataPropiedad(mapearApiAFormDataPropiedad(data));
        setContentNumber(paso - 1);
      } else {
        limpiarTodo();
        router.replace("/info/publicar-anuncio/publicar");
        setContentNumber(0);
      }
    } catch (error) {
      console.error("Error cargando propiedad:", error);
      setContentNumber(0);
    } finally {
      terminarCarga();
    }
  };

  useEffect(() => {
    if (id) {
      // Hay id en la URL => flujo normal, traer datos y ubicarse según el paso
      cargarPropiedad(id);
      return;
    }

    // Sin id: si aún no hay propiedad creada, retomar el paso guardado
    // restaurando el snapshot. El caso "modal" ya quedó inicializado arriba.
    if (
      progresoInicial &&
      !progresoInicial.id &&
      (progresoInicial.step === PASO_DATOS_BASICOS ||
        progresoInicial.step === PASO_DETALLES)
    ) {
      const snapshot = leerSnapshot();
      const paso = progresoInicial.step;
      queueMicrotask(() => {
        if (snapshot) setFormDataPropiedad(snapshot);
        setContentNumber(paso - 1);
      });
      return;
    }

    // Sin progreso pero con snapshot: estaba a mitad del paso 1 → restaurar.
    if (!progresoInicial) {
      const snapshot = leerSnapshot();
      if (snapshot) {
        queueMicrotask(() => setFormDataPropiedad(snapshot));
      }
      // contentNumber se queda en 0 (paso 1)
    }
  }, [id, progresoInicial]);

  // Autosave: mientras esté en pasos 1-2 (sin propiedad creada), guarda un
  // snapshot del formulario para sobrevivir un refresh/cierre del navegador.
  useEffect(() => {
    if (modalContinuar) return;
    if (contentNumber >= PASO_FOTOS - 1) return;
    const t = setTimeout(() => {
      guardarSnapshot(formDataPropiedad);
    }, 500);
    return () => clearTimeout(t);
  }, [contentNumber, formDataPropiedad, modalContinuar]);

  const handleContinuarAnuncio = () => {
    setModalContinuar(false);
    router.push(`/info/publicar-anuncio/publicar?id=${anuncioGuardado.id}`, {
      replace: true,
    });
    // el useEffect se vuelve a disparar porque cambia el id en la URL,
    // y cargarPropiedad se encarga del resto
  };

  const handleNuevoAnuncio = () => {
    limpiarTodo();
    setModalContinuar(false);
    resetFormDataPropiedad(); // resetea el form si aplica
    setContentNumber(0);
    router.push("/info/publicar-anuncio/publicar");
  };

  return {
    modalContinuar,
    anuncioGuardado,
    formDataPropiedad,
    handleContinuarAnuncio,
    handleNuevoAnuncio,
  };
};

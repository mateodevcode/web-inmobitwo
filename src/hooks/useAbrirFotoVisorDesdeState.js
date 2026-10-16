import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Si se llegó a /inmueble/:id con `?visor=fotos|planos|3d|mapa`
 * (antes era `location.state.abrirFotoVisor` de react-router, que no
 * existe en Next.js), redirige al visor de fotos correspondiente.
 *
 * IMPORTANTE: se usa un solo `replace` (nunca replace+push). Con
 * replace+push la entrada con `?visor=` quedaba viva en el historial y
 * al cerrar el visor (`router.back()`) se volvía a ella, el hook se
 * re-disparaba y reabría el visor en bucle.
 */
export default function useAbrirFotoVisorDesdeState(inmuebleId) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const modo = searchParams.get("visor");
    if (!modo || !inmuebleId) return;

    const query =
      modo === "mapa" ? "?mapa=1" : modo === "planos" ? "?planos=1" : "";
    router.replace(`/inmueble/${inmuebleId}/foto/1${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inmuebleId]);
}

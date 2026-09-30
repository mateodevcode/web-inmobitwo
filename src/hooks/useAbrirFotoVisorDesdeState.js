import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Si se llegó a /inmueble/:id con `?visor=fotos|planos|3d|mapa`
 * (antes era `location.state.abrirFotoVisor` de react-router, que no
 * existe en Next.js), redirige al visor de fotos correspondiente y
 * limpia la URL.
 */
export default function useAbrirFotoVisorDesdeState(inmuebleId) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const modo = searchParams.get("visor");
    if (!modo || !inmuebleId) return;

    router.replace(pathname);
    const query =
      modo === "mapa" ? "?mapa=1" : modo === "planos" ? "?planos=1" : "";
    router.push(`/inmueble/${inmuebleId}/foto/1${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inmuebleId]);
}

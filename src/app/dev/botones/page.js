import { notFound } from "next/navigation";
import Showcase from "./Showcase";

// Ruta temporal de desarrollo: muestrario de botones (ver salida.md Fase 2).
// Solo existe en dev; en producción devuelve 404. Sin RutaPrivada.
export default function DevBotonesPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Showcase />;
}

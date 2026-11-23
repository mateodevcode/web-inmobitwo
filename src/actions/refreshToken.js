import { URL_BACKEND } from "@/config/config.js";
import { guardarToken } from "./sesion";

let promesaEnCurso = null;

async function renovarToken() {
  try {
    const res = await fetch(`${URL_BACKEND}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.success && data.data?.accessToken) {
      guardarToken(data.data.accessToken);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function obtenerTokenFresco() {
  if (promesaEnCurso) return promesaEnCurso;

  promesaEnCurso = renovarToken();

  try {
    const exito = await promesaEnCurso;
    return exito;
  } finally {
    promesaEnCurso = null;
  }
}

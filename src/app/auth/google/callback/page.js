"use client";
// src/app/auth/google/callback/page.js — retorno del OAuth con Google.
// El backend redirige aquí con ?code= (un solo uso) que se canjea por la sesión.
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext.js";
import { apiBackend } from "@/actions/apiBackend.js";
import { leerNextActual } from "@/utils/authRedirect.js";

function CallbackContenido() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { guardarSesion } = useAppContext();
  const code = searchParams.get("code");
  const [error, setError] = useState(() => (code ? null : "Falta el código de autorización."));
  // El código es de un solo uso: se comparte la misma promesa entre
  // montajes (StrictMode en dev desmonta y remonta: reenviar daría 401 y
  // descartar el resultado dejaría la página colgada).
  const promesaRef = useRef(null);

  useEffect(() => {
    if (!code) return;
    if (!promesaRef.current) {
      promesaRef.current = Promise.race([
        apiBackend("/auth/oauth/google/canjear", "POST", { code }),
        new Promise((_, rechazar) => {
          setTimeout(() => rechazar(new Error("timeout")), 20000);
        }),
      ]);
    }
    let vivo = true;
    (async () => {
      let res;
      try {
        res = await promesaRef.current;
      } catch (e) {
        if (vivo) {
          setError(
            e?.message === "timeout"
              ? "El servidor no responde (¿backend caído en :3001?)."
              : `Sin respuesta del servidor (${e?.message ?? "red"}).`,
          );
        }
        return;
      }
      if (!vivo) return;
      if (res.success) {
        try {
          await guardarSesion(res.data.usuario, res.data.accessToken);
        } catch (e) {
          setError(`Sesión recibida pero no se pudo guardar (${e?.message}).`);
          return;
        }
        router.replace(leerNextActual() ?? "/");
      } else {
        setError(res.error || "No se pudo completar el ingreso con Google.");
      }
    })();
    return () => {
      vivo = false;
    };
  }, [code, guardarSesion, router]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-primero text-segundo">
      {error ? (
        <div className="max-w-md p-8 text-center">
          <p className="mb-4 font-semibold">No se pudo ingresar con Google</p>
          <p className="mb-4 text-sm">{error}</p>
          <Link href="/login" className="text-sm underline">
            Volver al login
          </Link>
        </div>
      ) : (
        <p>Cargando sesión…</p>
      )}
    </div>
  );
}

export default function RoutePage() {
  return (
    <Suspense fallback={<p>Cargando…</p>}>
      <CallbackContenido />
    </Suspense>
  );
}

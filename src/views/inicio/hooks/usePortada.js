"use client";

import { useEffect, useState } from "react";
import { URL_BACKEND } from "@/config/config";

// ─────────────────────────────────────────────
// Portada del hero con resiliencia en primera carga:
//  A) Reintentos con backoff + timeout por intento.
//  B) Caché local (pinta al instante) que se actualiza
//     solo si la portada cambió (actualizada_en / propiedad_id / imagen).
//  E) Pre-calentado del backend (GET /health fire-and-forget)
//     para despertar instancias frías antes del fetch real.
// ─────────────────────────────────────────────

const STORAGE_KEY = "inmobitwo:portada:v1";
const INTENTOS = 3;
const BACKOFFS = [800, 1800, 3500];
const TIMEOUT_MS = 8000;

const leerCache = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.data ?? null;
  } catch {
    return null;
  }
};

const guardarCache = (data) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data, guardada_en: new Date().toISOString() }),
    );
  } catch {}
};

const esMismaPortada = (a, b) => {
  if (!a || !b) return false;
  return (
    a.propiedad_id === b.propiedad_id &&
    a.imagen === b.imagen &&
    (a.actualizada_en ?? null) === (b.actualizada_en ?? null)
  );
};

const fetchConTimeout = async (url, ms) => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    return r;
  } finally {
    clearTimeout(t);
  }
};

// E) Despertar al backend sin bloquear: el primer fetch en frío
// suele morir mientras la instancia arranca; este ping le da ventaja.
const precalentarBackend = () => {
  try {
    fetch(`${URL_BACKEND}/health`, { cache: "no-store", keepalive: true })
      .then((r) => r.json().catch(() => null))
      .catch(() => {});
  } catch {}
};

const obtenerPortadaFresca = async () => {
  precalentarBackend();
  let ultimoError = null;
  for (let i = 0; i < INTENTOS; i++) {
    try {
      const r = await fetchConTimeout(
        `${URL_BACKEND}/portada`,
        TIMEOUT_MS,
      );
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      if (j?.success && j.data) return j.data;
      throw new Error("Respuesta sin data");
    } catch (err) {
      ultimoError = err;
      if (i < INTENTOS - 1) {
        await new Promise((res) => setTimeout(res, BACKOFFS[i] ?? 2000));
      }
    }
  }
  throw ultimoError;
};

export const usePortada = () => {
  // B) La caché entra como estado inicial: primera pintura instantánea.
  const [destacado, setDestacado] = useState(() => {
    if (typeof window === "undefined") return null;
    return leerCache();
  });
  const [cargando, setCargando] = useState(() => {
    if (typeof window === "undefined") return true;
    return !leerCache();
  });

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        const fresca = await obtenerPortadaFresca();
        if (!vivo) return;
        // B) Solo reescribe si cambió: evita parpadeos y respeta la caché.
        setDestacado((prev) => {
          if (esMismaPortada(prev, fresca)) return prev;
          guardarCache(fresca);
          return fresca;
        });
        // Si no había caché, igual persistir.
        if (!leerCache()) guardarCache(fresca);
      } catch {
        // Sin red tras los reintentos: se queda la caché (o null).
      } finally {
        if (vivo) setCargando(false);
      }
    })();
    return () => {
      vivo = false;
    };
  }, []);

  return { destacado, cargando };
};

export default usePortada;

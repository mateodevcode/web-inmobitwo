// src/hooks/useVistaDetalle.js
// Medición de vista de detalle (algoritmo Fase 6).
// Solo corre en el cliente: se usa dentro de un useEffect y nunca toca
// localStorage/window fuera de él (patrón ConsentimientoBanner: sin este
// cuidado habría mismatch de hidratación).
"use client";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext.js";
import { getSessionId } from "@/utils/getSessionId.js";
import { URL_BACKEND } from "@/config/config.js";
import { debeReintentar, RETRASO_REINTENTO_MS } from "@/utils/reintentoRed.js";

// Umbral de la spec (§3 min_visible_seconds). Debe coincidir con el backend;
// aquí solo decide CUÁNDO enviar, la decisión final la toma el servidor.
const UMBRAL_VISIBLE_MS = 3000;

const leerUtm = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = params.get(k);
      if (v) utm[k] = v;
    }
    return Object.keys(utm).length ? utm : null;
  } catch {
    return null;
  }
};

const resolverSource = (utm) => {
  try {
    if (utm?.utm_source) return "campana";
    if (document.referrer) {
      const r = new URL(document.referrer);
      if (r.host === window.location.host) return "directo";
      return "referer";
    }
    return "directo";
  } catch {
    return "directo";
  }
};

// POST silencioso con keepalive (sobrevive al cierre de pestaña). Sin
// redirecciones ni toasts: un fallo no debe interrumpir la experiencia.
// Política (paso8 punto 5): 503/429 o cualquier HTTP de error → sin reintento;
// fallo de red → 1 reintento tras 5 s. Nada se muestra al usuario.
const postSilencioso = (ruta, datos, intentosPrevios = 0) => {
  let token = null;
  try {
    token = localStorage.getItem("access_token");
  } catch {
    token = null;
  }
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  let promesa;
  try {
    promesa = fetch(`${URL_BACKEND}${ruta}`, {
      method: "POST",
      headers,
      credentials: "include",
      keepalive: true,
      body: JSON.stringify(datos),
    });
  } catch (error) {
    // fetch síncrono no rechaza en la práctica; por simetría se reintenta
    // igual que un fallo de red, una sola vez.
    if (debeReintentar(intentosPrevios, { error })) {
      setTimeout(() => {
        postSilencioso(ruta, datos, intentosPrevios + 1);
      }, RETRASO_REINTENTO_MS);
    }
    return;
  }
  return promesa.then(
    (res) => {
      if (res.ok) return;
      // HTTP de error (503, 429, 500...): nunca se reintenta.
    },
    (error) => {
      if (debeReintentar(intentosPrevios, { error })) {
        setTimeout(() => {
          postSilencioso(ruta, datos, intentosPrevios + 1);
        }, RETRASO_REINTENTO_MS);
      }
    },
  );
};

/**
 * Mide UNA vista de detalle por carga de ficha:
 * 1. Al montar pide el token (`POST /propiedades/:id/view-token`). El token
 *    se pide AL CARGAR (no al enviar): el servidor mide el tiempo visible
 *    como ahora - iat, así que pedirlo tarde marcaría tiempo_insuficiente.
 * 2. Acumula tiempo SOLO con pestaña visible y ventana activa. Al llegar a
 *    3 s envía UN solo evento a `POST /tracking/vista` con el token.
 * Si se cierra antes del umbral no se envía nada (rebote, §4.2).
 * Consentimiento: el evento se envía SIEMPRE (también sin consentimiento).
 * Sin consentimiento NO se lee ni escribe localStorage/cookies (sin anon_id);
 * el servidor usa la identidad débil (hash IP+UA) y marca identidad_debil.
 * El flujo de consentimiento del resto del tracking (scoring/leads) no se
 * toca: sigue exigiéndolo en useTracking.js.
 */
const useVistaDetalle = (propiedadId) => {
  const { consentimientoTracking } = useAppContext();
  const enviadoRef = useRef(null);

  useEffect(() => {
    if (!propiedadId) return;
    if (enviadoRef.current === propiedadId) return; // un evento por carga
    // Foto del consentimiento al montar: decide si hay anon_id. El evento se
    // envía igual con o sin consentimiento (identidad débil si no lo hay).
    const conConsentimiento = consentimientoTracking === true;

    let cancelado = false;
    let visibleMs = 0;
    let inicioVisible = null;
    let timer = null;
    let token = null;
    // Lote 4 punto 2: el acumulador arranca al RECIBIR el token, no al montar.
    // Antes arrancaba al montar: contaba tiempo visible previo a la recepción
    // (desfase ≈ latencia del POST view-token) que el servidor no podía ver.
    let tokenRecibido = false;
    // Paso8 6e: momento de obtención; si la pestaña vuelve visible tras más
    // de 30 min, se pide token nuevo y se reinicia el acumulador.
    let tokenObtenidoEn = 0;
    let pidiendoToken = false;
    const MAX_ANTIGUEDAD_TOKEN_MS = 30 * 60 * 1000;

    // El token se pide al cargar la ficha (ver doc del hook).
    // Política (paso8 punto 5): HTTP de error (503/429/...) → sin reintento;
    // fallo de red → 1 reintento tras 5 s. Silencioso siempre.
    pedirToken();

    function pedirToken(reintento = 0) {
      if (cancelado || enviadoRef.current === propiedadId) return;
      pidiendoToken = true;
      let access = null;
      try {
        access = localStorage.getItem("access_token");
      } catch {
        access = null;
      }
      let promesa;
      try {
        promesa = fetch(`${URL_BACKEND}/propiedades/${propiedadId}/view-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(access && { Authorization: `Bearer ${access}` }),
          },
          credentials: "include",
          keepalive: true,
        });
      } catch (error) {
        pidiendoToken = false;
        if (debeReintentar(reintento, { error })) {
          setTimeout(() => {
            if (!cancelado) pedirToken(reintento + 1);
          }, RETRASO_REINTENTO_MS);
        }
        return;
      }
      promesa.then(
        (res) => {
          if (!res.ok) {
            pidiendoToken = false; // 503/429/...: sin reintento
            return;
          }
          res
            .json()
            .then((data) => {
              const t = data?.data?.view_token;
              if (t && !cancelado) recibirToken(t);
              else pidiendoToken = false;
            })
            .catch(() => {
              pidiendoToken = false;
            });
        },
        (error) => {
          pidiendoToken = false;
          if (debeReintentar(reintento, { error })) {
            setTimeout(() => {
              if (!cancelado) pedirToken(reintento + 1);
            }, RETRASO_REINTENTO_MS);
          }
        },
      );
    }

    function recibirToken(t) {
      token = t;
      pidiendoToken = false;
      // El reloj visible empieza aquí: se descarta lo acumulado antes.
      tokenRecibido = true;
      tokenObtenidoEn = Date.now();
      visibleMs = 0;
      inicioVisible = null;
      clearTimeout(timer);
      try {
        if (document.visibilityState === "visible") alVisitar();
      } catch {
        /* noop */
      }
    }

    function tokenViejo() {
      return tokenRecibido && Date.now() - tokenObtenidoEn > MAX_ANTIGUEDAD_TOKEN_MS;
    }

    const disparar = () => {
      if (cancelado || enviadoRef.current === propiedadId) return;
      if (!token) return; // sin token no hay evento válido; no se reintenta
      enviadoRef.current = propiedadId;
      // Sin consentimiento: nada de localStorage/cookies → anon_id null y el
      // servidor cae a identidad débil (hash IP+UA, identidad_debil = true).
      let anonId = null;
      if (conConsentimiento) {
        try {
          anonId = getSessionId();
        } catch {
          anonId = null;
        }
      }
      const utm = leerUtm();
      let referer = null;
      try {
        referer = document.referrer || null;
      } catch {
        referer = null;
      }
      postSilencioso("/tracking/vista", {
        view_token: token,
        propiedad_id: Number(propiedadId),
        anon_id: anonId,
        source: resolverSource(utm),
        utm,
        referer,
        visible_seconds: Math.round(visibleMs / 1000),
      });
    };

    const programar = () => {
      clearTimeout(timer);
      timer = setTimeout(disparar, Math.max(0, UMBRAL_VISIBLE_MS - visibleMs));
    };

    const alVisitar = () => {
      if (cancelado || enviadoRef.current === propiedadId) return;
      if (!tokenRecibido) return; // el reloj arranca al recibir el token
      inicioVisible = Date.now();
      programar();
    };

    const alOcultar = () => {
      if (inicioVisible !== null) {
        visibleMs += Date.now() - inicioVisible;
        inicioVisible = null;
      }
      clearTimeout(timer);
    };

    const ventanaActiva = () => {
      try {
        return document.hasFocus();
      } catch {
        return true;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible" && ventanaActiva()) {
        if (tokenViejo() && !pidiendoToken) {
          // Paso8 6e: token de hace >30 min → uno nuevo y acumulador de cero.
          pedirToken();
          return;
        }
        alVisitar();
      } else alOcultar();
    };
    const onFocus = () => {
      if (document.visibilityState !== "visible") return;
      if (tokenViejo() && !pidiendoToken) {
        pedirToken();
        return;
      }
      alVisitar();
    };
    const onBlur = () => alOcultar();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Sin chequeo inicial aquí: el primer alVisitar lo dispara la recepción
    // del token (si la pestaña está visible) o el próximo focus/visibility.

    return () => {
      cancelado = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      // Sin envío al desmontar: el evento solo existe al cumplir el umbral.
    };
  }, [propiedadId, consentimientoTracking]);
};

export default useVistaDetalle;

// src/lib/push.js — push web listo pero apagado (NEXT_PUBLIC_PUSH_ENABLED=false).
import { apiBackend } from "@/actions/apiBackend";

export const PUSH_HABILITADO = process.env.NEXT_PUBLIC_PUSH_ENABLED === "true";

const base64ToUint8 = (b64) => {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
};

export async function suscribirPush() {
  if (!PUSH_HABILITADO) return { success: false, error: "Push no habilitado" };
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    return { success: false, error: "Tu navegador no soporta notificaciones push." };

  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") return { success: false, error: "Permiso denegado." };

  const reg = await navigator.serviceWorker.register("/sw.js");
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: base64ToUint8(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
  });
  return apiBackend("/busquedas-guardadas/push/suscripcion", "POST", { subscription: sub.toJSON() });
}

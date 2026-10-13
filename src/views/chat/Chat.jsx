"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import Loading from "@/components/loading/Loading";
import { useAppContext } from "@/context/AppContext";
import {
  listarConversaciones,
  listarMensajes,
  enviarMensaje,
  marcarLeida,
  eliminarConversacion,
} from "@/actions/chat";
import {
  useChatStore,
  setConversaciones,
  setMensajesConv,
  upsertMensaje,
  actualizarUltimoMensaje,
  marcarLeidaLocal,
  setNoLeidosTotal,
  eliminarConversacionLocal,
} from "@/hooks/chatStore";
import ItemConversacion from "./components/ItemConversacion";
import VentanaChat from "./components/VentanaChat";

const nuevoClientMsgId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;

const Chat = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selParam = searchParams.get("c");
  const seleccionadaId = selParam ? Number(selParam) || null : null;
  const { usuario } = useAppContext();
  const miId = usuario?.id;

  const conversaciones = useChatStore((s) => s.conversaciones);
  const mensajesPorConv = useChatStore((s) => s.mensajesPorConv);
  const estadoConexion = useChatStore((s) => s.estadoConexion);

  const [cargandoLista, setCargandoLista] = useState(true);
  const [histCargadoId, setHistCargadoId] = useState(null);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [hayMas, setHayMas] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const leerTimer = useRef(null);

  // Lista inicial (el estado ya nace cargando)
  useEffect(() => {
    listarConversaciones().then((r) => {
      if (r?.success) {
        setConversaciones(r.data);
        setNoLeidosTotal(
          (r.data ?? []).reduce((t, c) => t + (c.noLeidos || 0), 0),
        );
      } else {
        toast.error(r?.error || "No se pudieron cargar los chats", {
          position: "bottom-right",
        });
      }
      setCargandoLista(false);
    });
  }, []);

  const conv = conversaciones.find((c) => c.id === seleccionadaId) ?? null;
  const mensajes = useMemo(
    () =>
      seleccionadaId != null ? (mensajesPorConv[seleccionadaId] ?? []) : [],
    [seleccionadaId, mensajesPorConv],
  );

  // Al seleccionar: historial y leído. Todos los setState viven en el
  // callback async (nada síncrono en el cuerpo del efecto).
  useEffect(() => {
    if (seleccionadaId == null || miId == null) return;
    let cancelado = false;
    listarMensajes(seleccionadaId, null, 30).then((r) => {
      if (cancelado) return;
      if (r?.success) {
        setMensajesConv(seleccionadaId, r.data?.mensajes ?? []);
        setHayMas(r.data?.hayMas ?? false);
      }
      setHistCargadoId(seleccionadaId);
      if (leerTimer.current) clearTimeout(leerTimer.current);
      leerTimer.current = setTimeout(() => {
        marcarLeida(seleccionadaId).then((lr) => {
          if (lr?.success) marcarLeidaLocal(seleccionadaId, miId);
        });
      }, 800);
    });
    return () => {
      cancelado = true;
      if (leerTimer.current) clearTimeout(leerTimer.current);
    };
  }, [seleccionadaId, miId]);

  // Al llegar mensajes visibles de la abierta: marcar leído (debounce).
  useEffect(() => {
    if (seleccionadaId == null || miId == null || mensajes.length === 0) return;
    const ultimo = mensajes[mensajes.length - 1];
    if (ultimo.remitenteId === miId || ultimo.leidoAt) return;
    if (leerTimer.current) clearTimeout(leerTimer.current);
    leerTimer.current = setTimeout(() => {
      marcarLeida(seleccionadaId).then((r) => {
        if (r?.success) marcarLeidaLocal(seleccionadaId, miId);
      });
    }, 800);
  }, [mensajes, seleccionadaId, miId]);

  const seleccionar = useCallback(
    (id) => router.push(id ? `/usuario/chat?c=${id}` : "/usuario/chat"),
    [router],
  );

  const cargarAnteriores = useCallback(async () => {
    if (seleccionadaId == null || mensajes.length === 0) return;
    setCargandoMas(true);
    const r = await listarMensajes(seleccionadaId, mensajes[0].id, 30);
    if (r?.success) {
      const actuales = mensajesPorConv[seleccionadaId] ?? [];
      setMensajesConv(seleccionadaId, [
        ...(r.data?.mensajes ?? []),
        ...actuales,
      ]);
      setHayMas(r.data?.hayMas ?? false);
    }
    setCargandoMas(false);
  }, [seleccionadaId, mensajes, mensajesPorConv]);

  const enviar = useCallback(
    async (contenido) => {
      if (seleccionadaId == null || miId == null || enviando) return;
      setEnviando(true);
      const clientMsgId = nuevoClientMsgId();
      const optimista = {
        id: `tmp-${clientMsgId}`,
        remitenteId: miId,
        contenido,
        createdAt: new Date().toISOString(),
        leidoAt: null,
        clientMsgId,
        estado: "enviando",
      };
      upsertMensaje(seleccionadaId, optimista);
      const r = await enviarMensaje(seleccionadaId, contenido, clientMsgId);
      if (r?.success) {
        upsertMensaje(seleccionadaId, { ...r.data, estado: "ok" });
        actualizarUltimoMensaje(seleccionadaId, r.data, true);
      } else {
        upsertMensaje(seleccionadaId, { ...optimista, estado: "error" });
        toast.error(r?.error || "No se pudo enviar", {
          position: "bottom-right",
        });
      }
      setEnviando(false);
    },
    [seleccionadaId, miId, enviando],
  );

  const reintentar = useCallback(
    (m) => {
      if (seleccionadaId == null) return;
      upsertMensaje(seleccionadaId, { ...m, estado: "enviando" });
      enviarMensaje(seleccionadaId, m.contenido, m.clientMsgId).then((r) => {
        if (r?.success) {
          upsertMensaje(seleccionadaId, { ...r.data, estado: "ok" });
          actualizarUltimoMensaje(seleccionadaId, r.data, true);
        } else {
          upsertMensaje(seleccionadaId, { ...m, estado: "error" });
        }
      });
    },
    [seleccionadaId],
  );

  const confirmarEliminar = useCallback(async () => {
    if (idAEliminar == null || eliminando) return;
    setEliminando(true);
    const r = await eliminarConversacion(idAEliminar);
    if (r?.success) {
      eliminarConversacionLocal(idAEliminar);
      if (idAEliminar === seleccionadaId) seleccionar(null);
      toast.success("Conversación eliminada", { position: "bottom-right" });
      setIdAEliminar(null);
    } else {
      toast.error(r?.error || "No se pudo eliminar", {
        position: "bottom-right",
      });
    }
    setEliminando(false);
  }, [idAEliminar, eliminando, seleccionadaId, seleccionar]);

  const cInvalido =
    selParam != null &&
    !cargandoLista &&
    seleccionadaId != null &&
    conv == null;
  const cargandoHist =
    seleccionadaId != null && histCargadoId !== seleccionadaId;

  return (
    <div className="h-dvh flex flex-col bg-septimo font-poppins">
      <HeaderInmobitwo />
      {estadoConexion !== "conectado" && (
        <p className="text-center text-xs font-semibold text-segundo/60 bg-segundo/5 py-1.5 shrink-0">
          Reconectando…
        </p>
      )}
      <div className="flex-1 min-h-0 flex justify-center w-11/12  md:w-9/12 mx-auto">
        <div className="flex flex-1 min-h-0 w-full md:w-9/12 md:py-4 md:px-0">
          {/* Columna izquierda */}
          <aside
            className={`${
              seleccionadaId != null ? "hidden md:flex" : "flex"
            } w-full md:w-96 shrink-0 flex-col bg-primero border border-segundo/10 md:rounded-md min-h-0`}
          >
            <div className="p-4 border-b border-segundo/10 shrink-0">
              <h1 className="font-montserrat font-bold text-xl text-segundo">
                Chats
              </h1>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-segundo/5">
              {cargandoLista ? (
                <Loading size="sm" />
              ) : conversaciones.length === 0 ? (
                <div className="p-6 flex flex-col gap-3">
                  <h2 className="text-lg font-bold text-segundo">
                    Aún no tienes conversaciones
                  </h2>
                  <p className="text-segundo/80">
                    Pulsa “Contactar por chat” en un anuncio para empezar a
                    hablar con el anunciante.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-primero bg-segundo hover:bg-segundo/80 rounded-md px-5 py-2.5 font-semibold font-montserrat cursor-pointer select-none active:scale-95 transition w-fit"
                  >
                    Buscar viviendas
                  </Link>
                </div>
              ) : (
                conversaciones.map((c) => (
                  <ItemConversacion
                    key={c.id}
                    conv={c}
                    activa={c.id === seleccionadaId}
                    onSelect={seleccionar}
                    onEliminar={setIdAEliminar}
                  />
                ))
              )}
            </div>
          </aside>

          {/* Columna derecha */}
          <main
            className={`${
              seleccionadaId != null ? "flex" : "hidden md:flex"
            } flex-1 min-h-0 flex-col bg-primero w-full border border-segundo/10 md:rounded-md md:ml-4`}
          >
            {cInvalido ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="font-bold text-segundo">
                  Esta conversación no existe o no tienes acceso
                </p>
                <button
                  type="button"
                  onClick={() => seleccionar(null)}
                  className="text-decimo font-semibold hover:underline cursor-pointer"
                >
                  Volver a la lista
                </button>
              </div>
            ) : conv == null ? (
              <div className="flex-1 hidden md:flex items-center justify-center p-6">
                <p className="text-segundo/60 font-semibold">
                  Selecciona una conversación
                </p>
              </div>
            ) : (
              <VentanaChat
                conv={conv}
                mensajes={mensajes}
                miId={miId}
                hayMas={hayMas}
                cargandoMas={cargandoMas}
                cargando={cargandoHist}
                onVolver={() => seleccionar(null)}
                onLoadMore={cargarAnteriores}
                onEnviar={enviar}
                onReintentar={reintentar}
                onEliminar={setIdAEliminar}
                enviando={enviando}
              />
            )}
          </main>
        </div>
      </div>
      {idAEliminar != null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-segundo/40 p-4"
          onClick={() => !eliminando && setIdAEliminar(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-md bg-primero p-6 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-montserrat font-bold text-lg text-segundo">
              Eliminar conversación
            </h2>
            <p className="text-sm text-segundo/80">
              Ya no la verás en tu lista. La otra persona seguirá viendo el
              historial.
            </p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                disabled={eliminando}
                onClick={() => setIdAEliminar(null)}
                className="px-4 py-2 rounded-md border border-segundo/20 font-semibold text-segundo hover:bg-segundo/5 cursor-pointer disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={eliminando}
                onClick={confirmarEliminar}
                className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 cursor-pointer disabled:opacity-50"
              >
                {eliminando ? "Eliminando…" : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

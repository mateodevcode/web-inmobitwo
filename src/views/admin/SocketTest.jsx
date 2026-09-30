"use client";
// Prueba manual del socket-core (:3005) desde el admin.
// Flujo: el canal se crea UNA vez en el VPS con:
//   curl -X POST 127.0.0.1:3005/channels -H 'Content-Type: application/json' \
//     -d '{"name":"admin-test","description":"prueba admin"}'
// Se pega el UUID devuelto abajo, se conectan 2 pestañas y lo enviado
// desde una llega a ambas (broadcast con targets ["*"]).
import { useEffect, useRef, useState } from "react";

const CLAVE_CANAL = "socket-test-channel";

const uid = () =>
  `admin-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;

const SocketTest = () => {
  const [channelId, setChannelId] = useState("");
  const [clientId, setClientId] = useState("");
  const [texto, setTexto] = useState("");
  const [estado, setEstado] = useState("desconectado");
  const [log, setLog] = useState([]);
  const wsRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    setClientId(uid());
    try {
      const guardado = window.localStorage.getItem(CLAVE_CANAL);
      if (guardado) setChannelId(guardado);
    } catch {
      /* sin storage: se escribe a mano */
    }
    return () => wsRef.current?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [log]);

  const agregar = (linea) =>
    setLog((prev) => [...prev.slice(-99), { ...linea, hora: new Date() }]);

  const conectar = () => {
    if (!channelId.trim()) {
      agregar({ tipo: "error", texto: "Pega primero el UUID del canal." });
      return;
    }
    try {
      window.localStorage.setItem(CLAVE_CANAL, channelId.trim());
    } catch {
      /* opcional */
    }
    const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
    const url = `${proto}//${window.location.host}/ws`;
    setEstado("conectando");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({ channel: channelId.trim(), client_id: clientId }),
      );
      setEstado("conectado");
      agregar({ tipo: "info", texto: `Handshake enviado como ${clientId}` });
    };
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.error) {
          agregar({ tipo: "error", texto: `Socket: ${data.error}` });
          return;
        }
        agregar({
          tipo: data.source === "__system__" ? "sistema" : "mensaje",
          texto: JSON.stringify(data.payload),
          fuente: data.source,
        });
      } catch {
        agregar({ tipo: "mensaje", texto: String(ev.data) });
      }
    };
    ws.onerror = () => {
      setEstado("error");
      agregar({
        tipo: "error",
        texto: "Error de conexión (¿/ws habilitado en nginx?).",
      });
    };
    ws.onclose = () => {
      setEstado("desconectado");
      agregar({ tipo: "info", texto: "Desconectado." });
    };
  };

  const desconectar = () => wsRef.current?.close();

  const enviar = () => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) {
      agregar({ tipo: "error", texto: "Conecta primero." });
      return;
    }
    if (!texto.trim()) return;
    wsRef.current.send(
      JSON.stringify({ texto: texto.trim(), de: clientId }),
    );
    setTexto("");
  };

  const colorEstado =
    estado === "conectado"
      ? "bg-green-500"
      : estado === "conectando"
        ? "bg-yellow-500"
        : estado === "error"
          ? "bg-red-500"
          : "bg-gray-400";

  return (
    <div className="max-w-3xl mx-auto p-6 font-poppins">
      <h1 className="text-xl font-bold mb-1">Prueba socket-core</h1>
      <p className="text-sm text-black/50 mb-6">
        Canal pub/sub en el VPS (:3005). Abre esta página en 2 pestañas con el
        mismo UUID: lo enviado desde una llega a ambas.
      </p>

      <div className="flex items-center gap-2 mb-4">
        <span className={`size-3 rounded-full ${colorEstado}`} />
        <span className="text-sm capitalize">{estado}</span>
        <span className="text-xs text-black/40 ml-2">{clientId}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
          placeholder="UUID del canal (POST /channels en el VPS)"
          className="flex-1 border border-black/15 rounded-lg px-3 py-2 text-sm outline-none"
        />
        {estado === "conectado" ? (
          <button
            onClick={desconectar}
            className="px-4 py-2 rounded-lg border border-black/20 text-sm hover:bg-black/5"
          >
            Desconectar
          </button>
        ) : (
          <button
            onClick={conectar}
            className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-black/80"
          >
            Conectar
          </button>
        )}
      </div>

      <div
        ref={logRef}
        className="h-80 overflow-y-auto border border-black/10 rounded-xl p-3 mb-4 bg-black/[0.02] text-sm space-y-1.5"
      >
        {log.length === 0 && (
          <p className="text-black/40">Sin mensajes todavía…</p>
        )}
        {log.map((l, i) => (
          <div
            key={i}
            className={
              l.tipo === "error"
                ? "text-red-600"
                : l.tipo === "sistema"
                  ? "text-black/45 italic"
                  : l.tipo === "info"
                    ? "text-black/45"
                    : "text-black"
            }
          >
            {l.fuente && (
              <span className="font-semibold">[{l.fuente}] </span>
            )}
            {l.texto}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Escribe un mensaje…"
          className="flex-1 border border-black/15 rounded-lg px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={enviar}
          className="px-5 py-2 rounded-lg bg-tercero text-white text-sm font-semibold hover:bg-tercero/80"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default SocketTest;

"use client";
// Chat de prueba sobre socket-core (:3005) — ruta solo admin.
// Canal pub/sub: se crea UNA vez en el VPS y se pega su UUID.
//   curl -X POST 127.0.0.1:3005/channels -H 'Content-Type: application/json' \
//     -d '{"name":"admin-test","description":"prueba admin"}'
//
// Modelo (sin tocar el server):
// - Presencia: el server avisa joins (__system__/client_joined); cada cliente
//   emite ping cada 10s y se marca offline tras 30s sin señales.
// - DMs: el WS emite siempre a ["*"]; el destinatario va en el payload
//   ({para}) y cada cliente filtra. Recibos tipo WhatsApp por id de mensaje.
import { useEffect, useRef, useState } from "react";

const CLAVE_CANAL = "socket-test-channel";
const CLAVE_ALIAS = "socket-test-alias";
const PING_MS = 10_000;
const OFFLINE_MS = 30_000;

const uid = () =>
  `admin-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
const mid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const ahora = () =>
  new Date().toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });

const SocketTest = () => {
  const [channelId, setChannelId] = useState("");
  const [clientId, setClientId] = useState("");
  const [alias, setAlias] = useState("");
  const [destino, setDestino] = useState("*");
  const [texto, setTexto] = useState("");
  const [estado, setEstado] = useState("desconectado");
  const [roster, setRoster] = useState({});
  const [mensajes, setMensajes] = useState([]);
  const wsRef = useRef(null);
  const logRef = useRef(null);
  const yoRef = useRef({ id: "", alias: "" });
  const destinoRef = useRef("*");

  yoRef.current = { id: clientId, alias: alias || clientId };
  destinoRef.current = destino;

  useEffect(() => {
    setClientId(uid());
    try {
      const c = window.localStorage.getItem(CLAVE_CANAL);
      if (c) setChannelId(c);
      const a = window.localStorage.getItem(CLAVE_ALIAS);
      if (a) setAlias(a);
    } catch {
      /* sin storage */
    }
    const adios = () => {
      try {
        wsRef.current?.readyState === WebSocket.OPEN &&
          wsRef.current.send(JSON.stringify({ type: "salida" }));
      } catch {
        /* best-effort */
      }
    };
    window.addEventListener("beforeunload", adios);
    return () => {
      window.removeEventListener("beforeunload", adios);
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [mensajes]);

  // Heartbeat + barrido de presencia
  useEffect(() => {
    if (estado !== "conectado") return;
    const ping = () =>
      wsRef.current?.readyState === WebSocket.OPEN &&
      wsRef.current.send(
        JSON.stringify({ type: "ping", alias: yoRef.current.alias }),
      );
    ping();
    const t1 = setInterval(ping, PING_MS);
    const t2 = setInterval(() => {
      const limite = Date.now() - OFFLINE_MS;
      setRoster((prev) => {
        const sig = { ...prev };
        Object.keys(sig).forEach((id) => {
          if (sig[id].visto < limite) sig[id] = { ...sig[id], online: false };
        });
        return sig;
      });
    }, 5000);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, [estado]);

  const ver = (id, parcial = {}) =>
    setRoster((prev) => ({
      ...prev,
      [id]: {
        alias: parcial.alias || prev[id]?.alias || id,
        online: parcial.online ?? true,
        visto: parcial.visto ?? Date.now(),
      },
    }));

  const enviarCrud = (obj) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(obj));
    }
  };

  const conectar = () => {
    if (!channelId.trim()) return;
    try {
      window.localStorage.setItem(CLAVE_CANAL, channelId.trim());
      if (alias.trim()) window.localStorage.setItem(CLAVE_ALIAS, alias.trim());
    } catch {
      /* opcional */
    }
    const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${proto}//${window.location.host}/ws`);
    wsRef.current = ws;
    setEstado("conectando");

    ws.onopen = () =>
      ws.send(
        JSON.stringify({ channel: channelId.trim(), client_id: clientId }),
      );
    ws.onmessage = (ev) => {
      let data;
      try {
        data = JSON.parse(ev.data);
      } catch {
        return;
      }
      if (data.error) {
        setEstado("error");
        return;
      }
      const fuente = data.source;
      const p = data.payload || {};
      if (fuente === "__system__") {
        // client_joined trae la lista completa de suscritos
        (p.clients || []).forEach((id) =>
          ver(id, id === p.client_id ? { visto: Date.now() } : {}),
        );
        if (p.client_id) ver(p.client_id, { visto: Date.now() });
        return;
      }
      if (p.type === "ping") {
        ver(fuente, { alias: p.alias, visto: Date.now() });
        return;
      }
      if (p.type === "salida") {
        ver(fuente, { online: false });
        return;
      }
      if ((p.type === "recibido" || p.type === "leido") && p.para === clientId) {
        const tick = p.type === "leido" ? "leido" : "recibido";
        setMensajes((prev) =>
          prev.map((m) => (m.id === p.ref ? { ...m, estado: tick } : m)),
        );
        return;
      }
      if (p.kind !== "msg" || !p.texto) return;
      const paraMi = p.para === clientId;
      const esMio = fuente === clientId;
      const esTodos = p.para === "*";
      if (!paraMi && !esMio && !esTodos) return; // DM ajeno: se ignora
      ver(fuente, { alias: p.alias, visto: Date.now() });
      setMensajes((prev) => {
        const idx = prev.findIndex((m) => m.id === p.id);
        if (idx !== -1) {
          // Eco del server de mi propio mensaje: confirma que llegó al canal.
          // Sin este eco en ~3s, el mensaje murió en mi WS (no es bug de UI).
          if (esMio && prev[idx].estado === "enviado") {
            const sig = [...prev];
            sig[idx] = { ...sig[idx], estado: "confirmado" };
            return sig;
          }
          return prev;
        }
        return [
          ...prev.slice(-99),
          {
            id: p.id,
            de: fuente,
            alias: p.alias || fuente,
            para: p.para,
            texto: p.texto,
            hora: p.ts || ahora(),
            estado: esMio ? "enviado" : "recibido",
            mio: esMio,
          },
        ];
      });
      if (!esMio && paraMi) {
        enviarCrud({ type: "recibido", ref: p.id, para: fuente });
        if (destinoRef.current === fuente) {
          enviarCrud({ type: "leido", ref: p.id, para: fuente });
        }
      }
    };
    ws.onerror = () => setEstado("error");
    ws.onclose = () => {
      setEstado("desconectado");
      setRoster((prev) => {
        const sig = { ...prev };
        Object.keys(sig).forEach((id) => (sig[id] = { ...sig[id], online: false }));
        return sig;
      });
    };
    // conectado real: lo confirma el primer client_joined propio
    const espera = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        setEstado("conectado");
        clearInterval(espera);
      } else if (ws.readyState > WebSocket.OPEN) {
        clearInterval(espera);
      }
    }, 300);
  };

  const enviar = () => {
    if (wsRef.current?.readyState !== WebSocket.OPEN || !texto.trim()) return;
    const id = mid();
    enviarCrud({
      kind: "msg",
      id,
      texto: texto.trim(),
      de: clientId,
      alias: alias.trim() || clientId,
      para: destino,
      ts: ahora(),
    });
    // Eco local inmediato (el broadcast propio también llegará y se ignora por id)
    setMensajes((prev) => {
      if (prev.some((m) => m.id === id)) return prev;
      return [
        ...prev.slice(-99),
        {
          id,
          de: clientId,
          alias: alias.trim() || clientId,
          para: destino,
          texto: texto.trim(),
          hora: ahora(),
          estado: "enviado",
          mio: true,
        },
      ];
    });
    setTexto("");
  };

  const visibles = mensajes.filter(
    (m) =>
      destino === "*" ||
      (destino !== "*" &&
        ((m.mio && m.para === destino) || (!m.mio && m.de === destino))),
  );
  const otros = Object.keys(roster).filter((id) => id !== clientId);

  const Tick = ({ estado: e }) => (
    <span
      className={`text-[11px] ml-1 ${e === "leido" ? "text-sky-500" : e === "confirmado" ? "text-white" : e === "recibido" ? "text-white/70" : "text-white/50"}`}
      title={
        e === "enviado"
          ? "Salió de tu navegador (sin eco del server aún)"
          : e === "confirmado"
            ? "El server lo recibió y lo emitió al canal"
            : e === "recibido"
              ? "Le llegó al destinatario"
              : "El destinatario lo vio"
      }
    >
      {e === "leido" ? "✓✓" : e === "enviado" ? "✓" : "✓✓"}
    </span>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 font-poppins">
      <h1 className="text-xl font-bold mb-1">Chat socket-core (prueba)</h1>
      <p className="text-sm text-black/50 mb-4">
        {estado === "conectado"
          ? `Conectado como ${alias || clientId}`
          : "Pega el UUID del canal y conecta."}
      </p>

      <div className="flex flex-col md:flex-row gap-2 mb-3">
        <input
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
          placeholder="UUID del canal"
          disabled={estado === "conectado"}
          className="flex-1 border border-black/15 rounded-lg px-3 py-2 text-sm outline-none disabled:bg-black/5"
        />
        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Tu nombre"
          disabled={estado === "conectado"}
          className="md:w-40 border border-black/15 rounded-lg px-3 py-2 text-sm outline-none disabled:bg-black/5"
        />
        {estado === "conectado" ? (
          <button
            onClick={() => wsRef.current?.close()}
            className="px-4 py-2 rounded-lg border border-black/20 text-sm hover:bg-black/5"
          >
            Salir
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

      {estado === "error" && (
        <p className="text-sm text-red-600 mb-3">
          Error de conexión o del canal (¿UUID válido? ¿/ws habilitado?).
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-2 mb-3">
        <select
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          className="flex-1 border border-black/15 rounded-lg px-3 py-2 text-sm outline-none bg-white"
        >
          <option value="*">Todos (grupo)</option>
          {otros.map((id) => (
            <option key={id} value={id}>
              {roster[id]?.alias || id} {roster[id]?.online ? "" : "(offline)"}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {otros.length === 0 && (
          <span className="text-xs text-black/40">
            Nadie más por aquí todavía…
          </span>
        )}
        {otros.map((id) => (
          <span
            key={id}
            className="inline-flex items-center gap-1.5 text-xs border border-black/10 rounded-full px-2.5 py-1"
          >
            <span
              className={`size-2 rounded-full ${roster[id]?.online ? "bg-green-500" : "bg-red-500"}`}
            />
            {roster[id]?.alias || id}
          </span>
        ))}
      </div>

      <div
        ref={logRef}
        className="h-80 overflow-y-auto border border-black/10 rounded-xl p-3 mb-4 bg-black/[0.02] space-y-2"
      >
        {visibles.length === 0 && (
          <p className="text-sm text-black/40">Sin mensajes todavía…</p>
        )}
        {visibles.map((m) => (
          <div key={m.id} className={`flex ${m.mio ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.mio ? "bg-tercero text-white" : "bg-white border border-black/10"
              }`}
            >
              {!m.mio && (
                <p className="text-[11px] font-semibold text-tercero">{m.alias}</p>
              )}
              <p>{m.texto}</p>
              <p
                className={`text-[11px] text-right ${m.mio ? "text-white/80" : "text-black/40"}`}
              >
                {m.hora}
                {m.mio && <Tick estado={m.estado} />}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder={
            destino === "*"
              ? "Mensaje al grupo…"
              : `Mensaje para ${roster[destino]?.alias || destino}…`
          }
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

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdDeleteOutline } from "react-icons/md";
import Avatar from "@/components/usuario/Avatar";
import Loading from "@/components/loading/Loading";
import { claveDia, etiquetaDia, horaCorta } from "../lib/fechaChat";
import InputMensaje from "./InputMensaje";

const UMBRAL_ABAJO_PX = 120;

const Burbuja = ({ mensaje, miId }) => {
  const mio = mensaje.remitenteId === miId;
  return (
    <div className={`flex ${mio ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl ${
          mio ? "bg-decimo/10" : "bg-segundo/5"
        }`}
      >
        <p className="text-sm text-segundo whitespace-pre-wrap break-words">
          {mensaje.contenido}
        </p>
        <p className="text-[11px] text-segundo/60 text-right mt-0.5 flex items-center justify-end gap-1">
          {mensaje.estado === "enviando" && "enviando · "}
          {mensaje.estado === "error" && (
            <button
              type="button"
              onClick={mensaje.onReintentar}
              className="font-semibold text-decimo hover:underline cursor-pointer"
            >
              no enviado, reintentar ·
            </button>
          )}
          {horaCorta(mensaje.createdAt)}
          {mio && mensaje.leidoAt && <span title="Leído">✓✓</span>}
        </p>
      </div>
    </div>
  );
};

const VentanaChat = ({
  conv,
  mensajes,
  miId,
  hayMas,
  cargandoMas,
  cargando,
  onVolver,
  onLoadMore,
  onEnviar,
  onReintentar,
  onEliminar,
  enviando,
}) => {
  const scrollRef = useRef(null);
  const abajoRef = useRef(true);

  const irAbajo = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    abajoRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < UMBRAL_ABAJO_PX;
    if (el.scrollTop < 80 && hayMas && !cargandoMas) {
      const previo = el.scrollHeight;
      onLoadMore()?.then?.(() => {
        const actual = scrollRef.current;
        if (actual) actual.scrollTop = actual.scrollHeight - previo;
      });
    }
  };

  // Al abrir: abajo del todo.
  useEffect(() => {
    abajoRef.current = true;
    irAbajo();
  }, [conv.id]);

  // Al llegar mensajes: baja solo si el usuario ya estaba abajo.
  useEffect(() => {
    if (abajoRef.current) irAbajo();
  }, [mensajes.length]);

  const grupos = [];
  mensajes.forEach((m) => {
    const clave = claveDia(m.createdAt);
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.clave === clave) ultimo.items.push(m);
    else grupos.push({ clave, items: [m] });
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-primero">
      {/* Cabecera */}
      <div className="flex items-center gap-3 p-3 border-b border-segundo/10 shrink-0">
        <button
          type="button"
          onClick={onVolver}
          aria-label="Volver a la lista"
          className="md:hidden shrink-0 w-9 h-9 rounded-full hover:bg-segundo/5 flex items-center justify-center cursor-pointer"
        >
          <MdKeyboardArrowLeft className="text-2xl text-segundo" />
        </button>
        <Avatar
          nombre={conv.otraPersona?.nombre}
          imagenUrl={conv.otraPersona?.imagenUrl}
          semilla={conv.otraPersona?.id}
          tamano="md"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-segundo truncate">
            {conv.otraPersona?.nombre || "Usuario"}
          </p>
          {conv.propiedad?.disponible === false || conv.propiedad?.id == null ? (
            <p className="text-sm text-segundo/60 truncate">
              Anuncio no disponible
            </p>
          ) : (
            <Link
              href={`/inmueble/${conv.propiedad.id}`}
              className="text-sm text-decimo hover:underline truncate block"
            >
              {conv.propiedad.titulo}
            </Link>
          )}
        </div>
        <button
          type="button"
          title="Eliminar conversación"
          aria-label="Eliminar conversación"
          onClick={() => onEliminar?.(conv.id)}
          className="shrink-0 w-9 h-9 rounded-full hover:bg-segundo/5 flex items-center justify-center cursor-pointer"
        >
          <MdDeleteOutline className="text-xl text-segundo/50 hover:text-red-600" />
        </button>
      </div>

      {/* Mensajes */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-2"
      >
        {cargandoMas && <Loading size="sm" />}
        {grupos.map((g) => (
          <div key={g.clave} className="flex flex-col gap-2">
            <p className="self-center text-xs font-semibold text-segundo/50 bg-segundo/5 rounded-full px-3 py-1">
              {etiquetaDia(g.items[0].createdAt)}
            </p>
            {g.items.map((m) => (
              <Burbuja
                key={m.clientMsgId || m.id}
                mensaje={{
                  ...m,
                  onReintentar: m.estado === "error" ? () => onReintentar(m) : undefined,
                }}
                miId={miId}
              />
            ))}
          </div>
        ))}
        {cargando && <Loading size="sm" />}
      </div>

      <InputMensaje onEnviar={onEnviar} enviando={enviando} />
    </div>
  );
};

export default VentanaChat;

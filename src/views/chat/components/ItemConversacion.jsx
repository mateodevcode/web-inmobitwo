"use client";

import { MdOutlineImageNotSupported } from "react-icons/md";
import Avatar from "@/components/usuario/Avatar";
import { fechaCorta } from "../lib/fechaChat";

const ItemConversacion = ({ conv, activa, onSelect }) => {
  const ultimo = conv.ultimoMensaje;
  return (
    <button
      type="button"
      onClick={() => onSelect(conv.id)}
      className={`w-full flex items-center gap-3 p-3 text-left cursor-pointer select-none transition-colors ${
        activa ? "bg-segundo/5" : "hover:bg-segundo/5"
      }`}
    >
      <div className="relative shrink-0">
        <Avatar
          nombre={conv.otraPersona?.nombre}
          imagenUrl={conv.otraPersona?.imagenUrl}
          semilla={conv.otraPersona?.id}
          tamano="lg"
        />
        {conv.propiedad?.portadaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={conv.propiedad.portadaUrl}
            alt=""
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full object-cover border-2 border-primero"
          />
        ) : (
          <span
            title="Anuncio no disponible"
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-segundo/10 border-2 border-primero flex items-center justify-center"
          >
            <MdOutlineImageNotSupported className="text-xs text-segundo/50" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-segundo/60 truncate">
          {conv.otraPersona?.nombre || "Usuario"}
        </p>
        <p className="font-bold text-segundo truncate">
          {conv.propiedad?.disponible === false
            ? "Anuncio no disponible"
            : conv.propiedad?.titulo || "Anuncio"}
        </p>
        <p className="text-sm text-segundo/70 truncate">
          {ultimo
            ? `${ultimo.deMi ? "Tú: " : ""}${ultimo.texto}`
            : "Sin mensajes todavía"}
        </p>
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1">
        {ultimo && (
          <span className="text-xs text-segundo/60">{fechaCorta(ultimo.at)}</span>
        )}
        {conv.noLeidos > 0 && (
          <span className="min-w-6 h-6 px-1.5 rounded-full bg-tercero text-primero text-xs font-bold flex items-center justify-center">
            {conv.noLeidos > 9 ? "9+" : conv.noLeidos}
          </span>
        )}
      </div>
    </button>
  );
};

export default ItemConversacion;

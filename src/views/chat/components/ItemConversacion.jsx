"use client";

import { MdOutlineImageNotSupported, MdDeleteOutline } from "react-icons/md";
import Avatar from "@/components/usuario/Avatar";
import { fechaCorta } from "../lib/fechaChat";
import Image from "next/image";

const ItemConversacion = ({ conv, activa, onSelect, onEliminar }) => {
  const ultimo = conv.ultimoMensaje;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(conv.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(conv.id);
      }}
      className={`group w-full flex items-center gap-3 p-3 text-left cursor-pointer select-none transition-colors ${
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
          <Image
            src={conv.propiedad.portadaUrl}
            alt=""
            width={500}
            height={500}
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
          <span className="text-xs text-segundo/60">
            {fechaCorta(ultimo.at)}
          </span>
        )}
        <div className="flex items-center gap-1">
          {conv.noLeidos > 0 && (
            <span className="min-w-6 h-6 px-1.5 rounded-full bg-tercero text-primero text-xs font-bold flex items-center justify-center">
              {conv.noLeidos > 9 ? "9+" : conv.noLeidos}
            </span>
          )}
          <button
            type="button"
            title="Eliminar conversación"
            aria-label={`Eliminar conversación con ${conv.otraPersona?.nombre || "usuario"}`}
            onClick={(e) => {
              e.stopPropagation();
              onEliminar?.(conv.id);
            }}
            className="w-8 h-8 rounded-full hover:bg-segundo/10 flex items-center justify-center cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          >
            <MdDeleteOutline className="text-lg text-segundo/50 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemConversacion;

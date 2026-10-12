"use client";

import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

const LIMITE = 2000;
const AVISO_CONTADOR = 1800;

const InputMensaje = ({ onEnviar, enviando }) => {
  const [texto, setTexto] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [texto]);

  const enviar = () => {
    const contenido = texto.trim();
    if (!contenido || enviando) return;
    onEnviar(contenido);
    setTexto("");
  };

  return (
    <div className="border-t border-segundo/10 p-3 bg-primero">
      <div className="flex items-end gap-2">
        <textarea
          ref={ref}
          rows={1}
          value={texto}
          maxLength={LIMITE}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviar();
            }
          }}
          placeholder="Escribe un mensaje…"
          className="flex-1 resize-none rounded-2xl border border-segundo/20 px-4 py-2.5 text-sm text-segundo placeholder:text-segundo/40 focus:outline-none focus:border-decimo max-h-36"
        />
        <button
          type="button"
          onClick={enviar}
          disabled={!texto.trim() || enviando}
          aria-label="Enviar mensaje"
          className="shrink-0 w-11 h-11 rounded-full bg-segundo text-primero flex items-center justify-center hover:bg-segundo/80 active:scale-95 transition disabled:opacity-40 cursor-pointer select-none"
        >
          <IoSend className="text-lg" />
        </button>
      </div>
      {texto.length >= AVISO_CONTADOR && (
        <p className="text-xs text-segundo/60 text-right mt-1">
          {texto.length}/{LIMITE}
        </p>
      )}
    </div>
  );
};

export default InputMensaje;

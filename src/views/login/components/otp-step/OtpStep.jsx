import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { SubmitButton } from "../common/SubmitButton";

const COOLDOWN_SEG = 60;

export function OtpStep({
  email,
  onSubmit,
  onReenviar,
  onVolver,
}) {
  const [codigo, setCodigo] = useState("");
  const [cooldown, setCooldown] = useState(COOLDOWN_SEG);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const reenviar = async () => {
    if (cooldown > 0) return;
    const ok = await onReenviar();
    if (ok) setCooldown(COOLDOWN_SEG);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(codigo);
      }}
      className="flex flex-col gap-3"
    >
      <p className="text-sm text-black/70">
        Te enviamos un código de 6 dígitos a <strong>{email}</strong>.
        Escríbelo abajo para completar tu inicio de sesión.
      </p>

      <div>
        <label className="block text-sm font-medium text-black/80 mb-1">
          Código de verificación
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          required
          autoComplete="one-time-code"
          className="w-full border border-gray-300 px-4 py-2.5 text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <SubmitButton loadingLabel="Verificando...">Verificar e ingresar</SubmitButton>

      <button
        type="button"
        onClick={reenviar}
        disabled={cooldown > 0}
        className="text-blue-600 font-medium py-1 rounded-md transition hover:underline text-sm disabled:text-black/40 disabled:no-underline disabled:cursor-not-allowed"
      >
        {cooldown > 0
          ? `Reenviar código en ${cooldown}s`
          : "Reenviar código"}
      </button>

      <button
        type="button"
        onClick={onVolver}
        className="text-blue-600 font-medium py-2 rounded-md transition hover:underline text-sm flex items-center justify-center gap-2"
      >
        <GoArrowLeft /> <span>Usar otro email</span>
      </button>
    </form>
  );
}

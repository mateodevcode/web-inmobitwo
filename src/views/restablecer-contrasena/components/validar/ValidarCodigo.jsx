import Link from "next/link";
import { OtpInput } from "./OtpInput";

export function ValidarCodigo({
  email,
  onEmailChange,
  codigo,
  onCodigoChange,
  loading,
  onValidar,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onValidar();
      }}
      className="flex flex-col gap-2"
    >
      <div>
        <label className="block text-sm font-medium text-black/70 mb-1">
          Tu email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black/70 mb-1">
          Código de verificación
        </label>
        <OtpInput value={codigo} onChange={onCodigoChange} />
        <p className="mt-2 text-xs text-black/50">
          Ingresa el código de 6 dígitos que enviamos a tu correo.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="hover:bg-tercero/80 text-white bg-tercero font-semibold py-2.5 rounded-md transition disabled:opacity-50 cursor-pointer select-none"
      >
        {loading ? "Validando..." : "Validar código"}
      </button>

      <p className="text-sm text-black/60 mt-2 text-center">
        ¿No recibiste el código?{" "}
        <Link
          href="/olvidaste-tu-password"
          className="text-blue-600 hover:underline font-semibold"
        >
          Reenviar código
        </Link>
      </p>
    </form>
  );
}

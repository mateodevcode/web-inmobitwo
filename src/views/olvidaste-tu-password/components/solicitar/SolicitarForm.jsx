import Link from "next/link";

export function SolicitarForm({ email, onChange, loading, enviado, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
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
          onChange={(e) => onChange(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="hover:bg-tercero/80 text-white bg-tercero font-semibold py-2.5 rounded-md transition disabled:opacity-50 cursor-pointer select-none"
      >
        {loading ? "Enviando..." : "Solicitar código"}
      </button>

      {enviado && (
        <div className="text-green-700 bg-green-700/10 border border-green-700 rounded-md p-3 flex items-center gap-2 text-sm">
          Hemos enviado un código a tu correo electrónico, por favor revisa
          tu bandeja de entrada.
        </div>
      )}

      <p className="text-sm text-black/60 mt-2 text-center font-semibold">
        <Link
          href="/restablecer-contrasena"
          className="text-blue-600 hover:underline"
        >
          Ya tengo un código
        </Link>
      </p>
    </form>
  );
}

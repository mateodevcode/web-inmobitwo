export function CodeForm({
  email,
  loading,
  codigoInput,
  onCodigoChange,
  onEnviarCodigo,
  onConfirmarCodigo,
}) {
  return (
    <form
      onSubmit={onConfirmarCodigo}
      className="mt-4 flex flex-col gap-3 w-sm"
    >
      <p className="text-black/90">
        Te enviamos un código de 6 dígitos a {email}. Escríbelo abajo para
        verificar tu correo.
      </p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={codigoInput}
        onChange={(e) => onCodigoChange(e.target.value.replace(/\D/g, ""))}
        placeholder="000000"
        className="border border-black/30 rounded-md p-3 text-black text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-blue-600"
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading || codigoInput.length !== 6}
          className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Verificando..." : "Confirmar código"}
        </button>
        <button
          type="button"
          onClick={onEnviarCodigo}
          disabled={loading}
          className="text-blue-700 font-semibold hover:underline"
        >
          Reenviar código
        </button>
      </div>
    </form>
  );
}

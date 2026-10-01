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
      <p className="text-segundo/90">
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
        className="border border-segundo/30 rounded-md p-3 text-segundo text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-decimo"
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading || codigoInput.length !== 6}
          className="bg-segundo text-primero px-6 py-2 rounded-md font-semibold hover:bg-segundo/80 disabled:opacity-40 disabled:cursor-not-allowed font-montserrat"
        >
          {loading ? "Verificando..." : "Confirmar código"}
        </button>
        <button
          type="button"
          onClick={onEnviarCodigo}
          disabled={loading}
          className="text-decimo font-semibold hover:underline font-montserrat"
        >
          Reenviar código
        </button>
      </div>
    </form>
  );
}

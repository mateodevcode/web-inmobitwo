export function ContactContinue({ saving, onContinue }) {
  return (
    <>
      <button
        type="button"
        onClick={onContinue}
        disabled={saving}
        className="w-full rounded-md bg-tercero px-6 py-3 text-base font-semibold text-white hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none disabled:opacity-50"
      >
        {saving ? "Guardando..." : "Continuar a detalles del anuncio"}
      </button>

      <p className="text-base text-slate-700">
        En el siguiente paso puedes introducir las características y precio.
      </p>
    </>
  );
}

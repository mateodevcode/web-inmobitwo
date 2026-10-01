import InputField from "@/views/publicar-anuncio/components/ui/InputField";

export function StreetFields({
  streetName,
  onStreetNameChange,
  streetNumber,
  onStreetNumberChange,
  checkError,
  checking,
  onCheckAddress,
}) {
  return (
    <>
      <InputField
        label="Nombre de la vía"
        value={streetName}
        onChange={onStreetNameChange}
      />

      <InputField
        label="Número de vía"
        value={streetNumber}
        onChange={onStreetNumberChange}
      />

      {checkError && <p className="text-base text-tercero">{checkError}</p>}

      <button
        type="button"
        onClick={onCheckAddress}
        disabled={checking}
        className="w-fit rounded-md border border-slate-300 bg-slate-200 px-6 py-3 text-base font-semibold text-slate-900 hover:bg-slate-300 disabled:opacity-50"
      >
        {checking ? "Comprobando..." : "Comprobar dirección"}
      </button>
    </>
  );
}

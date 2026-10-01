import UbicacionMapa from "@/views/anuncio/UbicacionMapa";

export function ConfirmedLocation({ confirmedLocation, onEditLocation }) {
  if (!confirmedLocation) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base text-emerald-700">
        ✓ Ubicación confirmada: {confirmedLocation.lat.toFixed(6)},{" "}
        {confirmedLocation.lng.toFixed(6)}
      </p>
      <UbicacionMapa
        lat={confirmedLocation.lat}
        lng={confirmedLocation.lng}
      />
      <button
        type="button"
        onClick={onEditLocation}
        className="w-fit rounded-md border border-slate-300 bg-slate-200 px-6 py-3 text-base font-semibold text-slate-900 hover:bg-slate-300"
      >
        Editar ubicación
      </button>
    </div>
  );
}

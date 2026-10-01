import usePropiedades from "@/hooks/usePropiedades";

export function DetalleEstado({ propiedad, setLoading, onRecargar }) {
  const { actualizarPropiedad } = usePropiedades();
  const publicado = propiedad.estado === "publicado";

  const handleToggle = async (e) => {
    await actualizarPropiedad(e, propiedad.id, setLoading, {
      estado: publicado ? "no_publicado" : "publicado",
    });
    onRecargar(propiedad.id);
  };

  return (
    <div className="w-full py-5">
      <div className="w-10/12 mx-auto">
        <p className="text-xl md:text-3xl font-bold text-black">
          {`${propiedad?.operacion || "Anuncio"} de ${propiedad?.titulo || ""} (Cod. ${propiedad?.id})`}
        </p>
        <div className="bg-stone-100 w-72 mt-4 p-2 px-4 border border-black/20">
          <p className="font-semibold">
            {publicado ? "Anuncio publicado" : "Anuncio no publicado"}
          </p>
        </div>
        <p className="mt-4 text-black text-lg">
          {`Anuncio gratuito. (Cod. ${propiedad?.id})`}
        </p>

        <button
          type="button"
          onClick={handleToggle}
          className="rounded-md bg-rose-600 px-6 py-2 text-lg md:text-lg font-bold text-white hover:bg-rose-500 active:scale-[0.99] cursor-pointer select-none mt-4 md:mt-8"
        >
          {publicado ? "Desactivar" : "Reactivar gratis"}
        </button>
      </div>
    </div>
  );
}

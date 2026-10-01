import InputField from "@/views/publicar-anuncio/components/ui/InputField";
import TipoSelect from "@/views/publicar-anuncio/components/ui/TipoSelect";

export function BarrioFields({
  city,
  barriosDeLaCiudad,
  barrioOptions,
  barrioValue,
  onBarrioChange,
  barrioModo,
  barrioNombre,
  onBarrioManualChange,
}) {
  if (!city) return null;

  return (
    <>
      {barriosDeLaCiudad.length > 0 && (
        <TipoSelect
          label="Barrio (opcional)"
          placeholder="Selecciona"
          options={barrioOptions}
          value={barrioValue}
          onChange={onBarrioChange}
        />
      )}
      {(barrioModo === "otro" || barriosDeLaCiudad.length === 0) && (
        <InputField
          label="Barrio (opcional)"
          value={barrioNombre}
          onChange={onBarrioManualChange}
          placeholder="Escribe el nombre del barrio"
        />
      )}
    </>
  );
}

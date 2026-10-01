import { X, Plus } from "lucide-react";
import InputField from "@/views/publicar-anuncio/components/ui/InputField";
import TipoSelect from "@/views/publicar-anuncio/components/ui/TipoSelect";
import { COUNTRY_CODES } from "@/data/contact_options";

export function PhonesField({
  phones,
  onPhoneChange,
  onAddPhone,
  onRemovePhone,
  countryCode,
  onCountryCodeChange,
}) {
  return (
    <>
      <div>
        <label className="mb-3 block text-xl font-semibold text-slate-900">
          Prefijo
        </label>
        <TipoSelect
          placeholder="Selecciona"
          options={COUNTRY_CODES}
          value={countryCode}
          onChange={onCountryCodeChange}
          getLabel={(o) => `${o.flag} ${o.code}`}
          disabled
        />
        <p className="mt-2 text-sm text-slate-500">
          Colombia por defecto. Se agregará automáticamente a tus teléfonos.
        </p>
      </div>

      <div>
        <label className="mb-3 block text-xl font-semibold text-slate-900">
          Tus teléfonos
        </label>
        <div className="flex flex-col gap-3">
          {phones.map((phone, i) => (
            <div key={i} className="flex items-start gap-2">
              <InputField
                value={phone}
                onChange={(e) => onPhoneChange(i, e.target.value)}
                placeholder="Ej: 300 123 4567"
              />
              {phones.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemovePhone(i)}
                  aria-label="Quitar teléfono"
                  className="mt-9 shrink-0 rounded-md border border-slate-300 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onAddPhone}
          className="mt-3 inline-flex items-center gap-1 text-base text-blue-600 hover:underline"
        >
          <Plus className="h-4 w-4" /> Añadir teléfono adicional
        </button>
      </div>
    </>
  );
}

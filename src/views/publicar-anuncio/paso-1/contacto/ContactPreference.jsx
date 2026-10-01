import RadioGroupInput from "@/views/publicar-anuncio/components/ui/RadioGroupInput";
import { CONTACT_PREFERENCES } from "@/data/contact_options";

export function ContactPreference({
  preference,
  onChange,
  phoneOptions,
  selectedPhone,
  onSelectPhone,
}) {
  const usaTelefono = preference.id !== "solo_chat";

  return (
    <>
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold text-slate-900">
          ¿Cómo prefieres que te contacten?
        </h3>
        <RadioGroupInput
          options={CONTACT_PREFERENCES}
          value={preference}
          onChange={onChange}
        />
      </div>

      {usaTelefono && phoneOptions.length > 1 && (
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold text-slate-900">
            ¿Por cuál número te contactamos?
          </h3>
          <RadioGroupInput
            options={phoneOptions}
            value={selectedPhone}
            onChange={onSelectPhone}
          />
        </div>
      )}
    </>
  );
}

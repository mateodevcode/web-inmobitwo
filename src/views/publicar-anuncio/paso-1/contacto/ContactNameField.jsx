import InputField from "@/views/publicar-anuncio/components/ui/InputField";

export function ContactNameField({ email, name, onNameChange }) {
  return (
    <>
      <div>
        <label className="mb-3 block text-xl font-semibold text-slate-900">
          Tu email
        </label>
        <input
          value={email ?? ""}
          readOnly
          className="w-96 cursor-default rounded-md border border-slate-300 bg-slate-100 px-4 py-3 text-base text-slate-900 focus:outline-none"
        />
        <p className="mt-2 text-sm text-slate-500">
          Nunca se verá en el anuncio, solo para avisos y notificaciones.
        </p>
      </div>

      <InputField
        label="Tu nombre"
        value={name}
        onChange={onNameChange}
        placeholder="Tu nombre completo"
      />
    </>
  );
}

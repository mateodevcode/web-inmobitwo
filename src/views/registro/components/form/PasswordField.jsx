import { PasswordInput } from "@/components/auth/PasswordInput";

export function PasswordField({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        Contraseña
      </label>
      <PasswordInput
        value={value}
        onChange={onChange}
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        inputClassName="w-full border border-black/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black/60 text-black"
      />
    </div>
  );
}

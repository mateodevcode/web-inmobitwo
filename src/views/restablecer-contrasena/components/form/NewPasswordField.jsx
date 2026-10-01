import { getPasswordChecklist } from "@/utils/validatePassword";
import { PasswordInput } from "@/components/auth/PasswordInput";

const REGLAS = [
  { id: "longitud", label: "Mínimo 8 caracteres" },
  { id: "mayuscula", label: "Una mayúscula" },
  { id: "minuscula", label: "Una minúscula" },
  { id: "numero", label: "Un número" },
  { id: "especial", label: "Un carácter especial" },
];

export function NewPasswordField({ label, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-black/70 mb-1">
        {label}
      </label>
      <PasswordInput
        value={value}
        onChange={onChange}
        autoComplete="new-password"
        inputClassName="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export function PasswordChecklist({ password }) {
  if (!password) return null;
  const checklist = getPasswordChecklist(password);

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {REGLAS.map(({ id, label }) => (
        <div
          key={id}
          className={`text-xs flex items-center ${
            checklist[id] ? "text-green-600" : "text-gray-500"
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              checklist[id] ? "bg-green-600" : "bg-gray-500"
            }`}
          />
          {label}
        </div>
      ))}
    </div>
  );
}

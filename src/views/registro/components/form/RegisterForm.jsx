import { useAppContext } from "@/context/AppContext.js";
import { TextField } from "./TextField";
import { PasswordField } from "./PasswordField";

export function RegisterForm({ values, onChange, onSubmit }) {
  const { loadingAuth } = useAppContext();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <TextField
        label="Nombre"
        type="text"
        name="name"
        value={values.name}
        onChange={onChange}
        placeholder="Tu nombre"
        required
      />

      <TextField
        label="Correo electrónico"
        type="email"
        name="email"
        value={values.email}
        onChange={onChange}
        placeholder="tu@email.com"
        required
      />

      <PasswordField value={values.password} onChange={onChange} />

      <TextField
        label="Teléfono"
        optional
        type="tel"
        name="telefono"
        value={values.telefono}
        onChange={onChange}
        placeholder="+57 300 123 4567"
      />

      <button
        type="submit"
        disabled={loadingAuth}
        className="bg-tercero hover:bg-tercero/80 text-white rounded-md font-semibold py-2.5 transition disabled:opacity-50 cursor-pointer select-none"
      >
        {loadingAuth ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}

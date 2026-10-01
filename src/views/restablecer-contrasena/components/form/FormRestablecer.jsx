import { useState } from "react";
import { validatePasswordRegistro } from "@/utils/validatePassword";
import { NewPasswordField, PasswordChecklist } from "./NewPasswordField";

export function FormRestablecer({ submitting, onSubmit }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const [first] = validatePasswordRegistro(value);
    setErrors((prev) => ({ ...prev, password: first || "" }));
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: value !== password ? "Las contraseñas no coinciden." : "",
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(password, confirmPassword);
      }}
      className="flex flex-col gap-3"
    >
      <NewPasswordField
        label="Nueva contraseña"
        value={password}
        onChange={handlePasswordChange}
        error={errors.password}
      />

      <PasswordChecklist password={password} />

      <NewPasswordField
        label="Confirmar contraseña"
        value={confirmPassword}
        onChange={handleConfirmChange}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={submitting}
        className="hover:bg-tercero/80 text-white bg-tercero font-semibold py-2.5 rounded-md transition disabled:opacity-50 cursor-pointer select-none"
      >
        {submitting ? "Procesando..." : "Restablecer contraseña"}
      </button>
    </form>
  );
}

import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export function PasswordInput({
  value,
  onChange,
  name = "password",
  placeholder = "••••••••",
  autoComplete = "current-password",
  required = true,
  inputClassName = "",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`${inputClassName} pr-11`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        aria-pressed={visible}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/70 cursor-pointer select-none"
      >
        {visible ? (
          <IoEyeOffOutline className="text-xl" />
        ) : (
          <IoEyeOutline className="text-xl" />
        )}
      </button>
    </div>
  );
}

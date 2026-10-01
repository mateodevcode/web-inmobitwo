import { Menu, X } from "lucide-react";

export function MenuToggle({ open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex size-10 items-center justify-center rounded-xl text-segundo lg:hidden"
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
    >
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}

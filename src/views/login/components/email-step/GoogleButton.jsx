import { SlSocialGoogle } from "react-icons/sl";
import { useAppContext } from "@/context/AppContext";
import { URL_BACKEND } from "@/config/config";

// Redirige al backend, que inicia el flujo OAuth con Google.
// next: ruta interna a la que volver tras el ingreso (?next= del login).
export function GoogleButton({ next }) {
  const { loadingAuth } = useAppContext();

  const irAGoogle = () => {
    const qs = next ? `?next=${encodeURIComponent(next)}` : "";
    window.location.href = `${URL_BACKEND}/auth/oauth/google${qs}`;
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={loadingAuth}
        onClick={irAGoogle}
        className="hover:bg-black/80 text-primero bg-segundo font-medium py-2.5 rounded-md transition disabled:opacity-50 border border-black cursor-pointer select-none flex items-center justify-center gap-2"
      >
        <SlSocialGoogle /> <span>Google</span>
      </button>
    </div>
  );
}

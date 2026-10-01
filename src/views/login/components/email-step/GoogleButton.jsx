import { SlSocialGoogle } from "react-icons/sl";
import { useAppContext } from "@/context/AppContext";

export function GoogleButton() {
  const { loadingAuth } = useAppContext();

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={loadingAuth}
        className="hover:bg-black/80 text-primero bg-segundo font-medium py-2.5 rounded-md transition disabled:opacity-50 border border-black cursor-pointer select-none flex items-center justify-center gap-2"
      >
        <SlSocialGoogle /> <span>Google</span>
      </button>
    </div>
  );
}

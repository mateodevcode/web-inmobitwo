import { useAppContext } from "@/context/AppContext";

export function SubmitButton({ loadingLabel, children }) {
  const { loadingAuth } = useAppContext();

  return (
    <button
      type="submit"
      disabled={loadingAuth}
      className="hover:bg-tercero/80 text-white bg-tercero font-semibold py-2.5 rounded-md transition disabled:opacity-50 cursor-pointer select-none"
    >
      {loadingAuth ? loadingLabel : children}
    </button>
  );
}

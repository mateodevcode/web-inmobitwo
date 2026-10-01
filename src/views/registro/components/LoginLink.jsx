import Link from "next/link";
import { buildLoginUrl } from "@/utils/authRedirect.js";

export function LoginLink({ nextRaw = null }) {
  return (
    <p className="text-sm text-black/80 mt-4 text-center font-semibold">
      ¿Ya tienes cuenta?{" "}
      <Link href={buildLoginUrl(nextRaw)} className="text-blue-600 hover:underline">
        Inicia sesión
      </Link>
    </p>
  );
}

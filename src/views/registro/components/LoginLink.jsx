import Link from "next/link";

export function LoginLink() {
  return (
    <p className="text-sm text-black/80 mt-4 text-center font-semibold">
      ¿Ya tienes cuenta?{" "}
      <Link href="/login" className="text-blue-600 hover:underline">
        Inicia sesión
      </Link>
    </p>
  );
}

import Link from "next/link";

export function MensajeConfirmacion() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 mx-auto mb-6">
        <span className="text-white text-3xl font-bold">✓</span>
      </div>
      <h1 className="text-2xl font-bold text-black mb-4">
        ¡Contraseña restablecida!
      </h1>
      <p className="text-black/60 mb-6">
        Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar
        sesión con tu nueva contraseña.
      </p>
      <Link
        href="/login"
        className="hover:bg-tercero/80 text-white bg-tercero font-semibold py-2.5 px-8 rounded-md transition cursor-pointer select-none"
      >
        Iniciar sesión
      </Link>
    </div>
  );
}

import Link from "next/link";
import { SubmitButton } from "../common/SubmitButton";
import { GoogleButton } from "./GoogleButton";

export function EmailStep({ email, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div>
        <label className="block text-sm font-medium text-black/70 mb-1">
          Tu email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="tu@email.com"
          required
          className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <SubmitButton loadingLabel="Validando...">Continuar</SubmitButton>

      <Link
        className="flex items-center justify-end py-2 text-sm hover:underline text-black/80 hover:text-blue-600 cursor-pointer select-none"
        href={"/olvidaste-tu-password"}
      >
        <p>¿Olvidaste tu contraseña?</p>
      </Link>

      <div className="flex items-center justify-center text-xs md:text-base py-2">
        <p className="text-sm font-semibold">También puedes continuar</p>
      </div>

      <GoogleButton />

      <p className="text-sm text-black/60 mt-2 text-center font-semibold">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}

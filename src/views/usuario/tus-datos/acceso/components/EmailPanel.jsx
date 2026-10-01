import { phoneFormatter } from "@/lib/phoneFormatter";

export function EmailPanel({ email, telefono }) {
  return (
    <div className="w-full md:w-150 bg-stone-50 shadow-sm shadow-black/20 p-6 md:p-8 flex flex-col justify-between border border-black/10 mt-6 md:mt-8">
      <div>
        <h3 className="text-xl font-bold text-black">Email de acceso</h3>
        <p className="text-base md:text-lg mt-2 text-black/90">
          Tus datos cuentan con una seguridad adicional. Al iniciar sesión,
          recibirás un código SMS en el móvil {phoneFormatter(telefono)} para
          verificar tu identidad.
        </p>
      </div>

      <div className="bg-stone-100 p-2 border border-black/10 w-full md:w-96 px-4 mt-4">
        <p className="text-base md:text-lg text-black">{email}</p>
      </div>

      <button className="flex items-center gap-2 text-amber-700 mt-4">
        <p className="text-base md:text-lg">
          Si quieres modificar tu email llama al 917882791
        </p>
      </button>
    </div>
  );
}

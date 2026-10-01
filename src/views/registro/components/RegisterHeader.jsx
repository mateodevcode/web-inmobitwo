import Logo from "@/components/logo/Logo";

export function RegisterHeader() {
  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <Logo />
      </div>
      <h1 className="text-xl text-black mb-6 font-poppins text-center">
        Crear cuenta en Inmobitwo
      </h1>
    </>
  );
}

import { HiBuildingOffice2 } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export function EmptyOrgCard() {
  const router = useRouter();

  return (
    <div className="px-2.5 pb-2.5 mt-3">
      <div className="w-full p-4 flex flex-col items-center">
        <div className="mb-2">
          <HiBuildingOffice2 className="text-3xl" />
        </div>
        <p className="font-medium text-sm">Crear mi organización</p>
        <p className="text-xs text-black/50 mt-1">
          Publica propiedades bajo tu propio sello inmobiliario
        </p>
        <button
          className="rounded-md bg-rose-600 px-6 py-2 text-lg md:text-lg font-semibold text-white hover:bg-rose-500 active:scale-[0.99] cursor-pointer select-none mt-4"
          onClick={() => {
            router.push("/inmobiliarias/nueva");
          }}
        >
          registrar inmobiliaria
        </button>
      </div>
    </div>
  );
}

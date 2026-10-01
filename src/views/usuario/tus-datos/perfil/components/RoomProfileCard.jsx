import { MdOutlineModeEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import { data_perfil_usuario } from "@/data/data_perfil_usuario";

export function RoomProfileCard() {
  return (
    <div className="w-full md:w-150 bg-stone-50 shadow-sm shadow-black/20 md:p-8 p-6 flex flex-col justify-between mt-6 md:mt-10 border border-black/10">
      <div>
        <h3 className="text-xl font-bold text-black">
          Perfil para alquilar habitación
        </h3>
        <p className="text-base md:text-lg mt-2 text-black/80">
          Podrás compartir estos datos cuando contactes con anunciantes de
          habitación.
        </p>
        <ul className="list-disc mx-5 mt-4">
          {data_perfil_usuario.map((data, i) => (
            <li key={i} className="my-1">
              {data}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between w-full mt-6">
        <button className="flex items-center gap-2 text-blue-700 cursor-pointer select-none hover:text-blue-600">
          <MdOutlineModeEdit className="text-base md:text-xl" />
          <p className="font-semibold text-base md:text-lg">Editar datos</p>
        </button>
        <button className="flex items-center gap-2 text-blue-700 cursor-pointer select-none hover:text-blue-600">
          <HiOutlineTrash className="text-base md:text-xl" />
          <p className="font-semibold text-base md:text-lg">Borrar perfil</p>
        </button>
      </div>
    </div>
  );
}

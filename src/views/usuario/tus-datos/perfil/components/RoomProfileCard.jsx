import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineModeEdit, MdOutlineSearch } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import { useRoomSeeker } from "../hooks/useRoomSeeker";
import { RoomSeekerForm } from "./RoomSeekerForm";
import { perfilAChips } from "@/data/room_seeker_options";
import { buildGeoPath } from "@/views/inicio/lib/geoPath";
import { irArriba } from "@/utils/irArriba";

const cardCls =
  "w-full md:w-150 bg-stone-50 shadow-sm shadow-segundo/20 md:p-8 p-6 flex flex-col justify-between mt-6 md:mt-10 border border-segundo/10";

function Accion({ onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 text-decimo cursor-pointer select-none hover:text-decimo/80 disabled:opacity-50 disabled:cursor-wait"
    >
      {children}
    </button>
  );
}

const textoBoton = "font-semibold text-base md:text-lg font-montserrat";

export function RoomProfileCard() {
  const router = useRouter();
  const {
    perfil,
    existe,
    cargado,
    editando,
    loading,
    borrando,
    iniciarEdicion,
    cancelarEdicion,
    setCampo,
    guardar,
    eliminar,
  } = useRoomSeeker();
  const [confirmandoBorrado, setConfirmandoBorrado] = useState(false);

  // /arriendo-habitaciones/{ciudad}-{depto}?max={millones}
  const buscarConMiPerfil = () => {
    if (!perfil?.city_slug || !perfil?.state_slug) return;
    const base = buildGeoPath("alquilar", "habitaciones", {
      citySlug: perfil.city_slug,
      departmentSlug: perfil.state_slug,
    });
    if (!base) return;
    const params = new URLSearchParams();
    if (perfil.presupuesto_max) {
      const millones = Number((perfil.presupuesto_max / 1_000_000).toFixed(2));
      if (millones > 0) params.set("max", String(millones));
    }
    const qs = params.toString();
    router.push(qs ? `${base}?${qs}` : base);
    irArriba();
  };

  const borrar = async () => {
    if (!confirmandoBorrado) {
      setConfirmandoBorrado(true);
      return;
    }
    const res = await eliminar();
    if (res?.success) setConfirmandoBorrado(false);
  };

  if (!cargado) {
    return (
      <div className={cardCls}>
        <p className="text-segundo/60 text-base md:text-lg">
          Cargando tu perfil de habitación...
        </p>
      </div>
    );
  }

  // ── Estado: sin perfil ──────────────────────────────
  if (!existe && !editando) {
    return (
      <div className={cardCls}>
        <div>
          <h3 className="text-xl font-bold text-segundo">
            Perfil para alquilar habitación
          </h3>
          <p className="text-base md:text-lg mt-2 text-segundo/80">
            Cuéntanos quién eres y qué buscas: la próxima vez que busques
            habitación podrás aplicar tus filtros con un solo clic.
          </p>
        </div>
        <div className="mt-6">
          <Accion onClick={iniciarEdicion}>
            <MdOutlineModeEdit className="text-base md:text-xl" />
            <p className={textoBoton}>Crear mi perfil</p>
          </Accion>
        </div>
      </div>
    );
  }

  // ── Estado: editando (crear o modificar) ─────────────
  if (editando) {
    return (
      <div className={cardCls}>
        <div>
          <h3 className="text-xl font-bold text-segundo">
            {existe ? "Editar perfil de habitación" : "Tu perfil de habitación"}
          </h3>
          <p className="text-base md:text-lg mt-2 text-segundo/80">
            Estos datos servirán para filtrar tu búsqueda de habitación.
          </p>
          <RoomSeekerForm perfil={perfil ?? {}} onCampo={setCampo} />
        </div>
        <div className="flex items-center gap-4 mt-8">
          <button
            type="button"
            onClick={guardar}
            disabled={loading}
            className="rounded-md bg-tercero px-6 py-3 md:py-2 text-sm md:text-lg font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none font-montserrat disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar perfil"}
          </button>
          <button
            type="button"
            onClick={cancelarEdicion}
            className="font-montserrat rounded-md bg-segundo px-6 py-3 md:py-2 text-sm md:text-lg font-semibold text-primero hover:bg-segundo/80 active:scale-[0.99] cursor-pointer select-none"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  // ── Estado: lectura ──────────────────────────────────
  const chips = perfilAChips(perfil);
  const puedeBuscar = !!(perfil?.city_slug && perfil?.state_slug);

  return (
    <div className={cardCls}>
      <div>
        <h3 className="text-xl font-bold text-segundo">
          Perfil para alquilar habitación
        </h3>
        <p className="text-base md:text-lg mt-2 text-segundo/80">
          Podrás compartir estos datos cuando contactes con anunciantes de
          habitación.
        </p>
        {chips.length > 0 ? (
          <ul className="list-disc mx-5 mt-4">
            {chips.map((chip, i) => (
              <li key={i} className="my-1">
                {chip}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-segundo/60">
            Tu perfil está vacío. Edítalo para completar tus datos.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between w-full mt-6 flex-wrap gap-4">
        <Accion onClick={iniciarEdicion}>
          <MdOutlineModeEdit className="text-base md:text-xl" />
          <p className={textoBoton}>Editar datos</p>
        </Accion>
        <Accion onClick={borrar} disabled={borrando}>
          <HiOutlineTrash className="text-base md:text-xl" />
          <p className={textoBoton}>
            {borrando
              ? "Borrando..."
              : confirmandoBorrado
                ? "Clic de nuevo para confirmar"
                : "Borrar perfil"}
          </p>
        </Accion>
      </div>

      <div className="mt-6 pt-4 border-t border-segundo/10">
        {puedeBuscar ? (
          <Accion onClick={buscarConMiPerfil}>
            <MdOutlineSearch className="text-base md:text-xl" />
            <p className={textoBoton}>Buscar con mi perfil</p>
          </Accion>
        ) : (
          <p className="text-sm text-segundo/60">
            Agrega tu ciudad para buscar habitaciones con un solo clic.
          </p>
        )}
      </div>
    </div>
  );
}

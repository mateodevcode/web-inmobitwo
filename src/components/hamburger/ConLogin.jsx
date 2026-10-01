import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { formatFirstTwoNames } from "@/lib/formatFirstTwoNames";
import { items_menu } from "@/data/items_menu";
import { irArriba } from "@/utils/irArriba";
import { MdLogout, MdOutlineKeyboardArrowRight } from "react-icons/md";
import UserAvatar from "./UserAvatar";
import { useMisAnunciosCount } from "@/hooks/useMisAnunciosCount";

const closeMenus = (setOpenModalHamburguesa, setOpenModalUser) => {
  setOpenModalHamburguesa(false);
  setOpenModalUser(false);
};

const MenuRow = ({ onClick, icon, label, trailing }) => (
  <div
    className="flex items-center gap-4 p-4 rounded-md hover:bg-segundo/5 text-segundo cursor-pointer select-none text-sm"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-base">{label}</span>
    </div>
    {trailing && <div className="text-base">{trailing}</div>}
  </div>
);

const ConLogin = ({ tamano = "lg" }) => {
  const {
    setOpenModalHamburguesa,
    openModalHamburguesa,
    openModalUser,
    usuario,
    setOpenModalUser,
  } = useAppContext();
  const { handleCerrarSesion } = useAuth();
  const router = useRouter();

  const countMisAnuncios = useMisAnunciosCount({
    usuarioId: usuario?.id,
    openModalHamburguesa,
    openModalUser,
  });

  const close = () => closeMenus(setOpenModalHamburguesa, setOpenModalUser);
  const go = (path) => {
    close();
    router.push(path);
  };

  const { name } = usuario || {};

  return (
    <>
      <div
        className="flex gap-2 items-center mb-4 p-3 rounded-md hover:bg-segundo/5 text-segundo cursor-pointer select-none"
        onClick={() => go("/usuario/tus-datos/perfil")}
      >
        <UserAvatar usuario={usuario} tamano={tamano} />
        <div className="flex flex-col">
          <p className="font-semibold text-segundo text-sm">
            {formatFirstTwoNames(name)}
          </p>
          <div className="flex items-center gap-2 -mt-1">
            <p className="text-sm">Ir a tu cuenta</p>
            <MdOutlineKeyboardArrowRight className="text-lg" />
          </div>
        </div>
      </div>

      <div>
        {items_menu.map((item) => (
          <MenuRow
            key={item.id}
            icon={item.icon}
            label={item.label}
            trailing={
              item.id === "mis-anuncios" ? `(${countMisAnuncios})` : null
            }
            onClick={() => {
              go(`/usuario/${item.id}`);
              irArriba();
            }}
          />
        ))}
      </div>

      <div
        className="flex items-center gap-4 p-4 rounded-md hover:bg-segundo/5 text-segundo cursor-pointer select-none text-sm mt-2"
        onClick={() => {
          close();
          handleCerrarSesion();
        }}
      >
        <MdLogout className="text-lg" />
        <span className="text-base">Cerrar sesión</span>
      </div>
    </>
  );
};

export default ConLogin;

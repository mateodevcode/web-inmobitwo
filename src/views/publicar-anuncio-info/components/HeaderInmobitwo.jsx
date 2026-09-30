import { useAppContext } from "@/context/AppContext";
import BotonUsuario from "@/views/usuario/BotonUsuario";
import ModalUser from "@/components/modales/ModalUser";
import { items_menu } from "@/data/items_menu";
import { TbMenu4 } from "react-icons/tb";
import Logo from "@/components/logo/Logo";
import { usePathname, useRouter } from "next/navigation";
import ModalHamburguesa from "@/views/inicio/components/modal-hamburguesa/ModalHamburguesa";

const HeaderInmobitwo = () => {
  const { openModalHamburguesa, setOpenModalHamburguesa, setOpenModalUser } =
    useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const segmento = pathname.split("/usuario/")[1];

  return (
    <>
      <header className="bg-primero flex items-center w-full justify-between">
        <div className="flex items-center mx-auto w-11/12 md:w-9/12 h-20 justify-between">
          <div className="flex items-center gap-2 select-none py-5">
            <Logo />
          </div>
          <div className="items-center gap-2 md:gap-8 font-semibold flex">
            <nav className="hidden md:flex items-center gap-6">
              {items_menu.slice(0, 3).map((item, i) => {
                return (
                  <div
                    className={`flex flex-col items-center cursor-pointer select-none font-montserrat hover:text-tercero active:scale-95 duration-75 transition ${item.id === segmento ? "font-bold text-tercero" : "text-segundo"}`}
                    onClick={() => router.push(`/usuario/${item.id}`)}
                    key={i}
                  >
                    <div className="">{item.icon}</div>
                    <div className="text-sm">{item.label}</div>
                  </div>
                );
              })}
            </nav>

            <BotonUsuario onClick={() => setOpenModalUser(true)} />

            <button
              className="border border-segundo/20 p-2 rounded-sm hover:bg-gray-100 cursor-pointer select-none flex md:hidden"
              onClick={() => {
                setOpenModalHamburguesa(!openModalHamburguesa);
              }}
            >
              <TbMenu4 className="text-2xl text-segundo" />
            </button>
          </div>
        </div>
      </header>
      <ModalUser />
      <ModalHamburguesa />
    </>
  );
};

export default HeaderInmobitwo;

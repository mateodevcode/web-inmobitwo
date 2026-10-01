import { TbMenu4 } from "react-icons/tb";
import { useAppContext } from "@/context/AppContext";

const HamburgerToggle = () => {
  const { openModalHamburguesa, setOpenModalHamburguesa } = useAppContext();

  return (
    <button
      className="border border-segundo/20 p-2 rounded-sm hover:bg-gray-100 cursor-pointer select-none flex md:hidden"
      onClick={() => {
        setOpenModalHamburguesa(!openModalHamburguesa);
      }}
    >
      <TbMenu4 className="text-2xl text-segundo" />
    </button>
  );
};

export default HamburgerToggle;

"use client";

import { TbMenu4 } from "react-icons/tb";
import { useAppContext } from "@/context/AppContext";

const HamburgerButton = () => {
  const { openModalHamburguesa, setOpenModalHamburguesa } = useAppContext();

  return (
    <button
      className="border border-segundo/20 p-2 rounded-sm hover:bg-segundo/3 cursor-pointer select-none flex xl:hidden"
      onClick={() => setOpenModalHamburguesa(!openModalHamburguesa)}
    >
      <TbMenu4 className="text-2xl text-segundo" />
    </button>
  );
};

export default HamburgerButton;

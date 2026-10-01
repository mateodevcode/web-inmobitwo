import { AiOutlineFileSearch } from "react-icons/ai";
import { useAppContext } from "@/context/AppContext";

export function HelpFab() {
  const { openModalInformativo, setOpenModalInformativo } = useAppContext();

  return (
    <div
      className="w-10 h-10 bg-segundo/5 rounded-xl fixed right-2 bottom-2 flex items-center justify-center border border-segundo/5 hover:bg-segundo/10 cursor-pointer select-none active:scale-95 duration-75 transition z-50 lg:hidden"
      onClick={() => setOpenModalInformativo(!openModalInformativo)}
    >
      <AiOutlineFileSearch className="text-xl text-segundo" />
    </div>
  );
}

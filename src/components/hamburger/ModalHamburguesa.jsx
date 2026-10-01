import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useAppContext } from "@/context/AppContext";
import SinLogin from "./SinLogin";
import ConLogin from "./ConLogin";
import EnlacesHamburguesa from "./EnlacesHamburguesa";
import DescargarApp from "./DescargarApp";
import HamburgerHeader from "./HamburgerHeader";

const ModalHamburguesa = () => {
  const { openModalHamburguesa, setOpenModalHamburguesa, usuario } =
    useAppContext();

  useEffect(() => {
    document.body.style.overflow = openModalHamburguesa ? "hidden" : "";
  }, [openModalHamburguesa]);

  const close = () => setOpenModalHamburguesa(false);

  return (
    <AnimatePresence>
      {openModalHamburguesa && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-end bg-black/30 font-poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            className="w-full md:w-100 h-svh flex flex-col bg-white"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <HamburgerHeader onClose={close} />

            <div className="flex-1 overflow-y-auto">
              <div className="border border-black/10 rounded-md m-4 p-4">
                {usuario ? <ConLogin /> : <SinLogin />}
              </div>

              <EnlacesHamburguesa />
            </div>

            <div className="shrink-0 border-t border-gray-200">
              <DescargarApp />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalHamburguesa;

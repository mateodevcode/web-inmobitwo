// Modal para cambiar contraseña

import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from "react-icons/io5";
import useUsuarios from "@/hooks/useUsuarios";

const REQUISITOS = [
  { key: "longitud", label: "Al menos 8 caracteres" },
  { key: "mayuscula", label: "Una mayúscula" },
  { key: "minuscula", label: "Una minúscula" },
  { key: "numero", label: "Un número" },
  { key: "especial", label: "Un carácter especial" },
];

function getPasswordChecklist(passwordNueva) {
  return {
    longitud: passwordNueva.length >= 8,
    mayuscula: /[A-Z]/.test(passwordNueva),
    minuscula: /[a-z]/.test(passwordNueva),
    numero: /[0-9]/.test(passwordNueva),
    especial: /[^A-Za-z0-9]/.test(passwordNueva),
  };
}

const ModalCambiarPassword = () => {
  const { usuario, openModalCambiarPassword, setOpenModalCambiarPassword } =
    useAppContext();
  const { cambiarPassword } = useUsuarios();

  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [mostrarActual, setMostrarActual] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [loading, setLoading] = useState(false);

  const checklist = getPasswordChecklist(passwordNueva);
  const cumpleTodo = Object.values(checklist).every(Boolean);
  const puedeGuardar =
    passwordActual.length > 0 && cumpleTodo && passwordActual !== passwordNueva;

  useEffect(() => {
    if (openModalCambiarPassword) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openModalCambiarPassword]);

  const cerrarModal = () => {
    setOpenModalCambiarPassword(false);
    setPasswordActual("");
    setPasswordNueva("");
    setRecordar(false);
    setMostrarActual(false);
    setMostrarNueva(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!puedeGuardar || loading) return;

    const res = await cambiarPassword(
      e,
      usuario.id,
      setLoading,
      passwordActual,
      passwordNueva,
    );

    if (res?.success) {
      cerrarModal();
    }
  };

  return (
    <AnimatePresence>
      {openModalCambiarPassword && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-segundo/50 font-montserrat backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={cerrarModal}
        >
          <motion.div
            className="bg-primero w-full max-w-md mx-4 rounded-md shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6">
              <h2 className="text-2xl font-bold text-segundo">
                Cambiar contraseña
              </h2>
              <button
                type="button"
                onClick={cerrarModal}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-segundo/5 cursor-pointer select-none"
              >
                <IoIosClose className="text-3xl text-segundo" />
              </button>
            </div>

            {/* Contenido */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4">
              {/* Contraseña actual */}
              <label className="font-semibold text-segundo block mb-2">
                Tu contraseña actual
              </label>
              <div className="relative mb-6">
                <input
                  type={mostrarActual ? "text" : "password"}
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  className="border border-segundo/30 rounded-md p-3 w-full pr-20 text-segundo focus:outline-none focus:border-decimo"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarActual((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-segundo/70 hover:text-segundo cursor-pointer flex items-center gap-1"
                >
                  {mostrarActual ? <FiEyeOff /> : <FiEye />}
                  {mostrarActual ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              {/* Contraseña nueva */}
              <label className="font-semibold text-segundo block mb-2">
                Elige una nueva contraseña
              </label>
              <div className="relative mb-3">
                <input
                  type={mostrarNueva ? "text" : "password"}
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                  className="border border-segundo/30 rounded-md p-3 w-full pr-20 text-segundo focus:outline-none focus:border-decimo"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarNueva((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-segundo/70 hover:text-segundo cursor-pointer flex items-center gap-1"
                >
                  {mostrarNueva ? <FiEyeOff /> : <FiEye />}
                  {mostrarNueva ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              {/* Checklist en vivo */}
              <ul className="mb-2 flex flex-col gap-1">
                {REQUISITOS.map(({ key, label }) => {
                  const ok = checklist[key];
                  return (
                    <li
                      key={key}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        ok ? "text-green-600" : "text-segundo/50"
                      }`}
                    >
                      {ok ? (
                        <IoCheckmarkCircle className="text-base shrink-0" />
                      ) : (
                        <IoCheckmarkCircleOutline className="text-base shrink-0" />
                      )}
                      {label}
                    </li>
                  );
                })}
              </ul>

              {passwordNueva.length > 0 &&
                passwordActual.length > 0 &&
                passwordActual === passwordNueva && (
                  <p className="text-sm text-tercero mb-2">
                    La nueva contraseña debe ser distinta a la actual.
                  </p>
                )}

              {/* Recordar */}
              <label className="flex items-center gap-3 mt-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={recordar}
                  onChange={(e) => setRecordar(e.target.checked)}
                  className="w-5 h-5 accent-tercero cursor-pointer"
                />
                <span className="text-segundo text-sm">
                  Recordar mi contraseña en este dispositivo
                </span>
              </label>

              {/* Guardar */}
              <button
                type="submit"
                disabled={!puedeGuardar || loading}
                className="w-full mt-6 rounded-md bg-tercero py-2.5 text-lg font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {loading ? "Guardando..." : "Guardar nueva contraseña"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCambiarPassword;

import HeaderInmobitwo from "@/components/header-inmobitwo/HeaderInmobitwo";
import { SlidersHorizontal } from "lucide-react";
import HeadPerfilAcceso from "../components/HeadPerfilAcceso";
import { usePerfilForm } from "./hooks/usePerfilForm";
import { AvatarBlock } from "./components/AvatarBlock";
import { EditFields } from "./components/EditFields";
import {
  AccessLinkRow,
  SaveActions,
  EditToggle,
} from "./components/PerfilActions";
import { RoomProfileCard } from "./components/RoomProfileCard";

const Perfil = ({ tamano = "lg" }) => {
  const {
    usuario,
    formDataUsuario,
    editarUsuario,
    setEditarUsuario,
    loading,
    handleChange,
    handleChangeFile,
    setImagenPrincipal,
    setPreviewPrincipal,
    handleGuardar,
    handleEliminarFoto,
  } = usePerfilForm();

  return (
    <div className="flex flex-col font-poppins relative items-center">
      <HeaderInmobitwo />
      <HeadPerfilAcceso />

      {/* contenido */}
      <div className="w-11/12 md:w-10/12 min-h-svh mb-8 md:mb-20">
        <div className="flex items-start md:items-center my-8 gap-4 text-blue-700 cursor-pointer select-none hover:text-blue-600">
          <SlidersHorizontal className="text-xl md:text-2xl" />
          <p className="text-base md:text-xl font-semibold hover:underline">
            Gestionar las notificaciones y el idioma
          </p>
        </div>

        {/* Tus datos */}
        <div className="w-12/12 md:w-150 bg-stone-50 shadow-sm shadow-black/20 p-6 md:p-8 flex flex-col justify-between border border-black/10">
          <div>
            <h3 className="text-xl font-bold text-black">Tus datos</h3>
            <p className="text-base md:text-lg mt-2 text-black/80">
              Estos datos solo se mostrarán cuando contactes con anunciantes o
              publiques un anuncio en inmobitwo.
            </p>
            <AvatarBlock
              usuario={usuario}
              formDataUsuario={formDataUsuario}
              editarUsuario={editarUsuario}
              onFileChange={(e) =>
                handleChangeFile(e, setImagenPrincipal, setPreviewPrincipal)
              }
              onEliminarFoto={handleEliminarFoto}
            />
          </div>

          {editarUsuario && (
            <EditFields formDataUsuario={formDataUsuario} onChange={handleChange} />
          )}

          {editarUsuario && <AccessLinkRow />}

          {editarUsuario ? (
            <SaveActions
              loading={loading}
              onGuardar={handleGuardar}
              onCancelar={() => setEditarUsuario(!editarUsuario)}
            />
          ) : (
            <EditToggle onToggle={() => setEditarUsuario(!editarUsuario)} />
          )}
        </div>

        <RoomProfileCard />
      </div>
    </div>
  );
};

export default Perfil;

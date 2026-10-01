import { PerfilAvatar } from "./PerfilAvatar";

export function AvatarBlock({
  usuario,
  formDataUsuario,
  editarUsuario,
  onFileChange,
  onEliminarFoto,
}) {
  return (
    <div className="my-4">
      <div className="flex gap-3 md:items-center items-start">
        <PerfilAvatar usuario={usuario} />
        <div className="flex flex-col">
          {editarUsuario ? (
            <p className="text-sm md:text-base text-black/60">
              Una buena foto transmite más confianza
            </p>
          ) : (
            <p className="font-semibold text-black text-base md:text-lg">
              {formDataUsuario.name}
            </p>
          )}
          {editarUsuario ? (
            <div className="text-xl flex items-center gap-6">
              {!formDataUsuario.image_url && (
                <PhotoUploadButton
                  label="Subir foto"
                  onFileChange={onFileChange}
                />
              )}
              {formDataUsuario.image_url && (
                <PhotoUploadButton
                  label="Cambiar foto"
                  onFileChange={onFileChange}
                />
              )}

              {formDataUsuario.image_url && (
                <button
                  type="button"
                  onClick={onEliminarFoto}
                  className="text-blue-700 font-semibold hover:underline hover:text-blue-600 cursor-pointer select-none active:scale-95 duration-75 transition"
                >
                  Eliminar foto
                </button>
              )}
            </div>
          ) : (
            <p className="text-base md:text-lg lowercase -mt-1">
              {formDataUsuario.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PhotoUploadButton({ label, onFileChange }) {
  return (
    <button className="text-blue-700 font-semibold hover:underline hover:text-blue-600 cursor-pointer select-none active:scale-95 duration-75 transition relative text-sm md:text-base">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="absolute opacity-0 w-full h-full cursor-pointer"
      />
      {label}
    </button>
  );
}

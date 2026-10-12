import { useAppContext } from "@/context/AppContext";
import { formatFirstTwoNames } from "@/lib/formatFirstTwoNames";
import { getUsernameFromEmail } from "@/lib/getUsernameFromEmail";
import Avatar from "./Avatar";

const BotonUsuario = ({
  onClick,
  tamano = "md",
  mostrarNombre = false,
  className = "",
}) => {
  const { usuario } = useAppContext();
  if (!usuario) return null;

  const { name, email } = usuario;

  return (
    <div
      className={`md:flex gap-2 items-center relative cursor-pointer select-none hidden ${className}`}
      onClick={onClick}
    >
      <div className="hover:bg-segundo/5 absolute inset-0 rounded-full z-20" />
      <Avatar
        nombre={name}
        imagenUrl={usuario.image_url}
        semilla={usuario.id}
        tamano={tamano}
        className="hover:shadow active:scale-95 duration-75 transition"
      />
      {mostrarNombre && (
        <div className="flex flex-col">
          <p className="font-semibold text-segundo text-sm">
            {formatFirstTwoNames(name)}
          </p>
          <p className="text-xs -mt-1">{getUsernameFromEmail(email)}</p>
        </div>
      )}
    </div>
  );
};

export default BotonUsuario;

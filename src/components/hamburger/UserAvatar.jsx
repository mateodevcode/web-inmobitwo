import Image from "next/image";
import { getColorForOrg } from "@/lib/getRandomTailwindColors";
import { getInitials } from "@/lib/getInitials";

const TAMANOS = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-10 h-10 text-base",
};

const UserAvatar = ({ usuario, tamano = "lg" }) => {
  const { name } = usuario || {};
  const sizeClass = TAMANOS[tamano] || TAMANOS.md;

  if (usuario?.image_url) {
    return (
      <Image
        src={usuario.image_url}
        alt={name}
        width={500}
        height={500}
        className={`${sizeClass} rounded-full object-cover border-2 border-primero shadow-sm shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} p-4 rounded-full font-semibold flex items-center justify-center hover:shadow shadow-segundo/10 active:scale-95 duration-75 transition shrink-0`}
      style={getColorForOrg(usuario.id, name)}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;

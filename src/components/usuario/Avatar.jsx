"use client";

import Image from "next/image";
import { getInitials } from "@/lib/getInitials";
import { getColorForOrg } from "@/lib/getRandomTailwindColors";

const TAMANOS = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-10 h-10 text-base",
};

// Avatar reutilizable: foto o iniciales con color.
// Misma receta visual que BotonUsuario (sin sus efectos de hover/active).
const Avatar = ({ nombre, imagenUrl, semilla, tamano = "md", className = "" }) => {
  const sizeClass = TAMANOS[tamano] || TAMANOS.md;

  if (imagenUrl) {
    return (
      <Image
        src={imagenUrl}
        alt={nombre || "Usuario"}
        width={100}
        height={100}
        className={`${sizeClass} rounded-full object-cover border-2 border-primero shadow-sm shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} p-4 rounded-full font-semibold flex items-center justify-center shadow-segundo/10 shrink-0 ${className}`}
      style={getColorForOrg(semilla, nombre)}
    >
      {getInitials(nombre)}
    </div>
  );
};

export default Avatar;

import Image from "next/image";
import { getInitials } from "@/lib/getInitials";
import { getColorForOrg } from "@/lib/getRandomTailwindColors";

const TAMANOS = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-10 h-10 text-base",
};

export function PerfilAvatar({ usuario, tamano = "lg", previewUrl, imageUrl, nombre }) {
  const sizeClass = TAMANOS[tamano] || TAMANOS.md;
  const name = nombre ?? usuario?.name ?? "";
  const id = usuario?.id ?? "";
  // Prioridad: preview local > foto guardada > iniciales.
  const src = previewUrl || imageUrl || usuario?.image_url || null;

  if (src) {
    return (
      <Image
        src={src}
        alt={name || "Foto de perfil"}
        width={160}
        height={160}
        className={`${sizeClass} rounded-full object-cover border-2 border-white shadow-sm shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} p-4 rounded-full font-semibold flex items-center justify-center hover:shadow shadow-black/10 active:scale-95 duration-75 transition shrink-0`}
      style={getColorForOrg(id, name)}
    >
      {getInitials(name)}
    </div>
  );
}

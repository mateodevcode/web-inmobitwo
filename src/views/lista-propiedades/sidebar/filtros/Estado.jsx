
import { SectionTitle, CheckboxFiltro } from "../filtros-components";
import { ESTADOS_INMUEBLE } from "@/data/estados_inmueble";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Estado = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const estado = searchParams.get("estado");
  const seleccionados = (estado ?? "").split(",").filter(Boolean);

  const checked = (opt) => seleccionados.includes(opt.id);

  const toggle = (opt) => {
    const nuevos = new Set(seleccionados);
    if (nuevos.has(opt.id)) nuevos.delete(opt.id);
    else nuevos.add(opt.id);

    const params = new URLSearchParams(searchParams);
    if (nuevos.size) params.set("estado", [...nuevos].join(","));
    else params.delete("estado");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <SectionTitle>Estado</SectionTitle>
      {ESTADOS_INMUEBLE.map((opt) => (
        <CheckboxFiltro
          key={opt.id}
          id={`estado-${opt.id}`}
          label={opt.label}
          checked={checked(opt)}
          onChange={() => toggle(opt)}
        />
      ))}
    </div>
  );
};

export default Estado;

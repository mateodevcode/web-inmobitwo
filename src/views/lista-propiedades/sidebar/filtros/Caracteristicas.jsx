
import { SectionTitle, CheckboxFiltro } from "../filtros-components";
import { CARACTERISTICAS_INMUEBLE } from "@/data/caracteristicas_inmueble";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Caracteristicas = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const caract = searchParams.get("caract");
  const seleccionados = (caract ?? "").split(",").filter(Boolean);

  const checked = (opt) => seleccionados.includes(opt.id);

  const toggle = (opt) => {
    const nuevos = new Set(seleccionados);
    if (nuevos.has(opt.id)) nuevos.delete(opt.id);
    else nuevos.add(opt.id);

    const params = new URLSearchParams(searchParams);
    if (nuevos.size) params.set("caract", [...nuevos].join(","));
    else params.delete("caract");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <SectionTitle>Características</SectionTitle>
      {CARACTERISTICAS_INMUEBLE.map((opt) => (
        <CheckboxFiltro
          key={opt.id}
          id={`caract-${opt.id}`}
          label={opt.label}
          checked={checked(opt)}
          onChange={() => toggle(opt)}
        />
      ))}
    </div>
  );
};

export default Caracteristicas;

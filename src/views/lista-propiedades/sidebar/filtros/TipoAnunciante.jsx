
import { SectionTitle, CheckboxFiltro } from "../filtros-components";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const OPCIONES = [
  { id: "persona", label: "Persona normal" },
  { id: "inmobiliaria", label: "Inmobiliarias" },
];

const TipoAnunciante = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const anunciante = searchParams.get("anunciante");
  const seleccionados = (anunciante ?? "").split(",").filter(Boolean);

  const checked = (opt) => seleccionados.includes(opt.id);

  const toggle = (opt) => {
    const nuevos = new Set(seleccionados);
    if (nuevos.has(opt.id)) nuevos.delete(opt.id);
    else nuevos.add(opt.id);

    const params = new URLSearchParams(searchParams);
    if (nuevos.size) params.set("anunciante", [...nuevos].join(","));
    else params.delete("anunciante");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <SectionTitle>Tipo de anunciante</SectionTitle>
      {OPCIONES.map((opt) => (
        <CheckboxFiltro
          key={opt.id}
          id={`anunciante-${opt.id}`}
          label={opt.label}
          checked={checked(opt)}
          onChange={() => toggle(opt)}
        />
      ))}
    </div>
  );
};

export default TipoAnunciante;

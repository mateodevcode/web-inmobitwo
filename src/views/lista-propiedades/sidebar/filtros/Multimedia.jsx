
import { SectionTitle, CheckboxFiltro } from "../filtros-components";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const OPCIONES = [
  { id: "plano", label: "Con plano" },
  { id: "video_3d", label: "Con video 3D" },
  { id: "video", label: "Con video" },
];

const Multimedia = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const multimedia = searchParams.get("multimedia");
  const seleccionados = (multimedia ?? "").split(",").filter(Boolean);

  const checked = (opt) => seleccionados.includes(opt.id);

  const toggle = (opt) => {
    const nuevos = new Set(seleccionados);
    if (nuevos.has(opt.id)) nuevos.delete(opt.id);
    else nuevos.add(opt.id);

    const params = new URLSearchParams(searchParams);
    if (nuevos.size) params.set("multimedia", [...nuevos].join(","));
    else params.delete("multimedia");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <SectionTitle>Multimedia</SectionTitle>
      {OPCIONES.map((opt) => (
        <CheckboxFiltro
          key={opt.id}
          id={`multimedia-${opt.id}`}
          label={opt.label}
          checked={checked(opt)}
          onChange={() => toggle(opt)}
        />
      ))}
    </div>
  );
};

export default Multimedia;

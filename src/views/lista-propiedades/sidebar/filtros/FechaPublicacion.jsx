
import { SectionTitle, RadioFiltro } from "../filtros-components";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const OPCIONES = [
  { id: "24h", label: "Últimas 24 horas" },
  { id: "semana", label: "La última semana" },
  { id: "mes", label: "El último mes" },
];

const FechaPublicacion = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fecha = searchParams.get("fecha");

  const setFecha = (id) => {
    const params = new URLSearchParams(searchParams);
    if (!id) params.delete("fecha");
    else params.set("fecha", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <SectionTitle>Fecha de publicación</SectionTitle>
      <RadioFiltro
        id="fecha-indiferente"
        name="fecha-publicacion"
        label="Indiferente"
        checked={!fecha}
        onChange={() => setFecha(null)}
      />
      {OPCIONES.map((opt) => (
        <RadioFiltro
          key={opt.id}
          id={`fecha-${opt.id}`}
          name="fecha-publicacion"
          label={opt.label}
          checked={fecha === opt.id}
          onChange={() => setFecha(opt.id)}
        />
      ))}
    </div>
  );
};

export default FechaPublicacion;

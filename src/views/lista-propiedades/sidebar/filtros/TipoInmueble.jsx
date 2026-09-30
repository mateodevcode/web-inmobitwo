
import { SectionTitle, SelectFiltro } from "../filtros-components";
import { PROPERTY_TYPES_FALLBACK } from "@/data/property_types";
import { usePathname, useRouter } from "next/navigation";

const TipoInmueble = ({ operationSlug, typeSlug }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Deriva la selección del tipo actual en la URL (búsqueda realizada)
  const value =
    PROPERTY_TYPES_FALLBACK.find((t) => t.code === typeSlug) ?? null;

  const handleChange = (opt) => {
    if (!opt) return;
    const geoSegment = pathname.split("/").filter(Boolean)[1] ?? "";
    router.push(`/${operationSlug}-${opt.code}/${geoSegment}`);
  };

  return (
    <div className="mb-6">
      <SectionTitle>Tipo de inmueble</SectionTitle>
      <SelectFiltro
        options={PROPERTY_TYPES_FALLBACK}
        value={value}
        onChange={handleChange}
        getLabel={(o) => o.label}
      />
    </div>
  );
};

export default TipoInmueble;

// views/seleccionar-zona/SeleccionarZonaPage.jsx
import { useState } from "react";
import { useSelectZona } from "@/hooks/useSelectZona";
import { buildSearchUrl } from "./utils/urlBuilder";
import SelectZonaMap from "./components/map/SelectZonaMap";
import BarraNavegacionTauri from "@/components/barra-navegacion/BarraNavegacionTauri";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ZonaPageHeader } from "./components/header/ZonaPageHeader";
import { SelectedZoneCard } from "./components/header/SelectedZoneCard";
import { useDeptNames } from "./hooks/useDeptNames";
import { usePolygonSearch } from "./hooks/usePolygonSearch";

function parseOperationAndType(raw) {
  if (!raw) return { operation: "venta", tipoInmueble: "viviendas" };
  // Primer segmento es la operación, el resto es el tipo (soporta compuestos como "obra-nueva")
  const parts = raw.split("-");
  const operation = parts[0] || "venta";
  const tipoInmueble = parts.slice(1).join("-") || "viviendas";
  return { operation, tipoInmueble };
}

export default function SeleccionarZonaPage() {
  const { operationAndType } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { operation, tipoInmueble } = parseOperationAndType(operationAndType);

  const drawFromUrl = searchParams.get("draw") === "true";

  const {
    selectedZone,
    setSelectedZone: selectZone,
    clearZone,
    propertyCount,
    loading,
  } = useSelectZona();
  const deptNames = useDeptNames();
  const [drawMode, setDrawMode] = useState(drawFromUrl);
  const {
    customPolygon,
    polygonProps,
    polygonPropCount,
    polygonLoading,
    clearPolygon,
    handlePolygonChange,
  } = usePolygonSearch(operation, tipoInmueble);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSelectZone = (zone, op, tipo) => {
    selectZone(zone, op, tipo);
  };

  const handleToggleDrawMode = (active) => {
    setDrawMode(active);
    if (active) {
      router.replace(`${pathname}?draw=true`);
      clearZone();
    } else {
      router.replace(pathname);
      clearPolygon();
    }
  };

  const handleVerInmuebles = () => {
    if (customPolygon) {
      const polygonKey = `poly_${Date.now()}`;
      try {
        sessionStorage.setItem(polygonKey, JSON.stringify(customPolygon));
        sessionStorage.setItem(`${polygonKey}_op`, operation);
        sessionStorage.setItem(`${polygonKey}_tipo`, tipoInmueble);
      } catch {}
      router.push(
        `/${operation}-${tipoInmueble}/zona-personalizada?polyKey=${polygonKey}`,
      );
      return;
    }

    const url = buildSearchUrl(
      { ...selectedZone, operation, tipoInmueble },
      deptNames,
    );
    if (url) router.push(url);
  };

  return (
    <div className="flex flex-col w-screen h-dvh relative bg-white font-poppins">
      <ZonaPageHeader
        drawMode={drawMode}
        mobileSearchOpen={mobileSearchOpen}
        onOpenMobileSearch={() => setMobileSearchOpen(true)}
        onCloseMobileSearch={() => setMobileSearchOpen(false)}
        onSelectZone={handleSelectZone}
        operation={operation}
        tipoInmueble={tipoInmueble}
        onBack={() => router.back()}
      />

      <div className="flex-1 relative">
        <SelectZonaMap
          selectedZone={selectedZone}
          onSelectZone={handleSelectZone}
          operation={operation}
          tipoInmueble={tipoInmueble}
          drawMode={drawMode}
          onToggleDrawMode={handleToggleDrawMode}
          onPolygonChange={handlePolygonChange}
          polygonProperties={polygonProps}
          polygonPropCount={polygonPropCount}
          polygonLoading={polygonLoading}
          onVerInmuebles={handleVerInmuebles}
        />
      </div>

      <SelectedZoneCard
        drawMode={drawMode}
        selectedZone={selectedZone}
        propertyCount={propertyCount}
        loading={loading}
        onClear={clearZone}
        onVerInmuebles={handleVerInmuebles}
      />

      <BarraNavegacionTauri />
    </div>
  );
}

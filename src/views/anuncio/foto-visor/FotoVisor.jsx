import { useEffect, useState, useRef } from "react";

import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoArrowRedoOutline, IoClose } from "react-icons/io5";
import { ImImage } from "react-icons/im";
import { FaArchway, FaMapMarkerAlt } from "react-icons/fa";
import { Md3dRotation, MdMyLocation } from "react-icons/md";
import { useAppContext } from "@/context/AppContext";
import { formatPrecioCompleto } from "@/utils/formatPrecio";
import { agruparPorOrden } from "@/utils/galeriaUtils";
import PropertyImage from "@/components/common/PropertyImage";
import usePropiedades from "../../../hooks/usePropiedades";
import { BsArrowsAngleExpand, BsArrowsAngleContract } from "react-icons/bs";
import * as maplibregl from "maplibre-gl";
import { ZoomControl } from "@/components/map/MapControls";
import BotonFavorito from "../anuncio-id/BotonFavorito";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function FotoVisor() {
  const { id, fotoIndex } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { propiedad: inmueble } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  // El modo vive en la URL (?planos=1 / ?3d=1 / ?mapa=1) para que sobreviva a
  // router.replace y a recargas. Se deriva directo de searchParams (sin estado
  // local): antes el modo era un useState inicializado una sola vez y al
  // navegar con las flechas (replace sin query) el visor "se devolvía a las
  // fotos".
  const modo =
    searchParams.get("mapa") === "1"
      ? "mapa"
      : searchParams.get("planos") === "1"
        ? "planos"
        : searchParams.get("3d") === "1"
          ? "3d"
          : "fotos";
  const mapaContainerRef = useRef(null);
  const mapaInstanceRef = useRef(null);
  const [mapa, setMapa] = useState(null);
  const { cargarPropiedad } = usePropiedades();

  useEffect(() => {
    if (id) {
      cargarPropiedad(id);
    }
  }, [id]);

  // ──── Mapa ────
  useEffect(() => {
    if (modo !== "mapa" || !inmueble?.latitude || !inmueble?.longitude) return;
    if (mapaInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapaContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [{ id: "osm-tiles", type: "raster", source: "osm" }],
      },
      center: [inmueble.longitude, inmueble.latitude],
      zoom: 16,
      attributionControl: false,
    });

    const el = document.createElement("div");
    el.innerHTML = `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.6 12.5 27 12.5 27s12.5-18.4 12.5-27C25 5.6 19.4 0 12.5 0z" fill="#FF1B1C"/><circle cx="12.5" cy="12.5" r="5" fill="white"/></svg>`;
    new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([inmueble.longitude, inmueble.latitude])
      .addTo(map);

    mapaInstanceRef.current = map;
    setMapa(map);

    return () => {
      map.remove();
      mapaInstanceRef.current = null;
      setMapa(null);
    };
  }, [modo, inmueble?.latitude, inmueble?.longitude]);

  const handleCentrarMapa = () => {
    const map = mapaInstanceRef.current;
    if (map && inmueble?.latitude && inmueble?.longitude) {
      map.flyTo({
        center: [inmueble.longitude, inmueble.latitude],
        zoom: 16,
        duration: 800,
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-2000 bg-black flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  if (!inmueble) return null;

  // Una "foto" = filas con el mismo orden (5 tamaños). La portada (orden -1)
  // ya viene dentro de galeria y queda primera. Agrupar evita "saltar" entre
  // tamaños de la misma foto al navegar.
  const fotosAgrupadas = agruparPorOrden(inmueble.galeria);
  const planosAgrupados = agruparPorOrden(inmueble.planos);

  const totalImagenes = fotosAgrupadas.length;
  const totalPlanos = planosAgrupados.length;

  const modosDisponibles = [
    ...(totalImagenes > 0 ? ["fotos"] : []),
    ...(totalPlanos > 0 ? ["planos"] : []),
    ...(inmueble?.video_3d ? ["3d"] : []),
    ...(inmueble?.latitude && inmueble?.longitude ? ["mapa"] : []),
  ];
  const indexActual = Math.min(
    Math.max(parseInt(fotoIndex, 10) - 1, 0),
    Math.max(totalImagenes - 1, 0),
  );
  // El índice de la URL se reutiliza como posición genérica entre modos,
  // pero cada modo se acota a su propio total para no salir de rango.
  const indexPlanos = Math.min(
    Math.max(parseInt(fotoIndex, 10) - 1, 0),
    Math.max(totalPlanos - 1, 0),
  );
  const nombreEspacio =
    inmueble.galeria?.[indexActual - 1]?.etiqueta ||
    (indexActual === 0 ? "Salón" : "");

  const tieneMapa = Boolean(inmueble?.latitude && inmueble?.longitude);
  const tiene3d = Boolean(inmueble?.video_3d);
  // Secuencia lineal única: fotos → planos → 3D → mapa (solo los que existen).
  const totalPasos =
    totalImagenes + totalPlanos + (tiene3d ? 1 : 0) + (tieneMapa ? 1 : 0);
  const mostrarFlechas = totalPasos > 1;

  const specsLinea = [
    inmueble.constructed_area
      ? `${inmueble.constructed_area} m²`
      : inmueble.private_area
        ? `${inmueble.private_area} m²`
        : null,
    inmueble.bedroom_count != null ? `${inmueble.bedroom_count} alc.` : null,
    inmueble.floor
      ? `${inmueble.floor} ${inmueble.has_elevator ? "con ascensor" : ""}`
      : null,
    inmueble.estrato != null ? `Estrato ${inmueble.estrato}` : null,
  ].filter(Boolean);

  const irA = (nuevoModo, posicion1Based) => {
    const query =
      nuevoModo === "planos"
        ? "?planos=1"
        : nuevoModo === "mapa"
          ? "?mapa=1"
          : nuevoModo === "3d"
            ? "?3d=1"
            : "";
    router.replace(`/inmueble/${id}/foto/${posicion1Based}${query}`);
  };

  const irAModo = (nuevoModo) => {
    // Al cambiar de pestaña se empieza en la posición 1 de ese modo
    // (cada galería tiene su propio total; reutilizar el índice del otro
    // modo mostraba una posición arbitraria).
    if (nuevoModo === "planos") {
      irA("planos", 1);
    } else if (nuevoModo === "mapa") {
      irA("mapa", indexActual + 1);
    } else if (nuevoModo === "3d") {
      irA("3d", 1);
    } else {
      irA("fotos", 1);
    }
  };

  const handleNavegar = (direccion) => {
    // Secuencia lineal única: fotos → planos → 3D → mapa (solo los que
    // existen). Al acabarse un modo se entra al siguiente; al retroceder del
    // primero de un modo se va al último del anterior. Al final hay wrap
    // (mapa → foto 1, foto 1 → último modo).
    if (modosDisponibles.length === 0) return;
    const totalDe = (m) =>
      m === "fotos" ? totalImagenes : m === "planos" ? totalPlanos : 1;
    const posDe = (m) =>
      m === "fotos" ? indexActual : m === "planos" ? indexPlanos : 0;
    let actual = modosDisponibles.includes(modo)
      ? modo
      : modosDisponibles[0];
    const total = totalDe(actual);

    // Paso dentro del mismo modo (galerías con varios items).
    if (total > 1) {
      const pos = posDe(actual) + direccion;
      if (pos >= 0 && pos < total) {
        irA(actual, pos + 1);
        return;
      }
    }
    // Salto de modo (borde alcanzado, o modo de un solo paso como 3D/mapa).
    const idx = modosDisponibles.indexOf(actual);
    const len = modosDisponibles.length;
    const vecino =
      modosDisponibles[(((idx + direccion) % len) + len) % len];
    // Hacia adelante se entra por el primero; hacia atrás por el último.
    irA(vecino, direccion > 0 ? 1 : totalDe(vecino));
  };

  const cerrar = () => router.back();

  // Navegacion con teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (fullscreen) {
        if (e.key === "Escape" || e.key === "F11") {
          e.preventDefault();
          setFullscreen(false);
          return;
        }
        if (e.key === "ArrowRight") handleNavegar(1);
        if (e.key === "ArrowLeft") handleNavegar(-1);
        return;
      }
      if (e.key === "ArrowRight") handleNavegar(1);
      if (e.key === "ArrowLeft") handleNavegar(-1);
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexActual, indexPlanos, totalImagenes, totalPlanos, fullscreen, modo]);

  const counterText = (() => {
    switch (modo) {
      case "fotos":
        return `Foto ${indexActual + 1}/${totalImagenes}`;
      case "planos":
        return totalPlanos > 0
          ? `Plano ${indexPlanos + 1}/${totalPlanos}`
          : "Plano no disponible";
      case "mapa":
        return "Mapa de zona";
      case "plano":
        return "Plano";
      case "3d":
        return "Vista 3D";
      default:
        return "";
    }
  })();

  const btnClass = (m) =>
    `flex items-center gap-2 border-2 px-3 py-1.5 text-sm font-semibold cursor-pointer justify-center ${
      modo === m
        ? "border-tercero text-tercero bg-tercero/20"
        : "border-black/80 text-gray-800 hover:border-tercero hover:text-tercero hover:bg-tercero/20"
    }`;

  return (
    <div className="fixed inset-0 z-2000 bg-white flex flex-col font-poppins">
      {/* ──── Header ──── */}
      {!fullscreen && (
        <div className="w-full mx-auto border-b border-gray-200 flex items-center justify-center relative font-poppins">
          <div className="flex items-center justify-between px-4 py-3 w-full md:w-8/12">
            <div className="min-w-0">
              <h1 className="font-semibold text-black truncate">
                {inmueble.titulo}
              </h1>
              <p className="text-sm text-black/70 font-semibold flex items-center gap-2 flex-wrap">
                <span>{formatPrecioCompleto(inmueble.precio)}</span>
                {specsLinea.map((s, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="w-px h-3 bg-gray-300" />
                    {s}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0 ml-4">
              <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">
                <IoArrowRedoOutline className="text-lg" />
                Compartir
              </button>
              <div className="hidden sm:flex">
                <BotonFavorito id={inmueble.id} />
              </div>
              {/* <button className="bg-[#e6007a] text-white text-sm font-semibold rounded-sm px-5 py-2 hover:bg-[#c40068] transition-colors"> */}
              <button
                className="bg-tercero text-white text-sm font-semibold rounded-sm px-5 py-2 hover:bg-tercero/80 transition-colors border-2 border-black cursor-pointer select-none"
                type="button"
                onClick={() => alert("Contactar")}
              >
                Contactar
              </button>
              <button
                onClick={cerrar}
                className="text-black/60 hover:text-black absolute right-4 hidden md:flex cursor-pointer select-none"
                title="Cerrar"
              >
                <IoClose className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──── Contenido principal ──── */}
      <div
        className={`relative flex-1 flex items-center justify-center min-h-0 ${fullscreen ? "fixed inset-0 z-2100 bg-black" : ""}`}
      >
        <button
          type="button"
          onClick={cerrar}
          className="absolute top-3 left-4 bg-white border-2 border-black rounded-sm px-4 py-2.5 text-sm font-semibold shadow hover:bg-gray-100 z-10 md:hidden flex items-center gap-1 text-black"
        >
          <MdKeyboardArrowLeft className="text-lg" />
          Volver
        </button>
        {modo === "mapa" && inmueble?.latitude && inmueble?.longitude ? (
          <div className="w-full h-full relative">
            <div ref={mapaContainerRef} className="w-full h-full" />
            {mapa && (
              <div className="absolute bottom-4 right-4 z-10">
                <ZoomControl map={mapa} />
              </div>
            )}
            <button
              onClick={handleCentrarMapa}
              className="absolute top-3 md:right-12 right-4 bg-white border-2 border-black rounded-sm px-5 py-2.5 text-sm font-semibold shadow hover:bg-gray-100 z-10 flex items-center gap-1 text-black"
            >
              <MdMyLocation className="text-sm" />
              Centrar
            </button>
            {fullscreen && (
              <button
                onClick={() => setFullscreen(false)}
                className="absolute top-4 left-4 z-2200 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-lg p-3 transition-colors duration-200 cursor-pointer"
                title="Salir de pantalla completa"
              >
                <BsArrowsAngleContract className="text-2xl" />
              </button>
            )}
            {/* Flechas de la secuencia lineal (mapa es el último paso) */}
            {mostrarFlechas && (
              <>
                <button
                  onClick={() => handleNavegar(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Anterior"
                >
                  <MdOutlineKeyboardArrowLeft className="text-2xl text-black" />
                </button>
                <button
                  onClick={() => handleNavegar(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Siguiente"
                >
                  <MdOutlineKeyboardArrowRight className="text-2xl text-black" />
                </button>
              </>
            )}
          </div>
        ) : modo === "plano" ? (
          <div className="flex items-center justify-center text-gray-400 text-lg">
            Plano no disponible
          </div>
        ) : modo === "planos" && totalPlanos > 0 ? (
          <>
            <PropertyImage
              foto={planosAgrupados[indexPlanos]}
              tamañoBase="xlarge"
              sizes="200vw"
              alt={`Plano ${indexPlanos + 1}`}
              className={`${fullscreen ? "w-full h-full" : "max-w-full max-h-full"} object-contain select-none`}
            />

            {fullscreen && (
              <button
                onClick={() => setFullscreen(false)}
                className="absolute bottom-4 right-4 z-2200 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-lg p-3 transition-colors duration-200 cursor-pointer"
                title="Salir de pantalla completa"
              >
                <BsArrowsAngleContract className="text-2xl" />
              </button>
            )}

            {/* Flechas de la secuencia lineal: al acabarse los planos sigue 3D/mapa */}
            {mostrarFlechas && (
              <>
                <button
                  onClick={() => handleNavegar(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Anterior"
                >
                  <MdOutlineKeyboardArrowLeft className="text-2xl text-black" />
                </button>
                <button
                  onClick={() => handleNavegar(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Siguiente"
                >
                  <MdOutlineKeyboardArrowRight className="text-2xl text-black" />
                </button>
              </>
            )}
          </>
        ) : modo === "3d" ? (
          <>
            <div className="flex items-center justify-center text-gray-400 text-lg">
              Vista 3D no disponible
            </div>
            {/* Flechas de la secuencia lineal (3D es un paso único) */}
            {mostrarFlechas && (
              <>
                <button
                  onClick={() => handleNavegar(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Anterior"
                >
                  <MdOutlineKeyboardArrowLeft className="text-2xl text-black" />
                </button>
                <button
                  onClick={() => handleNavegar(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Siguiente"
                >
                  <MdOutlineKeyboardArrowRight className="text-2xl text-black" />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <PropertyImage
              foto={fotosAgrupadas[indexActual]}
              tamañoBase="xlarge"
              sizes="200vw"
              alt={nombreEspacio || inmueble.titulo}
              className={`${fullscreen ? "w-full h-full" : "max-w-full max-h-full"} object-contain select-none`}
            />

            {fullscreen && (
              <button
                onClick={() => setFullscreen(false)}
                className="absolute bottom-4 right-4 z-2200 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-lg p-3 transition-colors duration-200 cursor-pointer"
                title="Salir de pantalla completa"
              >
                <BsArrowsAngleContract className="text-2xl" />
              </button>
            )}

            {/* Flechas de la secuencia lineal (al acabarse las fotos siguen planos) */}
            {mostrarFlechas && (
              <>
                <button
                  onClick={() => handleNavegar(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Anterior"
                >
                  <MdOutlineKeyboardArrowLeft className="text-2xl text-black" />
                </button>
                <button
                  onClick={() => handleNavegar(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white transition duration-300 flex items-center justify-center text-xl shadow-lg border border-black/20 z-10"
                  title="Siguiente"
                >
                  <MdOutlineKeyboardArrowRight className="text-2xl text-black" />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* ──── Footer ──── */}
      {!fullscreen && (
        <div className="flex items-center justify-center border-t border-gray-200 mx-auto w-full">
          <div className="flex items-center md:flex-row flex-col justify-between md:px-6 px-0 py-3 w-full md:w-8/12 gap-4">
            <div className="md:w-30">
              <p className="text-xs text-gray-500">{counterText}</p>
            </div>

            <div className="gap-0.5 md:gap-0 items-center flex-wrap grid grid-cols-3 md:grid-cols-4">
              {totalImagenes > 0 && (
                <button
                  onClick={() => irAModo("fotos")}
                  className={btnClass("fotos")}
                >
                  <ImImage className="text-base" />
                  {totalImagenes} fotos
                </button>
              )}
              {totalPlanos > 0 && (
                <button
                  onClick={() => irAModo("planos")}
                  className={btnClass("planos")}
                >
                  <FaArchway className="text-sm" />
                  {totalPlanos} planos
                </button>
              )}
              {inmueble?.video_3d && (
                <button
                  onClick={() => irAModo("3d")}
                  className={btnClass("3d")}
                >
                  <Md3dRotation className="text-base" />
                  Visita 3D
                </button>
              )}
              {inmueble?.latitude && inmueble?.longitude && (
                <button
                  onClick={() => irAModo(modo === "mapa" ? "fotos" : "mapa")}
                  className={btnClass("mapa")}
                >
                  <FaMapMarkerAlt className="text-sm" />
                  Mapa
                </button>
              )}
            </div>

            <button
              onClick={() => setFullscreen(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline cursor-pointer md:w-36"
            >
              <BsArrowsAngleExpand className="text-base" />
              {modo === "planos" ? "Ampliar plano" : "Ampliar foto"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

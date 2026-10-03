import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { HiOutlineTrash, HiOutlineXMark, HiOutlineStar } from "react-icons/hi2";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";
import usePropiedades from "@/hooks/usePropiedades";

const MAX_MB = 10;

// La galería trae hasta 5 filas por foto (una por tamaño, mismo `orden`).
// Se colapsa por foto prefiriendo el tamaño medium.
function fotosUnicas(filas = [], { soloPortada = false } = {}) {
  const porOrden = new Map();
  for (const fila of filas) {
    if (!!fila?.es_portada !== soloPortada) continue;
    if (fila?.orden == null || !fila?.url) continue;
    const actual = porOrden.get(fila.orden);
    if (!actual || fila.tamaño === "medium") porOrden.set(fila.orden, fila);
  }
  return [...porOrden.values()];
}

function archivosValidos(fileList) {
  const validos = [];
  for (const file of Array.from(fileList ?? [])) {
    if (!file.type.startsWith("image/")) {
      toast.error(`"${file.name}" no es una imagen`, {
        position: "bottom-right",
      });
      continue;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`"${file.name}" supera los ${MAX_MB}MB`, {
        position: "bottom-right",
      });
      continue;
    }
    validos.push(file);
  }
  return validos;
}

export function FotosCard({ propiedad }) {
  const { actualizarFotosPropiedad, cargarPropiedad } = usePropiedades();
  const [gestionando, setGestionando] = useState(false);
  const [loading, setLoading] = useState(false);
  // Pendientes: [{ file, url }] — la URL se crea al seleccionar
  // (evento), nunca en el render.
  const [nuevasFotos, setNuevasFotos] = useState([]);
  const [portadaFile, setPortadaFile] = useState(null);
  const [portadaPreview, setPortadaPreview] = useState(null);
  const [borrarOrdenes, setBorrarOrdenes] = useState([]);
  const [nuevosPlanos, setNuevosPlanos] = useState([]);
  const [borrarPlanos, setBorrarPlanos] = useState([]);
  // Swap de portada: orden de la foto de galería a promover (una sola).
  const [portadaOrden, setPortadaOrden] = useState(null);
  // Espejo para revocar URLs al desmontar (se escribe en efecto, no en render).
  const pendientesRef = useRef({ fotos: [], planos: [], portada: null });

  const portada = propiedad?.imagen_principal_url ?? null;
  const fotos = fotosUnicas(propiedad?.galeria);
  const planos = fotosUnicas(propiedad?.planos);
  const total = fotos.length + (portada ? 1 : 0);

  useEffect(() => {
    pendientesRef.current = {
      fotos: nuevasFotos,
      planos: nuevosPlanos,
      portada: portadaPreview,
    };
  });

  useEffect(() => {
    const espejo = pendientesRef;
    return () => {
      const p = espejo.current;
      [...p.fotos, ...p.planos].forEach((item) => URL.revokeObjectURL(item.url));
      if (p.portada) URL.revokeObjectURL(p.portada);
    };
  }, []);

  const limpiarTemporal = () => {
    [...nuevasFotos, ...nuevosPlanos].forEach((item) =>
      URL.revokeObjectURL(item.url),
    );
    if (portadaPreview) URL.revokeObjectURL(portadaPreview);
    setNuevasFotos([]);
    setPortadaFile(null);
    setPortadaPreview(null);
    setBorrarOrdenes([]);
    setNuevosPlanos([]);
    setBorrarPlanos([]);
    setPortadaOrden(null);
  };

  const cancelar = () => {
    limpiarTemporal();
    setGestionando(false);
  };

  const quitarPendiente = (lista, setLista, i) => {
    const item = lista[i];
    if (item?.url) URL.revokeObjectURL(item.url);
    setLista(lista.filter((_, j) => j !== i));
  };

  // Convierte FileList en [{ file, url }] al seleccionar (evento).
  const agregarPendientes = (setLista) => (e) => {
    const items = archivosValidos(e.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setLista((prev) => [...prev, ...items]);
    e.target.value = "";
  };

  const toggleBorrar = (orden) => {
    // No se puede borrar y promover la misma foto a la vez.
    setPortadaOrden((prev) => (prev === orden ? null : prev));
    setBorrarOrdenes((prev) =>
      prev.includes(orden)
        ? prev.filter((o) => o !== orden)
        : [...prev, orden],
    );
  };

  // Elegir una foto de galería como portada (swap: la actual pasa a galería).
  // Excluyente con subir archivo de portada y con borrar esa foto.
  const elegirPortada = (orden) => {
    setPortadaOrden((prev) => (prev === orden ? null : orden));
    setBorrarOrdenes((prev) => prev.filter((o) => o !== orden));
    if (portadaPreview) URL.revokeObjectURL(portadaPreview);
    setPortadaFile(null);
    setPortadaPreview(null);
  };

  const toggleBorrarPlano = (orden) => {
    setBorrarPlanos((prev) =>
      prev.includes(orden)
        ? prev.filter((o) => o !== orden)
        : [...prev, orden],
    );
  };

  const guardar = async () => {
    const res = await actualizarFotosPropiedad(propiedad.id, setLoading, {
      imagenPrincipal: portadaFile,
      galeriaFiles: nuevasFotos.map((p) => p.file),
      planosFiles: nuevosPlanos.map((p) => p.file),
      imagesToDelete: borrarOrdenes,
      planosToDelete: borrarPlanos,
      portadaOrden,
    });
    if (res?.success) {
      limpiarTemporal();
      setGestionando(false);
      await cargarPropiedad(propiedad.id);
    }
  };

  if (!gestionando && total === 0 && planos.length === 0) {
    return (
      <DetalleCard
        title="Fotos y vídeos"
        action={
          <CardActionLink
            Icon={MdOutlinePhotoCamera}
            className="mt-4"
            onClick={() => setGestionando(true)}
          >
            Añadir tus fotos para recibir más contactos
          </CardActionLink>
        }
      >
        <div className="bg-tercero/10 p-6 mt-4">
          <p className="text-red-800 font-bold text-xl">
            Tu anuncio no tiene fotos
          </p>
          <p className="text-lg mt-2 text-segundo">
            Tu anuncio recibirá un 90% menos de contactos que los que tienen
            fotos.
          </p>
        </div>
      </DetalleCard>
    );
  }

  return (
    <DetalleCard
      title={`Fotos y vídeos (${total})${planos.length > 0 ? ` · Planos (${planos.length})` : ""}`}
      action={
        gestionando ? (
          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={guardar}
              disabled={loading}
              className="rounded-md bg-tercero px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none font-montserrat disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar fotos"}
            </button>
            <button
              type="button"
              onClick={cancelar}
              className="rounded-md bg-segundo px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-segundo/80 active:scale-[0.99] cursor-pointer select-none font-montserrat"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <CardActionLink
            Icon={MdOutlinePhotoCamera}
            className="mt-4"
            onClick={() => setGestionando(true)}
          >
            Gestionar fotos
          </CardActionLink>
        )
      }
    >
      {/* Portada */}
      {(portada || (gestionando && portadaPreview)) && (
        <div className="mt-4">
          <p className="text-sm text-segundo/70 mb-2">Foto principal</p>
          <div className="relative aspect-[4/3] max-w-sm overflow-hidden rounded-md">
            <Image
              src={portadaPreview ?? portada}
              alt="Foto principal del anuncio"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
            <span className="absolute top-2 left-2 bg-segundo/80 text-primero text-xs font-semibold px-2 py-1 rounded">
              Principal
            </span>
          </div>
          {gestionando && (
            <label className="inline-block mt-2 text-sm md:text-base font-semibold text-decimo hover:text-decimo/80 cursor-pointer select-none">
              Cambiar portada
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const [file] = archivosValidos(e.target.files);
                  if (!file) return;
                  if (portadaPreview) URL.revokeObjectURL(portadaPreview);
                  // Archivo nuevo manda sobre el swap pendiente.
                  setPortadaOrden(null);
                  setPortadaFile(file);
                  setPortadaPreview(URL.createObjectURL(file));
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
      )}

      {/* Galería */}
      {(fotos.length > 0 || nuevasFotos.length > 0 || gestionando) && (
        <div className="mt-4">
          <p className="text-sm text-segundo/70 mb-2">Galería</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fotos.map((foto) => {
              const marcada = borrarOrdenes.includes(foto.orden);
              const seraPortada = portadaOrden === foto.orden;
              return (
                <div
                  key={foto.id ?? `${foto.orden}-${foto.tamaño}`}
                  className={`relative aspect-[4/3] overflow-hidden rounded-md ${marcada ? "opacity-40" : ""} ${seraPortada ? "ring-2 ring-tercero" : ""}`}
                >
                  <Image
                    src={foto.url}
                    alt={`Foto ${foto.orden} del anuncio`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {seraPortada && (
                    <span className="absolute bottom-2 left-2 bg-tercero text-primero text-xs font-semibold px-2 py-1 rounded">
                      Será portada
                    </span>
                  )}
                  {gestionando && (
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => elegirPortada(foto.orden)}
                        title={
                          seraPortada
                            ? "Quitar como portada"
                            : "Usar como portada (la actual pasa a galería)"
                        }
                        className={`p-1.5 rounded-full cursor-pointer ${seraPortada ? "bg-tercero text-primero" : "bg-white/90 text-segundo"}`}
                      >
                        <HiOutlineStar />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleBorrar(foto.orden)}
                        title={marcada ? "No borrar" : "Marcar para borrar"}
                        className={`p-1.5 rounded-full cursor-pointer ${marcada ? "bg-segundo text-primero" : "bg-red-700 text-white"}`}
                      >
                        {marcada ? <HiOutlineXMark /> : <HiOutlineTrash />}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {nuevasFotos.map((item, i) => (
              <div
                key={`nueva-${item.file.name}-${i}`}
                className="relative aspect-[4/3] overflow-hidden rounded-md ring-2 ring-tercero"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={`Nueva foto ${i + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => quitarPendiente(nuevasFotos, setNuevasFotos, i)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-segundo text-primero cursor-pointer"
                >
                  <HiOutlineXMark />
                </button>
              </div>
            ))}
          </div>
          {gestionando && (
            <label className="inline-block mt-3 text-sm md:text-base font-semibold text-decimo hover:text-decimo/80 cursor-pointer select-none">
              Añadir fotos (máx. 20)
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={agregarPendientes(setNuevasFotos)}
              />
            </label>
          )}
        </div>
      )}

      {/* Planos */}
      {(planos.length > 0 || nuevosPlanos.length > 0 || gestionando) && (
        <div className="mt-4">
          <p className="text-sm text-segundo/70 mb-2">Planos</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {planos.map((plano) => {
              const marcado = borrarPlanos.includes(plano.orden);
              return (
                <div
                  key={plano.id ?? `plano-${plano.orden}`}
                  className={`relative aspect-[4/3] overflow-hidden rounded-md ${marcado ? "opacity-40" : ""}`}
                >
                  <Image
                    src={plano.url}
                    alt={`Plano ${plano.orden}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {gestionando && (
                    <button
                      type="button"
                      onClick={() => toggleBorrarPlano(plano.orden)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full cursor-pointer ${marcado ? "bg-segundo text-primero" : "bg-red-700 text-white"}`}
                    >
                      {marcado ? <HiOutlineXMark /> : <HiOutlineTrash />}
                    </button>
                  )}
                </div>
              );
            })}
            {nuevosPlanos.map((item, i) => (
              <div
                key={`plano-nuevo-${item.file.name}-${i}`}
                className="relative aspect-[4/3] overflow-hidden rounded-md ring-2 ring-tercero"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={`Nuevo plano ${i + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() =>
                    quitarPendiente(nuevosPlanos, setNuevosPlanos, i)
                  }
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-segundo text-primero cursor-pointer"
                >
                  <HiOutlineXMark />
                </button>
              </div>
            ))}
          </div>
          {gestionando && (
            <label className="inline-block mt-3 text-sm md:text-base font-semibold text-decimo hover:text-decimo/80 cursor-pointer select-none">
              Añadir planos
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={agregarPendientes(setNuevosPlanos)}
              />
            </label>
          )}
        </div>
      )}
    </DetalleCard>
  );
}

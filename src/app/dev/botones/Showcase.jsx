"use client";
// Muestrario temporal de botones (Fase 2). Solo dev, sin menús que enlacen aquí.
import { useState } from "react";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AppContext } from "@/context/AppContext";
import BotonFavorito from "@/views/anuncio/anuncio-id/BotonFavorito";
import BotonDescartar from "@/views/anuncio/anuncio-id/BotonDescartar";
import PublishButton from "@/components/header-home/actions/PublishButton";
import HeroSearchButton from "@/views/inicio/components/hero/HeroSearchButton";
import { ZoomControl } from "@/components/map/MapControls";

// Convierte hover:/active:/focus-visible:/group-hover: en clases estáticas
// para previsualizar el estado forzado.
const forzarEstado = (cls) =>
  cls.replace(/(^|\s)(hover|active|focus-visible|group-hover):([^\s]+)/g, "$1$3");

const CLS = {
  primarioRosa:
    "hover:bg-tercero/80 text-white bg-tercero font-semibold py-2.5 rounded-md transition disabled:opacity-50 cursor-pointer select-none",
  primarioOscuro:
    "inline-flex items-center gap-2 text-primero bg-segundo hover:bg-segundo/80 rounded-md px-5 py-2.5 font-semibold font-montserrat cursor-pointer select-none active:scale-95 duration-75 transition disabled:opacity-50",
  secundarioBorde:
    "flex items-center justify-center gap-2 bg-white border border-black/20 text-black rounded-md px-2 py-1.5 font-semibold cursor-pointer select-none active:scale-95 duration-75 transition hover:bg-black/5 text-sm",
  linkAzul: "text-blue-600 hover:underline font-medium text-sm",
  textoDecimo:
    "flex items-center gap-1.5 text-sm font-semibold text-decimo hover:underline cursor-pointer",
  destructivo:
    "flex-1 py-2.5 rounded-md bg-red-600 hover:bg-red-700 font-medium text-sm text-white transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2",
  destructivoTexto:
    "inline-flex items-center gap-2 text-red-600 hover:underline font-medium cursor-pointer select-none",
  iconoCerrar:
    "hover:rotate-180 transition duration-300 cursor-pointer select-none text-black hover:bg-stone-100 rounded-full p-2",
  iconoCarrusel:
    "flex w-10 h-10 hover:bg-white bg-white/70 text-black rounded-full items-center justify-center text-2xl cursor-pointer select-none active:scale-95 duration-300 transition",
  tabLink:
    "relative cursor-pointer after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-tercero after:rounded-md",
  heroTab:
    "px-5 h-11 text-sm font-semibold border transition-colors cursor-pointer font-montserrat",
  chip:
    "text-xs font-semibold rounded-full px-4 py-1 cursor-pointer select-none active:scale-95 duration-75 transition border",
};

function Tarjeta({ n, nombre, usos, archivo, children, nota }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(nombre);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1200);
    } catch {
      /* portapapeles no disponible */
    }
  };
  return (
    <section className="rounded-md border border-segundo/15 bg-primero overflow-hidden">
      <header className="flex items-center justify-between gap-2 px-4 py-2 border-b border-segundo/10 bg-septimo">
        <div className="min-w-0">
          <p className="font-montserrat font-bold text-segundo text-sm truncate">
            #{n} · {nombre} · {usos} usos
          </p>
          <p className="text-xs text-segundo/60 truncate">{archivo}</p>
        </div>
        <button
          type="button"
          onClick={copiar}
          className="shrink-0 text-xs font-semibold text-decimo hover:underline cursor-pointer"
        >
          {copiado ? "¡Copiado!" : "Copiar nombre"}
        </button>
      </header>
      <div className="p-4 flex flex-col gap-3">
        {children}
        {nota && <p className="text-xs text-segundo/60 italic">{nota}</p>}
      </div>
    </section>
  );
}

const Fondo = ({ oscuro, children }) => (
  <div
    className={`rounded p-4 flex items-center justify-center gap-3 flex-wrap min-h-20 ${
      oscuro ? "bg-segundo" : "bg-septimo border border-segundo/10"
    }`}
  >
    {children}
  </div>
);

const Clases = ({ texto }) => (
  <pre className="text-[11px] bg-segundo text-primero rounded p-2 overflow-x-auto whitespace-pre-wrap break-all">
    {texto}
  </pre>
);

const TituloSeccion = ({ children }) => (
  <h2 className="font-montserrat font-bold text-lg text-segundo mt-8 mb-3">
    {children}
  </h2>
);

const fakeMap = { zoomIn: () => {}, zoomOut: () => {} };
const fakeCtx = {
  consentimientoTracking: false,
  setOpenModalContactoLead: () => {},
  setLeadPendienteContacto: () => {},
};

function DemoBoton({ cls, disabled, children, forzar }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={forzar ? forzarEstado(cls) : cls}
    >
      {children}
    </button>
  );
}

export default function Showcase() {
  const [forzar, setForzar] = useState(false);
  const [heroDisabled, setHeroDisabled] = useState(true);

  return (
    <div className="min-h-screen bg-septimo font-poppins">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <h1 className="font-montserrat font-bold text-2xl text-segundo">
            Muestrario de botones (15 tarjetas)
          </h1>
          <button
            type="button"
            onClick={() => setForzar((v) => !v)}
            className="rounded-md bg-segundo px-5 py-2 text-sm font-semibold text-primero cursor-pointer"
          >
            {forzar ? "Ver estado normal" : "Forzar hover/active/focus"}
          </button>
        </div>
        <p className="text-sm text-segundo/60 mb-1">
          Grupos: 2 primarios · 2 secundarios · 2 link/texto · 1 destructivo ·
          3 solo-icono · 2 pestañas · 1 chips · 1 otros. Ruta temporal solo-dev.
        </p>
        <p className="text-sm text-segundo/60 mb-6">
          Tokens: primero #FFFFFF · segundo #010F10 · tercero #FF1053 ·
          decimo #1944c5 · septimo #FAFAFA · noveno #e6007a.
        </p>

        <TituloSeccion>Primarios</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={1}
            nombre="Primario rosa"
            usos="~35"
            archivo="SubmitButton.jsx:7 (SolicitarForm, RegisterForm, FormRestablecer, ValidarCodigo...)"
          >
            <Fondo>
              <DemoBoton cls={CLS.primarioRosa} forzar={forzar}>
                Crear cuenta
              </DemoBoton>
              <DemoBoton cls={CLS.primarioRosa} disabled forzar={forzar}>
                Creando cuenta...
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton cls={CLS.primarioRosa} forzar={forzar}>
                Crear cuenta
              </DemoBoton>
              <DemoBoton cls={CLS.primarioRosa} disabled forzar={forzar}>
                Creando cuenta...
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.primarioRosa} />
          </Tarjeta>

          <Tarjeta
            n={2}
            nombre="Primario oscuro (BTN_OSCURO)"
            usos="~20"
            archivo="TabMisBusquedas.jsx:14 · GoogleButton · PublishCtaButton · HeroSearchButton"
          >
            <Fondo>
              <DemoBoton cls={CLS.primarioOscuro} forzar={forzar}>
                Buscar viviendas
              </DemoBoton>
              <DemoBoton cls={CLS.primarioOscuro} disabled forzar={forzar}>
                Guardando...
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton cls={CLS.primarioOscuro} forzar={forzar}>
                Buscar viviendas
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.primarioOscuro} />
            <p className="text-xs text-segundo/60">
              Variantes del mismo grupo: bg-black en vez de bg-segundo
              (ModalGuardarBusqueda, AgentesPanel, PaginaOrganizacion) y h-11
              fijo (HeroSearchButton, BotonGuardarBusqueda).
            </p>
          </Tarjeta>
        </div>

        <TituloSeccion>Secundarios</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={3}
            nombre="Secundario borde claro"
            usos="~25"
            archivo="CardPropiedad.jsx:207 · PropiedadId.jsx:326 · DetalleEstado ver anuncio"
          >
            <Fondo>
              <DemoBoton cls={CLS.secundarioBorde} forzar={forzar}>
                Compartir
              </DemoBoton>
              <DemoBoton cls={CLS.secundarioBorde} disabled forzar={forzar}>
                Compartir
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton cls={CLS.secundarioBorde} forzar={forzar}>
                Compartir
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.secundarioBorde} />
          </Tarjeta>

          <Tarjeta
            n={4}
            nombre="Favorito + modo (border-2)"
            usos="~10"
            archivo="BotonFavorito.jsx:17 · CardPrincipal:35 · getBtnClass (VisorFooter)"
            nota="Renders reales con id=1 y contexto de prueba. El corazón alterna según store."
          >
            <AppContext.Provider value={fakeCtx}>
              <Fondo>
                <BotonFavorito id="1" />
              </Fondo>
              <Fondo oscuro>
                <BotonFavorito id="1" />
              </Fondo>
            </AppContext.Provider>
            <Clases texto="flex items-center justify-center gap-2 border-2 rounded-sm px-5 py-2 font-semibold text-sm cursor-pointer select-none active:scale-95 transition w-min + estado (bg-tercero/10 text-tercero border-tercero / bg-white text-segundo/60 border-segundo/60)" />
          </Tarjeta>
        </div>

        <TituloSeccion>Link / texto</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={5}
            nombre="Link azul"
            usos="~45"
            archivo="BreadcrumbUbicacion:27 · EmailStep:40 · OtpStep:60 · CardActions"
          >
            <Fondo>
              <DemoBoton cls={CLS.linkAzul} forzar={forzar}>
                ¿Olvidaste tu contraseña?
              </DemoBoton>
              <DemoBoton cls={CLS.linkAzul} disabled forzar={forzar}>
                Reenviar código en 30s
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton cls={CLS.linkAzul} forzar={forzar}>
                ¿Olvidaste tu contraseña?
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.linkAzul} />
          </Tarjeta>

          <Tarjeta
            n={6}
            nombre="Texto decimo + Descartar"
            usos="~25"
            archivo="BarraNavegacion:31 · BotonDescartar.jsx:23 · CardActionLink · DetalleInmuble:94"
            nota="Render real de BotonDescartar con id=1 y contexto de prueba."
          >
            <AppContext.Provider value={fakeCtx}>
              <Fondo>
                <BotonDescartar compact id="1" />
                <DemoBoton cls={CLS.textoDecimo} forzar={forzar}>
                  Leer descripción completa
                </DemoBoton>
              </Fondo>
              <Fondo oscuro>
                <BotonDescartar compact id="1" />
              </Fondo>
            </AppContext.Provider>
            <Clases texto={CLS.textoDecimo} />
          </Tarjeta>
        </div>

        <TituloSeccion>Destructivos</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={7}
            nombre="Destructivo sólido + texto rojo"
            usos="~10"
            archivo="ModalConfirmarEliminarPropiedad:72 · OrgActions:87 · AgentesPanel:179-194 · TabMisBusquedas eliminar"
          >
            <Fondo>
              <DemoBoton cls={CLS.destructivo} forzar={forzar}>
                Sí, eliminar
              </DemoBoton>
              <DemoBoton cls={CLS.destructivo} disabled forzar={forzar}>
                Eliminando...
              </DemoBoton>
              <DemoBoton cls={CLS.destructivoTexto} forzar={forzar}>
                Eliminar
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton cls={CLS.destructivo} forzar={forzar}>
                Sí, eliminar
              </DemoBoton>
              <DemoBoton cls={CLS.destructivoTexto} forzar={forzar}>
                Eliminar
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.destructivo} />
          </Tarjeta>
        </div>

        <TituloSeccion>Solo icono</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={8}
            nombre="Cerrar / limpiar (X)"
            usos="~20"
            archivo="HamburgerHeader:10 · CardGallery:53 · InputSearchZona:97 · PhonesField:46"
          >
            <Fondo>
              <DemoBoton cls={CLS.iconoCerrar} forzar={forzar}>
                <IoCloseOutline className="text-3xl" />
              </DemoBoton>
              <DemoBoton
                cls="shrink-0 text-primero bg-segundo rounded-full hover:bg-segundo/80 cursor-pointer p-0.5"
                forzar={forzar}
              >
                <IoSearch className="text-lg" />
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton cls={CLS.iconoCerrar} forzar={forzar}>
                <IoCloseOutline className="text-3xl" />
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.iconoCerrar} />
          </Tarjeta>

          <Tarjeta
            n={9}
            nombre="Carrusel (flechas + dots)"
            usos="~20"
            archivo="ImagenesCard:156 · GaleriaInmuebles:64 · FlechasSecuencia:15 · dots:136"
          >
            <Fondo>
              <DemoBoton cls={CLS.iconoCarrusel} forzar={forzar}>
                <MdOutlineKeyboardArrowLeft />
              </DemoBoton>
              <DemoBoton cls={CLS.iconoCarrusel} forzar={forzar}>
                <MdOutlineKeyboardArrowRight />
              </DemoBoton>
              <span className="flex gap-1">
                <span className="w-3 h-1.5 bg-white rounded-full" />
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
              </span>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton cls={CLS.iconoCarrusel} forzar={forzar}>
                <MdOutlineKeyboardArrowLeft />
              </DemoBoton>
              <DemoBoton cls={CLS.iconoCarrusel} forzar={forzar}>
                <MdOutlineKeyboardArrowRight />
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.iconoCarrusel} />
          </Tarjeta>

          <Tarjeta
            n={10}
            nombre="Mapa (zoom + accesos)"
            usos="~10"
            archivo="MapControls.jsx:7-30 (render real con mapa de prueba) · ShortcutButton · LocationControl"
            nota="ZoomControl real con stub {zoomIn, zoomOut}."
          >
            <Fondo>
              <ZoomControl map={fakeMap} />
            </Fondo>
            <Fondo oscuro>
              <ZoomControl map={fakeMap} />
            </Fondo>
            <Clases texto="w-10 h-10 flex items-center justify-center bg-primero hover:bg-gray-100 font-semibold text-gray-700 cursor-pointer text-xl" />
          </Tarjeta>
        </div>

        <TituloSeccion>Pestañas</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={11}
            nombre="Pestaña subrayada (TabLink)"
            usos="~8"
            archivo="TabLink.jsx:8 · EncabezadoBusqueda:108 · DescripcionTabs"
            nota="Reproducción estática (el real navega con router)."
          >
            <Fondo>
              <span className={forzar ? forzarEstado(CLS.tabLink) : CLS.tabLink}>
                <span className="text-tercero select-none text-base font-montserrat">
                  Mis búsquedas
                </span>
              </span>
              <span className="relative cursor-pointer">
                <span className="text-segundo/60 select-none text-base font-montserrat">
                  Perfil
                </span>
              </span>
            </Fondo>
            <Clases texto={CLS.tabLink} />
          </Tarjeta>

          <Tarjeta
            n={12}
            nombre="Pestaña caja (HeroTabs)"
            usos="~6"
            archivo="HeroTabs.jsx:21 · OrganizacionNav · PropertySearchWidget:216"
          >
            <Fondo>
              <DemoBoton
                cls={`${CLS.heroTab} bg-tercero/10 text-tercero border-tercero`}
                forzar={forzar}
              >
                Comprar
              </DemoBoton>
              <DemoBoton
                cls={`${CLS.heroTab} bg-primero/60 text-segundo/70 border-segundo/10`}
                forzar={forzar}
              >
                Alquilar
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton
                cls={`${CLS.heroTab} bg-tercero/10 text-tercero border-tercero`}
                forzar={forzar}
              >
                Comprar
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.heroTab} />
          </Tarjeta>
        </div>

        <TituloSeccion>Chips y filtros</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={13}
            nombre="Chip filtro"
            usos="~8"
            archivo="HeaderFiltros.jsx:14 · EstadoFilter (admin+leads) · FormatoDetail tono"
            nota="Reproducción estática (los reales usan contexto/estado)."
          >
            <Fondo>
              <DemoBoton
                cls={`${CLS.chip} bg-[#FF1B1C] border border-black/5 text-white`}
                forzar={forzar}
              >
                Todo
              </DemoBoton>
              <DemoBoton
                cls={`${CLS.chip} bg-white border border-black/10 text-black`}
                forzar={forzar}
              >
                Venta
              </DemoBoton>
            </Fondo>
            <Fondo oscuro>
              <DemoBoton
                cls={`${CLS.chip} bg-[#FF1B1C] border border-black/5 text-white`}
                forzar={forzar}
              >
                Todo
              </DemoBoton>
            </Fondo>
            <Clases texto={CLS.chip} />
          </Tarjeta>
        </div>

        <TituloSeccion>Otros</TituloSeccion>
        <div className="grid md:grid-cols-2 gap-4">
          <Tarjeta
            n={14}
            nombre="CTA con wipe + reales"
            usos="~12"
            archivo="PublishButton · HeroSearchButton (render real, interruptor disabled) · NavbarListaPropiedades:44 · BotonGuardarBusqueda:71"
            nota="HeroSearchButton real con disabled conmutable. El wipe usa before:w-0 → hover:before:w-full (el forzado no lo muestra)."
          >
            <Fondo>
              <PublishButton />
              <HeroSearchButton
                disabled={heroDisabled}
                onSearch={() => setHeroDisabled((v) => !v)}
              />
            </Fondo>
            <Fondo oscuro>
              <PublishButton />
            </Fondo>
            <button
              type="button"
              onClick={() => setHeroDisabled((v) => !v)}
              className="text-xs font-semibold text-decimo hover:underline cursor-pointer self-start"
            >
              Alternar disabled del Buscar ({heroDisabled ? "off" : "on"})
            </button>
            <Clases texto="relative ... overflow-hidden group before:absolute before:inset-0 before:bg-tercero before:w-0 hover:before:w-full before:transition-all before:duration-500 before:ease-in-out before:z-0" />
          </Tarjeta>

          <Tarjeta
            n={15}
            nombre="No renderizables aislados"
            usos="—"
            archivo="Varios (ver nota)"
            nota="Divs clicables que necesitan su contexto o navegan: cards clicables (CardAnuncio, PropertyCard), overlays que cierran modales, MenuRow/UserNavLinks (divs con router), Logo, pins del mapa (document.createElement), Listbox de headlessui, corazón de PropertyGrid/temas. Ninguno enlaza aquí."
          >
            <Fondo>
              <span className="text-xs text-segundo/60">
                CardAnuncio:98 · PropertyCard:36 · MenuRow (ConLogin:17) ·
                UserNavLinks:12 · Logo.jsx:10 · mapPins.js:4 · FormAgregarPropiedad
                Listbox:94
              </span>
            </Fondo>
          </Tarjeta>
        </div>

        <div className="mt-8 rounded-md border border-segundo/15 bg-primero p-4">
          <p className="font-montserrat font-bold text-segundo text-sm mb-2">
            Fuera de este muestrario (diseño deliberadamente propio)
          </p>
          <p className="text-xs text-segundo/70">
            Temas de organización tema1/tema2 (paleta red-500/rose/gray propia,
            ~30 botones) · Consentimiento (Aceptar bg-black / Rechazar borde) ·
            Píldora “Ver más” del feed (fixed black pill) · Store buttons ·
            Avatar BotonUsuario · Dots de carrusel (arriba #9).
          </p>
        </div>
      </div>
    </div>
  );
}

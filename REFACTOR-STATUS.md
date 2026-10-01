# Estado del refactor seguro (safe-refactor)

Protocolo: sin cambios de features, mismas props / rutas / clases / orden.
Prueba: `npx eslint <alcance>` + `npm run build`. Se avanza solo si el build pasa
y el lint no suma errores nuevos respecto al baseline.

## Regla de ubicación (acordada)

- Componente usado en **2+ vistas/rutas distintas** → vive en `src/components/` (general).
- Componente usado en **2+ lugares pero bajo la misma ruta** → se queda dentro
  de esa ruta, en su subcarpeta (no hay necesidad de sacarlo).
- Componente de **un solo uso** → junto a quien lo usa.

## Candidatos a promover a `src/components/` (ejecutado)

| Componente | Nueva casa | Usado en |
|---|---|---|
| `hamburger/*` (`ModalHamburguesa`, `ConLogin`, `SinLogin`, `DescargarApp`, `EnlacesHamburguesa`, `HamburgerHeader`, `UserAvatar`) | `src/components/hamburger/` | `header-home`, `header-inmobitwo`, `modales/ModalUser` |
| `useMisAnunciosCount` | `src/hooks/` | `hamburger/ConLogin` |
| `header/` (`NavbarHome`, `nav/*`, `actions/*`) | `src/components/header-home/` | `inicio` (PageInicio), `anuncio`, `lista-propiedades` (nav) |
| `header/` (`HeaderInmobitwo`, `UserNavLinks`, `HamburgerToggle`) | `src/components/header-inmobitwo/` | `publicar-anuncio-info` + 5 archivos de `usuario` |
| `footer/*` + `LinkColumn` (sube por dependencia de `SiteFooter`, no por uso) | `src/components/footer/` | `publicar-anuncio-info`, `usuario` (4), `Anuncio` |
| `PasswordInput` (toggle ver-contraseña; usado en login + registro) | `src/components/auth/` | `login/PasswordStep`, `registro/PasswordField` |
| Duplicados por unificar (NO tocados, difieren visualmente): `HamburgerButton` (header-home) vs `HamburgerToggle` (header-inmobitwo) ; `ConLogin` en `components/modales/modal-hamburguesa/` vs `components/hamburger/` (`Image` vs `img`, otros colores) | — | — |

## Zonas refactorizadas

- [x] `src/views/inicio` — Reorganizada por dominio (`header/`, `hero/`, `info-cards/`)
  + `hooks/` (`useInicioSearch`, `useCitySuggestions`, `useResponsiveFrases`, `useMisAnunciosCount`)
  + `lib/` (`geoPath`, `geoSelect`) + `constants.js` (`TIPO_DEFAULT` único).
  Eliminadas: `components/modales/`, `components/components/`, `components/cards/`,
  `components/modal-hamburguesa/`. Fix incluido: `"useclient"` → `"use client"`.
- [x] `src/views/publicar-anuncio-info` — Reorganizada por sección
  (`header/`, `hero/`, `guide/`, `advantages/`, `services/`, `links/`, `footer/`)
  + datos locales (`*.data.js`). Fix incluido: typo `LinkColunm` → `LinkColumn`,
  línea muerta `AdvantagesSection;` eliminada, imports relativos.
- [x] `src/views/descargas` — Reorganizada por sección
  (`layout/`, `hero/`, `installers/`, `cli/`, `audiences/`, `mobile/`)
  + `hooks/` (`useDetectarSO`, `useCopyClipboard`) + datos locales.
  Todo de una sola ruta → nada subió a general (regla).
  Fix incluido: `set-state-in-effect` en `DownloadHero` (ahora `useDetectarSO`
  con `useSyncExternalStore`, misma conducta SSR/null inicial).
- [x] `src/views/login` — De 1 archivo (180 líneas) a `Login.jsx` orquestador +
  `components/email-step/` (`EmailStep`, `GoogleButton`),
  `components/password-step/` (`PasswordStep`, `PasswordInput`),
  `components/common/` (`SubmitButton`, `ProfessionalFooter`) + `hooks/useEmailPrefill`.
  **Feature pedida**: toggle ver/ocultar contraseña en `PasswordInput`
  (ojo dentro del campo, `aria-label` + `aria-pressed`, `autoComplete`).
  Nota: el "¿Olvidaste tu contraseña?" del paso 2 es un `div` sin navegación
  (en el paso 1 sí es `Link`) — se preservó tal cual.
- [x] `src/views/registro` — De 1 archivo (107 líneas) a `Registro.jsx`
  orquestador + `components/form/` (`RegisterForm`, `TextField`, `PasswordField`)
  + `RegisterHeader`, `LoginLink`. Sin features ni fixes.
- [ ] `src/views/olvidaste-tu-password` — Sin nada que refactorizar: es un stub
  de 5 líneas (`<div>OlvidastePassword</div>`). No hay flujo de recuperación en
  `useAuth` ni endpoint conocido: implementarla es feature con backend, no refactor.
- [x] `src/views/publicar-anuncio` — Wizard reorganizado por dominio:
- [x] `src/views/usuario` — `mis-anuncios/` (`MisAnuncios` 94→~50,
  `ListaAnuncios` 124→~45 + `AnuncioPhoto/Status/Info`, `PublishAnuncioButton`,
  `MisAnunciosContent`; `DetalleDeAnuncio` 323→~50 + `useAnuncioDetalle` y 9 secciones);
  `mis-favoritos/` (misma partición: `FavoritoPhoto/Status/Info`);
  `tus-datos/` (`Acceso` 250→~70 + `useVerificacionEmail` y 5 panels,
  `Perfil` 317→~110 + `usePerfilForm` y 5 piezas, `HeadPerfilAcceso` + `TabLink`,
  `SupportBlock` compartido acceso/perfil).
  Unificado: `BotonUsuario` local eliminado (idéntico al general salvo `Image` vs
  `img`; 4 archivos redirigidos a `@/components/usuario/BotonUsuario`).
  Fixes menores: `key={i}` → `key={pro.id}` en listas; `SupportBlock` unificado con
  clases responsive (en móvil `acceso` pasa de text-2xl/lg a text-xl/base);
  botones Subir/Cambiar foto unificados (móvil: Cambiar pasa de base a sm).
  NO unificado: `ListaAnuncios` vs `ListaFavoritos` (~90% iguales pero distinta
  acción y distinta ruta → general implicaría rediseño; queda en deuda).
- [x] `src/views/feed` (antes `views/Home.jsx`) — `Feed.jsx` orquestador +
  `components/sidebar/` (6 archivos + `SidebarItemRow`, `EmptyOrgCard`,
  `ActiveOrgCard`, `OrgNavItems`, `useOrganizacionSidebar`),
  `components/actividad/` (`Actividad` + `StatsGrid`, `RecentActivity`,
  `SuggestedOrgs`, `ActivityMap`), `components/modals/` (4 modales del feed).
  `Principal` y `card-propiedad` se quedan en `components/` (multi-ruta).
  Fixes: crash `/feed` (`propiedades` del contexto → `useFeed()` + guards);
  `set-state-in-effect` en sidebar (cargando derivado + guard anti-unmount).
- [x] `src/views/admin` — Dos rutas separadas: `organizaciones/`
  (`AdminOrganizacionesPage` 191→~40 + `useOrganizacionesAdmin`, `EstadoFilter`,
  `OrgList`, `OrgActions`) y `rutas/` (rename `AdminRutasPages` → `AdminRutasPage`
  + `RouteGroup`, `FrontendRoutes`, `BackendRoutes`).
  Fix: `set-state-in-effect` (spinner movido a handlers, efecto solo setea en `.then`).
- [x] `src/views/seleccionar-zona` — Full: `SelectZonaMap` (1201→~110) extraído a
  `map/` (`useZonaMap` orquestador, `layers`, `polygon`, `geoman`, `interactivity`,
  `mapStyles`, `selInfo`, 6 overlays); página partida (`ZonaPageHeader`,
  `SelectedZoneCard`, `useDeptNames`, `usePolygonSearch`).
  Promovido a general: `src/lib/geoApi.js`, `src/lib/geoUtils.js`,
  `src/components/map/` (`MapControls`, `MiniMapaUbicacion` + `useMiniMapa`,
  `InputSearchZona` + `useZonaSuggest`, `ZonaSuggestions`, `mapUtils`).
  Fixes: 2× `set-state-in-effect` + 1× `exhaustive-deps`; `console.log` fuera;
  `drawLayer` como estado; stale-closures de `setupInteractivity` preservados
  tal cual (documentado: cambiarlo altera conducta).
- [x] `src/views/mapa-inmuebles` — `MapaInmuebles` (362→~50) con `useMapaInmuebles`
  (`markers`, `boundary`, `MapOverlays`, `flyToZone`); `MapaInmueblesPage`
  (140→~40) con `useMapaCenter` + `lib/routeParams`.
  Promovido: `mapPins` + `property-card/` (partida: `useGallery`, `CardGallery`,
  `CardBody`, `CardActions`, `cardLabels`) y `api.js` → `src/lib/geoApi.js`.
  Fixes: 4× `refs-en-render` (map como estado), `console.log` debug fuera;
  1 request menos al resolver región/depto (mismo resultado).
- [x] `src/views/logs` + `src/views/leads` — Rutas de prueba movidas a sus
  carpetas (`Logs` 119→~35 + `useLogsAutoRefresh`, `logFormat`, `LogsHeader`,
  `LogLine`; `Leads` 179→~60 + `useLeadsFilter`, `lib/estados`, `EstadoFilter`,
  `LeadCard`). Semillas del futuro CRM.
  carpetas (`Logs` 119→~35 + `useLogsAutoRefresh`, `logFormat`, `LogsHeader`,
  `LogLine`; `Leads` 179→~60 + `useLeadsFilter`, `lib/estados`, `EstadoFilter`,
  `LeadCard`). Semillas del futuro CRM.
  `components/sidebar/` (6 archivos + `SidebarItemRow`, `EmptyOrgCard`,
  `ActiveOrgCard`, `OrgNavItems`, `useOrganizacionSidebar`),
  `components/actividad/` (`Actividad` + `StatsGrid`, `RecentActivity`,
  `SuggestedOrgs`, `ActivityMap`), `components/modals/` (4 modales del feed).
  `Principal` y `card-propiedad` se quedan en `components/` (multi-ruta).
  Fixes: crash `/feed` (`propiedades` del contexto → `useFeed()` + guards);
  `set-state-in-effect` en sidebar (cargando derivado + guard anti-unmount).
  `ListaAnuncios` 124→~45 + `AnuncioPhoto/Status/Info`, `PublishAnuncioButton`,
  `MisAnunciosContent`; `DetalleDeAnuncio` 323→~50 + `useAnuncioDetalle` y 9 secciones);
  `mis-favoritos/` (misma partición: `FavoritoPhoto/Status/Info`);
  `tus-datos/` (`Acceso` 250→~70 + `useVerificacionEmail` y 5 panels,
  `Perfil` 317→~110 + `usePerfilForm` y 5 piezas, `HeadPerfilAcceso` + `TabLink`,
  `SupportBlock` compartido acceso/perfil).
  Unificado: `BotonUsuario` local eliminado (idéntico al general salvo `Image` vs
  `img`; 4 archivos redirigidos a `@/components/usuario/BotonUsuario`).
  Fixes menores: `key={i}` → `key={pro.id}` en listas; `SupportBlock` unificado con
  clases responsive (en móvil `acceso` pasa de text-2xl/lg a text-xl/base);
  botones Subir/Cambiar foto unificados (móvil: Cambiar pasa de base a sm).
  NO unificado: `ListaAnuncios` vs `ListaFavoritos` (~90% iguales pero distinta
  acción y distinta ruta → general implicaría rediseño; queda en deuda).
  `components/ui/` (9 primitivas) + `WizardSteps`, `HelpFab`;
  `paso-1/{tipo,ubicacion,contacto}/` (fix typo `LoactionForm` → `ubicacion/LocationForm`,
  `Locationcascadeselect` → `LocationCascadeSelect`, `Addressmapmodal` → `AddressMapModal`);
  `paso-2/descripcion/` (`TituloDescripcion` 193→~110, `FormatoSelector` 229→~90,
  `DescriptionEditor` 206→~70, + `useRefinarDescripcion`);
  `header/` (`LogoBar`, `StepsNav`, `useIsMobile`) + `hooks/useWizardProgress`
  (`PublicarAnuncio` 185→~50). `anuncioProgreso.js` se queda en su path
  (4 hooks globales lo importan).
  Fixes: `w-(--button-width)]` en `TipoSelect` y `FloorDoorBlockForm`;
  `text-bases` → `text-base` en `Informacion`; `console.log` de debug fuera de `AddressMapModal`.
  Muerto detectado (no tocado): `paso-1/FloorDoorBlockForm.jsx` — nadie lo importa
  y su estado es local desconectado del formulario.
- [x] `src/views/lista-propiedades` — Pendiente (solo se tocó 1 import).
- [ ] `src/views/anuncio` — Pendiente (solo se tocó 1 import).
- [ ] `src/components/modales/modal-hamburguesa/` (duplicado global de `ConLogin`) — Pendiente de decidir si se unifica con `inicio/header/hamburger/`.

## Errores corregidos

- [x] Doble `<ModalHamburguesa />` en `InfoPublicarAnuncio` (se montaba 2 veces:
  en la página y en `HeaderInmobitwo`). Se deja solo el de `HeaderInmobitwo`.
- [x] Clase rota `w-(--button-width)]` en `footer/LanguageSelect.jsx`
  (corchete de más; Tailwind v4 la ignora). Ahora `w-(--button-width)`.
- [x] `react-hooks/set-state-in-effect` en `inicio/hooks/useCitySuggestions.js`
  (venía del baseline). `setLoading(true)` se movió dentro del callback del
  debounce: el "Buscando..." aparece al iniciar el fetch, no al teclear.
- [x] `react-hooks/purity` en `usuario/mis-anuncios/anuncio/DetalleDeAnuncio.jsx`:
  `useRef(Date.now())` → `useRef(0)`. Sin cambio de conducta: el `useEffect` de
  montaje ya lo fijaba a `Date.now()` antes de cualquier uso.

## Pre-existentes NO tocados (fuera de alcance)

- Warnings `react-hooks/exhaustive-deps` en `src/views/usuario/*` (7 aprox).
- `●` como placeholders de iconos sociales en `SocialLinks.jsx`.
- `href="#"` placeholders en columnas de links y hero.
- `ConLogin` global duplicado en `src/components/modales/modal-hamburguesa/`.

## Consumidores externos actualizados (solo ruta de import)

`ModalUser.jsx`, `PageAnuncio.jsx`, `NavbarListaPropiedades.jsx`,
`HeaderInmobitwo.jsx`, `InfoPublicarAnuncio.jsx`, `Anuncio.jsx`,
`DetalleDeAnuncio.jsx`, `MisAnuncios.jsx`, `MisFavoritos.jsx`, `Acceso.jsx`,
`SeguridadAcceso.jsx`, `MiPerfil.jsx`, `Perfil.jsx`.

## Deuda técnica / mejoras futuras (no refactorizar a ciegas)

1. **Código muerto**: `publicar-anuncio/paso-1/FloorDoorBlockForm.jsx` — nadie lo
   importa, estado local desconectado. Decidir: borrar o conectar al formulario.
2. **Hamburger duplicado**: `components/modales/modal-hamburguesa/` (global, usado
   por `NavbarListaPropiedades` y `PublicarAnuncio`) vs `components/hamburger/`
   (nuevo general). Difieren en `Image` vs `img` y paleta: unificar cambia píxeles,
   requiere visto bueno visual.
3. **`HamburgerButton` vs `HamburgerToggle`**: mismo UI en dos archivos
   (`header-home` / `header-inmobitwo`). Unificar en uno solo en `components/`.
4. **`usuario/BotonUsuario`** vive en `views/usuario/` pero lo usan 3+ rutas
   (`header-home`, `header-inmobitwo`, `lista-propiedades`): promover a `src/components/`.
5. **`UbicacionMapa`** en `views/anuncio/` importado por `publicar-anuncio`:
   si aparece un 3er uso, promover a `src/components/` (hoy son 2 rutas: revisar).
6. **`ForgotPassword` del paso 2 de login** es un `div` sin navegación (paso 1 sí
   es `Link` a `/olvidaste-tu-password`): convertir en `Link` o confirmar intención.
7. **Warnings `exhaustive-deps`** en `usuario/*` y wizard: revisar dependencias
   de efectos pendientes (se preservaron tal cual).
8. **`href="#"` placeholders**: hero publicar-info, `MobileApp` stores,
   `TipoAlquiler` ("Más información"), links de footers: definir destinos reales.
9. **`●` como iconos sociales** en `footer/SocialLinks.jsx`: reemplazar por iconos reales.
10. **`<img>` vs `<Image />`** (warnings `no-img-element` en paso-3 y avatar):
    migrar a `next/image` donde aplique (LCP).
11. **`olvidaste-tu-password`**: implementar flujo real (backend + emails + token).

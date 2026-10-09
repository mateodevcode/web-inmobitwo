# Graph Report - web-inmobitwo  (2026-10-09)

## Corpus Check
- 612 files · ~417,538 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1745 nodes · 4077 edges · 121 communities (100 shown, 21 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0985500b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- PropertyCard.jsx
- components/InfoCards.jsx
- irArriba
- descargas/DescargarApp.jsx
- FormFiltros.jsx
- Guards.jsx
- hero/Hero.jsx
- useAppContext
- useOutletContext
- CardPropiedad.jsx
- useDetalles
- useZonaMap.js
- useFavoritos
- useDatosBasicos.js
- useTracking
- usePropiedades.js
- footer/SiteFooter.jsx
- RestablecerPassword.jsx
- dependencies
- temaRegistry.js
- useDatosBasicos
- Feed.jsx
- usePropiedades
- PublicarAnuncio.jsx
- SeleccionarZonaPage.jsx
- InfoPublicarAnuncio.jsx
- MiOrganizacionesSidebar.jsx
- useSlugParser
- LocationForm.jsx
- tema1/home/Home.jsx
- app/page.js
- useOrganizaciones
- Login.jsx
- Logo.jsx
- ListaPropiedades.jsx
- MapOverlays.jsx
- Fotos.jsx
- Leads.jsx
- Inmobitwo — Red social inmobiliaria
- rutas/page.js
- geoApi.js
- apiBackend
- MapaInmueblesPage.jsx
- useAuth.js
- Loading.jsx
- mapStyles.js
- SelectZonaMap.jsx
- FormatoDetail.jsx
- AdminOrganizacionesPage.jsx
- app/layout.js
- modal-hamburguesa/ModalHamburguesa.jsx
- Acceso.jsx
- PropertySearchWidget.jsx
- BarraNavegacionTauri.jsx
- FormAgregarPropiedad.jsx
- tema1/home/FooterSection.jsx
- tema2/home/Home.jsx
- tema2/home/FooterSection.jsx
- package.json
- apiBackend.js
- MiPerfil.jsx
- NavbarListaPropiedades.jsx
- PropiedadId.jsx
- useResetForm.js
- DownloadAppSection.jsx
- TituloDescripcion.jsx
- geoman.js
- devDependencies
- Estado del refactor seguro (safe-refactor)
- SeguridadAcceso.jsx
- GetInTouchSection.jsx
- mapPins.js
- PropertyMap.jsx
- Header.jsx
- useMiniMapa.js
- tema1/home/PropertyGrid.jsx
- tema2/home/PropertyGrid.jsx
- PublishingGuideSection.jsx
- FloorDoorBlockForm.jsx
- header-principal/InputSearchPrincipal.jsx
- FAQSection.jsx
- FeaturedPropertyHero.jsx
- ServicesSection.jsx
- RegisterForm.jsx
- nuevo-profesional/page.js
- AgentsSlider.jsx
- PillarHelpSection.jsx
- ClientTestimonials.jsx
- MeetOurAgents.jsx
- WhyChooseUs.jsx
- PropertySlider.jsx
- MarketProperty.jsx
- tema2/home/TopHeader.jsx
- compilerOptions
- AGENTS.md
- eslint.config.mjs
- @geoman-io/maplibre-geoman-free
- gsap
- lucide
- maplibre-gl
- motion
- next
- next.config.mjs
- react-dom
- @tiptap/react
- postcss.config.mjs
- links_inicio.js
- skills_data.js

## God Nodes (most connected - your core abstractions)
1. `useAppContext()` - 147 edges
2. `apiBackend()` - 88 edges
3. `usePropiedades()` - 51 edges
4. `irArriba()` - 37 edges
5. `useOutletContext` - 37 edges
6. `useOrganizaciones()` - 33 edges
7. `useDetalles()` - 24 edges
8. `useFavoritos()` - 23 edges
9. `useZonaMap()` - 23 edges
10. `useDatosBasicos()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `useMapaInmuebles()` --references--> `supercluster`  [EXTRACTED]
  src/views/mapa-inmuebles/components/map/useMapaInmuebles.js → package.json
- `FormatoDetail()` --references--> `dompurify`  [EXTRACTED]
  src/views/publicar-anuncio/paso-2/descripcion/FormatoDetail.jsx → package.json
- `GeoSelects()` --calls--> `apiBackend()`  [EXTRACTED]
  src/views/usuario/tus-datos/perfil/components/RoomSeekerForm.jsx → src/actions/apiBackend.js
- `SlugLayout()` --calls--> `useOrganizaciones()`  [EXTRACTED]
  src/app/inmobiliarias/[slug]/layout.js → src/hooks/useOrganizaciones.js
- `OrganizacionLayout()` --calls--> `useTenant()`  [EXTRACTED]
  src/views/organizacion/paginas/OrganizacionLayout.jsx → src/context/TenantContext.js

## Import Cycles
- None detected.

## Communities (121 total, 21 thin omitted)

### Community 0 - "PropertyCard.jsx"
Cohesion: 0.06
Nodes (48): PropertyImage(), CardActions(), CardBody(), CardGallery(), getOperacionLabel(), getTipoLabel(), getTitulo(), getUbicacion() (+40 more)

### Community 1 - "components/InfoCards.jsx"
Cohesion: 0.06
Nodes (49): UbicacionMapa(), AddressMapModal(), ConfirmedLocation(), MapWarnings(), createMap(), createMarker(), resolveInitial(), useAddressMap() (+41 more)

### Community 2 - "irArriba"
Cohesion: 0.05
Nodes (43): boolToTri(), BUSCA_CON_OPTIONS, formatoCOP(), formatoFecha(), GENERO_OPTIONS, OCUPACION_OPTIONS, perfilAChips(), TRI_OPTIONS (+35 more)

### Community 3 - "descargas/DescargarApp.jsx"
Cohesion: 0.05
Nodes (37): cliCommands, descargas, detectarSO(), ordenSO, AudienceCard(), Audiences(), AUDIENCIAS, CliInstall() (+29 more)

### Community 4 - "FormFiltros.jsx"
Cohesion: 0.06
Nodes (35): MiniMapaUbicacion(), useMiniMapa(), CARACTERISTICAS_INMUEBLE, ESTADOS_INMUEBLE, PROPERTY_TYPES_FALLBACK, CATEGORIAS_VIVIENDA, Alcobas(), OPCIONES (+27 more)

### Community 5 - "Guards.jsx"
Cohesion: 0.05
Nodes (14): RutaPrivada(), RutaPublica(), useLogsTracking(), leerNextActual(), Feed(), LogLine(), LogsHeader(), useLogsAutoRefresh() (+6 more)

### Community 6 - "hero/Hero.jsx"
Cohesion: 0.08
Nodes (26): FRASES, cards, TIPO_OPTIONS, SUGGESTIONS, AnimatedTitle(), Hero(), HeroSearchButton(), HeroTabs() (+18 more)

### Community 7 - "useAppContext"
Cohesion: 0.13
Nodes (20): TrackingInit(), ConsentimientoBanner(), DescargarApp(), ModalHamburguesa(), SinLogin(), AccountAccess(), HamburgerButton(), PublishButton() (+12 more)

### Community 8 - "useOutletContext"
Cohesion: 0.10
Nodes (18): usePropiedadesOrganizacionData(), ContactoOrg(), OrgOutletContext, OrgOutletProvider, useOutletContext, SobreNosotrosOrg(), Contacto(), Home() (+10 more)

### Community 9 - "CardPropiedad.jsx"
Cohesion: 0.14
Nodes (20): closeMenus(), ConLogin(), TAMANOS, UserAvatar(), UserNavLinks(), ConLogin(), ModalUserPropiedadId(), CardPropiedad() (+12 more)

### Community 10 - "useDetalles"
Cohesion: 0.13
Nodes (22): ESTRATOS, PARQUEADERO_MODOS, PARQUEADERO_TIPOS, cargarCatalogos(), cargarFeaturesDePropiedad(), featuresCache, getTituloSugerido(), tituloCache (+14 more)

### Community 11 - "useZonaMap.js"
Cohesion: 0.20
Nodes (24): OSM_STYLE, zoomToBounds(), fetchBarrios(), fetchCitiesGeoJSON(), fetchRegionsGeoJSON(), findFeature(), handleStartDrawing(), setupInteractivity() (+16 more)

### Community 12 - "useFavoritos"
Cohesion: 0.14
Nodes (19): AppContext, AppProvider(), leerLocal(), favoritos, getFavoritosSnapshot(), listeners, setFavoritosLoading(), setFavoritosStore() (+11 more)

### Community 13 - "useDatosBasicos.js"
Cohesion: 0.13
Nodes (19): BARRIOS_POR_CIUDAD, OPERATION_OPTIONS, OPERATION_TYPE_IDS, INDICE_ORDEN, ordenarPropertyTypes(), PROPERTY_TYPES_DESCRIPCIONES, fetchStaticJson(), inFlight (+11 more)

### Community 14 - "useTracking"
Cohesion: 0.15
Nodes (15): ModalContactoLead(), useTracking(), leerUtm(), postSilencioso(), resolverSource(), useVistaDetalle(), readNavState(), generarSessionId() (+7 more)

### Community 15 - "usePropiedades.js"
Cohesion: 0.17
Nodes (22): useFotos(), appendCamposPropiedad(), cacheKey(), CAMPOS_PROPIEDAD, camposPropiedad(), countMisAnunciosCache, invalidarCountMisAnuncios(), normalizarCoord() (+14 more)

### Community 16 - "footer/SiteFooter.jsx"
Cohesion: 0.13
Nodes (17): AppStoreButtons(), STORE_BUTTONS, FooterLinkColumns(), LanguageSelect(), LinkColumn(), FOOTER_GROUPS, SocialLinks(), SOCIALS (+9 more)

### Community 17 - "RestablecerPassword.jsx"
Cohesion: 0.15
Nodes (12): getPasswordChecklist(), validatePasswordRegistro(), FormRestablecer(), NewPasswordField(), PasswordChecklist(), REGLAS, MensajeConfirmacion(), OtpInput() (+4 more)

### Community 18 - "dependencies"
Cohesion: 0.09
Nodes (23): framer-motion, @gsap/react, @headlessui/react, lucide-react, dependencies, framer-motion, @gsap/react, @headlessui/react (+15 more)

### Community 19 - "temaRegistry.js"
Cohesion: 0.14
Nodes (11): dynamic, dynamic, dynamic, ContactoTemaSlot(), HomeTemaSlot(), LayoutPublicoResolver(), LayoutResolver(), SobreNosotrosTemaSlot() (+3 more)

### Community 20 - "useDatosBasicos"
Cohesion: 0.17
Nodes (13): CONTACT_PREFERENCES, COUNTRY_CODES, RENTAL_TYPE_IDS, RENTAL_TYPE_OPTIONS, useDatosBasicos(), RadioGroupInput(), ContactContinue(), ContactForm() (+5 more)

### Community 21 - "Feed.jsx"
Cohesion: 0.13
Nodes (14): Actividad(), ActivityMap(), EVENTOS, RecentActivity(), STAT_CARDS, STAT_VALUES, StatsGrid(), ModalActividades() (+6 more)

### Community 22 - "usePropiedades"
Cohesion: 0.16
Nodes (14): ModalHamburguesa(), HeaderFiltros(), HeaderPrincipal(), Principal(), filtros_propiedades, getFeedSnapshot(), listeners, state (+6 more)

### Community 23 - "PublicarAnuncio.jsx"
Cohesion: 0.16
Nodes (10): ModalContinuarAnuncio(), ModalInformativo(), WizardSteps(), InfoIntro(), InfoPromoRow(), Informacion(), DatosBasicos(), Detalles() (+2 more)

### Community 24 - "SeleccionarZonaPage.jsx"
Cohesion: 0.18
Nodes (10): fetchInmueblesEnPoligono(), fetchStatesGeoJSON(), SelectedZoneCard(), ZonaPageHeader(), useDeptNames(), usePolygonSearch(), parseOperationAndType(), SeleccionarZonaPage() (+2 more)

### Community 25 - "InfoPublicarAnuncio.jsx"
Cohesion: 0.15
Nodes (7): SiteFooter(), scrollbarStyles, AdvantageColumn(), ADVANTAGES, AdvantagesSection(), InfoPublicarAnuncio(), Anuncio()

### Community 26 - "MiOrganizacionesSidebar.jsx"
Cohesion: 0.17
Nodes (10): items_admin, items_organizacion, items_sidebar, toCapitalize(), ActiveOrgCard(), EmptyOrgCard(), MiOrganizacionesSidebar(), OrgNavItems() (+2 more)

### Community 27 - "useSlugParser"
Cohesion: 0.18
Nodes (13): getSelectedId(), getTabs(), TAB_ALQUILAR, TAB_COMPRAR, TAB_OBRA_NUEVA, TAB_VACACIONAL, useSlugParser(), BotonGuardarBusqueda() (+5 more)

### Community 28 - "LocationForm.jsx"
Cohesion: 0.20
Nodes (9): ZONAS, InputField(), TipoSelect(), ContactNameField(), TipoInmueble(), BarrioFields(), LocationCascadeSelect(), StreetFields() (+1 more)

### Community 29 - "tema1/home/Home.jsx"
Cohesion: 0.13
Nodes (9): items, Navbar(), neighborhoods, NeighborhoodsSection(), ScrollToTop(), testimonials, TestimonialsSection(), contactItems (+1 more)

### Community 30 - "app/page.js"
Cohesion: 0.20
Nodes (10): dynamic, RoutePage(), SlugLayout(), dynamic, Page(), dynamic, RoutePage(), useTenant() (+2 more)

### Community 31 - "useOrganizaciones"
Cohesion: 0.22
Nodes (9): invalidarMisOrgCache(), misOrgCache, misOrgCacheKey(), useOrganizaciones(), AgentesPanel(), EstadisticasPanel(), MiInmobiliariaPanel(), SolicitarDominioForm() (+1 more)

### Community 32 - "Login.jsx"
Cohesion: 0.21
Nodes (8): PasswordInput(), ProfessionalFooter(), SubmitButton(), EmailStep(), GoogleButton(), OtpStep(), PasswordStep(), useEmailPrefill()

### Community 33 - "Logo.jsx"
Cohesion: 0.18
Nodes (8): HamburgerHeader(), Logo(), HeaderPublicarAnuncio(), LogoBar(), STEPS, StepsNav(), useIsMobile(), RegisterHeader()

### Community 34 - "ListaPropiedades.jsx"
Cohesion: 0.25
Nodes (4): MAPPING_OPERACIONES, MAPPING_TIPOS, useLocationInfo(), ListaPropiedades()

### Community 35 - "MapOverlays.jsx"
Cohesion: 0.24
Nodes (8): InputSearchZona(), LocationControl(), ZoomControl(), useZonaSuggest(), ZonaSuggestions(), toQueryLabel(), toZoneSelection(), MapOverlays()

### Community 36 - "Fotos.jsx"
Cohesion: 0.20
Nodes (7): TIPS, GaleriaDropzone(), GaleriaPreviewGrid(), InfoBannerBlue(), NoPhotosWarningModal(), PrincipalDropzone(), TipsList()

### Community 37 - "Leads.jsx"
Cohesion: 0.31
Nodes (8): useLeads(), EstadoFilter(), formatFecha(), LeadCard(), useLeadsFilter(), Leads(), ESTADOS, getEstadoInfo()

### Community 38 - "Inmobitwo — Red social inmobiliaria"
Cohesion: 0.14
Nodes (13): 🏘️ Arquitectura multi-tenant, ✨ Características, 📝 Convenciones, 🐳 Docker y despliegue, 📁 Estructura del proyecto, Inmobitwo — Red social inmobiliaria, 🚀 Instalación y desarrollo local, ✅ Requisitos (+5 more)

### Community 39 - "rutas/page.js"
Cohesion: 0.24
Nodes (6): rutasBackend, rutasFrontend, AdminRutasPage(), BackendRoutes(), FrontendRoutes(), RouteGroup()

### Community 40 - "geoApi.js"
Cohesion: 0.31
Nodes (9): createOsmMap(), useSelectZona(), expandTipoInmueble(), fetchGeoCount(), fetchInmueblesEnBbox(), renderBoundary(), slugify(), useMapaInmuebles() (+1 more)

### Community 41 - "apiBackend"
Cohesion: 0.22
Nodes (9): apiBackend(), formatearRespuesta(), MAIN_HOSTS, TenantContext, TenantProvider(), fetchBoundaryGeometry(), geocodeCenter(), useSolicitarCodigo() (+1 more)

### Community 42 - "MapaInmueblesPage.jsx"
Cohesion: 0.26
Nodes (4): useMapaCenter(), parseOperationAndType(), slugToName(), MapaInmueblesPage()

### Community 43 - "useAuth.js"
Cohesion: 0.35
Nodes (8): useAuth(), useModalUser(), agregarNext(), buildLoginUrl(), getSafeNext(), Login(), LoginLink(), Registro()

### Community 44 - "Loading.jsx"
Cohesion: 0.22
Nodes (5): OrgActions(), OrganizacionLayout(), OrganizacionNav(), OrganizacionPublicaLayout(), Loading()

### Community 45 - "mapStyles.js"
Cohesion: 0.18
Nodes (12): sourceData(), ANCESTOR_OPACITY, FILL_COLOR, FILL_OPACITY, HOVER_DARK, HOVER_DARK_PINK, LINE_WIDTH, lineColorFor() (+4 more)

### Community 46 - "SelectZonaMap.jsx"
Cohesion: 0.22
Nodes (7): DrawGuide(), DrawToolbar(), LoadingBadge(), MapHintBanner(), MapWidgets(), VerInmueblesBar(), SelectZonaMap()

### Community 47 - "FormatoDetail.jsx"
Cohesion: 0.32
Nodes (8): dompurify, dompurify, FormatoCard(), FormatoDetail(), FormatoSelector(), FORMATO_ICONS, stripHtml(), TONOS_REFINAR

### Community 48 - "AdminOrganizacionesPage.jsx"
Cohesion: 0.26
Nodes (6): RutaAdmin(), AdminOrganizacionesPage(), EstadoFilter(), OrgList(), ESTADOS_ORG, useOrganizacionesAdmin()

### Community 49 - "app/layout.js"
Cohesion: 0.17
Nodes (10): geistAnton, geistArchivoBlack, geistBangers, geistLondrina, geistMono, geistMontserrat, geistPoppins, geistSans (+2 more)

### Community 50 - "modal-hamburguesa/ModalHamburguesa.jsx"
Cohesion: 0.24
Nodes (5): EnlacesHamburguesa(), DescargarApp(), EnlacesHamburguesa(), SinLogin(), sections

### Community 51 - "Acceso.jsx"
Cohesion: 0.26
Nodes (6): phoneFormatter(), Acceso(), CodeForm(), EmailPanel(), UnverifiedPanel(), VerifiedPanel()

### Community 52 - "PropertySearchWidget.jsx"
Cohesion: 0.18
Nodes (10): BEDROOMS, formatPrice(), LOCATIONS, MAX_AREAS, MIN_AREAS, PriceRangeSlider(), PROPERTY_TYPES, PropertySearchWidget() (+2 more)

### Community 53 - "BarraNavegacionTauri.jsx"
Cohesion: 0.27
Nodes (4): BarraNavegacionTauri(), isTauri(), SolicitarForm(), OlvidastePassword()

### Community 54 - "FormAgregarPropiedad.jsx"
Cohesion: 0.24
Nodes (7): AgregarPropiedad(), FormAgregarPropiedad(), agentes, departamentosCiudades, estadosPropiedad, tiposPropiedad, ModalAgregarPropiedad()

### Community 55 - "tema1/home/FooterSection.jsx"
Cohesion: 0.18
Nodes (6): featuredHouses, FooterSection(), partnerLogos, QR_PATTERN, quickLinks, supportLinks

### Community 56 - "tema2/home/Home.jsx"
Cohesion: 0.24
Nodes (5): CITIES, ExploreNeighborhoods(), avatars, Hero(), ScrollToTop()

### Community 57 - "tema2/home/FooterSection.jsx"
Cohesion: 0.18
Nodes (6): featuredHouses, FooterSection(), partnerLogos, QR_PATTERN, quickLinks, supportLinks

### Community 58 - "package.json"
Cohesion: 0.20
Nodes (9): name, packageManager, private, scripts, build, dev, lint, start (+1 more)

### Community 59 - "apiBackend.js"
Cohesion: 0.47
Nodes (6): apiBackendFormData(), formatearRespuesta(), obtenerTokenFresco(), renovarToken(), URL_BACKEND, obtenerOrigenActual()

### Community 60 - "MiPerfil.jsx"
Cohesion: 0.27
Nodes (4): numero_atencion_cliente, SupportBlock(), MiPerfil(), Perfil()

### Community 61 - "NavbarListaPropiedades.jsx"
Cohesion: 0.38
Nodes (5): Columna(), EnlaceNav(), NavLinks(), MENUS, NavbarListaPropiedades()

### Community 62 - "PropiedadId.jsx"
Cohesion: 0.29
Nodes (5): SmartLoader(), MenuOpciones(), HeaderPropiedadId(), logo, logo_2

### Community 63 - "useResetForm.js"
Cohesion: 0.49
Nodes (6): mapearApiAFormDataUsuario(), useResetForm(), useUsuarios(), validatePasswordNueva(), useVerificacionEmail(), usePerfilForm()

### Community 65 - "TituloDescripcion.jsx"
Cohesion: 0.31
Nodes (5): DescripcionTabs(), IaGeneratePanel(), TituloAuto(), TituloDescripcion(), useRefinarDescripcion()

### Community 66 - "geoman.js"
Cohesion: 0.44
Nodes (8): extractCreatedGeojson(), setupGeoman(), stripElevation(), to2D(), getRingClosePoint(), handleDeletePolygon(), placeCloseMarker(), removeCloseMarker()

### Community 67 - "devDependencies"
Cohesion: 0.22
Nodes (9): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tailwindcss (+1 more)

### Community 68 - "Estado del refactor seguro (safe-refactor)"
Cohesion: 0.22
Nodes (8): Candidatos a promover a `src/components/` (ejecutado), Consumidores externos actualizados (solo ruta de import), Deuda técnica / mejoras futuras (no refactorizar a ciegas), Errores corregidos, Estado del refactor seguro (safe-refactor), Pre-existentes NO tocados (fuera de alcance), Regla de ubicación (acordada), Zonas refactorizadas

### Community 69 - "SeguridadAcceso.jsx"
Cohesion: 0.31
Nodes (4): getPasswordChecklist(), ModalCambiarPassword(), REQUISITOS, SeguridadAcceso()

### Community 70 - "GetInTouchSection.jsx"
Cohesion: 0.22
Nodes (3): GetInTouchSection(), marqueeItems, repeatedItems

### Community 71 - "mapPins.js"
Cohesion: 0.46
Nodes (6): createClusterIcon(), createPricePin(), formatPrecioCompacto(), formatPrecioPin(), clearMarkers(), renderMarkers()

### Community 72 - "PropertyMap.jsx"
Cohesion: 0.32
Nodes (6): Hero(), formatPrice(), MapPin(), properties, PropertyMap(), PropertyPopup()

### Community 73 - "Header.jsx"
Cohesion: 0.32
Nodes (5): Header(), links, Navbar(), socials, TopBar()

### Community 74 - "useMiniMapa.js"
Cohesion: 0.48
Nodes (4): collectionBounds(), coords(), drawGeometry(), featBounds()

### Community 75 - "tema1/home/PropertyGrid.jsx"
Cohesion: 0.33
Nodes (5): CATEGORIES, formatPrice(), properties, PropertyCard(), PropertyGrid()

### Community 76 - "tema2/home/PropertyGrid.jsx"
Cohesion: 0.33
Nodes (5): CATEGORIES, formatPrice(), properties, PropertyCard(), PropertyGrid()

### Community 77 - "PublishingGuideSection.jsx"
Cohesion: 0.38
Nodes (3): GUIDE_STEPS, NumberedStep(), PublishingGuideSection()

### Community 78 - "FloorDoorBlockForm.jsx"
Cohesion: 0.29
Nodes (3): BLOCK_OPTIONS, DOOR_OPTIONS, FLOOR_OPTIONS

### Community 79 - "header-principal/InputSearchPrincipal.jsx"
Cohesion: 0.53
Nodes (3): InputSearchPrincipal(), frases_buscar, useTypingPlaceholder()

### Community 81 - "FeaturedPropertyHero.jsx"
Cohesion: 0.40
Nodes (3): FeaturedPropertyHero(), formatPrice(), slides

### Community 82 - "ServicesSection.jsx"
Cohesion: 0.47
Nodes (3): ServiceCard(), SERVICES, ServicesSection()

### Community 83 - "RegisterForm.jsx"
Cohesion: 0.47
Nodes (3): PasswordField(), RegisterForm(), TextField()

### Community 85 - "AgentsSlider.jsx"
Cohesion: 0.50
Nodes (3): agents, AgentsSlider(), getItemsPerView()

### Community 86 - "PillarHelpSection.jsx"
Cohesion: 0.50
Nodes (3): getItemsPerView(), items, PillarHelpSection()

### Community 88 - "MeetOurAgents.jsx"
Cohesion: 0.40
Nodes (3): AGENTS, MeetOurAgents(), SOCIALS

### Community 89 - "WhyChooseUs.jsx"
Cohesion: 0.40
Nodes (3): AVATARS, SERVICES, WhyChooseUs()

### Community 90 - "PropertySlider.jsx"
Cohesion: 0.67
Nodes (3): getItemsPerView(), PropertySlider(), propertyTypes

## Knowledge Gaps
- **194 isolated node(s):** `eslintConfig`, `paths`, `nextConfig`, `name`, `version` (+189 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `apiBackend()` connect `apiBackend` to `PropertyCard.jsx`, `components/InfoCards.jsx`, `irArriba`, `Guards.jsx`, `hero/Hero.jsx`, `useDetalles`, `useZonaMap.js`, `useFavoritos`, `useDatosBasicos.js`, `useTracking`, `usePropiedades.js`, `RestablecerPassword.jsx`, `useDatosBasicos`, `usePropiedades`, `SeleccionarZonaPage.jsx`, `useOrganizaciones`, `ListaPropiedades.jsx`, `MapOverlays.jsx`, `Leads.jsx`, `geoApi.js`, `MapaInmueblesPage.jsx`, `useAuth.js`, `apiBackend.js`, `useResetForm.js`, `TituloDescripcion.jsx`, `useMiniMapa.js`?**
  _High betweenness centrality (0.242) - this node is a cross-community bridge._
- **Why does `useAppContext()` connect `useAppContext` to `components/InfoCards.jsx`, `irArriba`, `Guards.jsx`, `CardPropiedad.jsx`, `useDetalles`, `useFavoritos`, `useDatosBasicos.js`, `useTracking`, `usePropiedades.js`, `useDatosBasicos`, `Feed.jsx`, `usePropiedades`, `PublicarAnuncio.jsx`, `MiOrganizacionesSidebar.jsx`, `LocationForm.jsx`, `useOrganizaciones`, `Login.jsx`, `Logo.jsx`, `Leads.jsx`, `AdminOrganizacionesPage.jsx`, `modal-hamburguesa/ModalHamburguesa.jsx`, `FormAgregarPropiedad.jsx`, `NavbarListaPropiedades.jsx`, `PropiedadId.jsx`, `useResetForm.js`, `SeguridadAcceso.jsx`, `RegisterForm.jsx`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Why does `useOrganizaciones()` connect `useOrganizaciones` to `Guards.jsx`, `useAppContext`, `useOutletContext`, `apiBackend`, `Loading.jsx`, `useDatosBasicos.js`, `AdminOrganizacionesPage.jsx`, `temaRegistry.js`, `useDatosBasicos`, `MiOrganizacionesSidebar.jsx`, `app/page.js`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `paths`, `nextConfig` to the rest of the system?**
  _194 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PropertyCard.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06127206127206127 - nodes in this community are weakly interconnected._
- **Should `components/InfoCards.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05927405927405927 - nodes in this community are weakly interconnected._
- **Should `irArriba` be split into smaller, more focused modules?**
  _Cohesion score 0.05081081081081081 - nodes in this community are weakly interconnected._
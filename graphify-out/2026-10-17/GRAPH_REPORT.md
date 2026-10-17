# Graph Report - web-inmobitwo  (2026-10-09)

## Corpus Check
- 614 files · ~417,600 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1749 nodes · 4091 edges · 126 communities (106 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c70c8ab6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useFavoritos
- components/InfoCards.jsx
- irArriba
- descargas/DescargarApp.jsx
- FormFiltros.jsx
- Guards.jsx
- hero/Hero.jsx
- useAppContext
- useOutletContext
- hamburger/ConLogin.jsx
- useDetalles
- useZonaMap.js
- PropiedadId.jsx
- useDatosBasicos.js
- AppProvider.jsx
- info-cards/InfoCards.jsx
- footer/SiteFooter.jsx
- RestablecerPassword.jsx
- dependencies
- temaRegistry.js
- RadioGroupInput.jsx
- Feed.jsx
- usePropiedades
- PublicarAnuncio.jsx
- geoApi.js
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
- useMapaInmuebles.js
- MisAnuncios.jsx
- MapaInmueblesPage.jsx
- useAuth.js
- Loading.jsx
- layers.js
- SelectZonaMap.jsx
- FormatoDetail.jsx
- AdminOrganizacionesPage.jsx
- app/layout.js
- modal-hamburguesa/ModalHamburguesa.jsx
- Acceso.jsx
- PropertySearchWidget.jsx
- BarraNavegacionTauri.jsx
- RoomSeekerForm.jsx
- tema1/home/FooterSection.jsx
- tema2/home/Home.jsx
- tema2/home/FooterSection.jsx
- package.json
- apiBackend.js
- SeguridadAcceso.jsx
- TituloDescripcion.jsx
- PageAnuncio.jsx
- apiBackend
- DownloadAppSection.jsx
- Principal.jsx
- geoman.js
- devDependencies
- Estado del refactor seguro (safe-refactor)
- Logs.jsx
- GetInTouchSection.jsx
- search/InputSearchPrincipal.jsx
- PropertyMap.jsx
- Header.jsx
- components/Caracteristicas.jsx
- tema1/home/PropertyGrid.jsx
- tema2/home/PropertyGrid.jsx
- PublishingGuideSection.jsx
- FloorDoorBlockForm.jsx
- header-principal/InputSearchPrincipal.jsx
- FAQSection.jsx
- FeaturedPropertyHero.jsx
- Perfil.jsx
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
- ServicesSection.jsx
- ListadoDePropiedades.jsx
- AGENTS.md
- eslint.config.mjs
- HowToPublishHero.jsx
- gsap
- lucide
- maplibre-gl
- motion
- TenantProvider.jsx
- next.config.mjs
- react-dom
- postcss.config.mjs
- links_inicio.js
- skills_data.js
- MisAnunciosContent.jsx
- HeaderPublicarAnuncio.jsx
- @geoman-io/maplibre-geoman-free
- lucide-react

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
- `DescripcionAnuncio()` --references--> `dompurify`  [EXTRACTED]
  src/views/lista-propiedades/card-anuncio/DescripcionAnuncio.jsx → package.json
- `FormatoDetail()` --references--> `dompurify`  [EXTRACTED]
  src/views/publicar-anuncio/paso-2/descripcion/FormatoDetail.jsx → package.json
- `useMapaInmuebles()` --references--> `supercluster`  [EXTRACTED]
  src/views/mapa-inmuebles/components/map/useMapaInmuebles.js → package.json
- `fetchBoundaryGeometry()` --calls--> `apiBackend()`  [EXTRACTED]
  src/views/mapa-inmuebles/hooks/useMapaCenter.js → src/actions/apiBackend.js
- `geocodeCenter()` --calls--> `apiBackend()`  [EXTRACTED]
  src/views/mapa-inmuebles/hooks/useMapaCenter.js → src/actions/apiBackend.js

## Import Cycles
- None detected.

## Communities (126 total, 20 thin omitted)

### Community 0 - "useFavoritos"
Cohesion: 0.05
Nodes (61): PropertyImage(), CardActions(), CardBody(), CardGallery(), getOperacionLabel(), getTipoLabel(), getTitulo(), getUbicacion() (+53 more)

### Community 1 - "components/InfoCards.jsx"
Cohesion: 0.07
Nodes (46): AddressMapModal(), MapWarnings(), createMap(), createMarker(), resolveInitial(), useAddressMap(), DescriptionEditor(), editorExtensions (+38 more)

### Community 2 - "irArriba"
Cohesion: 0.15
Nodes (14): irArriba(), PublishCtaButton(), WizardFooter(), DetalleTopBar(), scrollTop(), AnuncioInfo(), AnuncioPhoto(), AnuncioStatus() (+6 more)

### Community 3 - "descargas/DescargarApp.jsx"
Cohesion: 0.05
Nodes (37): cliCommands, descargas, detectarSO(), ordenSO, AudienceCard(), Audiences(), AUDIENCIAS, CliInstall() (+29 more)

### Community 4 - "FormFiltros.jsx"
Cohesion: 0.06
Nodes (35): MiniMapaUbicacion(), useMiniMapa(), CARACTERISTICAS_INMUEBLE, ESTADOS_INMUEBLE, PROPERTY_TYPES_FALLBACK, CATEGORIAS_VIVIENDA, Alcobas(), OPCIONES (+27 more)

### Community 5 - "Guards.jsx"
Cohesion: 0.11
Nodes (5): RutaAdmin(), RutaPrivada(), obtenerOrigenActual(), Feed(), Anuncio()

### Community 6 - "hero/Hero.jsx"
Cohesion: 0.16
Nodes (12): FRASES, TIPO_OPTIONS, AnimatedTitle(), Hero(), HeroSearchButton(), HeroTabs(), SelectorTipo(), TABS (+4 more)

### Community 7 - "useAppContext"
Cohesion: 0.12
Nodes (22): TrackingInit(), ConsentimientoBanner(), DescargarApp(), ModalHamburguesa(), SinLogin(), HamburgerToggle(), UserNavLinks(), LoaderGlobal() (+14 more)

### Community 8 - "useOutletContext"
Cohesion: 0.10
Nodes (18): usePropiedadesOrganizacionData(), ContactoOrg(), OrgOutletContext, OrgOutletProvider, useOutletContext, SobreNosotrosOrg(), Contacto(), Home() (+10 more)

### Community 9 - "hamburger/ConLogin.jsx"
Cohesion: 0.15
Nodes (17): closeMenus(), ConLogin(), TAMANOS, UserAvatar(), ConLogin(), ModalUserPropiedadId(), items_menu, useMisAnunciosCount() (+9 more)

### Community 10 - "useDetalles"
Cohesion: 0.15
Nodes (22): ESTRATOS, PARQUEADERO_MODOS, PARQUEADERO_TIPOS, ZONAS, cargarCatalogos(), cargarFeaturesDePropiedad(), featuresCache, getTituloSugerido() (+14 more)

### Community 11 - "useZonaMap.js"
Cohesion: 0.20
Nodes (18): OSM_STYLE, zoomToBounds(), collectionBounds(), coords(), drawGeometry(), featBounds(), findFeature(), handleStartDrawing() (+10 more)

### Community 12 - "PropiedadId.jsx"
Cohesion: 0.18
Nodes (7): SmartLoader(), HeaderPropiedadId(), PropiedadId(), logo, logo_2, HeaderSidebar(), PagePropiedadId()

### Community 13 - "useDatosBasicos.js"
Cohesion: 0.11
Nodes (26): BARRIOS_POR_CIUDAD, CONTACT_PREFERENCES, COUNTRY_CODES, INDICE_ORDEN, ordenarPropertyTypes(), PROPERTY_TYPES_DESCRIPCIONES, RENTAL_TYPE_IDS, RENTAL_TYPE_OPTIONS (+18 more)

### Community 14 - "AppProvider.jsx"
Cohesion: 0.18
Nodes (15): AppContext, AppProvider(), leerLocal(), FORM_DATA_PROPIEDAD_INICIAL, FORM_DATA_USUARIO_INICIAL, leerUtm(), postSilencioso(), resolverSource() (+7 more)

### Community 15 - "info-cards/InfoCards.jsx"
Cohesion: 0.23
Nodes (9): cards, SUGGESTIONS, SuggestionsMenu(), InfoCardItem(), InfoCards(), buildGeoPath(), buildZonaUrl(), getOperationSlug() (+1 more)

### Community 16 - "footer/SiteFooter.jsx"
Cohesion: 0.14
Nodes (16): AppStoreButtons(), STORE_BUTTONS, FooterLinkColumns(), LanguageSelect(), LinkColumn(), FOOTER_GROUPS, SocialLinks(), SOCIALS (+8 more)

### Community 17 - "RestablecerPassword.jsx"
Cohesion: 0.15
Nodes (12): getPasswordChecklist(), validatePasswordRegistro(), FormRestablecer(), NewPasswordField(), PasswordChecklist(), REGLAS, MensajeConfirmacion(), OtpInput() (+4 more)

### Community 18 - "dependencies"
Cohesion: 0.09
Nodes (23): framer-motion, @gsap/react, @headlessui/react, next, dependencies, framer-motion, @gsap/react, @headlessui/react (+15 more)

### Community 19 - "temaRegistry.js"
Cohesion: 0.15
Nodes (10): dynamic, dynamic, dynamic, ContactoTemaSlot(), HomeTemaSlot(), LayoutPublicoResolver(), SobreNosotrosTemaSlot(), getTema() (+2 more)

### Community 20 - "RadioGroupInput.jsx"
Cohesion: 0.31
Nodes (5): OPERATION_OPTIONS, OPERATION_TYPE_IDS, RadioGroupInput(), Operacion(), TipoAlquiler()

### Community 21 - "Feed.jsx"
Cohesion: 0.13
Nodes (14): AgregarPropiedad(), Actividad(), ActivityMap(), EVENTOS, RecentActivity(), STAT_CARDS, STAT_VALUES, StatsGrid() (+6 more)

### Community 22 - "usePropiedades"
Cohesion: 0.14
Nodes (29): FormAgregarPropiedad(), agentes, departamentosCiudades, estadosPropiedad, tiposPropiedad, useFotos(), appendCamposPropiedad(), cacheKey() (+21 more)

### Community 23 - "PublicarAnuncio.jsx"
Cohesion: 0.16
Nodes (10): ModalContinuarAnuncio(), ModalInformativo(), WizardSteps(), InfoIntro(), InfoPromoRow(), Informacion(), DatosBasicos(), Detalles() (+2 more)

### Community 24 - "geoApi.js"
Cohesion: 0.15
Nodes (15): useSelectZona(), expandTipoInmueble(), fetchGeoCount(), fetchInmueblesEnBbox(), fetchInmueblesEnPoligono(), fetchRegionsGeoJSON(), fetchStatesGeoJSON(), SelectedZoneCard() (+7 more)

### Community 25 - "InfoPublicarAnuncio.jsx"
Cohesion: 0.23
Nodes (5): AdvantageColumn(), ADVANTAGES, AdvantagesSection(), LinksGridSection(), InfoPublicarAnuncio()

### Community 26 - "MiOrganizacionesSidebar.jsx"
Cohesion: 0.14
Nodes (12): items_admin, items_organizacion, items_sidebar, toCapitalize(), ActiveOrgCard(), BotonAdminOrganizaciones(), EmptyOrgCard(), ItemsSidebar() (+4 more)

### Community 27 - "useSlugParser"
Cohesion: 0.18
Nodes (13): getSelectedId(), getTabs(), TAB_ALQUILAR, TAB_COMPRAR, TAB_OBRA_NUEVA, TAB_VACACIONAL, useSlugParser(), BotonGuardarBusqueda() (+5 more)

### Community 28 - "LocationForm.jsx"
Cohesion: 0.20
Nodes (8): UbicacionMapa(), TipoSelect(), TipoInmueble(), BarrioFields(), ConfirmedLocation(), LocationCascadeSelect(), LocationForm(), StreetFields()

### Community 29 - "tema1/home/Home.jsx"
Cohesion: 0.13
Nodes (9): items, Navbar(), neighborhoods, NeighborhoodsSection(), ScrollToTop(), testimonials, TestimonialsSection(), contactItems (+1 more)

### Community 30 - "app/page.js"
Cohesion: 0.21
Nodes (10): dynamic, RoutePage(), dynamic, Page(), dynamic, RoutePage(), useTenant(), LayoutResolver() (+2 more)

### Community 31 - "useOrganizaciones"
Cohesion: 0.16
Nodes (11): invalidarMisOrgCache(), misOrgCache, misOrgCacheKey(), useOrganizaciones(), AgentesPanel(), CrearOrganizacionForm(), estadoInicial, EstadisticasPanel() (+3 more)

### Community 32 - "Login.jsx"
Cohesion: 0.24
Nodes (7): ProfessionalFooter(), SubmitButton(), EmailStep(), GoogleButton(), OtpStep(), PasswordStep(), useEmailPrefill()

### Community 33 - "Logo.jsx"
Cohesion: 0.36
Nodes (3): HamburgerHeader(), Logo(), RegisterHeader()

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
Cohesion: 0.24
Nodes (8): useLeads(), EstadoFilter(), formatFecha(), LeadCard(), useLeadsFilter(), Leads(), ESTADOS, getEstadoInfo()

### Community 38 - "Inmobitwo — Red social inmobiliaria"
Cohesion: 0.14
Nodes (13): 🏘️ Arquitectura multi-tenant, ✨ Características, 📝 Convenciones, 🐳 Docker y despliegue, 📁 Estructura del proyecto, Inmobitwo — Red social inmobiliaria, 🚀 Instalación y desarrollo local, ✅ Requisitos (+5 more)

### Community 39 - "rutas/page.js"
Cohesion: 0.24
Nodes (6): rutasBackend, rutasFrontend, AdminRutasPage(), BackendRoutes(), FrontendRoutes(), RouteGroup()

### Community 40 - "useMapaInmuebles.js"
Cohesion: 0.21
Nodes (13): supercluster, createClusterIcon(), createPricePin(), createOsmMap(), formatPrecioCompacto(), formatPrecioPin(), renderBoundary(), clearMarkers() (+5 more)

### Community 41 - "MisAnuncios.jsx"
Cohesion: 0.29
Nodes (4): SiteFooter(), HeaderInmobitwo(), scrollbarStyles, MiPerfil()

### Community 42 - "MapaInmueblesPage.jsx"
Cohesion: 0.21
Nodes (6): fetchBoundaryGeometry(), geocodeCenter(), useMapaCenter(), parseOperationAndType(), slugToName(), MapaInmueblesPage()

### Community 43 - "useAuth.js"
Cohesion: 0.20
Nodes (9): RutaPublica(), useAuth(), agregarNext(), buildLoginUrl(), getSafeNext(), leerNextActual(), Login(), LoginLink() (+1 more)

### Community 44 - "Loading.jsx"
Cohesion: 0.17
Nodes (7): SlugLayout(), OrgActions(), OrgList(), OrganizacionLayout(), OrganizacionNav(), OrganizacionPublicaLayout(), Loading()

### Community 45 - "layers.js"
Cohesion: 0.15
Nodes (21): fetchBarrios(), fetchCitiesGeoJSON(), addDrawSource(), loadDrawBoundaries(), loadMunicipios(), maybeLoadDrawBarrios(), refreshLayers(), sourceData() (+13 more)

### Community 46 - "SelectZonaMap.jsx"
Cohesion: 0.22
Nodes (7): DrawGuide(), DrawToolbar(), LoadingBadge(), MapHintBanner(), MapWidgets(), VerInmueblesBar(), SelectZonaMap()

### Community 47 - "FormatoDetail.jsx"
Cohesion: 0.36
Nodes (7): dompurify, dompurify, FormatoCard(), FormatoDetail(), FORMATO_ICONS, stripHtml(), TONOS_REFINAR

### Community 48 - "AdminOrganizacionesPage.jsx"
Cohesion: 0.33
Nodes (4): AdminOrganizacionesPage(), EstadoFilter(), ESTADOS_ORG, useOrganizacionesAdmin()

### Community 49 - "app/layout.js"
Cohesion: 0.17
Nodes (10): geistAnton, geistArchivoBlack, geistBangers, geistLondrina, geistMono, geistMontserrat, geistPoppins, geistSans (+2 more)

### Community 50 - "modal-hamburguesa/ModalHamburguesa.jsx"
Cohesion: 0.16
Nodes (10): EnlacesHamburguesa(), Columna(), EnlaceNav(), NavLinks(), DescargarApp(), EnlacesHamburguesa(), ModalHamburguesa(), sections (+2 more)

### Community 51 - "Acceso.jsx"
Cohesion: 0.36
Nodes (4): Acceso(), CodeForm(), UnverifiedPanel(), VerifiedPanel()

### Community 52 - "PropertySearchWidget.jsx"
Cohesion: 0.18
Nodes (10): BEDROOMS, formatPrice(), LOCATIONS, MAX_AREAS, MIN_AREAS, PriceRangeSlider(), PROPERTY_TYPES, PropertySearchWidget() (+2 more)

### Community 53 - "BarraNavegacionTauri.jsx"
Cohesion: 0.24
Nodes (5): BarraNavegacionTauri(), isTauri(), SolicitarForm(), useSolicitarCodigo(), OlvidastePassword()

### Community 54 - "RoomSeekerForm.jsx"
Cohesion: 0.21
Nodes (14): boolToTri(), BUSCA_CON_OPTIONS, formatoCOP(), formatoFecha(), GENERO_OPTIONS, OCUPACION_OPTIONS, perfilAChips(), TRI_OPTIONS (+6 more)

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
Cohesion: 0.42
Nodes (6): formatearRespuesta(), apiBackendFormData(), formatearRespuesta(), obtenerTokenFresco(), renovarToken(), URL_BACKEND

### Community 60 - "SeguridadAcceso.jsx"
Cohesion: 0.23
Nodes (5): numero_atencion_cliente, phoneFormatter(), EmailPanel(), SeguridadAcceso(), SupportBlock()

### Community 61 - "TituloDescripcion.jsx"
Cohesion: 0.27
Nodes (6): DescripcionTabs(), FormatoSelector(), IaGeneratePanel(), TituloAuto(), TituloDescripcion(), useRefinarDescripcion()

### Community 62 - "PageAnuncio.jsx"
Cohesion: 0.22
Nodes (6): AccountAccess(), HamburgerButton(), PublishButton(), NavbarHome(), readNavState(), PageAnuncio()

### Community 63 - "apiBackend"
Cohesion: 0.29
Nodes (10): apiBackend(), getPasswordChecklist(), ModalCambiarPassword(), REQUISITOS, mapearApiAFormDataUsuario(), useUsuarios(), validatePasswordNueva(), DetalleEstado() (+2 more)

### Community 65 - "Principal.jsx"
Cohesion: 0.17
Nodes (11): HeaderFiltros(), HeaderPrincipal(), Principal(), filtros_propiedades, feedActions, getFeedSnapshot(), listeners, state (+3 more)

### Community 66 - "geoman.js"
Cohesion: 0.44
Nodes (8): extractCreatedGeojson(), setupGeoman(), stripElevation(), to2D(), getRingClosePoint(), handleDeletePolygon(), placeCloseMarker(), removeCloseMarker()

### Community 67 - "devDependencies"
Cohesion: 0.22
Nodes (9): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tailwindcss (+1 more)

### Community 68 - "Estado del refactor seguro (safe-refactor)"
Cohesion: 0.22
Nodes (8): Candidatos a promover a `src/components/` (ejecutado), Consumidores externos actualizados (solo ruta de import), Deuda técnica / mejoras futuras (no refactorizar a ciegas), Errores corregidos, Estado del refactor seguro (safe-refactor), Pre-existentes NO tocados (fuera de alcance), Regla de ubicación (acordada), Zonas refactorizadas

### Community 69 - "Logs.jsx"
Cohesion: 0.23
Nodes (7): useLogsTracking(), LogLine(), LogsHeader(), useLogsAutoRefresh(), COLOR_POR_TIPO, formatearHora(), Logs()

### Community 70 - "GetInTouchSection.jsx"
Cohesion: 0.22
Nodes (3): GetInTouchSection(), marqueeItems, repeatedItems

### Community 71 - "search/InputSearchPrincipal.jsx"
Cohesion: 0.33
Nodes (5): InputSearchPrincipal(), SearchResultsList(), useCitySuggestions(), toGeoSelection(), toQueryLabel()

### Community 72 - "PropertyMap.jsx"
Cohesion: 0.32
Nodes (6): Hero(), formatPrice(), MapPin(), properties, PropertyMap(), PropertyPopup()

### Community 73 - "Header.jsx"
Cohesion: 0.32
Nodes (5): Header(), links, Navbar(), socials, TopBar()

### Community 74 - "components/Caracteristicas.jsx"
Cohesion: 0.43
Nodes (4): CheckboxGroup(), CheckBoxUnico(), CheckPublicarPorInmobiliaria(), Caracteristicas()

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

### Community 82 - "Perfil.jsx"
Cohesion: 0.27
Nodes (7): HeadPerfilAcceso(), TABS, EditFields(), AccessLinkRow(), EditToggle(), SaveActions(), Perfil()

### Community 83 - "RegisterForm.jsx"
Cohesion: 0.36
Nodes (4): PasswordInput(), PasswordField(), RegisterForm(), TextField()

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

### Community 94 - "ServicesSection.jsx"
Cohesion: 0.47
Nodes (3): ServiceCard(), SERVICES, ServicesSection()

### Community 95 - "ListadoDePropiedades.jsx"
Cohesion: 0.33
Nodes (7): OPCIONES_ORDEN, usePropertySearch(), CHIPS, FiltroRelevante(), getFiltroLabel(), ListadoDePropiedades(), TYPE_LABELS

### Community 98 - "HowToPublishHero.jsx"
Cohesion: 0.36
Nodes (4): HERO_BULLETS, HeroBullets(), HowToPublishHero(), PhoneIllustration()

### Community 103 - "TenantProvider.jsx"
Cohesion: 0.60
Nodes (3): MAIN_HOSTS, TenantContext, TenantProvider()

### Community 121 - "MisAnunciosContent.jsx"
Cohesion: 0.50
Nodes (3): ListaAnuncios(), MisAnunciosContent(), SinAnuncios()

### Community 123 - "HeaderPublicarAnuncio.jsx"
Cohesion: 0.33
Nodes (5): HeaderPublicarAnuncio(), LogoBar(), STEPS, StepsNav(), useIsMobile()

## Knowledge Gaps
- **194 isolated node(s):** `eslintConfig`, `paths`, `nextConfig`, `name`, `version` (+189 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `apiBackend()` connect `apiBackend` to `useFavoritos`, `components/InfoCards.jsx`, `Guards.jsx`, `useAppContext`, `useDetalles`, `useZonaMap.js`, `useDatosBasicos.js`, `AppProvider.jsx`, `RestablecerPassword.jsx`, `usePropiedades`, `geoApi.js`, `useOrganizaciones`, `ListaPropiedades.jsx`, `MapOverlays.jsx`, `Leads.jsx`, `useMapaInmuebles.js`, `MapaInmueblesPage.jsx`, `useAuth.js`, `layers.js`, `BarraNavegacionTauri.jsx`, `RoomSeekerForm.jsx`, `apiBackend.js`, `TituloDescripcion.jsx`, `Logs.jsx`, `search/InputSearchPrincipal.jsx`, `TenantProvider.jsx`?**
  _High betweenness centrality (0.216) - this node is a cross-community bridge._
- **Why does `useAppContext()` connect `useAppContext` to `useFavoritos`, `components/InfoCards.jsx`, `Guards.jsx`, `hamburger/ConLogin.jsx`, `useDetalles`, `PropiedadId.jsx`, `useDatosBasicos.js`, `AppProvider.jsx`, `Feed.jsx`, `usePropiedades`, `PublicarAnuncio.jsx`, `MiOrganizacionesSidebar.jsx`, `LocationForm.jsx`, `useOrganizaciones`, `Login.jsx`, `Leads.jsx`, `MisAnuncios.jsx`, `useAuth.js`, `modal-hamburguesa/ModalHamburguesa.jsx`, `RoomSeekerForm.jsx`, `PageAnuncio.jsx`, `apiBackend`, `Principal.jsx`, `Logs.jsx`, `RegisterForm.jsx`, `HeaderPublicarAnuncio.jsx`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `gsap`, `lucide`, `maplibre-gl`, `motion`, `useMapaInmuebles.js`, `react-dom`, `FormatoDetail.jsx`, `package.json`, `@geoman-io/maplibre-geoman-free`, `lucide-react`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `paths`, `nextConfig` to the rest of the system?**
  _194 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useFavoritos` be split into smaller, more focused modules?**
  _Cohesion score 0.05425742574257426 - nodes in this community are weakly interconnected._
- **Should `components/InfoCards.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06506849315068493 - nodes in this community are weakly interconnected._
- **Should `irArriba` be split into smaller, more focused modules?**
  _Cohesion score 0.1455026455026455 - nodes in this community are weakly interconnected._
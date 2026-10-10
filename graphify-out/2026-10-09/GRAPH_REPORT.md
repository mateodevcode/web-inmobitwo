# Graph Report - web-inmobitwo  (2026-10-09)

## Corpus Check
- 613 files · ~417,648 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1747 nodes · 4083 edges · 126 communities (104 shown, 22 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.53)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c70c8ab6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- formatPrecioCompleto
- components/InfoCards.jsx
- irArriba
- descargas/DescargarApp.jsx
- FormFiltros.jsx
- Guards.jsx
- hero/Hero.jsx
- useAppContext
- useOutletContext
- PropiedadId.jsx
- useDetalles
- useZonaMap.js
- MisFavoritos.jsx
- useDatosBasicos.js
- useVistaDetalle.js
- useWizardProgress.js
- footer/SiteFooter.jsx
- RestablecerPassword.jsx
- dependencies
- temaRegistry.js
- ContactForm.jsx
- Feed.jsx
- usePropiedades
- Informacion.jsx
- geoApi.js
- InfoPublicarAnuncio.jsx
- MiOrganizacionesSidebar.jsx
- useSlugParser
- DatosBasicos.jsx
- tema1/home/Home.jsx
- useTenant
- useOrganizaciones
- Login.jsx
- Logo.jsx
- ListaPropiedades.jsx
- InputSearchZona.jsx
- PublicarAnuncio.jsx
- Leads.jsx
- Inmobitwo — Red social inmobiliaria
- rutas/page.js
- useMapaInmuebles.js
- AppContext.js
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
- RoomSeekerForm.jsx
- tema1/home/FooterSection.jsx
- tema2/home/Home.jsx
- tema2/home/FooterSection.jsx
- package.json
- apiBackend.js
- data.styles.scrollbar.js
- NavbarListaPropiedades.jsx
- PageAnuncio.jsx
- apiBackend
- DownloadAppSection.jsx
- useFavoritos
- geoman.js
- devDependencies
- Estado del refactor seguro (safe-refactor)
- Logs.jsx
- GetInTouchSection.jsx
- agruparPorOrden
- PropertyMap.jsx
- Header.jsx
- CardAnuncio.jsx
- tema1/home/PropertyGrid.jsx
- tema2/home/PropertyGrid.jsx
- PropertyCard.jsx
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
- AppProvider.jsx
- ListadoDePropiedades.jsx
- AGENTS.md
- eslint.config.mjs
- HowToPublishHero.jsx
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
- ListaAnuncios.jsx
- useDetallePropiedad.js
- StepsNav.jsx
- UbicacionMapa.jsx
- framer-motion

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
- `useMapaInmuebles()` --references--> `supercluster`  [EXTRACTED]
  src/views/mapa-inmuebles/components/map/useMapaInmuebles.js → package.json
- `FormatoDetail()` --references--> `dompurify`  [EXTRACTED]
  src/views/publicar-anuncio/paso-2/descripcion/FormatoDetail.jsx → package.json
- `fetchBoundaryGeometry()` --calls--> `apiBackend()`  [EXTRACTED]
  src/views/mapa-inmuebles/hooks/useMapaCenter.js → src/actions/apiBackend.js
- `geocodeCenter()` --calls--> `apiBackend()`  [EXTRACTED]
  src/views/mapa-inmuebles/hooks/useMapaCenter.js → src/actions/apiBackend.js

## Import Cycles
- None detected.

## Communities (126 total, 22 thin omitted)

### Community 0 - "formatPrecioCompleto"
Cohesion: 0.24
Nodes (9): CardBody(), useScrollSentinel(), formatPrecioCompleto(), BarraNavegacion(), BotonDescartar(), CardPrincipal(), DetalleInmuble(), HeaderDinamico() (+1 more)

### Community 1 - "components/InfoCards.jsx"
Cohesion: 0.07
Nodes (46): AddressMapModal(), MapWarnings(), createMap(), createMarker(), resolveInitial(), useAddressMap(), DescriptionEditor(), editorExtensions (+38 more)

### Community 2 - "irArriba"
Cohesion: 0.16
Nodes (13): irArriba(), PublishCtaButton(), WizardFooter(), DetalleTopBar(), scrollTop(), AnuncioInfo(), AnuncioPhoto(), PublishAnuncioButton() (+5 more)

### Community 3 - "descargas/DescargarApp.jsx"
Cohesion: 0.05
Nodes (37): cliCommands, descargas, detectarSO(), ordenSO, AudienceCard(), Audiences(), AUDIENCIAS, CliInstall() (+29 more)

### Community 4 - "FormFiltros.jsx"
Cohesion: 0.07
Nodes (33): CARACTERISTICAS_INMUEBLE, ESTADOS_INMUEBLE, PROPERTY_TYPES_FALLBACK, CATEGORIAS_VIVIENDA, Alcobas(), OPCIONES, Banos(), OPCIONES (+25 more)

### Community 5 - "Guards.jsx"
Cohesion: 0.09
Nodes (7): RutaAdmin(), RutaPrivada(), RutaPublica(), leerNextActual(), Feed(), PagePropiedadId(), MiPerfil()

### Community 6 - "hero/Hero.jsx"
Cohesion: 0.08
Nodes (26): FRASES, cards, TIPO_OPTIONS, SUGGESTIONS, AnimatedTitle(), Hero(), HeroSearchButton(), HeroTabs() (+18 more)

### Community 7 - "useAppContext"
Cohesion: 0.19
Nodes (13): TrackingInit(), ConsentimientoBanner(), LoaderGlobal(), ModalContactoLead(), ModalUser(), useAppContext(), useTracking(), SidebarContacto() (+5 more)

### Community 8 - "useOutletContext"
Cohesion: 0.11
Nodes (17): usePropiedadesOrganizacionData(), ContactoOrg(), OrgOutletContext, useOutletContext, SobreNosotrosOrg(), Contacto(), Home(), SobreNosotros() (+9 more)

### Community 9 - "PropiedadId.jsx"
Cohesion: 0.16
Nodes (19): TAMANOS, UserAvatar(), ModalUserPropiedadId(), CardPropiedad(), MenuOpciones(), HeaderPropiedadId(), PropiedadId(), BotonUsuario() (+11 more)

### Community 10 - "useDetalles"
Cohesion: 0.11
Nodes (28): ESTRATOS, PARQUEADERO_MODOS, PARQUEADERO_TIPOS, ZONAS, cargarCatalogos(), cargarFeaturesDePropiedad(), featuresCache, getTituloSugerido() (+20 more)

### Community 11 - "useZonaMap.js"
Cohesion: 0.19
Nodes (27): zoomToBounds(), fetchBarrios(), fetchCitiesGeoJSON(), fetchRegionsGeoJSON(), collectionBounds(), coords(), drawGeometry(), featBounds() (+19 more)

### Community 12 - "MisFavoritos.jsx"
Cohesion: 0.20
Nodes (10): favoritos, getFavoritosSnapshot(), listeners, subscribeFavoritos(), useFavoritosLoadingStore(), useFavoritosStore(), BotonFavorito(), ListaFavoritos() (+2 more)

### Community 13 - "useDatosBasicos.js"
Cohesion: 0.11
Nodes (25): BARRIOS_POR_CIUDAD, CONTACT_PREFERENCES, OPERATION_OPTIONS, OPERATION_TYPE_IDS, INDICE_ORDEN, ordenarPropertyTypes(), PROPERTY_TYPES_DESCRIPCIONES, RENTAL_TYPE_IDS (+17 more)

### Community 14 - "useVistaDetalle.js"
Cohesion: 0.38
Nodes (7): leerUtm(), postSilencioso(), resolverSource(), useVistaDetalle(), debeReintentar(), esFalloDeRed(), RETRASO_REINTENTO_MS

### Community 15 - "useWizardProgress.js"
Cohesion: 0.29
Nodes (14): useFotos(), mapearApiAFormDataPropiedad(), actualizarPaso(), guardarProgreso(), guardarSnapshot(), leerProgreso(), leerSnapshot(), limpiarProgreso() (+6 more)

### Community 16 - "footer/SiteFooter.jsx"
Cohesion: 0.13
Nodes (17): AppStoreButtons(), STORE_BUTTONS, FooterLinkColumns(), LanguageSelect(), LinkColumn(), FOOTER_GROUPS, SocialLinks(), SOCIALS (+9 more)

### Community 17 - "RestablecerPassword.jsx"
Cohesion: 0.15
Nodes (12): getPasswordChecklist(), validatePasswordRegistro(), FormRestablecer(), NewPasswordField(), PasswordChecklist(), REGLAS, MensajeConfirmacion(), OtpInput() (+4 more)

### Community 18 - "dependencies"
Cohesion: 0.09
Nodes (23): @geoman-io/maplibre-geoman-free, @gsap/react, @headlessui/react, lucide-react, dependencies, @geoman-io/maplibre-geoman-free, @gsap/react, @headlessui/react (+15 more)

### Community 19 - "temaRegistry.js"
Cohesion: 0.11
Nodes (10): dynamic, dynamic, dynamic, ContactoTemaSlot(), HomeTemaSlot(), LayoutPublicoResolver(), SobreNosotrosTemaSlot(), getTema() (+2 more)

### Community 20 - "ContactForm.jsx"
Cohesion: 0.22
Nodes (7): COUNTRY_CODES, RadioGroupInput(), ContactContinue(), ContactForm(), ContactNameField(), ContactPreference(), PhonesField()

### Community 21 - "Feed.jsx"
Cohesion: 0.13
Nodes (14): AgregarPropiedad(), Actividad(), ActivityMap(), EVENTOS, RecentActivity(), STAT_CARDS, STAT_VALUES, StatsGrid() (+6 more)

### Community 22 - "usePropiedades"
Cohesion: 0.11
Nodes (25): HeaderInmobitwo(), ModalHamburguesa(), FormAgregarPropiedad(), agentes, departamentosCiudades, estadosPropiedad, tiposPropiedad, feedActions (+17 more)

### Community 23 - "Informacion.jsx"
Cohesion: 0.36
Nodes (4): ModalInformativo(), InfoIntro(), InfoPromoRow(), Informacion()

### Community 24 - "geoApi.js"
Cohesion: 0.16
Nodes (14): useSelectZona(), expandTipoInmueble(), fetchGeoCount(), fetchInmueblesEnBbox(), fetchInmueblesEnPoligono(), fetchStatesGeoJSON(), SelectedZoneCard(), ZonaPageHeader() (+6 more)

### Community 25 - "InfoPublicarAnuncio.jsx"
Cohesion: 0.12
Nodes (10): AdvantageColumn(), ADVANTAGES, AdvantagesSection(), GUIDE_STEPS, NumberedStep(), PublishingGuideSection(), ServiceCard(), SERVICES (+2 more)

### Community 26 - "MiOrganizacionesSidebar.jsx"
Cohesion: 0.17
Nodes (10): items_admin, items_organizacion, items_sidebar, toCapitalize(), ActiveOrgCard(), EmptyOrgCard(), MiOrganizacionesSidebar(), OrgNavItems() (+2 more)

### Community 27 - "useSlugParser"
Cohesion: 0.18
Nodes (13): getSelectedId(), getTabs(), TAB_ALQUILAR, TAB_COMPRAR, TAB_OBRA_NUEVA, TAB_VACACIONAL, useSlugParser(), BotonGuardarBusqueda() (+5 more)

### Community 28 - "DatosBasicos.jsx"
Cohesion: 0.25
Nodes (7): TipoSelect(), CheckPublicarPorInmobiliaria(), TipoInmueble(), BarrioFields(), LocationCascadeSelect(), LocationForm(), StreetFields()

### Community 29 - "tema1/home/Home.jsx"
Cohesion: 0.13
Nodes (9): items, Navbar(), neighborhoods, NeighborhoodsSection(), ScrollToTop(), testimonials, TestimonialsSection(), contactItems (+1 more)

### Community 30 - "useTenant"
Cohesion: 0.16
Nodes (13): dynamic, RoutePage(), Page(), dynamic, RoutePage(), MAIN_HOSTS, TenantContext, useTenant() (+5 more)

### Community 31 - "useOrganizaciones"
Cohesion: 0.11
Nodes (12): invalidarMisOrgCache(), misOrgCache, misOrgCacheKey(), useOrganizaciones(), AgentesPanel(), CrearOrganizacionForm(), estadoInicial, EstadisticasPanel() (+4 more)

### Community 32 - "Login.jsx"
Cohesion: 0.23
Nodes (8): ProfessionalFooter(), SubmitButton(), EmailStep(), GoogleButton(), OtpStep(), PasswordStep(), useEmailPrefill(), Login()

### Community 33 - "Logo.jsx"
Cohesion: 0.19
Nodes (7): HamburgerHeader(), Logo(), logo, logo_2, HeaderSidebar(), HeaderPublicarAnuncio(), LogoBar()

### Community 34 - "ListaPropiedades.jsx"
Cohesion: 0.25
Nodes (4): MAPPING_OPERACIONES, MAPPING_TIPOS, useLocationInfo(), ListaPropiedades()

### Community 35 - "InputSearchZona.jsx"
Cohesion: 0.39
Nodes (5): InputSearchZona(), useZonaSuggest(), ZonaSuggestions(), toQueryLabel(), toZoneSelection()

### Community 36 - "PublicarAnuncio.jsx"
Cohesion: 0.12
Nodes (13): ModalContinuarAnuncio(), TIPS, WizardSteps(), DatosBasicos(), Detalles(), GaleriaDropzone(), GaleriaPreviewGrid(), InfoBannerBlue() (+5 more)

### Community 37 - "Leads.jsx"
Cohesion: 0.31
Nodes (8): useLeads(), EstadoFilter(), formatFecha(), LeadCard(), useLeadsFilter(), Leads(), ESTADOS, getEstadoInfo()

### Community 38 - "Inmobitwo — Red social inmobiliaria"
Cohesion: 0.14
Nodes (13): 🏘️ Arquitectura multi-tenant, ✨ Características, 📝 Convenciones, 🐳 Docker y despliegue, 📁 Estructura del proyecto, Inmobitwo — Red social inmobiliaria, 🚀 Instalación y desarrollo local, ✅ Requisitos (+5 more)

### Community 39 - "rutas/page.js"
Cohesion: 0.24
Nodes (6): rutasBackend, rutasFrontend, AdminRutasPage(), BackendRoutes(), FrontendRoutes(), RouteGroup()

### Community 40 - "useMapaInmuebles.js"
Cohesion: 0.16
Nodes (14): createClusterIcon(), createPricePin(), createOsmMap(), OSM_STYLE, MiniMapaUbicacion(), useMiniMapa(), formatPrecioCompacto(), formatPrecioPin() (+6 more)

### Community 41 - "AppContext.js"
Cohesion: 0.20
Nodes (9): closeMenus(), ConLogin(), DescargarApp(), ModalHamburguesa(), SinLogin(), HamburgerToggle(), UserNavLinks(), items_menu (+1 more)

### Community 42 - "MapaInmueblesPage.jsx"
Cohesion: 0.21
Nodes (6): fetchBoundaryGeometry(), geocodeCenter(), useMapaCenter(), parseOperationAndType(), slugToName(), MapaInmueblesPage()

### Community 43 - "useAuth.js"
Cohesion: 0.24
Nodes (8): useAuth(), useModalUser(), agregarNext(), buildLoginUrl(), getSafeNext(), LoginLink(), RegisterHeader(), Registro()

### Community 44 - "Loading.jsx"
Cohesion: 0.33
Nodes (4): SlugLayout(), OrganizacionNav(), OrganizacionPublicaLayout(), Loading()

### Community 45 - "mapStyles.js"
Cohesion: 0.18
Nodes (12): sourceData(), ANCESTOR_OPACITY, FILL_COLOR, FILL_OPACITY, HOVER_DARK, HOVER_DARK_PINK, LINE_WIDTH, lineColorFor() (+4 more)

### Community 46 - "SelectZonaMap.jsx"
Cohesion: 0.16
Nodes (10): LocationControl(), ZoomControl(), MapOverlays(), DrawGuide(), DrawToolbar(), LoadingBadge(), MapHintBanner(), MapWidgets() (+2 more)

### Community 47 - "FormatoDetail.jsx"
Cohesion: 0.32
Nodes (8): dompurify, dompurify, FormatoCard(), FormatoDetail(), FormatoSelector(), FORMATO_ICONS, stripHtml(), TONOS_REFINAR

### Community 48 - "AdminOrganizacionesPage.jsx"
Cohesion: 0.24
Nodes (6): AdminOrganizacionesPage(), EstadoFilter(), OrgActions(), OrgList(), ESTADOS_ORG, useOrganizacionesAdmin()

### Community 49 - "app/layout.js"
Cohesion: 0.17
Nodes (10): geistAnton, geistArchivoBlack, geistBangers, geistLondrina, geistMono, geistMontserrat, geistPoppins, geistSans (+2 more)

### Community 50 - "modal-hamburguesa/ModalHamburguesa.jsx"
Cohesion: 0.22
Nodes (6): EnlacesHamburguesa(), ConLogin(), DescargarApp(), EnlacesHamburguesa(), SinLogin(), sections

### Community 51 - "Acceso.jsx"
Cohesion: 0.26
Nodes (6): phoneFormatter(), Acceso(), CodeForm(), EmailPanel(), UnverifiedPanel(), VerifiedPanel()

### Community 52 - "PropertySearchWidget.jsx"
Cohesion: 0.18
Nodes (10): BEDROOMS, formatPrice(), LOCATIONS, MAX_AREAS, MIN_AREAS, PriceRangeSlider(), PROPERTY_TYPES, PropertySearchWidget() (+2 more)

### Community 53 - "BarraNavegacionTauri.jsx"
Cohesion: 0.24
Nodes (5): BarraNavegacionTauri(), isTauri(), SolicitarForm(), useSolicitarCodigo(), OlvidastePassword()

### Community 54 - "RoomSeekerForm.jsx"
Cohesion: 0.19
Nodes (15): boolToTri(), BUSCA_CON_OPTIONS, formatoCOP(), formatoFecha(), GENERO_OPTIONS, OCUPACION_OPTIONS, perfilAChips(), TRI_OPTIONS (+7 more)

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
Cohesion: 0.40
Nodes (7): formatearRespuesta(), apiBackendFormData(), formatearRespuesta(), obtenerTokenFresco(), renovarToken(), URL_BACKEND, obtenerOrigenActual()

### Community 60 - "data.styles.scrollbar.js"
Cohesion: 0.14
Nodes (8): dynamic, SiteFooter(), scrollbarStyles, numero_atencion_cliente, Anuncio(), SeguridadAcceso(), SupportBlock(), Perfil()

### Community 61 - "NavbarListaPropiedades.jsx"
Cohesion: 0.38
Nodes (5): Columna(), EnlaceNav(), NavLinks(), MENUS, NavbarListaPropiedades()

### Community 62 - "PageAnuncio.jsx"
Cohesion: 0.18
Nodes (7): AccountAccess(), HamburgerButton(), PublishButton(), NavbarHome(), SmartLoader(), readNavState(), PageAnuncio()

### Community 63 - "apiBackend"
Cohesion: 0.25
Nodes (11): apiBackend(), getPasswordChecklist(), ModalCambiarPassword(), REQUISITOS, mapearApiAFormDataUsuario(), useUsuarios(), validatePasswordNueva(), useRefinarDescripcion() (+3 more)

### Community 65 - "useFavoritos"
Cohesion: 0.20
Nodes (7): HeaderFiltros(), HeaderPrincipal(), Principal(), filtros_propiedades, setFavoritosLoading(), useFavoritos(), FotoVisor()

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

### Community 71 - "agruparPorOrden"
Cohesion: 0.24
Nodes (11): PropertyImage(), ImagenesCard(), useCarruselFotos(), agruparPorOrden(), ANCHOS_PX, construirSrcSet(), elegirTamano(), galeriaSinPortada() (+3 more)

### Community 72 - "PropertyMap.jsx"
Cohesion: 0.32
Nodes (6): Hero(), formatPrice(), MapPin(), properties, PropertyMap(), PropertyPopup()

### Community 73 - "Header.jsx"
Cohesion: 0.32
Nodes (5): Header(), links, Navbar(), socials, TopBar()

### Community 74 - "CardAnuncio.jsx"
Cohesion: 0.29
Nodes (9): CardGallery(), AUTOPLAY_SECONDS, OPERACION_LABEL, TIPO_BADGE, irAInmueble(), saveNavState(), CardAnuncio(), CardAnuncioCompra() (+1 more)

### Community 75 - "tema1/home/PropertyGrid.jsx"
Cohesion: 0.33
Nodes (5): CATEGORIES, formatPrice(), properties, PropertyCard(), PropertyGrid()

### Community 76 - "tema2/home/PropertyGrid.jsx"
Cohesion: 0.33
Nodes (5): CATEGORIES, formatPrice(), properties, PropertyCard(), PropertyGrid()

### Community 77 - "PropertyCard.jsx"
Cohesion: 0.27
Nodes (10): CardActions(), getOperacionLabel(), getTipoLabel(), getTitulo(), getUbicacion(), OPERACION_LABEL, TIPO_BADGE, PropertyCard() (+2 more)

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
Cohesion: 0.23
Nodes (7): HeadPerfilAcceso(), TABS, AvatarBlock(), EditFields(), AccessLinkRow(), EditToggle(), SaveActions()

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

### Community 94 - "AppProvider.jsx"
Cohesion: 0.29
Nodes (9): AppContext, AppProvider(), leerLocal(), setFavoritosStore(), FORM_DATA_PROPIEDAD_INICIAL, FORM_DATA_USUARIO_INICIAL, generarSessionId(), generarUUIDFallback() (+1 more)

### Community 95 - "ListadoDePropiedades.jsx"
Cohesion: 0.33
Nodes (7): OPCIONES_ORDEN, usePropertySearch(), CHIPS, FiltroRelevante(), getFiltroLabel(), ListadoDePropiedades(), TYPE_LABELS

### Community 98 - "HowToPublishHero.jsx"
Cohesion: 0.36
Nodes (4): HERO_BULLETS, HeroBullets(), HowToPublishHero(), PhoneIllustration()

### Community 121 - "ListaAnuncios.jsx"
Cohesion: 0.36
Nodes (4): AnuncioStatus(), ListaAnuncios(), MisAnunciosContent(), SinAnuncios()

### Community 122 - "useDetallePropiedad.js"
Cohesion: 0.60
Nodes (3): useAbrirFotoVisorDesdeState(), useDetallePropiedad(), DetallePropiedad()

### Community 123 - "StepsNav.jsx"
Cohesion: 0.60
Nodes (3): STEPS, StepsNav(), useIsMobile()

## Knowledge Gaps
- **194 isolated node(s):** `eslintConfig`, `paths`, `nextConfig`, `name`, `version` (+189 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `apiBackend()` connect `apiBackend` to `formatPrecioCompleto`, `components/InfoCards.jsx`, `hero/Hero.jsx`, `useAppContext`, `useDetalles`, `useZonaMap.js`, `useDatosBasicos.js`, `useWizardProgress.js`, `RestablecerPassword.jsx`, `usePropiedades`, `geoApi.js`, `useTenant`, `useOrganizaciones`, `ListaPropiedades.jsx`, `InputSearchZona.jsx`, `Leads.jsx`, `useMapaInmuebles.js`, `MapaInmueblesPage.jsx`, `useAuth.js`, `BarraNavegacionTauri.jsx`, `RoomSeekerForm.jsx`, `apiBackend.js`, `useFavoritos`, `Logs.jsx`, `PropertyCard.jsx`, `AppProvider.jsx`?**
  _High betweenness centrality (0.232) - this node is a cross-community bridge._
- **Why does `useAppContext()` connect `useAppContext` to `components/InfoCards.jsx`, `Guards.jsx`, `PropiedadId.jsx`, `useDetalles`, `useDatosBasicos.js`, `useVistaDetalle.js`, `useWizardProgress.js`, `Feed.jsx`, `usePropiedades`, `Informacion.jsx`, `MiOrganizacionesSidebar.jsx`, `DatosBasicos.jsx`, `useOrganizaciones`, `Login.jsx`, `Logo.jsx`, `PublicarAnuncio.jsx`, `Leads.jsx`, `AppContext.js`, `modal-hamburguesa/ModalHamburguesa.jsx`, `RoomSeekerForm.jsx`, `NavbarListaPropiedades.jsx`, `PageAnuncio.jsx`, `apiBackend`, `useFavoritos`, `Logs.jsx`, `RegisterForm.jsx`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `gsap`, `lucide`, `maplibre-gl`, `motion`, `next`, `react-dom`, `@tiptap/react`, `FormatoDetail.jsx`, `package.json`, `framer-motion`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `paths`, `nextConfig` to the rest of the system?**
  _194 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `components/InfoCards.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06506849315068493 - nodes in this community are weakly interconnected._
- **Should `descargas/DescargarApp.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05223880597014925 - nodes in this community are weakly interconnected._
- **Should `FormFiltros.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06836055656382335 - nodes in this community are weakly interconnected._
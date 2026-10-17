# Graph Report - web-inmobitwo  (2026-10-17)

## Corpus Check
- 643 files · ~440,065 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1937 nodes · 4677 edges · 141 communities (114 shown, 27 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `092b1758`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- agruparPorOrden
- components/InfoCards.jsx
- irArriba
- descargas/DescargarApp.jsx
- FormFiltros.jsx
- Guards.jsx
- PageInicio.jsx
- useAppContext
- useOutletContext
- hamburger/ConLogin.jsx
- useDetalles
- interactivity.js
- data.styles.scrollbar.js
- useDatosBasicos.js
- useVistaDetalle.js
- RoomProfileCard.jsx
- footer/SiteFooter.jsx
- Login.jsx
- dependencies
- temaRegistry.js
- useFotoVisor.js
- Actividad.jsx
- usePropiedades
- PublicarAnuncio.jsx
- SeleccionarZonaPage.jsx
- InfoPublicarAnuncio.jsx
- MiOrganizacionesSidebar.jsx
- BotonGuardarBusqueda.jsx
- descartadosStore.js
- tema1/home/Home.jsx
- useTenant
- useOrganizaciones
- config.js
- geoApi.js
- ListaPropiedades.jsx
- InputSearchZona.jsx
- Fotos.jsx
- Leads.jsx
- Inmobitwo — Red social inmobiliaria
- PropiedadId.jsx
- useMapaInmuebles.js
- Descartados.jsx
- MapaInmueblesPage.jsx
- Showcase.jsx
- layers.js
- SelectZonaMap.jsx
- FormatoDetail.jsx
- Feed.jsx
- chatSocket.js
- modal-hamburguesa/ModalHamburguesa.jsx
- formatPrecioCompleto
- PropertySearchWidget.jsx
- HeaderInmobitwo.jsx
- RoomSeekerForm.jsx
- tema1/home/FooterSection.jsx
- tema2/home/Home.jsx
- tema2/home/FooterSection.jsx
- package.json
- apiBackend.js
- Acceso.jsx
- TituloDescripcion.jsx
- CardAnuncio.jsx
- apiBackend
- DownloadAppSection.jsx
- CardPropiedad.jsx
- useZonaMap.js
- devDependencies
- Estado del refactor seguro (safe-refactor)
- Logs.jsx
- GetInTouchSection.jsx
- search/InputSearchPrincipal.jsx
- PropertyMap.jsx
- Header.jsx
- busquedasGuardadas.js
- tema1/home/PropertyGrid.jsx
- tema2/home/PropertyGrid.jsx
- PropertyCard.jsx
- FloorDoorBlockForm.jsx
- HeaderPrincipal.jsx
- FAQSection.jsx
- FeaturedPropertyHero.jsx
- Perfil.jsx
- staticCache.js
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
- NavbarListaPropiedades.jsx
- ListadoDePropiedades.jsx
- AGENTS.md
- eslint.config.mjs
- HowToPublishHero.jsx
- gsap
- lucide
- app/page.js
- motion
- TenantProvider.jsx
- next.config.mjs
- usePortada.js
- postcss.config.mjs
- links_inicio.js
- skills_data.js
- ModalGuardarBusqueda.jsx
- ListaAnuncios.jsx
- tema2/index.js
- StepsNav.jsx
- hero/Hero.jsx
- lucide-react
- info-cards/InfoCards.jsx
- ItemsSidebar.jsx
- ESLint web-inmobitwo — RESUELTO ✅
- @gsap/react
- @headlessui/react
- next
- react
- react-icons
- @tailwindcss/typography
- @tiptap/extension-link
- @tiptap/react
- @tiptap/starter-kit

## God Nodes (most connected - your core abstractions)
1. `useAppContext()` - 155 edges
2. `apiBackend()` - 115 edges
3. `usePropiedades()` - 51 edges
4. `irArriba()` - 37 edges
5. `useOutletContext` - 35 edges
6. `useOrganizaciones()` - 29 edges
7. `useDetalles()` - 24 edges
8. `formatPrecioCompleto()` - 24 edges
9. `useZonaMap()` - 24 edges
10. `useDatosBasicos()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `DescripcionAnuncio()` --references--> `dompurify`  [EXTRACTED]
  src/views/lista-propiedades/card-anuncio/DescripcionAnuncio.jsx → package.json
- `FormatoDetail()` --references--> `dompurify`  [EXTRACTED]
  src/views/publicar-anuncio/paso-2/descripcion/FormatoDetail.jsx → package.json
- `useMapaInmuebles()` --references--> `supercluster`  [EXTRACTED]
  src/views/mapa-inmuebles/components/map/useMapaInmuebles.js → package.json
- `DetalleInmuble()` --references--> `dompurify`  [EXTRACTED]
  src/views/anuncio/anuncio-id/DetalleInmuble.jsx → package.json
- `fetchBoundaryGeometry()` --calls--> `apiBackend()`  [EXTRACTED]
  src/views/mapa-inmuebles/hooks/useMapaCenter.js → src/actions/apiBackend.js

## Import Cycles
- None detected.

## Communities (141 total, 27 thin omitted)

### Community 0 - "agruparPorOrden"
Cohesion: 0.17
Nodes (15): PropertyImage(), ImagenesCard(), useAbrirFotoVisorDesdeState(), useCarruselFotos(), useDetallePropiedad(), agruparPorOrden(), ANCHOS_PX, construirSrcSet() (+7 more)

### Community 1 - "components/InfoCards.jsx"
Cohesion: 0.06
Nodes (49): UbicacionMapa(), AddressMapModal(), ConfirmedLocation(), MapWarnings(), createMap(), createMarker(), resolveInitial(), useAddressMap() (+41 more)

### Community 2 - "irArriba"
Cohesion: 0.18
Nodes (12): irArriba(), PublishCtaButton(), WizardFooter(), DetalleTopBar(), scrollTop(), PublishAnuncioButton(), scrollTop(), FavoritoInfo() (+4 more)

### Community 3 - "descargas/DescargarApp.jsx"
Cohesion: 0.05
Nodes (38): cliCommands, descargas, detectarSO(), ordenSO, AudienceCard(), Audiences(), AUDIENCIAS, CliInstall() (+30 more)

### Community 4 - "FormFiltros.jsx"
Cohesion: 0.06
Nodes (35): MiniMapaUbicacion(), useMiniMapa(), CARACTERISTICAS_INMUEBLE, ESTADOS_INMUEBLE, PROPERTY_TYPES_FALLBACK, CATEGORIAS_VIVIENDA, Alcobas(), OPCIONES (+27 more)

### Community 5 - "Guards.jsx"
Cohesion: 0.10
Nodes (3): RutaPrivada(), RutaPublica(), Feed()

### Community 6 - "PageInicio.jsx"
Cohesion: 0.21
Nodes (8): NavbarHome(), TIPO_OPTIONS, HeroTabs(), SelectorTipo(), TABS, TIPO_DEFAULT, useInicioSearch(), PageInicio()

### Community 7 - "useAppContext"
Cohesion: 0.12
Nodes (19): ConsentimientoBanner(), DescargarApp(), HamburgerHeader(), ModalHamburguesa(), SinLogin(), AccountAccess(), HamburgerButton(), PublishButton() (+11 more)

### Community 8 - "useOutletContext"
Cohesion: 0.11
Nodes (17): usePropiedadesOrganizacionData(), ContactoOrg(), OrgOutletContext, OrgOutletProvider, useOutletContext, SobreNosotrosOrg(), Contacto(), Home() (+9 more)

### Community 9 - "hamburger/ConLogin.jsx"
Cohesion: 0.17
Nodes (16): closeMenus(), ConLogin(), TAMANOS, UserAvatar(), ModalUserPropiedadId(), Avatar(), TAMANOS, useMisAnunciosCount() (+8 more)

### Community 10 - "useDetalles"
Cohesion: 0.07
Nodes (38): COUNTRY_CODES, ESTRATOS, PARQUEADERO_MODOS, PARQUEADERO_TIPOS, ZONAS, cargarCatalogos(), cargarFeaturesDePropiedad(), featuresCache (+30 more)

### Community 11 - "interactivity.js"
Cohesion: 0.18
Nodes (14): OSM_STYLE, zoomToBounds(), collectionBounds(), coords(), drawGeometry(), featBounds(), findFeature(), setupInteractivity() (+6 more)

### Community 12 - "data.styles.scrollbar.js"
Cohesion: 0.15
Nodes (3): scrollbarStyles, PagePropiedadId(), Anuncio()

### Community 13 - "useDatosBasicos.js"
Cohesion: 0.11
Nodes (31): BARRIOS_POR_CIUDAD, CONTACT_PREFERENCES, OPERATION_OPTIONS, OPERATION_TYPE_IDS, INDICE_ORDEN, ordenarPropertyTypes(), PROPERTY_TYPES_DESCRIPCIONES, RENTAL_TYPE_IDS (+23 more)

### Community 14 - "useVistaDetalle.js"
Cohesion: 0.27
Nodes (10): leerUtm(), postSilencioso(), resolverSource(), useVistaDetalle(), generarSessionId(), generarUUIDFallback(), getSessionId(), debeReintentar() (+2 more)

### Community 15 - "RoomProfileCard.jsx"
Cohesion: 0.22
Nodes (9): SUGGESTIONS, SuggestionsMenu(), buildGeoPath(), getOperationSlug(), getSecondSegment(), RoomProfileCard(), RoomSeekerForm(), PERFIL_VACIO (+1 more)

### Community 16 - "footer/SiteFooter.jsx"
Cohesion: 0.14
Nodes (16): AppStoreButtons(), STORE_BUTTONS, FooterLinkColumns(), LanguageSelect(), LinkColumn(), FOOTER_GROUPS, SocialLinks(), SOCIALS (+8 more)

### Community 17 - "Login.jsx"
Cohesion: 0.08
Nodes (23): PasswordInput(), getPasswordChecklist(), validatePasswordRegistro(), ProfessionalFooter(), SubmitButton(), EmailStep(), OtpStep(), PasswordStep() (+15 more)

### Community 18 - "dependencies"
Cohesion: 0.15
Nodes (13): framer-motion, @geoman-io/maplibre-geoman-free, maplibre-gl, dependencies, framer-motion, @geoman-io/maplibre-geoman-free, maplibre-gl, react-dom (+5 more)

### Community 19 - "temaRegistry.js"
Cohesion: 0.16
Nodes (12): dynamic, RoutePage(), dynamic, SlugLayout(), Loading(), SPINNER, ContactoTemaSlot(), LayoutPublicoResolver() (+4 more)

### Community 20 - "useFotoVisor.js"
Cohesion: 0.16
Nodes (20): VisorContenido(), BotonSalirFullscreen(), FlechasSecuencia(), VisorFooter(), MARKER_SVG, MODO_3D, MODO_FOTOS, MODO_MAPA (+12 more)

### Community 21 - "Actividad.jsx"
Cohesion: 0.13
Nodes (15): feedActions, getFeedSnapshot(), listeners, state, subscribeFeed(), useFeed(), Actividad(), ActivityMap() (+7 more)

### Community 22 - "usePropiedades"
Cohesion: 0.13
Nodes (22): ConLogin(), FormAgregarPropiedad(), AppContext, agentes, departamentosCiudades, estadosPropiedad, tiposPropiedad, useAuth() (+14 more)

### Community 23 - "PublicarAnuncio.jsx"
Cohesion: 0.16
Nodes (12): ModalContinuarAnuncio(), ModalInformativo(), WizardSteps(), HeaderPublicarAnuncio(), LogoBar(), InfoIntro(), InfoPromoRow(), Informacion() (+4 more)

### Community 24 - "SeleccionarZonaPage.jsx"
Cohesion: 0.20
Nodes (11): useSelectZona(), fetchGeoCount(), SelectedZoneCard(), esZonaCompatible(), guardarZona(), leerZonaGuardada(), limpiarZonaGuardada(), parseOperationAndType() (+3 more)

### Community 25 - "InfoPublicarAnuncio.jsx"
Cohesion: 0.11
Nodes (11): AdvantageColumn(), ADVANTAGES, AdvantagesSection(), GUIDE_STEPS, NumberedStep(), PublishingGuideSection(), LinksGridSection(), ServiceCard() (+3 more)

### Community 26 - "MiOrganizacionesSidebar.jsx"
Cohesion: 0.33
Nodes (5): toCapitalize(), ActiveOrgCard(), EmptyOrgCard(), MiOrganizacionesSidebar(), useOrganizacionSidebar()

### Community 27 - "BotonGuardarBusqueda.jsx"
Cohesion: 0.18
Nodes (15): verificarBusqueda(), getSelectedId(), getTabs(), TAB_ALQUILAR, TAB_COMPRAR, TAB_OBRA_NUEVA, TAB_VACACIONAL, useSlugParser() (+7 more)

### Community 28 - "descartadosStore.js"
Cohesion: 0.18
Nodes (20): descartarPropiedad(), idsDescartados(), listarDescartados(), restaurarPropiedad(), addDescartadoStore(), emit(), EMPTY, getSnapshot() (+12 more)

### Community 29 - "tema1/home/Home.jsx"
Cohesion: 0.13
Nodes (9): items, Navbar(), neighborhoods, NeighborhoodsSection(), ScrollToTop(), testimonials, TestimonialsSection(), contactItems (+1 more)

### Community 30 - "useTenant"
Cohesion: 0.23
Nodes (7): dynamic, dynamic, RoutePage(), useTenant(), LayoutResolver(), PaginaOrganizacion(), SobreNosotrosTemaSlot()

### Community 31 - "useOrganizaciones"
Cohesion: 0.12
Nodes (11): invalidarMisOrgCache(), misOrgCache, misOrgCacheKey(), useOrganizaciones(), AgentesPanel(), CrearOrganizacionForm(), estadoInicial, EstadisticasPanel() (+3 more)

### Community 32 - "config.js"
Cohesion: 0.38
Nodes (4): URL_BACKEND, URL_CRM, BotonAdminOrganizaciones(), GoogleButton()

### Community 33 - "geoApi.js"
Cohesion: 0.19
Nodes (15): batchCache, batchInflight, batchKey(), expandTipoInmueble(), fetchGeoCacheado(), fetchGeoCountBatch(), fetchInmueblesEnPoligono(), fetchStatesGeoJSON() (+7 more)

### Community 34 - "ListaPropiedades.jsx"
Cohesion: 0.22
Nodes (5): MAPPING_OPERACIONES, MAPPING_TIPOS, useLocationInfo(), CLAVES_FILTROS_URL, ListaPropiedades()

### Community 35 - "InputSearchZona.jsx"
Cohesion: 0.31
Nodes (6): InputSearchZona(), useZonaSuggest(), ZonaSuggestions(), toQueryLabel(), toZoneSelection(), ZonaPageHeader()

### Community 36 - "Fotos.jsx"
Cohesion: 0.20
Nodes (7): TIPS, GaleriaDropzone(), GaleriaPreviewGrid(), InfoBannerBlue(), NoPhotosWarningModal(), PrincipalDropzone(), TipsList()

### Community 37 - "Leads.jsx"
Cohesion: 0.24
Nodes (8): useLeads(), EstadoFilter(), formatFecha(), LeadCard(), useLeadsFilter(), Leads(), ESTADOS, getEstadoInfo()

### Community 38 - "Inmobitwo — Red social inmobiliaria"
Cohesion: 0.12
Nodes (15): 🏘️ Arquitectura multi-tenant, 🔔 Búsquedas guardadas con alertas, ✨ Características, 💬 Chat en tiempo real, 📝 Convenciones, 🐳 Docker y despliegue, 📁 Estructura del proyecto, Inmobitwo — Red social inmobiliaria (+7 more)

### Community 39 - "PropiedadId.jsx"
Cohesion: 0.26
Nodes (9): iniciarConversacion(), ModalContactoLead(), MenuOpciones(), PropiedadId(), calcularTiempoRelativo(), useTiempoRelativo(), useTracking(), CardPrincipal() (+1 more)

### Community 40 - "useMapaInmuebles.js"
Cohesion: 0.17
Nodes (17): BackControl(), LocationControl(), pintarMiUbicacion(), ZoomControl(), createClusterIcon(), createPricePin(), createOsmMap(), fetchInmueblesEnBbox() (+9 more)

### Community 41 - "Descartados.jsx"
Cohesion: 0.18
Nodes (9): SiteFooter(), numero_atencion_cliente, HeadPerfilAcceso(), TABS, SupportBlock(), Descartados(), MisBusquedas(), MiPerfil() (+1 more)

### Community 42 - "MapaInmueblesPage.jsx"
Cohesion: 0.21
Nodes (6): fetchBoundaryGeometry(), geocodeCenter(), useMapaCenter(), parseOperationAndType(), slugToName(), MapaInmueblesPage()

### Community 43 - "Showcase.jsx"
Cohesion: 0.17
Nodes (7): CLS, DemoBoton(), fakeCtx, fakeMap, forzarEstado(), Showcase(), HeroSearchButton()

### Community 45 - "layers.js"
Cohesion: 0.14
Nodes (24): fetchBarrios(), fetchCitiesGeoJSON(), addDrawSource(), clearDrawLayers(), loadBarrios(), loadDrawBoundaries(), loadMunicipios(), maybeLoadDrawBarrios() (+16 more)

### Community 46 - "SelectZonaMap.jsx"
Cohesion: 0.19
Nodes (8): AvisoMapa(), DrawGuide(), DrawToolbar(), LoadingBadge(), MapHintBanner(), MapWidgets(), VerInmueblesBar(), SelectZonaMap()

### Community 47 - "FormatoDetail.jsx"
Cohesion: 0.42
Nodes (6): FormatoCard(), FormatoDetail(), FormatoSelector(), FORMATO_ICONS, stripHtml(), TONOS_REFINAR

### Community 48 - "Feed.jsx"
Cohesion: 0.21
Nodes (8): AgregarPropiedad(), logo, logo_2, ModalAgregarPropiedad(), ModalSidebar(), FooterSidebar(), HeaderSidebar(), Sidebar()

### Community 49 - "chatSocket.js"
Cohesion: 0.06
Nodes (74): contarNoLeidos(), eliminarConversacion(), enviarMensaje(), listarConversaciones(), listarMensajes(), marcarLeida(), obtenerTokenChat(), geistAnton (+66 more)

### Community 50 - "modal-hamburguesa/ModalHamburguesa.jsx"
Cohesion: 0.24
Nodes (5): EnlacesHamburguesa(), DescargarApp(), EnlacesHamburguesa(), SinLogin(), sections

### Community 51 - "formatPrecioCompleto"
Cohesion: 0.25
Nodes (8): dompurify, dompurify, CardBody(), useScrollSentinel(), formatPrecioCompleto(), DetalleInmuble(), HeaderDinamico(), VisorHeader()

### Community 52 - "PropertySearchWidget.jsx"
Cohesion: 0.18
Nodes (10): BEDROOMS, formatPrice(), LOCATIONS, MAX_AREAS, MIN_AREAS, PriceRangeSlider(), PROPERTY_TYPES, PropertySearchWidget() (+2 more)

### Community 53 - "HeaderInmobitwo.jsx"
Cohesion: 0.12
Nodes (10): BarraNavegacionTauri(), HeaderInmobitwo(), Logo(), ModalHamburguesa(), isTauri(), SolicitarForm(), OlvidastePassword(), RegisterHeader() (+2 more)

### Community 54 - "RoomSeekerForm.jsx"
Cohesion: 0.29
Nodes (11): boolToTri(), BUSCA_CON_OPTIONS, formatoCOP(), formatoFecha(), GENERO_OPTIONS, OCUPACION_OPTIONS, perfilAChips(), TRI_OPTIONS (+3 more)

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
Cohesion: 0.22
Nodes (12): formatearRespuesta(), apiBackendFormData(), formatearRespuesta(), obtenerTokenFresco(), renovarToken(), CallbackContenido(), agregarNext(), buildLoginUrl() (+4 more)

### Community 60 - "Acceso.jsx"
Cohesion: 0.18
Nodes (7): phoneFormatter(), Acceso(), CodeForm(), EmailPanel(), UnverifiedPanel(), VerifiedPanel(), SeguridadAcceso()

### Community 61 - "TituloDescripcion.jsx"
Cohesion: 0.31
Nodes (5): DescripcionTabs(), IaGeneratePanel(), TituloAuto(), TituloDescripcion(), useRefinarDescripcion()

### Community 62 - "CardAnuncio.jsx"
Cohesion: 0.25
Nodes (11): CardGallery(), AUTOPLAY_SECONDS, OPERACION_LABEL, TIPO_BADGE, irAInmueble(), readNavState(), saveNavState(), PageAnuncio() (+3 more)

### Community 63 - "apiBackend"
Cohesion: 0.30
Nodes (10): apiBackend(), getPasswordChecklist(), ModalCambiarPassword(), REQUISITOS, mapearApiAFormDataUsuario(), useUsuarios(), validatePasswordNueva(), useSolicitarCodigo() (+2 more)

### Community 65 - "CardPropiedad.jsx"
Cohesion: 0.25
Nodes (14): CardPropiedad(), Principal(), favoritos, getFavoritosSnapshot(), listeners, setFavoritosLoading(), setFavoritosStore(), subscribeFavoritos() (+6 more)

### Community 66 - "useZonaMap.js"
Cohesion: 0.30
Nodes (15): fetchRegionsGeoJSON(), extractCreatedGeojson(), handleStartDrawing(), restaurarPoligono(), setupGeoman(), stripElevation(), to2D(), removeSelectLayers() (+7 more)

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
Cohesion: 0.38
Nodes (5): Hero(), formatPrice(), properties, PropertyMap(), PropertyPopup()

### Community 73 - "Header.jsx"
Cohesion: 0.32
Nodes (5): Header(), links, Navbar(), socials, TopBar()

### Community 74 - "busquedasGuardadas.js"
Cohesion: 0.27
Nodes (11): actualizarBusqueda(), bajaBusqueda(), eliminarBusqueda(), listarBusquedas(), reactivarBusqueda(), BajaBusqueda(), aviso(), fechaCorta() (+3 more)

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

### Community 79 - "HeaderPrincipal.jsx"
Cohesion: 0.39
Nodes (4): HeaderPrincipal(), InputSearchPrincipal(), frases_buscar, useTypingPlaceholder()

### Community 81 - "FeaturedPropertyHero.jsx"
Cohesion: 0.40
Nodes (3): FeaturedPropertyHero(), formatPrice(), slides

### Community 82 - "Perfil.jsx"
Cohesion: 0.31
Nodes (5): AvatarBlock(), EditFields(), AccessLinkRow(), EditToggle(), SaveActions()

### Community 83 - "staticCache.js"
Cohesion: 0.29
Nodes (8): fetchStaticJson(), inFlight, memory, readStaticCache(), writeStaticCache(), preloadStaticData(), STATIC_ENDPOINTS, usePreloadData()

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

### Community 94 - "NavbarListaPropiedades.jsx"
Cohesion: 0.38
Nodes (5): Columna(), EnlaceNav(), NavLinks(), MENUS, NavbarListaPropiedades()

### Community 95 - "ListadoDePropiedades.jsx"
Cohesion: 0.27
Nodes (8): SmartLoader(), OPCIONES_ORDEN, usePropertySearch(), CHIPS, FiltroRelevante(), getFiltroLabel(), ListadoDePropiedades(), TYPE_LABELS

### Community 98 - "HowToPublishHero.jsx"
Cohesion: 0.36
Nodes (4): HERO_BULLETS, HeroBullets(), HowToPublishHero(), PhoneIllustration()

### Community 101 - "app/page.js"
Cohesion: 0.28
Nodes (4): dynamic, dynamic, Page(), HomeTemaSlot()

### Community 103 - "TenantProvider.jsx"
Cohesion: 0.60
Nodes (3): MAIN_HOSTS, TenantContext, TenantProvider()

### Community 105 - "usePortada.js"
Cohesion: 0.39
Nodes (8): BACKOFFS, esMismaPortada(), fetchConTimeout(), guardarCache(), leerCache(), obtenerPortadaFresca(), precalentarBackend(), usePortada()

### Community 116 - "ModalGuardarBusqueda.jsx"
Cohesion: 0.46
Nodes (6): crearBusqueda(), base64ToUint8(), PUSH_HABILITADO, suscribirPush(), ModalGuardarBusqueda(), nombreAutomatico()

### Community 121 - "ListaAnuncios.jsx"
Cohesion: 0.24
Nodes (6): AnuncioInfo(), AnuncioPhoto(), AnuncioStatus(), ListaAnuncios(), MisAnunciosContent(), SinAnuncios()

### Community 123 - "StepsNav.jsx"
Cohesion: 0.60
Nodes (3): STEPS, StepsNav(), useIsMobile()

### Community 124 - "hero/Hero.jsx"
Cohesion: 0.46
Nodes (4): FRASES, AnimatedTitle(), Hero(), useResponsiveFrases()

### Community 126 - "info-cards/InfoCards.jsx"
Cohesion: 0.43
Nodes (4): cards, InfoCardItem(), InfoCards(), buildZonaUrl()

### Community 127 - "ItemsSidebar.jsx"
Cohesion: 0.38
Nodes (4): items_organizacion, items_sidebar, ItemsSidebar(), OrgNavItems()

### Community 128 - "ESLint web-inmobitwo — RESUELTO ✅"
Cohesion: 0.33
Nodes (5): Archivos eliminados, Cambio de config, ESLint web-inmobitwo — RESUELTO ✅, Pruebas pendientes del usuario (visual), Resumen por grupo

## Knowledge Gaps
- **218 isolated node(s):** `eslintConfig`, `paths`, `nextConfig`, `name`, `version` (+213 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAppContext()` connect `useAppContext` to `components/InfoCards.jsx`, `Guards.jsx`, `hamburger/ConLogin.jsx`, `useDetalles`, `useDatosBasicos.js`, `useVistaDetalle.js`, `RoomProfileCard.jsx`, `Login.jsx`, `useFotoVisor.js`, `Actividad.jsx`, `usePropiedades`, `PublicarAnuncio.jsx`, `MiOrganizacionesSidebar.jsx`, `BotonGuardarBusqueda.jsx`, `useOrganizaciones`, `config.js`, `Leads.jsx`, `PropiedadId.jsx`, `Feed.jsx`, `chatSocket.js`, `modal-hamburguesa/ModalHamburguesa.jsx`, `formatPrecioCompleto`, `HeaderInmobitwo.jsx`, `apiBackend.js`, `CardAnuncio.jsx`, `apiBackend`, `CardPropiedad.jsx`, `Logs.jsx`, `HeaderPrincipal.jsx`, `NavbarListaPropiedades.jsx`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **Why does `apiBackend()` connect `apiBackend` to `components/InfoCards.jsx`, `useDetalles`, `interactivity.js`, `useDatosBasicos.js`, `RoomProfileCard.jsx`, `Login.jsx`, `usePropiedades`, `SeleccionarZonaPage.jsx`, `BotonGuardarBusqueda.jsx`, `descartadosStore.js`, `useOrganizaciones`, `geoApi.js`, `ListaPropiedades.jsx`, `InputSearchZona.jsx`, `Leads.jsx`, `PropiedadId.jsx`, `useMapaInmuebles.js`, `MapaInmueblesPage.jsx`, `layers.js`, `chatSocket.js`, `formatPrecioCompleto`, `RoomSeekerForm.jsx`, `apiBackend.js`, `TituloDescripcion.jsx`, `CardPropiedad.jsx`, `useZonaMap.js`, `Logs.jsx`, `search/InputSearchPrincipal.jsx`, `busquedasGuardadas.js`, `PropertyCard.jsx`, `staticCache.js`, `TenantProvider.jsx`, `ModalGuardarBusqueda.jsx`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `gsap`, `@headlessui/react`, `@gsap/react`, `lucide`, `motion`, `next`, `react`, `react-icons`, `@tailwindcss/typography`, `@tiptap/extension-link`, `@tiptap/react`, `@tiptap/starter-kit`, `formatPrecioCompleto`, `package.json`, `lucide-react`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `paths`, `nextConfig` to the rest of the system?**
  _218 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `components/InfoCards.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05927405927405927 - nodes in this community are weakly interconnected._
- **Should `descargas/DescargarApp.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05115089514066496 - nodes in this community are weakly interconnected._
- **Should `FormFiltros.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06448087431693988 - nodes in this community are weakly interconnected._
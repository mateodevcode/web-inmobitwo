# Inmobitwo — Red social inmobiliaria

Frontend web de **Inmobitwo**: la red social inmobiliaria para buscar, publicar y compartir inmuebles en Colombia — apartamentos, casas, lotes y locales en venta o arriendo — conectando directamente propietarios, inmobiliarias y buscadores.

> Producción: **https://inmobitwo.seventwo.tech**
> API backend: `NEXT_PUBLIC_API_URL` (ver [Variables de entorno](#-variables-de-entorno))

Construido con **Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + MapLibre GL**.

---

## Tabla de contenidos

- [Características](#-características)
- [Stack tecnológico](#-stack-tecnológico)
- [Arquitectura multi-tenant](#-arquitectura-multi-tenant)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos](#-requisitos)
- [Instalación y desarrollo local](#-instalación-y-desarrollo-local)
- [Variables de entorno](#-variables-de-entorno)
- [Scripts disponibles](#-scripts-disponibles)
- [Docker y despliegue](#-docker-y-despliegue)
- [SEO](#-seo)
- [Convenciones](#-convenciones)

---

## ✨ Características

**Exploración y búsqueda**

- Feed estilo red social (`/feed`) con publicaciones de inmuebles.
- Listado de propiedades (`/propiedades`) con filtros.
- Búsqueda multizona (`/busqueda-multizona`) y por operación + tipo (`/[operationAndType]`).
- Mapa interactivo con MapLibre GL, clustering (`supercluster`) y dibujo de zonas (`@geoman-io/maplibre-geoman-free`).
- Detalle de inmueble (`/inmueble/[id]`) con SEO dinámico.

**Publicar y gestionar**

- Publicar anuncio (`/propiedades/publicar-anuncio`, `/info/publicar-anuncio`).
- Panel de usuario (`/usuario/...`): mis propiedades, favoritos, perfil.
- Leads (`/leads`): captación y gestión de contactos interesados.
- Chat (`/feed` integrado vía `views/chat`).

**Organizaciones / Inmobiliarias (multi-tenant)**

- Páginas públicas de organización e inmobiliaria (`/organizaciones/[slug]`, `/inmobiliarias/[slug]`, `/point/[slug]`).
- Soporte de **dominio propio por organización**: si el hostname no es un host principal, se resuelve como tenant y se muestra su escaparate (ver `TenantProvider`).
- Temas personalizables por organización (`HomeTemaSlot`, `OrgShell`).

**Plataforma y administración**

- Autenticación y registro (`/login`, `/registro`, `/olvidaste-tu-password`, `/restablecer-contrasena`, `/nuevo-profesional`).
- Panel admin (`/admin/...`) + visor de logs (`/logs`).
- Contacto, descargas, sobre-nosotros (`/contacto`, `/descargas`, `/sobre-nosotros`).
- Editor de contenido con Tiptap, notificaciones con Sonner, animaciones con Framer Motion / GSAP.

---

## 🧰 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.3.6 (App Router, `output: standalone`) |
| UI | React 19, Tailwind CSS 4, Headless UI, Lucide / React Icons |
| Mapas | MapLibre GL 5 + Geoman Free + Supercluster |
| Contenido | Tiptap (StarterKit + Link), DOMPurify, Tailwind Typography |
| Motion | Framer Motion / Motion, GSAP (+ @gsap/react) |
| Estado / datos | Context API (`AppContext`, `TenantContext`), `fetch` contra API REST (`src/actions/apiBackend.js`) |
| Empaquetado | pnpm 12, ESLint 9 (`eslint-config-next`) |
| Infra | Docker multi-stage (standalone), Nginx reverse-proxy, GitHub Actions → VPS |

---

## 🏘️ Arquitectura multi-tenant

El frontend opera en dos modos (ver `src/context/TenantProvider.jsx` y `src/config/tenantConfig.js`):

1. **Red social** (host principal): `inmobitwo.seventwo.tech`, `localhost:3000` → `PageInicio` + feed.
2. **Organización** (dominio propio): cualquier otro hostname se intenta resolver contra el backend como organización → se renderiza `OrgShell + HomeTemaSlot` (escaparate de la org).

Los hosts principales se configuran con:

```env
NEXT_PUBLIC_MAIN_HOSTS=inmobitwo.seventwo.tech,localhost:3000
```

> Las variables `NEXT_PUBLIC_*` se **hornean en el build**. Cambiarlas exige reconstruir la imagen.

---

## 📁 Estructura del proyecto

```
src/
├── app/                    # App Router: rutas, layouts, metadata, sitemap.js, robots.js
│   ├── page.js             # / — decide entre PageInicio u OrgShell según tenant
│   ├── feed/ inbox/ leads/ admin/ logs/ ...
│   ├── inmueble/ propiedades/ [operationAndType]/
│   ├── organizaciones/ inmobiliarias/ point/
│   └── layout.js + providers.jsx + globals.css
├── views/                  # Pantallas por dominio (inicio, feed, mapa-inmuebles,
│                           # publicar-anuncio, organizacion, usuario, admin, chat...)
├── components/             # Componentes reutilizables (header, footer, map, modales,
│                           # auth, guards, barra-navegacion...)
├── context/                # AppContext / AppProvider + TenantContext / TenantProvider
├── actions/                # Cliente API: apiBackend.js, apiBackendFormData.js, refreshToken.js
├── config/                 # config.js (URL_BACKEND), tenantConfig.js (MAIN_HOSTS)
├── hooks/ lib/ utils/ data/ assets/  # Utilidades (geo, formato, nav, estilos...)
├── public/                 # Estáticos (favicon, og-image, etc.)
├── nginx/inmobitwo.conf    # Reverse proxy :443 → 127.0.0.1:3000
├── Dockerfile              # Build standalone multi-stage (deps → builder → runner)
├── docker-compose.yml      # Servicio `web` (puerto 127.0.0.1:3000) + central_network
└── .github/workflows/deploy-web.yml  # Deploy automático a VPS en push a main
```

---

## ✅ Requisitos

- **Node.js 20** (la imagen Docker usa `node:20-alpine`)
- **pnpm 12.6.0** (`corepack enable && corepack prepare pnpm@12.6.0 --activate`)
- Backend API corriendo (local por defecto en `http://localhost:3001`)

---

## 🚀 Instalación y desarrollo local

```bash
# 1. Clonar e instalar
git clone <repo-url> web-inmobitwo
cd web-inmobitwo
corepack enable && corepack prepare pnpm@12.6.0 --activate
pnpm install

# 2. Configurar entorno local
cp .env.example .env.development
# .env.development ya apunta a http://localhost:3001 por defecto

# 3. Desarrollo (http://localhost:3000)
pnpm dev

# 4. Build + producción local
pnpm build
pnpm start

# 5. Lint
pnpm lint
```

> Next.js carga automáticamente `.env.development` en `pnpm dev` y `.env.production` en `pnpm build/start`. Para desarrollo también puedes usar `.env.local` (gitignored, tiene prioridad).

---

## 🔑 Variables de entorno

| Variable | Ejemplo | Descripción |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` (dev) / `https://api.inmobitwo.seventwo.tech` (prod) | URL base del backend. Se consume en `src/config/config.js`. |
| `NEXT_PUBLIC_MAIN_HOSTS` | `inmobitwo.seventwo.tech,localhost:3000` | Hosts considerados "plataforma principal" (coma-separados, incluir puerto en local). |

Archivos de referencia:

- `.env.example` — plantilla commiteable (sin secretos).
- `.env.development` — valores para `pnpm dev`.
- `.env.production` — **no se commitea**; se crea manualmente en el VPS en `/srv/infra/inmobitwo/web-inmobitwo/.env.production` y el workflow lo preserva entre deploys.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo (Turbopack/HMR) en `:3000` |
| `pnpm build` | Build de producción (`output: standalone`) |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint (config `eslint-config-next`) |

---

## 🐳 Docker y despliegue

**Imagen (multi-stage):**

1. `deps` — `pnpm install --frozen-lockfile`.
2. `builder` — recibe `NEXT_PUBLIC_*` como `ARG`, ejecuta `pnpm build`.
3. `runner` — usuario no-root `nextjs`, sirve `.next/standalone/server.js` en `:3000`.

```bash
# Build + run manual (equivalente a lo que hace el workflow)
docker compose up -d --build --remove-orphans
docker compose ps
docker logs inmobitwo-web
```

**Despliegue automático (push a `main` → `.github/workflows/deploy-web.yml`):**

1. SSH al VPS (`VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`), repo en `/srv/infra/inmobitwo/web-inmobitwo`.
2. Preserva `.env.production`, hace `git fetch + reset --hard origin/main`.
3. Exporta las `NEXT_PUBLIC_*` desde `.env.production` y levanta `docker compose up -d --build`.
4. Asegura certificado Let's Encrypt y recarga `nginx/inmobitwo.conf` (`inmobitwo.seventwo.tech → 127.0.0.1:3000`).
5. Verifica con `curl -sf https://inmobitwo.seventwo.tech/`.

---

## 🔍 SEO

- Metadata global + Open Graph / Twitter Cards en `src/app/layout.js` (`es-CO`, `og-image.png`).
- `src/app/sitemap.js` y `src/app/robots.js` generados por App Router.
- Páginas de inmueble y organización con metadatos dinámicos para indexación.

---

## 📝 Convenciones

- Rutas en App Router (`src/app/`), UI de página en `src/views/`.
- Llamadas al backend centralizadas en `src/actions/apiBackend*.js`; base URL desde `src/config/config.js`.
- Estilos con Tailwind 4 (`src/app/globals.css`); alias `@/*` → `src/*` (`jsconfig.json`).
- Commits sobre `main` disparan deploy a producción — evitar pushes directos sin revisar `pnpm lint && pnpm build`.

---

Hecho con 💚 por **Seventwo Technologies** — [seventwo.tech](https://www.seventwo.tech)

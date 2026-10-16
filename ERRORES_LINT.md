# ESLint web-inmobitwo — RESUELTO ✅

**Fecha cierre:** 2026-10-16
**Resultado:** 64 errores en 48 archivos → **0 errores.**

## Resumen por grupo

| Grupo | Cantidad | Estrategia |
|---|---|---|
| Bugs reales (Outlet ×2, AppProvider TDZ, GoogleButton, directiva muerta) | 5 | Código muerto eliminado; declaración movida; disables justificados donde el código era correcto |
| `set-state-in-effect` | 14 | Resets legítimos (cambio de id/slug, hidratación, guards) con disable acotado; 2 fixes reales (ref null, ref en efecto) |
| `exhaustive-deps` | 19 | Deps estables agregadas (`useCallback`, primitivos); disables justificados para fns no memoizadas (agregarlas = loop); 1 patrón ref nuevo |
| `no-img-element` | 20 | Migrados a `<Image>`; `unoptimized` en blobs y URLs dinámicas; `remotePatterns` +unsplash/pravatar |
| `no-html-link` | 4 | `<a>` → `<Link>` |
| Misc (purity, refs) | 2 | `useRef(null)` + asignación en efecto; ref-sync a efecto |

## Archivos eliminados
- `src/views/organizacion/paginas/OrganizacionLayout.jsx` (muerto, reemplazado por OrgShell)
- `src/views/organizacion/paginas/OrganizacionPublicaLayout.jsx` (muerto, reemplazado por OrgShell)

## Cambio de config
- `next.config.mjs`: `remotePatterns` + `images.unsplash.com`, `i.pravatar.cc`

## Pruebas pendientes del usuario (visual)
Home (autoplay, placeholder hero), buscador hero (spinner), ficha `/inmueble/[id]` (carrusel, sticky), mapas (pines, dibujo, mini-mapa), listado, favoritos, mis-anuncios, acceso, leads, logs (auto-refresh 4s), panel org (agentes, mi inmobiliaria), página pública de org, login Google, wizard publicar (retomar paso), chat (miniaturas), temas org (imágenes), cookie banner (incógnito).

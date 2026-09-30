// src/proxy.js
//
// Equivalente en servidor del "firewall" de guards de cliente
// (components/guards/Guards.jsx). En Next 16 `middleware.ts` está
// deprecado y renombrado a `proxy`: corre antes de renderizar la ruta,
// así el usuario sin sesión es redirigido sin flash de "Cargando...".
//
// Qué verifica: presencia de la cookie httpOnly `refresh_token` que pone
// el backend al hacer login (auth.controllers.js). NO puede verificar el
// rol (superadmin vive en el `usuario` de localStorage, invisible al
// servidor): eso lo siguen haciendo RutaAdmin en cliente + cada endpoint
// del backend, que es la protección real.
//
// REQUISITO: la cookie solo es visible aquí si frontend y backend
// comparten sitio (mismo host en dev: localhost). Si en producción están
// en dominios distintos (app.tudominio.com vs api.tudominio.com), la
// cookie host-only del backend NO llega al proxy y redirigiría a /login
// a usuarios con sesión. En ese caso hay que servir ambos bajo el mismo
// dominio padre con `domain` compartido, o no usar este proxy.

import { NextResponse } from "next/server";

// Cookie httpOnly de sesión (ver backend: auth.controllers.js).
const COOKIE_SESION = "refresh_token";

// Prefijos que exigen sesión (espejan <RutaPrivada> y <RutaAdmin>).
const RUTAS_PROTEGIDAS_PREFIJO = [
  "/feed",
  "/usuario",
  "/admin",
  "/leads",
  "/logs",
  "/organizaciones",
  "/propiedades",
];

// Rutas exactas que exigen sesión pero cuyo prefijo padre es público:
// - /inmobiliarias/[slug] es público, solo /nueva es privada.
// - /info/publicar-anuncio es la página informativa pública, solo
//   /publicar exige sesión.
const RUTAS_PROTEGIDAS_EXACTAS = [
  "/inmobiliarias/nueva",
  "/info/publicar-anuncio/publicar",
];

// Rutas que solo tienen sentido sin sesión (espejan <RutaPublica>).
const RUTAS_SOLO_PUBLICAS = ["/login", "/registro"];

const coincide = (pathname, base) =>
  pathname === base || pathname.startsWith(`${base}/`);

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const tieneSesion = request.cookies.has(COOKIE_SESION);

  const esProtegida =
    RUTAS_PROTEGIDAS_PREFIJO.some((base) => coincide(pathname, base)) ||
    RUTAS_PROTEGIDAS_EXACTAS.some((base) => coincide(pathname, base));

  // Sin sesión intentando entrar a zona privada → /login.
  if (!tieneSesion && esProtegida) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Con sesión intentando entrar a /login o /registro → /.
  if (
    tieneSesion &&
    RUTAS_SOLO_PUBLICAS.some((base) => coincide(pathname, base))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Todo menos estáticos, optimización de imágenes, favicon y assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

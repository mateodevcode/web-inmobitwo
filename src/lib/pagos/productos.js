// src/lib/pagos/productos.js
// Configuración de productos pagables en el frontend.
// El contrato espeja src/lib/pagos/productos/ del backend: el modal y el hook
// son genéricos y cada producto solo aporta textos, endpoint y helpers.
//
// Para agregar un producto: registrar aquí su configuración y reutilizar
// usePago/PagoModal. El precio real SIEMPRE lo fija el backend.

export const PAGO_UBICACION_OCULTA = {
  tipo: "ubicacion_oculta",
  slug: "ubicacion-oculta",
  campoContexto: "propiedad_id",
  titulo: "Ocultar la ubicación exacta",
  icono: "ubicacion",
  precioDefault: 22000,
  monedaDefault: "COP",
  maxCuotasDefault: 1,
  avisoVisible:
    "Mientras el pago no esté confirmado, la ubicación exacta seguirá visible para todos.",
  textoContinuar: "Continuar",
  textoContinuarSinPagar:
    "Continuar sin ocultar por ahora (avanzar al paso 3)",
  mensajes: {
    aprobado: "Listo, la ubicación de tu anuncio quedó oculta.",
    reintento:
      "Algo salió mal con el pago. Tu anuncio fue creado, pero la ubicación exacta seguirá visible hasta que el pago se realice. Puedes reintentar ahora o más tarde desde tu panel o al editar el anuncio.",
    sinConfirmar:
      "No pudimos confirmar el cobro con Mercado Pago. La ubicación exacta sigue visible. No vuelvas a pagar todavía: consulta el estado en unos minutos.",
    pendiente:
      "Tu pago está en proceso. Tu ubicación exacta seguirá visible hasta que se confirme.",
    aprobadoSinAplicar:
      "Tu pago fue aprobado y estamos activando la ocultación. En unos instantes quedará aplicada.",
    rechazadoConsultado:
      "El pago fue rechazado. Tu ubicación exacta sigue visible: puedes intentarlo de nuevo.",
    expiradoConsultado:
      "El intento anterior no se completó. Tu ubicación exacta sigue visible: puedes intentarlo de nuevo.",
    enCurso:
      "Ya existe un pago en curso para este anuncio. Consulta su estado abajo.",
    propiedadOculta: "Esta propiedad ya tiene la ubicación oculta.",
    noDisponible:
      "El pago en línea no está disponible en este momento. Puedes continuar con tu anuncio e intentarlo más tarde desde tu panel o al editar el anuncio.",
  },
  // El backend agrega estos campos a la respuesta del contexto.
  estaAplicado: (data) => Boolean(data?.ubicacion_oculta),
  precioVisible: (config) => config?.precio ?? PAGO_UBICACION_OCULTA.precioDefault,
  monedaVisible: (config) => config?.moneda ?? PAGO_UBICACION_OCULTA.monedaDefault,
};

export const PRODUCTOS_PAGO = {
  [PAGO_UBICACION_OCULTA.slug]: PAGO_UBICACION_OCULTA,
};

export const productoPago = (slug) => PRODUCTOS_PAGO[slug] ?? null;

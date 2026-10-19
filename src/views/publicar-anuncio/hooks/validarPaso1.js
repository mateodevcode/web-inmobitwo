// src/views/publicar-anuncio/hooks/validarPaso1.js
// Validación de SALIDA del paso 1 (los datos básicos). Se usa en
// handleContinuarContacto para bloquear el avance Informando qué falta ANTES
// de llegar al paso 2 (antes, el error aparecía al publicar: 500/400
// "property_type_id es requerido" sin decir dónde corregir).
//
// Espeja lo obligatorio del backend (src/validations/propiedad_validate.js):
// property_type_id, operación, country/state/city, dirección y coordenadas.
// El precio y el resto del paso 2 NO van acá: pertenecen a su propio paso.

export function validarPaso1(f = {}) {
  const errores = [];

  if (!f.property_type_id) {
    errores.push("Falta marcar el tipo de inmueble (paso 1).");
  }
  if (!f.operation_type_id && !f.operacion) {
    errores.push("Falta elegir la operación: venta o alquiler (paso 1).");
  }
  if (!f.country_id || !f.state_id || !f.city_id) {
    errores.push("Falta completar país, departamento y ciudad (paso 1).");
  }
  if (!f.direccion) {
    errores.push("Falta la dirección del inmueble (paso 1).");
  }
  if (
    f.latitude == null ||
    f.longitude == null ||
    f.latitude === "" ||
    f.longitude === ""
  ) {
    errores.push(
      "Falta marcar la ubicación en el mapa: usa «Marcar en el mapa» en la tarjeta de dirección.",
    );
  }

  return errores;
}

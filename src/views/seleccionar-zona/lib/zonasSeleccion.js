// views/seleccionar-zona/lib/zonasSeleccion.js
// Selección de VARIAS zonas en el mapa principal. Puro, sin estado.
//
// Una zona: { type: "region"|"departamento"|"municipio"|"barrio", name,
//             slug? (región), daneCode?, dptoDaneCode?, mpioDaneCode?, ... }
//
// Reglas al marcar una zona:
//  - si ya estaba → se quita (toggle);
//  - lo más concreto gana: marcar un municipio quita su departamento, y
//    marcar un departamento quita los municipios/barrios que tenía dentro;
//  - ramas distintas conviven (Chapinero + Envigado + Valle del Cauca).

export const MAX_ZONAS = 30;

export const codigoZona = (z) => (z?.type === "region" ? z.slug || z.name : z?.daneCode);

export const claveZona = (z) => `${z.type}:${codigoZona(z)}`;

// Claves de los padres conocidos de una zona (las regiones no se relacionan:
// los polígonos de departamento no traen su región).
export function clavesAncestros(z) {
  const claves = [];
  if (z.type === "municipio" || z.type === "barrio") {
    if (z.dptoDaneCode) claves.push(`departamento:${z.dptoDaneCode}`);
  }
  if (z.type === "barrio" && z.mpioDaneCode) {
    claves.push(`municipio:${z.mpioDaneCode}`);
  }
  return claves;
}

export const estaSeleccionada = (zonas, z) => zonas.some((x) => claveZona(x) === claveZona(z));

// Agrega la zona aplicando "lo más concreto gana". No quita si ya estaba.
export function agregarZona(zonas, z) {
  if (estaSeleccionada(zonas, z)) return zonas;
  const clave = claveZona(z);
  const ancestros = new Set(clavesAncestros(z));
  const resto = zonas.filter(
    (x) => !ancestros.has(claveZona(x)) && !clavesAncestros(x).includes(clave),
  );
  if (resto.length >= MAX_ZONAS) return zonas;
  return [...resto, z];
}

export function quitarZona(zonas, clave) {
  return zonas.filter((x) => claveZona(x) !== clave);
}

export function alternarZona(zonas, z) {
  return estaSeleccionada(zonas, z) ? quitarZona(zonas, claveZona(z)) : agregarZona(zonas, z);
}

// Para pintar el mapa: códigos seleccionados por nivel y los padres de lo
// seleccionado (en rosa claro, como contexto).
export function estadoMapa(zonas) {
  const seleccion = { region: new Set(), departamento: new Set(), municipio: new Set(), barrio: new Set() };
  const ancestro = { departamento: new Set(), municipio: new Set() };
  for (const z of zonas) {
    seleccion[z.type]?.add(codigoZona(z));
    for (const c of clavesAncestros(z)) {
      const [tipo, codigo] = c.split(":");
      ancestro[tipo]?.add(codigo);
    }
  }
  return { seleccion, ancestro };
}

// Formato compacto para la URL y la API: "municipio:11001,barrio:110010101"
export const zonasAParam = (zonas) => zonas.map(claveZona).join(",");

// Texto corto para títulos: "Chapinero, Usaquén y 2 más"
export function resumenZonas(zonas, maxNombres = 2) {
  const nombres = zonas.map((z) => z.name).filter(Boolean);
  if (nombres.length <= maxNombres) {
    return nombres.length === 2 ? `${nombres[0]} y ${nombres[1]}` : nombres.join("");
  }
  const resto = nombres.length - maxNombres;
  return `${nombres.slice(0, maxNombres).join(", ")} y ${resto} más`;
}

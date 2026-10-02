// Opciones y etiquetas del "Perfil para alquilar habitación".
// Los `value` deben coincidir con los CHECK de room_seeker_profiles.

export const GENERO_OPTIONS = [
  { value: "", label: "Sin especificar" },
  { value: "hombre", label: "Hombre" },
  { value: "mujer", label: "Mujer" },
  { value: "otro", label: "Otro" },
];

export const OCUPACION_OPTIONS = [
  { value: "", label: "Sin especificar" },
  { value: "estudio", label: "Estudio" },
  { value: "trabajo", label: "Trabajo" },
  { value: "ambos", label: "Estudio y trabajo" },
];

export const BUSCA_CON_OPTIONS = [
  { value: "solo_yo", label: "Busco habitación solo yo" },
  { value: "pareja", label: "Busco con mi pareja" },
  { value: "amigos", label: "Buscamos entre amigos" },
];

// Tri-estado para booleanos: true / false / null (indiferente).
export const TRI_OPTIONS = [
  { value: "indiferente", label: "Me es indiferente" },
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
];

export const triToBool = (v) =>
  v === "si" ? true : v === "no" ? false : null;

export const boolToTri = (v) =>
  v === true ? "si" : v === false ? "no" : "indiferente";

const formatoCOP = (v) =>
  `$${Number(v).toLocaleString("es-CO")} /mes`;

const formatoFecha = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
};

// Convierte el perfil guardado en la lista de chips de la tarjeta.
// Omite todo lo que esté vacío (null/"").
export function perfilAChips(perfil = {}) {
  const chips = [];

  const genero = GENERO_OPTIONS.find((o) => o.value === perfil.genero);
  if (genero?.value) chips.push(genero.label);

  if (perfil.edad) chips.push(`${perfil.edad} años`);

  const ocupacion = OCUPACION_OPTIONS.find((o) => o.value === perfil.ocupacion);
  if (ocupacion?.value) chips.push(ocupacion.label);

  if (perfil.fuma_en_casa === true) chips.push("Fumo en casa");
  if (perfil.fuma_en_casa === false) chips.push("No fumo en casa");

  if (perfil.tiene_mascota === true) chips.push("Tengo mascota");
  if (perfil.tiene_mascota === false) chips.push("No tengo mascota");

  const busca = BUSCA_CON_OPTIONS.find((o) => o.value === perfil.busca_con);
  if (busca) chips.push(busca.label);

  if (perfil.presupuesto_max)
    chips.push(`Hasta ${formatoCOP(perfil.presupuesto_max)}`);

  const zona = [perfil.city_name, perfil.state_name].filter(Boolean).join(", ");
  if (zona) chips.push(zona);

  const entrada = formatoFecha(perfil.fecha_entrada);
  if (entrada) chips.push(`Entrada: ${entrada}`);

  if (perfil.habitacion_privada === true) chips.push("Habitación privada");
  if (perfil.habitacion_privada === false) chips.push("Habitación compartida");
  if (perfil.amoblada === true) chips.push("Amoblada");
  if (perfil.amoblada === false) chips.push("Sin amoblar");
  if (perfil.bano_privado === true) chips.push("Baño privado");
  if (perfil.bano_privado === false) chips.push("Baño compartido");

  return chips;
}

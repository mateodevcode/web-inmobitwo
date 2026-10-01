export const ESTADOS = [
  { valor: "nuevo", label: "Nuevo", color: "bg-blue-100 text-blue-700" },
  {
    valor: "contactado",
    label: "Contactado",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    valor: "en_negociacion",
    label: "En negociación",
    color: "bg-purple-100 text-purple-700",
  },
  { valor: "cerrado", label: "Cerrado", color: "bg-green-100 text-green-700" },
  {
    valor: "descartado",
    label: "Descartado",
    color: "bg-gray-100 text-gray-500",
  },
];

export const getEstadoInfo = (estado) =>
  ESTADOS.find((e) => e.valor === estado) || ESTADOS[0];

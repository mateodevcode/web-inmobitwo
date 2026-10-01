const STAT_CARDS = [
  {
    id: "activas",
    gradient: "from-green-200 via-green-700 to-green-500",
    border: "border-green-300",
    shadow: "shadow-green-300",
    text: "text-green-200",
    sub: "text-green-100",
    label: "Propiedades activas",
  },
  {
    id: "contactos",
    gradient: "from-blue-200 via-blue-700 to-blue-900",
    border: "border-blue-300",
    shadow: "shadow-blue-300",
    text: "text-blue-200",
    sub: "text-blue-100",
    label: "Contactos este mes",
  },
  {
    id: "visitas",
    gradient: "from-rose-200 via-rose-700 to-rose-900",
    border: "border-rose-300",
    shadow: "shadow-rose-300",
    text: "text-rose-200",
    sub: "text-rose-100",
    label: "Visitas totales",
  },
  {
    id: "negociacion",
    gradient: "from-purple-200 via-purple-700 to-purple-900",
    border: "border-purple-300",
    shadow: "shadow-purple-300",
    text: "text-purple-200",
    sub: "text-purple-100",
    label: "En negociacion",
  },
];

const STAT_VALUES = { activas: null, contactos: 48, visitas: 284, negociacion: 3 };

export function StatsGrid({ activas }) {
  return (
    <div className="grid grid-cols-2 p-2 gap-5 mt-4">
      {STAT_CARDS.map(({ id, gradient, border, shadow, text, sub, label }) => (
        <div
          key={id}
          className={`flex flex-col bg-linear-to-bl ${gradient} p-4 rounded-md ${border} shadow-md ${shadow} h-24`}
        >
          <p className={`text-3xl ${text} font-semibold`}>
            {id === "activas" ? activas : STAT_VALUES[id]}
          </p>
          <span className={`text-xs ${sub}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

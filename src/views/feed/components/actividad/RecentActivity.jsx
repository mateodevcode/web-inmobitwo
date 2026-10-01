import { TbPointFilled } from "react-icons/tb";

const EVENTOS = [
  {
    id: "guardado",
    color: "text-purple-600",
    texto: "Laura M. guardó tu propiedad en Salamanca",
    tiempo: "Hace 10 min",
  },
  {
    id: "visita",
    color: "text-red-600",
    texto: "Nueva solicitud de visita para el ático en Goya",
    tiempo: "Hace 45 min",
  },
  {
    id: "publicadas",
    color: "text-green-600",
    texto: "Inmobiliaria Norte ha publicado 3 propiedades nuevas",
    tiempo: "Hace 1 hora",
  },
];

export function RecentActivity() {
  return (
    <div className="grid grid-cols-1 p-4 gap-5">
      {EVENTOS.map(({ id, color, texto, tiempo }) => (
        <div key={id} className="flex flex-col">
          <div className="flex gap-2">
            <TbPointFilled className={color} />
            <span className="text-xs text-black">{texto}</span>
          </div>
          <span className="text-xs">{tiempo}</span>
        </div>
      ))}
    </div>
  );
}

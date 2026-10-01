import Link from "next/link";

export function ProfessionalFooter() {
  return (
    <div className="flex flex-col items-center mt-6 font-poppins gap-3">
      <p className="text-sm text-black/80">Eres profesional inmobiliario</p>
      <Link
        className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer select-none"
        href={"/nuevo-profesional"}
      >
        Consulta los servicios para profesionales
      </Link>
    </div>
  );
}

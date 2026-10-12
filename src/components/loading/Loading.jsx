// components/loading/Loading.jsx
//
// Loader central de la app: spinner de borde (el mismo de LoaderGlobal).
//
// Props:
// - size: "sm" | "md" | "lg" (default "md")
// - fullPage: overlay fijo a pantalla completa (default false)
// - label: texto opcional bajo el spinner
// - className: clases extra para el contenedor
// - type, logo: se aceptan y se ignoran (compatibilidad con la firma
//   antigua <Loading type="opcion2" logo="..." />).
//
// Uso:
//   <Loading fullPage label="Cargando..." />
//   <Loading size="sm" label="Buscando inmuebles..." />

const SPINNER = {
  sm: "w-5 h-5 border-2",
  md: "w-12 h-12 border-4",
  lg: "w-16 h-16 border-[6px]",
};

const Loading = ({
  size = "md",
  fullPage = false,
  label,
  className = "",
  type,
  logo,
}) => {
  void type;
  void logo;

  if (fullPage) {
    return (
      <div
        className={`fixed inset-0 z-999 bg-black/20 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3 ${className}`}
        role="status"
        aria-label={label || "Cargando"}
      >
        <div
          className={`${SPINNER[size] ?? SPINNER.md} border-white/30 border-t-white rounded-full animate-spin`}
        />
        {label && (
          <span className="text-sm font-semibold text-white">{label}</span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center gap-2 py-8 ${className}`}
      role="status"
      aria-label={label || "Cargando"}
    >
      <div
        className={`${SPINNER[size] ?? SPINNER.md} border-segundo/20 border-t-segundo rounded-full animate-spin shrink-0`}
      />
      {label && <span className="text-sm text-segundo/60">{label}</span>}
    </div>
  );
};

export default Loading;

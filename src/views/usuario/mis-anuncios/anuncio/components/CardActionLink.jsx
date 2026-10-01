export function CardActionLink({ Icon, onClick, children, className = "" }) {
  return (
    <button
      className={`flex items-center gap-2 text-blue-700 cursor-pointer select-none hover:text-blue-600 ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl" />}
      <p className="font-semibold text-sm md:text-lg">{children}</p>
    </button>
  );
}

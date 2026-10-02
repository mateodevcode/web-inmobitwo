export function CardActionLink({ Icon, onClick, children, className = "" }) {
  return (
    <button
      className={`flex items-center gap-2 text-decimo cursor-pointer select-none hover:text-decimo/80 ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="text-xl" />}
      <p className="font-semibold text-sm md:text-lg font-montserrat">
        {children}
      </p>
    </button>
  );
}

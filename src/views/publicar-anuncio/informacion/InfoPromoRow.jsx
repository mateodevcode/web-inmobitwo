export function InfoPromoRow({ Icon, title, linkLabel }) {
  return (
    <div className="flex items-center gap-4 border-t border-black/20 md:p-8 p-6">
      <Icon className="text-4xl" />
      <div>
        <p className="font-semibold text-base">{title}</p>
        <p className="text-blue-600 hover:underline cursor-pointer select-none text-base">
          {linkLabel}
        </p>
      </div>
    </div>
  );
}

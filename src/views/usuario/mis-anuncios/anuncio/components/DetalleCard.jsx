export function DetalleCard({ title, children, action }) {
  return (
    <div className="w-10/12">
      <div className="w-full md:w-2/3 bg-stone-50 shadow-sm shadow-black/20 p-8 flex flex-col justify-between border border-black/10 mt-8">
        <div>
          <h3 className="text-xl font-bold text-black">{title}</h3>
          {children}
        </div>
        {action}
      </div>
    </div>
  );
}

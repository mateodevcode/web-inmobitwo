import { BsGeoAlt } from "react-icons/bs";

function ResultLabel({ item }) {
  if (item.tipo === "region") return item.region_name;
  if (item.tipo === "departamento") {
    return (
      <>
        {item.state_name}
        {item.region_name && (
          <span className="text-gray-400 font-normal">
            , {item.region_name}
          </span>
        )}
      </>
    );
  }
  return (
    <>
      {item.city_name}, {item.state_name}
    </>
  );
}

export function ZonaSuggestions({
  loading,
  results,
  activeIndex,
  onSelect,
  onHoverIndex,
  itemRefs,
}) {
  return (
    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-sm max-h-64 overflow-y-auto">
      {loading && (
        <p className="px-4 py-3 text-sm text-gray-400">Buscando...</p>
      )}
      {!loading && results.length === 0 && (
        <p className="px-4 py-3 text-sm text-gray-400">Sin coincidencias</p>
      )}
      {!loading &&
        results.map((item, i) => (
          <button
            key={`${item.tipo}-${item.id}`}
            ref={(el) => (itemRefs.current[i] = el)}
            type="button"
            onClick={() => onSelect(item)}
            onMouseEnter={() => onHoverIndex(i)}
            className={`flex flex-col w-full items-start px-4 py-3 text-left text-sm transition-colors cursor-pointer border-b border-gray-100 ${
              activeIndex === i
                ? "bg-pink-50 text-black"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="font-medium">
              <ResultLabel item={item} />
            </span>
            <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2 justify-between w-full">
              <div className="flex items-center gap-1">
                <BsGeoAlt className="text-xs" />
                <span className="capitalize">{item.tipo}</span>
              </div>
              <span className="font-semibold">
                {item.total_propiedades}
              </span>
            </div>
          </button>
        ))}
    </div>
  );
}

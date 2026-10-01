import { BsGeoAlt } from "react-icons/bs";

const ResultLabel = ({ item }) => {
  if (item.tipo === "region") return item.region_name;
  if (item.tipo === "departamento") {
    return (
      <>
        {item.state_name}
        {item.region_name && (
          <span className="text-black/40 font-normal">
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
};

const SearchResultItem = ({ item, active, onSelect, onHover, refCb }) => (
  <li ref={refCb}>
    <button
      type="button"
      onClick={() => onSelect(item)}
      onMouseEnter={onHover}
      className={`flex flex-col w-full items-start px-4 py-3 text-left text-sm transition-colors cursor-pointer border-b border-segundo/10 ${
        active ? "bg-tercero/10 text-black" : "text-black/80 hover:bg-tercero/3"
      }`}
    >
      <span className="font-medium">
        <ResultLabel item={item} />
      </span>
      <div className="text-xs text-segundo/60 mt-0.5 flex items-center gap-2 justify-between w-full">
        <div className="flex items-center gap-2">
          <BsGeoAlt className="text-sm" />
          <span className="capitalize">{item.tipo}</span>
        </div>
        <span className="font-semibold">{item.total_propiedades}</span>
      </div>
    </button>
  </li>
);

const SearchResultsList = ({
  loading,
  results,
  activeIndex,
  onSelect,
  onHoverIndex,
  itemRefs,
}) => (
  <div className="absolute z-50 left-0 right-0 -mt-0.5 bg-white border border-black/10 shadow-lg max-h-64 overflow-y-auto">
    {loading && (
      <p className="px-4 py-3 text-sm text-black/40">Buscando...</p>
    )}

    {!loading && results.length === 0 && (
      <p className="px-4 py-3 text-sm text-black/40">Sin coincidencias</p>
    )}

    {!loading && results.length > 0 && (
      <ul>
        {results.map((item, index) => (
          <SearchResultItem
            key={`${item.tipo}-${item.id}`}
            item={item}
            active={activeIndex === index}
            onSelect={onSelect}
            onHover={() => onHoverIndex(index)}
            refCb={(el) => (itemRefs.current[index] = el)}
          />
        ))}
      </ul>
    )}
  </div>
);

export default SearchResultsList;

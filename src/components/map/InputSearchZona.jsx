// components/map/InputSearchZona.jsx
import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { ZonaSuggestions } from "./ZonaSuggestions";
import { useZonaSuggest } from "./useZonaSuggest";
import { toQueryLabel, toZoneSelection } from "./zoneSelect";

export default function InputSearchZona({
  onSelectZone,
  operation,
  tipoInmueble,
  className = "",
  showX = true,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const { results, loading } = useZonaSuggest({
    query,
    operation,
    tipoInmueble,
  });

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleSelectResult = (item) => {
    setQuery(toQueryLabel(item));
    onSelectZone(toZoneSelection(item));
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleClear = () => {
    setQuery("");
    setActiveIndex(-1);
    onSelectZone(null, operation, tipoInmueble);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length === 0) return;
      setIsOpen(true);
      setActiveIndex((p) => (p + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length === 0) return;
      setIsOpen(true);
      setActiveIndex((p) => (p - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length === 0) return;
      const idx = activeIndex >= 0 ? activeIndex : 0;
      handleSelectResult(results[idx]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className || "max-w-md"}`}>
      <div className="flex items-center gap-2 border-2 border-segundo py-2.5 px-4 rounded-sm bg-primero">
        <FiSearch className="text-segundo/60 shrink-0" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Barrio, ciudad, municipio"
          className="w-full text-sm bg-transparent outline-none placeholder:text-segundo/60"
        />
        {showX && query && (
          <button
            onClick={handleClear}
            className="shrink-0 text-primero bg-segundo rounded-full hover:bg-segundo/80 cursor-pointer absolute right-3 p-0.5"
            title="Limpiar"
          >
            <FiX />
          </button>
        )}
      </div>

      {isOpen && query.trim().length >= 2 && (
        <ZonaSuggestions
          loading={loading}
          results={results}
          activeIndex={activeIndex}
          onSelect={handleSelectResult}
          onHoverIndex={setActiveIndex}
          itemRefs={itemRefs}
        />
      )}
    </div>
  );
}

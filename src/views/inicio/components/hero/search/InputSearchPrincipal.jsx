"use client";

import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import SuggestionsMenu from "./SuggestionsMenu";
import SearchResultsList from "./SearchResultsList";
import { useCitySuggestions } from "../../../hooks/useCitySuggestions";
import { toGeoSelection, toQueryLabel } from "../../../lib/geoSelect";

const InputSearchPrincipal = ({
  onGeoSelect,
  query,
  setQuery,
  operation,
  tipo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const { results, loading } = useCitySuggestions({
    query,
    operation,
    tipoSlug: tipo?.slug,
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleSelectResult = (item) => {
    setQuery(toQueryLabel(item));
    onGeoSelect(toGeoSelection(item));
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
    onGeoSelect(null);
  };

  const handleKeyDown = (e) => {
    const canNavigate = query.trim().length >= 2 && results.length > 0;
    if (!canNavigate) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelectResult(results[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const showSuggestionsMenu = query.trim() === "";
  const showResultsMenu = query.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative flex-1 md:min-w-55">
      <div className="flex items-center gap-2 h-11 px-4 bg-white border border-black/10">
        <IoSearchOutline className="text-black/40 text-lg shrink-0" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe dónde buscas"
          className="w-full md:h-full outline-none text-sm placeholder:text-black/40 h-11 bg-transparent"
        />
      </div>

      {isOpen && showSuggestionsMenu && (
        <SuggestionsMenu
          setIsOpen={setIsOpen}
          tab={operation}
          tipo={tipo}
        />
      )}

      {isOpen && showResultsMenu && (
        <SearchResultsList
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
};

export default InputSearchPrincipal;

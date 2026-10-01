import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { sections } from "@/data/items-nav-hamburguer";

const SectionItem = ({ section, expanded, onToggle }) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <span className="text-base font-semibold text-gray-900">
        {section.title}
      </span>
      {expanded ? (
        <ChevronUp size={20} className="text-gray-600" />
      ) : (
        <ChevronDown size={20} className="text-gray-600" />
      )}
    </button>

    {expanded && section.links.length > 0 && (
      <div className="bg-gray-50 border-t border-gray-200">
        {section.links.map((link, index) => (
          <a
            key={`${section.id}-${index}`}
            href="#"
            className="block px-6 py-3 text-blue-600 hover:text-blue-800 hover:bg-gray-100 transition-colors text-base"
          >
            {link}
          </a>
        ))}
      </div>
    )}
  </div>
);

const EnlacesHamburguesa = () => {
  const [expandedSections, setExpandedSections] = useState(() =>
    Object.fromEntries(sections.map((s, i) => [s.id, i === 0])),
  );

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="w-full">
      <div className="px-6 py-5 border-b border-gray-200 font-poppins">
        <h1 className="text-xl font-semibold text-gray-900">
          Servicios para ti
        </h1>
      </div>

      <div className="divide-y divide-gray-200">
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            expanded={!!expandedSections[section.id]}
            onToggle={() => toggleSection(section.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EnlacesHamburguesa;

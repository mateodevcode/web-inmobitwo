import { getInitials } from "@/lib/getInitials";
import { formatFirstTwoNames } from "@/lib/formatFirstTwoNames";
import { getColorForOrg } from "@/lib/getRandomTailwindColors";
import { useState } from "react";

export function SuggestedOrgs({ organizaciones }) {
  const [isSeguir, setIsSeguir] = useState(false);

  return (
    <div className="grid grid-cols-1 p-4 gap-5">
      {organizaciones.map((org, i) => {
        const color = getColorForOrg(org.id || i, "org");
        return (
          <div className="flex justify-between items-center" key={i}>
            <div className="flex gap-2 ">
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center font-semibold`}
                style={color}
              >
                {getInitials(org.nombre)}
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-black text-sm">
                  {formatFirstTwoNames(org.nombre)}
                </p>
                <div className="flex items-center gap-2 text-xs text-black/80">
                  <p>24 Propiedades</p> <p>BCN</p>
                </div>
              </div>
            </div>

            <div>
              <button
                className="text-xs text-black font-semibold cursor-pointer select-none hover:text-[#FF1B1C]"
                type="button"
                onClick={() => setIsSeguir(!isSeguir)}
              >
                {isSeguir ? "Siguiendo" : "Seguir"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { MAPPING_OPERACIONES } from "@/data/mappings_busqueda";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cards } from "@/data/inicio/infocards";
import { irArriba } from "@/utils/irArriba";

const InfoCards = ({ tab, tipo }) => {
  const router = useRouter();

  const operationSlug = MAPPING_OPERACIONES[tab] || tab;
  const zonaUrl = `/busqueda-multizona/${operationSlug}-${tipo.slug}`;

  return (
    <section className="w-full flex justify-center font-poppins py-5 md:py-10 pt-36 md:pt-8">
      <div className="w-11/12 md:w-8/12 lg:w-9/12 xl:w-8/12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-stretch gap-2 border border-segundo/10"
          >
            <Image
              src={card.image}
              alt={card.title}
              width={600}
              height={400}
              className="w-28 h-28 xl:w-32 lg:h-32 object-cover shrink-0"
            />

            <div className="flex flex-col justify-between p-2">
              <div className="flex flex-col">
                <h3 className="text-segundo text-base lg:text-sm xl:text-base mb-1 font-poppins font-semibold">
                  {card.title}
                </h3>
                <p className="text-segundo/60 text-sm lg:text-xs xl:text-sm leading-snug mb-2 xl:mb-0 font-montserrat">
                  {card.description}
                </p>
              </div>
              <button
                onClick={() => {
                  const url = card.id === "zonas" ? zonaUrl : card.linkUrl;
                  router.push(url);
                  irArriba();
                }}
                className="text-decimo hover:text-decimo/80 text-left text-sm lg:text-xs xl:text-sm font-medium hover:underline w-fit font-montserrat"
              >
                {card.linkLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoCards;

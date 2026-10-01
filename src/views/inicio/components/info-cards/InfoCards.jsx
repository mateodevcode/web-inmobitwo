"use client";

import { useRouter } from "next/navigation";
import { cards } from "@/data/inicio/infocards";
import { irArriba } from "@/utils/irArriba";
import { buildZonaUrl } from "../../lib/geoPath";
import InfoCardItem from "./InfoCardItem";

const InfoCards = ({ tab, tipo }) => {
  const router = useRouter();
  const zonaUrl = buildZonaUrl(tab, tipo.slug);

  const handleNavigate = (card) => {
    router.push(card.id === "zonas" ? zonaUrl : card.linkUrl);
    irArriba();
  };

  return (
    <section className="w-full flex justify-center font-poppins py-5 md:py-10 pt-36 md:pt-8">
      <div className="w-11/12 md:w-8/12 lg:w-9/12 xl:w-8/12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card) => (
          <InfoCardItem
            key={card.id}
            card={card}
            onNavigate={() => handleNavigate(card)}
          />
        ))}
      </div>
    </section>
  );
};

export default InfoCards;

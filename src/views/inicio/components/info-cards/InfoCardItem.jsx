import Image from "next/image";

const InfoCardItem = ({ card, onNavigate }) => (
  <div className="flex items-stretch gap-2 border border-segundo/10">
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
        onClick={onNavigate}
        className="text-decimo hover:text-decimo/80 text-left text-sm lg:text-xs xl:text-sm font-medium hover:underline w-fit font-montserrat"
      >
        {card.linkLabel}
      </button>
    </div>
  </div>
);

export default InfoCardItem;

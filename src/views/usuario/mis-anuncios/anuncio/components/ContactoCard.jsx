import { BsTelephone } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt, MdOutlineModeEdit } from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";

const ContactRow = ({ Icon, label, activeLabel = "Activo" }) => (
  <div className="w-full flex items-center justify-between">
    <div className="flex items-center gap-4 text-black">
      <Icon className="text-xl" />
      <p className="text-lg">{label}</p>
    </div>

    <div className="flex items-center gap-2 text-green-800 text-lg">
      <FaCheck />
      <p>{activeLabel}</p>
    </div>
  </div>
);

export function ContactoCard() {
  return (
    <DetalleCard
      title="Forma de contacto"
      action={
        <CardActionLink Icon={MdOutlineModeEdit} className="mt-8">
          Cambiar contacto
        </CardActionLink>
      }
    >
      <div className="flex items-center gap-10 mt-8 flex-col">
        <ContactRow Icon={BsTelephone} label="675464502" />
        <ContactRow
          Icon={MdOutlineMarkUnreadChatAlt}
          label="Mensajes de chat"
        />
      </div>
    </DetalleCard>
  );
}

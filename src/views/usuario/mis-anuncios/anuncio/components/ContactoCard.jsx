import { useRouter } from "next/navigation";
import { BsTelephone } from "react-icons/bs";
import { FaCheck, FaMinus } from "react-icons/fa";
import {
  MdOutlineMarkUnreadChatAlt,
  MdOutlineModeEdit,
  MdOutlineEmail,
} from "react-icons/md";
import { DetalleCard } from "./DetalleCard";
import { CardActionLink } from "./CardActionLink";
import { useCardEdit } from "./useCardEdit";
import { CONTACT_PREFERENCES } from "@/data/contact_options";
import { useAppContext } from "@/context/AppContext";
import { irArriba } from "@/utils/irArriba";

const MODO_CONTACTO = {
  telefono_chat: { telefono: true, chat: true },
  solo_telefono: { telefono: true, chat: false },
  solo_chat: { telefono: false, chat: true },
};

const inputCls =
  "border border-segundo/50 p-2.5 w-full text-segundo bg-white";

function ContactRow({ Icon, label, activo }) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-4 text-segundo">
        <Icon className="text-xl" />
        <p className="text-lg">{label}</p>
      </div>

      <div
        className={`flex items-center gap-2 text-base ${activo ? "text-green-800" : "text-segundo/50"}`}
      >
        {activo ? <FaCheck /> : <FaMinus />}
        <p>{activo ? "Activo" : "Inactivo"}</p>
      </div>
    </div>
  );
}

export function ContactoCard({ propiedad }) {
  const router = useRouter();
  const { usuario } = useAppContext();
  const { editando, loading, draft, iniciar, cancelar, set, guardar } =
    useCardEdit(propiedad, ["how_to_contact", "telefono_contacto"]);
  const modo = editando
    ? (MODO_CONTACTO[draft?.how_to_contact] ?? MODO_CONTACTO.telefono_chat)
    : (MODO_CONTACTO[propiedad?.how_to_contact] ?? MODO_CONTACTO.telefono_chat);
  const telefono = editando
    ? (draft?.telefono_contacto ?? null)
    : (propiedad?.telefono_contacto ?? null);
  // Email de la cuenta: solo visible, se gestiona en Acceso y seguridad.
  const email = usuario?.email ?? null;

  return (
    <DetalleCard
      title="Forma de contacto"
      action={
        editando ? (
          <div className="flex items-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => guardar()}
              disabled={loading}
              className="rounded-md bg-tercero px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-tercero/80 active:scale-[0.99] cursor-pointer select-none font-montserrat disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={cancelar}
              className="rounded-md bg-segundo px-6 py-2 text-sm md:text-base font-semibold text-primero hover:bg-segundo/80 active:scale-[0.99] cursor-pointer select-none font-montserrat"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <CardActionLink
            Icon={MdOutlineModeEdit}
            className="mt-8"
            onClick={iniciar}
          >
            Cambiar contacto
          </CardActionLink>
        )
      }
    >
      {editando ? (
        <div className="flex flex-col gap-3 mt-8 max-w-96">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-segundo/70">
              Cómo pueden contactarte
            </span>
            <select
              value={draft?.how_to_contact ?? "telefono_chat"}
              onChange={(e) => set("how_to_contact", e.target.value)}
              className={inputCls}
            >
              {CONTACT_PREFERENCES.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          {modo.telefono && (
            <label className="flex flex-col gap-1">
              <span className="text-sm text-segundo/70">
                Teléfono de contacto
              </span>
              <div className="flex flex-row items-center relative">
                <span className="p-2.5 border-r border-segundo/50 absolute text-segundo">
                  +57
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={draft?.telefono_contacto ?? ""}
                  onChange={(e) => set("telefono_contacto", e.target.value)}
                  placeholder="300 123 4567"
                  maxLength={15}
                  className={`${inputCls} pl-16`}
                />
              </div>
            </label>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-10 mt-8 flex-col">
          {modo.telefono && (
            <ContactRow
              Icon={BsTelephone}
              label={telefono ? `+57 ${telefono}` : "Sin teléfono configurado"}
              activo={!!telefono}
            />
          )}
          {modo.chat && (
            <ContactRow
              Icon={MdOutlineMarkUnreadChatAlt}
              label="Mensajes de chat"
              activo
            />
          )}
          <div className="w-full">
            <ContactRow
              Icon={MdOutlineEmail}
              label={email || "Sin correo configurado"}
              activo={!!email}
            />
            <p className="text-sm text-segundo/60 mt-1">
              Solo visible.{" "}
              <button
                type="button"
                onClick={() => {
                  router.push("/usuario/tus-datos/acceso");
                  irArriba();
                }}
                className="text-decimo font-semibold hover:underline cursor-pointer select-none"
              >
                Se cambia en Acceso y seguridad
              </button>
            </p>
          </div>
          {!modo.telefono && !modo.chat && (
            <p className="text-lg text-segundo/60">
              Sin forma de contacto configurada.
            </p>
          )}
        </div>
      )}
    </DetalleCard>
  );
}

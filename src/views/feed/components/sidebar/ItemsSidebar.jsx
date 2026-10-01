import { items_sidebar, items_admin } from "@/data/items_sidebar";
import { useAppContext } from "@/context/AppContext.js";
import { SidebarItemRow } from "./SidebarItemRow";

const ItemsSidebar = ({ itemSelect, setItemSelect }) => {
  const { usuario } = useAppContext();

  return (
    <div className="p-2.5">
      {items_sidebar.map((item, i) => (
        <SidebarItemRow
          key={i}
          item={item}
          selected={itemSelect === item.label}
          onSelect={setItemSelect}
        />
      ))}

      {usuario.rol === "superadmin" &&
        items_admin.map((item, i) => (
          <SidebarItemRow
            key={i}
            item={item}
            selected={itemSelect === item.label}
            onSelect={setItemSelect}
          />
        ))}
    </div>
  );
};

export default ItemsSidebar;

import { items_sidebar } from "@/data/items_sidebar";
import { SidebarItemRow } from "./SidebarItemRow";

const ItemsSidebar = ({ itemSelect, setItemSelect }) => {
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
    </div>
  );
};

export default ItemsSidebar;

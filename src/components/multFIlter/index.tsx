import { useState } from "react";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons } from "@expo/vector-icons";

interface Item {
  name: string;
  id: number;
  children?: Item[];
}

interface SelectedItem {
  id: number;
  name: string;
  parentName?: string;
}

type MultFilterProps = {
  items: Item[];
};

export default function MultFilter({ items }: MultFilterProps) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const onSelectedItemsChange = (selectedIds: number[]) => {
    const newSelectedItems = items
      .flatMap((item) => item.children || []) // transforma a lista de itens em uma lista de filhos
      .filter((child) => {
        const isChildSelected = selectedIds.includes(child.id);
        return isChildSelected;
      })
      .map((child) => ({
        id: child.id,
        name: child.name,
        parentName: items.find((item) => item.children?.includes(child))?.name,
      }));

    setSelectedItems(newSelectedItems);
    console.log("New selected items:", newSelectedItems);
  };

  return (
    <SectionedMultiSelect
      items={items}
      uniqueKey="id"
      subKey="children"
      selectText="Escolha alguns..."
      showDropDowns={true}
      readOnlyHeadings={true}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems.map((item) => item.id)}
      IconRenderer={MaterialIcons}
      confirmText="OK"
      removeAllText="Limpar"
      showRemoveAll={true}
      selectToggleIconComponent={<MaterialIcons name="filter-list" />}
      styles={{
        confirmText: { color: "#ffffff" },
        button: { backgroundColor: "#3cb8db" },
        selectedItem: {
          backgroundColor: "#e1f0f4",
          borderColor: "#e1f0f4",
        },
        selectToggle: {
          borderColor: "#e1f0f4",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          width: "100%",
          backgroundColor: "#e1f0f4",
        },
      }}
    />
  );
}

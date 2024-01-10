import { useEffect, useState } from "react";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  handleFilter:()=>void;
};

export default function MultFilter({ items, handleFilter }: MultFilterProps) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('newSelectedItems').then((value) => {
        if (value !== null) {
          const newSelectedItems = JSON.parse(value);
          setSelectedItems(newSelectedItems);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const onSelectedItemsChange = async (selectedIds: number[]) => {
    const newSelectedItems = items
      .flatMap((item) => item.children || [])
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
    try {
      await AsyncStorage.setItem('newSelectedItems', JSON.stringify(newSelectedItems)).then(() => handleFilter());
    } catch (error) {
      console.error(error);
    }
    
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

import { ApiQuery } from "../api/type";

interface SelectedItem {
  id: number;
  name: string;
  parentName: keyof ApiQuery;
}

export const filterData = (DATA: ApiQuery[], selectedItems: SelectedItem[]): ApiQuery[] => {
    return DATA.filter((item: ApiQuery) => {
      return selectedItems.some((selectedItem: SelectedItem) => {
        return String(item[selectedItem.parentName]).trim().toLowerCase() === selectedItem.name.trim().toLowerCase();
      });
    });
  };

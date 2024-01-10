import { ApiQuery } from "../api/type";

interface Item {
    [key: string]: string | number;
}
interface SelectedItem {
    id: number;
    name: string;
    parentName: keyof ApiQuery;
  }

export const filterData = (DATA: ApiQuery[], selectedItems: SelectedItem[]): ApiQuery[] => {
    // Agrupar itens selecionados por parentName
    const groupedSelectedItems: {[key: string]: string[]} = {};
    selectedItems.forEach(item => {
        if (!groupedSelectedItems[item.parentName]) {
            groupedSelectedItems[item.parentName] = [];
        }
        groupedSelectedItems[item.parentName].push(item.name);
    });

    // Filtrar dados
    return DATA.filter(item => {
        return Object.keys(groupedSelectedItems).every(parentName => {
            return groupedSelectedItems[parentName].includes(item[parentName] as string);
        });
    });
}

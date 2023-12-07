import { ApiQuery } from "../api/type";

interface Config {
  [key: string]: boolean;
}
interface Item {
  name: string;
  id: number;
  children?: Item[];
}

export function generateArray(apiQuery: ApiQuery[], config: Config): Item[] {
  let idCounter = 1;

  // Função auxiliar para criar um item filho
  const createChild = (value: string): Item => ({
    name: value,
    id: idCounter++,
  });

  // Função auxiliar para criar um item pai
  const createParent = (fieldName: string, children: Item[]): Item => ({
    name: fieldName,
    id: idCounter++,
    children,
  });

  return Object.keys(apiQuery[0])
    .filter((fieldName) => config[fieldName])
    .map((fieldName) => {
      const uniqueValues = Array.from(
        new Set(apiQuery.map((item) => item[fieldName]))
      );
      return createParent(fieldName, uniqueValues.map(createChild));
    });
}

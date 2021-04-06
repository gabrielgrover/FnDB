import { StoreKeys, getItem, setItem } from "../Store";

interface Schema {
  tableName: string;
}

export function Schema<T extends Schema>(model: T) {
  return getItem(StoreKeys.TABLES)
    .then(tables => JSON.parse(tables || '[]'))
    // .then((tables: string[]) => tables.indexOf(model.tableName) > 0 ? )
} 
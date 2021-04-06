import { StoreKeys, getItem, setItem } from "../Store";

export function saveTable(tableName: string) {
  return getItem(StoreKeys.TABLES)
    .then(tables => JSON.parse(tables || '[]'))
    .then((tables: string[]) => {
      const tableExists = tables.some(t => t === tableName);

      if (tableExists) {
        return Promise.reject(new Error(`Table, ${tableName}, already exists`));
      }

      return setItem(StoreKeys.TABLES, JSON.stringify(tables.concat(tableName)));
    })
}
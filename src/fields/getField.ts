import { StoreKeys, getItem, setItem } from "../Store";

type GetFieldParam = {
  tableName: string;
  fieldName: string;
  id: string
};

export function getField(data: GetFieldParam) {
  const internalId = `${data.tableName}_${data.fieldName}_${data.id}`;

  return getItem(StoreKeys.TABLE_FIELDS)
    .then(parseTableFields)
    .then()
}

function parseTableFields(tableFields: string | null) {
  return JSON.parse(tableFields || "[]");
}

// function findId(id: string) {
//   return (storedFields)
// }
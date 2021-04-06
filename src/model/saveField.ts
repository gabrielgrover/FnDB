import { v4 as uuid } from "react-native-uuid";
import { StoreKeys, getItem, setItem } from "../Store";

type SaveFieldParam = {
  tableName: string;
  fieldName: string;
  data: any
};

export function saveField(data: SaveFieldParam) {
  const fieldId = uuid();
  const internalId = `${data.tableName}_${data.fieldName}_${fieldId}`;

  return getItem(StoreKeys.TABLE_FIELDS)
    .then(parseTableFields)
    .then(storeField({ ...data.data, internalId, tableName: data.tableName }))
    .then(() => fieldId as string);
}

function parseTableFields(tableFields: string | null) {
  return JSON.parse(tableFields || "[]");
}

function storeField<T extends { internalId: string, tableName: string; }>(field: T) {
  return (storedFields: T[]) => {
    const updatedFields = JSON.stringify([...storedFields, field]);

    return setItem(StoreKeys.TABLE_FIELDS, updatedFields);
  }
}
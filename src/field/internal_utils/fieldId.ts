import { v4 as uuid } from "react-native-uuid";

export function createFieldId(data: { tableName: string; fieldName: string }) {
  const id = uuid();

  return {
    internalId: `${data.tableName}_${data.fieldName}_${id}`,
    id: id.toString()
  };
}

export function getInternalId(data: { tableName: string; fieldName: string, id: string }) {
  return `${data.tableName}_${data.fieldName}_${data.id}`;
}
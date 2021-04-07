import { v4 as uuid } from "react-native-uuid";
import { setItem } from "../Store";

type NewFieldParam = {
  tableName: string;
  fieldName: string;
  data: any
};

export function newField(data: NewFieldParam) {
  const fieldId = uuid();
  const internalId = `${data.tableName}_${data.fieldName}_${fieldId}`;

  return setItem(internalId, JSON.stringify(data.data))
    .then(() => internalId)
}
import { createFieldId } from "./fieldId";
import { setItem } from "../../Store";

type NewFieldParam = {
  tableName: string;
  fieldName: string;
  data: any
};

export function newField(data: NewFieldParam) {
  if (data.data === null || data.data === undefined) {
    return Promise.reject(new Error("Data cannot be null or undefined."));
  }

  const { internalId, id } = createFieldId({
    tableName: data.tableName,
    fieldName: data.fieldName
  });

  return setItem(internalId, JSON.stringify(data.data))
    .then(() => ({
      internalId,
      id,
      data: data.data
    }));
}
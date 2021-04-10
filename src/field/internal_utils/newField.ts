import { createFieldId } from "./fieldId";
import { setItem } from "../../Store";

type NewFieldParam = {
  tableName: string;
  fieldName: string;
  data: any
};

export function newField(data: NewFieldParam) {
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
import { getInternalId } from "./fieldId";
import { setItem, getItem } from "../../Store";

type UpdateFieldParam = {
  tableName: string;
  fieldName: string;
  id: string;
  data: any
};

export function updateField(updateParam: UpdateFieldParam) {
  if (updateParam.data === null || updateParam.data === undefined) {
    return Promise.reject(new Error("Data cannot be null or undefined."));
  }

  const internalId = getInternalId({
    tableName: updateParam.tableName,
    fieldName: updateParam.fieldName,
    id: updateParam.id
  });

  return checkFieldExists(internalId)
    .then(saveItem(updateParam.data))
    .then(() => ({
      data: updateParam.data,
      id: updateParam.id,
      internalId
    }));
}

function checkFieldExists(internalId: string) {
  return getItem(internalId)
    .then(item => {
      if (item === null) {
        return Promise.reject(new Error(`field id, ${internalId} not found.`));
      }

      return internalId;
    });
}

function saveItem(data: any) {
  return (internalId: string) =>
    setItem(internalId, JSON.stringify(data));
}
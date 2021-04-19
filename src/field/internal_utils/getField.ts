import { getInternalId } from "./fieldId";
import { getItem } from "../../Store";

type GetFieldParam = {
  tableName: string;
  fieldName: string;
  id: string;
};

export function getField<T>(getFieldParam: GetFieldParam) {
  if (!getFieldParam.id) {
    return Promise.reject(new Error("Provided field id not found."));
  }

  const internalId = getInternalId(getFieldParam);

  return getItem(internalId)
    .then(checkDataExists(getFieldParam))
    .then(JSON.parse)
    .then(data => ({
      data: data as T,
      id: getFieldParam.id,
      internalId
    }));
}

function checkDataExists(getFieldParam: GetFieldParam) {
  return (data: string | null) => {
    if (!data) {
      const msg = `No field data found for\n{\n\ttableName: ${getFieldParam.tableName},\n\tfieldName: ${getFieldParam.fieldName},\n\tid: ${getFieldParam.id}\n}\n`;
      return Promise.reject(new Error(msg));
    }

    return Promise.resolve(data);
  }
}
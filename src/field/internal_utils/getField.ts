import { getInternalId } from "./fieldId";
import { getItem } from "../../Store";

type GetFieldParam = {
  tableName: string;
  fieldName: string;
  id: string;
};

export function getField<T>(getFieldParam: GetFieldParam) {
  const internalId = getInternalId(getFieldParam);

  return getItem(internalId)
    .then(parseData)
    .then(data => ({
      data: data as T,
      id: getFieldParam.id,
      internalId
    }));
}

function parseData(data: string | null) {
  return JSON.parse(data || "null");
}
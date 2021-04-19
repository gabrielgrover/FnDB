import { getInternalId } from "./docId";
import { getItem } from "../../Store";

type GetDocParam = { modelName: string, id: string };

/** This returns an object with field names as keys and field ids as values. */
export function getDoc(input: GetDocParam) {
  if (!input.id) {
    return Promise.reject(new Error("Provided model id not found."));
  }

  const internalId = getInternalId(input);

  return getItem(internalId)
    .then(checkDataExists(input))
    .then(parseData);
}

function checkDataExists(getDocParam: GetDocParam) {
  return (data: string | null) => {
    if (data === null) {
      const msg = `No model found for\n{\n\tmodelName: ${getDocParam.modelName},\n\tid: ${getDocParam.id}\n}\n`;
      return Promise.reject(new Error(msg));
    }

    return Promise.resolve(data);
  }
}

function parseData(data: string) {
  return JSON.parse(data) as Record<string, string>;
}
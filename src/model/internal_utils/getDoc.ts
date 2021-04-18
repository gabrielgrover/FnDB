import { getInternalId } from "./docId";
import { getItem } from "../../Store";

/** This returns an object with keys as field names and values of the field ids. */
export function getDoc(input: { modelName: string, id: string }) {
  const internalId = getInternalId(input);

  return getItem(internalId)
    .then(parseData);
}

function parseData(data: string | null) {
  return JSON.parse(data || "null") as Record<string, string>;
}
import { getInternalId } from "./docId";
import { getItem } from "../../Store";

/** This returns an object with field names as keys and field ids as values. */
export function getDoc(input: { modelName: string, id: string }) {
  const internalId = getInternalId(input);

  return getItem(internalId)
    .then(parseData);
}

function parseData(data: string | null) {
  return JSON.parse(data || "null") as Record<string, string>;
}
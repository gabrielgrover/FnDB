import { createDocId } from "./docId";
import { setItem } from "../../Store";

export function newDoc(modelName: string, fieldIdRecord: Record<string, string>) {
  if (!modelName) {
    return Promise.reject(new Error("Model names cannot be empty."));
  }

  const ids = Object.values(fieldIdRecord);

  if (!ids.length) {
    return Promise.reject(new Error("A new document must have fields."));
  }

  if (ids.filter(i => i).length !== ids.length) {
    return Promise.reject(new Error("Field ids cannot be empty."));
  }

  const { id, internalId } = createDocId(modelName);

  return setItem(internalId, JSON.stringify(fieldIdRecord))
    .then(() => ({
      id,
      internalId
    }));
}
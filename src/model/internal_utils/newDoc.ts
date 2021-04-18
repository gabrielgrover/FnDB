import { createDocId } from "./docId";
import { setItem } from "../../Store";

export function newDoc(modelName: string, fieldIdRecord: Record<string, string>) {
  const { id, internalId } = createDocId(modelName);

  return setItem(internalId, JSON.stringify(fieldIdRecord))
    .then(() => ({
      id,
      internalId
    }));
}
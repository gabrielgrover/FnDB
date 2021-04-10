import { setItem } from "../../Store";

type UpdateFieldParam = {
  internalId: string;
  data: any
};

export function updateField(updateParam: UpdateFieldParam) {

  return setItem(updateParam.internalId, JSON.stringify(updateParam.data))
    .then(() => updateParam);
}
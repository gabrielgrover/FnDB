import { v4 as uuid } from "react-native-uuid";

export function createDocId(modelName: string) {
  const id = uuid().toString();

  return {
    internalId: getInternalId({
      modelName,
      id
    }),
    id
  };
}

export function getInternalId(input: {
  id: string;
  modelName: string;
}) {
  return `${input.modelName}_${input.id}`;
}
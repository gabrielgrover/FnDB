import { saveField } from "./saveField";

interface ModelField {
  name: string;
  type: "string" | "number" | "boolean";
}

interface SaveModelParam {
  modelName: string;
  fields:  ModelField[];
}

export function saveModel(input: SaveModelParam) {
  const savedFields = input.fields.map(f => {
  
  });
}
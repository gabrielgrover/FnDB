// import { CreateFieldBuilder } from "./createField";
import { FieldMetaData } from "./createField";

// interface ModelField {
//   name: string;
//   type: "string" | "number" | "boolean";
// }

// interface CreateModelParam {
//   name: string;
//   fields: ModelField[];
// }

// type ModelDataType = string | number | boolean | Record<string, ModelDataType>

// type Builder = CreateFieldBuilder;
type Builder = FieldMetaData;

export enum SaveStatus {
  OK = "OK",
  ERROR = "ERROR"
}

export function createModel<Model extends { modelName: string }>(model: Model) {

  return {
    addFields: (...builders: Builder[]) => {
      if (builders.length === 0) {
        throw new Error("fields are required");
      }

      const builderManifest = builders.reduce((result, builder) => {
        result[builder.name] = builder;

        return result;
      }, {} as Record<Builder["name"], Builder>);

      for (const [key, val] of Object.entries(model)) {
        if (!builderManifest.hasOwnProperty(key) && key !== "modelName") {
          throw new Error(`field '${key}' is required.`);
        }
      }

      return {
        save: (input: Omit<Model, "modelName">) => {
          const fieldIds = Object.entries(input)
            .map(([key, val]) => {
              const fieldMetaData = builderManifest[key];

              if (fieldMetaData.__fieldType === "string" && typeof val === "string") {
                const save = fieldMetaData.createSave(model.modelName);

                return save(val);
              }

              if (fieldMetaData.__fieldType === "boolean" && typeof val === "boolean") {
                const save = fieldMetaData.createSave(model.modelName);

                return save(val);
              }

              if (fieldMetaData.__fieldType === "number" && typeof val === "number") {
                const save = fieldMetaData.createSave(model.modelName);

                return save(val);
              }

              throw new Error("");
            });

          return Promise.all(fieldIds);
        }
      };
    }
  }
}
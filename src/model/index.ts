import { newDoc as _newDoc, getDoc as _getDoc } from "./internal_utils";
import { Field, FieldMetaData } from "../field";

// type DictionaryConstructor = () => Record<string, number | string | boolean>;

type ModelFieldType = StringConstructor | NumberConstructor | BooleanConstructor //| DictionaryConstructor;

type Model = Record<string, ModelFieldType>;

export function createModel<T extends Model>(modelName: string, modelParam: T) {

  const fieldMetaData = Object.entries(modelParam)
    .reduce((result, [fieldName, type]: [keyof T, ModelFieldType]) => {
      result[fieldName] = getFieldConstructor(type)(fieldName as string);

      return result;
    }, {} as { [key in keyof T]: FieldMetaData });

  async function getDoc(id: string) {
    try {
      const fieldIdRecord = await _getDoc({ modelName, id });
      const fieldData = await Promise.all(
        Object.entries(fieldIdRecord)
          .map(([fieldName, fieldId]) => {
            const getFieldFn = fieldMetaData[fieldName].createGetFn(modelName) as (id: string) => Promise<any>;

            return getFieldFn(fieldId).then((data) => ({
              ...data,
              fieldName
            }));
          })
      );

      return fieldData.reduce((result, field) => {
        result[field.fieldName] = field.data;

        return result;
      }, {}) as { [key in keyof T]: ReturnType<T[key]> };
    } catch (err) {
      return Promise.reject(err);
    }
  };

  async function newDoc(input: { [key in keyof T]: ReturnType<T[key]> }) {
    try {
      const fieldIdRecord = await Promise.all(
        Object.entries(input)
          .map(([fieldName, fieldData]) => {
            const saveFieldFn = fieldMetaData[fieldName].createSaveFn(modelName);

            return saveFieldFn(fieldData as never)
              .then((f: any) => ({ ...f, fieldName })) as Promise<any>;
          })
      ).then((fields) => {
        return fields.reduce((result, field) => {
          result[field.fieldName] = field.id;

          return result;
        }, {} as Record<string, string>);
      });

      const { id } = await _newDoc(modelName, fieldIdRecord);

      return id;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  async function updateDoc(
    id: string,
    updates: Partial<{ [key in keyof T]: ReturnType<T[key]> }>
  ) {
    try {
      const fieldIdRecord = await _getDoc({ modelName, id });

      await Promise.all(
        Object.entries(updates)
          .map(([updatedFieldName, updatedFieldData]) => {
            const updateFieldFn = fieldMetaData[updatedFieldName].createUpdateFn(modelName);
            const fieldId = fieldIdRecord[updatedFieldName];

            return updateFieldFn(fieldId, updatedFieldData as never) as any;
          })
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return {
    modelName,
    getDoc,
    newDoc,
    updateDoc
  };
}

function getFieldConstructor(type: ModelFieldType) {
  switch (typeof type()) {
    case "boolean":
      return Field.createBooleanField;
    case "number":
      return Field.createNumberField;
    case "string":
      return Field.createStringField;
    default:
      throw new Error(`Field type, ${type} not found.`);
  }
}
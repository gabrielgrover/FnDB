import { saveField } from "./saveField";

// type CreateFieldFn = typeof createBooleanField | typeof createNumberField | typeof createStringField;0

// export type CreateFieldBuilder = ReturnType<CreateFieldFn>;

// type FieldType = "string" | "number" | "boolean";

export type FieldMetaData = 
  | StringFieldMetaData
  | BooleanFieldMetaData
  | NumberFieldMetaData;


type StringFieldMetaData = {
  name: string;
  __fieldType: "string",
  // saveStringField: (tableName: string) => (data: string) => Promise<string>;
  createSave: (tableName: string) => (data: string) => Promise<string>;
}
export function createStringField(name: string): StringFieldMetaData {
  return {
    name,
    // save: createField<string>(name),
    __fieldType: "string",
    // __dataType: String
    // saveStringField: createField<string>(name)
    createSave: createField<string>(name)
  };
}

type BooleanFieldMetaData = {
  name: string;
  __fieldType: "boolean",
  // saveBooleanField: (tableName: string) => (data: boolean) => Promise<string>;
  createSave: (tableName: string) => (data: boolean) => Promise<string>;
}
export function createBooleanField(name: string): BooleanFieldMetaData {
  return {
    name,
    // save: createField<boolean>(name),
    __fieldType: "boolean",
    // __dataType: Boolean
    // saveBooleanField: createField<boolean>(name)
    createSave: createField<boolean>(name)
  };
}

type NumberFieldMetaData = {
  name: string;
  __fieldType: "number",
  // saveNumberField: (tableName: string) => (data: number) => Promise<string>;
  createSave: (tableName: string) => (data: number) => Promise<string>;
}
export function createNumberField(name: string): NumberFieldMetaData {
  return {
    name,
    // save: createField<number>(name),
    __fieldType: "number",
    // __dataType: Number
    // saveNumberField: createField<number>(name)
    createSave: createField<number>(name)
  };
}

function createField<T>(fieldName: string) {
  return (tableName: string) =>
    (data: T) =>
      saveField({
        tableName,
        fieldName,
        data
      });
}
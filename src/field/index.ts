import { newField } from "./internal_utils/newField";
import { updateField } from "./internal_utils/updateField";
import { getField } from "./internal_utils/getField";

export type FieldMetaData = 
  | StringFieldMetaData
  | BooleanFieldMetaData
  | NumberFieldMetaData;

export const Field = {
  createStringField,
  createBooleanField,
  createNumberField
};

type StringFieldMetaData = {
  name: string;
  __fieldType: "string",
  createSaveFn: (tableName: string) => (data: string) => Promise<{
    internalId: string;
    id: string;
    data: string;
  }>;
  createUpdateFn: (tableName: string) => (id: string, data: string) => Promise<{
    data: string;
    id: string;
    internalId: string;
  }>;
  createGetFn: (tableName: string) => (id: string) => Promise<{
    data: string;
    id: string;
    internalId: string;
  }>;
}
function createStringField(name: string): StringFieldMetaData {
  return {
    name,
    __fieldType: "string",
    createSaveFn: createSaveFn<string>(name),
    createUpdateFn: createUpdateFn<string>(name),
    createGetFn: createGetFn<string>(name)
  };
}

type BooleanFieldMetaData = {
  name: string;
  __fieldType: "boolean",
  createSaveFn: (tableName: string) => (data: boolean) => Promise<{
    internalId: string;
    id: string;
    data: boolean;
  }>;
  createUpdateFn: (tableName: string) => (id: string, data: boolean) => Promise<{
    data: boolean;
    id: string;
    internalId: string;
  }>;
  createGetFn: (tableName: string) => (id: string) => Promise<{
    data: boolean;
    id: string;
    internalId: string;
  }>;
}
function createBooleanField(name: string): BooleanFieldMetaData {
  return {
    name,
    __fieldType: "boolean",
    createSaveFn: createSaveFn<boolean>(name),
    createUpdateFn: createUpdateFn<boolean>(name),
    createGetFn: createGetFn<boolean>(name)
  };
}

type NumberFieldMetaData = {
  name: string;
  __fieldType: "number",
  createSaveFn: (tableName: string) => (data: number) => Promise<{
    internalId: string;
    id: string;
    data: number;
  }>;
  createUpdateFn: (tableName: string) => (id: string, data: number) => Promise<{
    data: number;
    id: string;
    internalId: string;
  }>;
  createGetFn: (tableName: string) => (id: string) => Promise<{
    data: number;
    id: string;
    internalId: string;
  }>;
}
function createNumberField(name: string): NumberFieldMetaData {
  return {
    name,
    __fieldType: "number",
    createSaveFn: createSaveFn<number>(name),
    createUpdateFn: createUpdateFn<number>(name),
    createGetFn: createGetFn<number>(name)
  };
}

function createSaveFn<T>(fieldName: string) {
  return (tableName: string) =>
    (data: T) =>
      newField({
        tableName,
        fieldName,
        data
      });
}

function createUpdateFn<T>(fieldName: string) {
  return (tableName: string) =>
    (id: string, data: T) =>
      updateField({
        tableName,
        fieldName,
        id,
        data
      });
}

function createGetFn<T>(fieldName: string) {
  return (tableName: string) =>
    (id: string) =>
      getField<T>({
        tableName,
        fieldName,
        id
      });
}
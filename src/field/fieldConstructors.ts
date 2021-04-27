
export const NumberField = Number;

export const StringField = String;

export const BooleanField = Boolean;

type PrimitiveField = typeof NumberField | typeof StringField | typeof BooleanField;

type ObjectFieldParam = Record<string, PrimitiveField>;

export const ObjectField = <T extends ObjectFieldParam>(object: T) => {
  return Object.entries(object)
    .reduce((result, [prop, val]) => {
      result[prop] = val();

      return result;
    }, {} as Record<string, ReturnType<PrimitiveField>>);
};
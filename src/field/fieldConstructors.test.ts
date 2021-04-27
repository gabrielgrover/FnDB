import { 
  NumberField, 
  StringField,
  BooleanField,
  ObjectField
} from "./fieldConstructors";

describe("NumberFieldConstructor", () => {
  it("should return 0", () => {
    expect(NumberField()).toBe(0);
  });
});

describe("StringFieldConstructor", () => {
  it("should return an empty string", () => {
    expect(StringField()).toBe("");
  });
});

describe("BooleanFieldConstructor", () => {
  it("should return false", () => {
    expect(BooleanField()).toBe(false);
  });
});

describe("ObjectFieldConstructor", () => {
  it("should return the given object with field defaults", () => {
    const objectField = ObjectField({
      name: StringField,
      age: NumberField,
      admin: BooleanField
    });

    const expected = expect.objectContaining({
      name: "",
      age: 0,
      admin: false
    });

    expect(objectField).toEqual(expected);
  });
});
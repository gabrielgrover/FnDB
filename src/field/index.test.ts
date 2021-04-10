import { Field } from "./";

describe("creating a string field", () => {
  it("should return field meta data", () => {
    const received = Field.createStringField("firstName");

    expect(received.__fieldType).toBe("string");
    expect(received.name).toBe("firstName");
    expect(typeof received.createSaveFn).toBe("function");
    expect(typeof received.createUpdateFn).toBe("function");
    expect(typeof received.createGetFn).toBe("function");
  });
});

describe("creating a number field", () => {
  it("should return field meta data", () => {
    const received = Field.createNumberField("age");

    expect(received.__fieldType).toBe("number");
    expect(received.name).toBe("age");
    expect(typeof received.createSaveFn).toBe("function");
    expect(typeof received.createUpdateFn).toBe("function");
    expect(typeof received.createGetFn).toBe("function");
  });
});

describe("creating a boolean field", () => {
  it("should return field meta data", () => {
    const received = Field.createBooleanField("admin");

    expect(received.__fieldType).toBe("boolean");
    expect(received.name).toBe("admin");
    expect(typeof received.createSaveFn).toBe("function");
    expect(typeof received.createUpdateFn).toBe("function");
    expect(typeof received.createGetFn).toBe("function");
  });
})
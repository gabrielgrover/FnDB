import { createModel, SaveStatus } from "./createModel";
import {
  createBooleanField,
  createNumberField,
  createStringField
} from "./createField";

type UserDoc = {
  admin: boolean;
  age: number;
  name: string;
  modelName: string;
};

describe("Model", () => {
  describe("createModel", () => {
    it("should create a model", () => {
      const User = createModel({
        admin: Boolean(),
        age: Number(),
        name: String(),
        modelName: "User"
      })
      expect(User).toBeDefined();
    });
  });

  describe("addFields", () => {
    it("should error out if not all fields are added", () => {
      const User = createModel({
        admin: Boolean(),
        age: Number(),
        name: String(),
        modelName: "User"
      });

      expect(() => User.addFields()).toThrowError(new Error("fields are required"))
      expect(() => User.addFields(
        createBooleanField("admin"),
        createNumberField("age"),
      )).toThrowError(new Error("field 'name' is required."));
    });

    it("should return save function", () => {
      const User = createModel({
        admin: Boolean(),
        age: Number(),
        name: String(),
        modelName: "User"
      }).addFields(
        createBooleanField("admin"),
        createNumberField("age"),
        createStringField("name")
      );

      expect(User.save).toBeDefined();
    });
  });

  describe("save", () => {
    it("should return created record", async () => {
      const User = createModel({
        admin: Boolean(),
        age: Number(),
        name: String(),
        modelName: "User"
      }).addFields(
        createBooleanField("admin"),
        createNumberField("age"),
        createStringField("name")
      );

      const savedUser = await User.save({
        admin: false,
        age: 11,
        name: "duder"
      });

      const expected = expect.objectContaining({
        id: expect.any(String),
        admin: false,
        age: 11,
        name: 'duder'
      })

      expect(savedUser).toMatchObject(expected);
    });
  });
});
import { newField } from "./newField";
import { getInternalId } from "./fieldId";
import { getItem } from "../../Store";

describe("newField", () => {
  it("should throw error if data is undefined or null", async () => {
    let err;
    let err2;
    try {
      await newField({
        tableName: "some_table",
        fieldName: "field01",
        data: null
      });
    } catch (e) {
      err = e;
    }

    try {
      await newField({
        tableName: "some_table",
        fieldName: "field01",
        data: undefined
      })
    } catch (e) {
      err2 = e 
    }

    expect(err.message).toBe("Data cannot be null or undefined.");
    expect(err2.message).toBe("Data cannot be null or undefined.");
  });

  it("should return id, internalId, and data", async () => {
    const { id, internalId, data } = await newField({
      tableName: "table",
      fieldName: "field",
      data: -1
    });

    const expectedInternalId = getInternalId({
      tableName: "table",
      fieldName: "field",
      id
    });

    expect(id).toEqual(expect.any(String));
    expect(internalId).toBe(expectedInternalId);
    expect(data).toBe(-1);
  });

  it("should save the data", async () => {
    const { internalId } = await newField({
      tableName: "table",
      fieldName: "field",
      data: -1
    });

    const rawItem = await getItem(internalId);
    const item = JSON.parse(rawItem || "{}");

    expect(item).toBe(-1);
  });
});
import { newField } from "./newField";
import { getInternalId } from "./fieldId";
import { getItem } from "../../Store";

describe("newField", () => {
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
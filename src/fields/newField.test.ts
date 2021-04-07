import { newField } from "./newField";
import { getItem } from "../Store";

describe("newField", () => {
  it("should return an internalId", async () => {
    const id = await newField({
      tableName: "table",
      fieldName: "field",
      data: -1
    });

    expect(id).toMatch("table_field_");
  });

  it("should save the data", async () => {
    const id = await newField({
      tableName: "table",
      fieldName: "field",
      data: -1
    });

    const rawItem = await getItem(id);
    const item = JSON.parse(rawItem || "{}");

    expect(item).toBe(-1);
  });
});
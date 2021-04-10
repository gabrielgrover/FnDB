import { getField } from "./getField";
import { newField } from "./newField";

describe("getItem", () => {
  it("should return the data in the field", async () => {
    const id = await newField({
      tableName: "User",
      fieldName: "age",
      data: 12
    });

    const data = await getField(id);

    expect(data).toBe(12);
  });
});
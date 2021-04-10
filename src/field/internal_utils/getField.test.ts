import { getField } from "./getField";
import { newField } from "./newField";

describe("getField", () => {
  let id: string;

  beforeEach(async () => {
    const { id: _id } = await newField({
      tableName: "User",
      fieldName: "phone",
      data: "111-111-0111"
    });

    id = _id;
  });

  it("should return the data in the field", async () => {
    const { data, id: receivedId, internalId: receivedInternalId } = await getField<string>({
      tableName: "User",
      fieldName: "phone",
      id
    });

    expect(data).toBe("111-111-0111");
    expect(receivedId).toBe(id);
    expect(receivedInternalId).toEqual(expect.any(String));
  });
});
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

  it("should reject with error if id is empty", async () => {
    let err;

    try {
      await getField<any>({
        tableName: "table",
        fieldName: "field",
        id: ""
      })
    } catch (e) {
      err = e;
    }

    expect(err.message).toBe("Provided field id not found.");
  });

  it("should reject with error if no field data was found", async () => {
    let err;
    try {
      await getField({
        tableName: "some_table",
        fieldName: "some_field",
        id: "some_id"
      });
    } catch (e) {
      err = e;  
    }

    expect(err.message)
      .toBe("No field data found for\n{\n\ttableName: some_table,\n\tfieldName: some_field,\n\tid: some_id\n}\n");
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
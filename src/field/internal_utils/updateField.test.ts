import { updateField } from "./updateField";
import { newField } from "./newField";
import { getInternalId } from "./fieldId";
import { getItem } from "../../Store";

describe("updateField", () => {
  let id: string;

  beforeEach(async () => {
    const { id: _id } = await newField({
      tableName: "User",
      fieldName: "age",
      data: 23
    });

    id = _id;
  });

  it("should reject with error if id is not found", async () => {
    let err;

    try {
      await updateField({
        tableName: "User",
        fieldName: "age",
        id: "123",
        data: "new data"
      });
    } catch (error) {
      err = error;
    }

    const expectedInternalId = getInternalId({
      tableName: "User",
      fieldName: "age",
      id: "123"
    });


    expect(err.message).toBe(`field id, ${expectedInternalId} not found.`);
  });

  it("should reject with error if data is undefined or null", async () => {
    let err1;
    let err2;
    try {
      await updateField({
        tableName: "User",
        fieldName: "age",
        id: "123",
        data: null
      })
    } catch (e) {
      err1 = e;  
    }

    try {
      await updateField({
        tableName: "User",
        fieldName: "age",
        id: "123",
        data: null
      })
    } catch (e) {
      err2 = e;  
    }

    expect(err1.message).toBe("Data cannot be null or undefined.");
    expect(err2.message).toBe("Data cannot be null or undefined.");
  });

  it("should return an id data tuple", async () => {
    const { data, id: receivedId } = await updateField({
      tableName: "User",
      fieldName: "age",
      id,
      data: 21
    });

    expect(data).toBe(21);
    expect(receivedId).toBe(id);
  });

  it("should save the new data", async () => {
    const { internalId } = await updateField({
      tableName: "User",
      fieldName: "age",
      id,
      data: 30
    });

    const receivedRawData = await getItem(internalId);
    const receivedData = JSON.parse(receivedRawData || "null");

    expect(receivedData).toBe(30);
  });
});
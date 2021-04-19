import { newDoc } from "./newDoc";
import { getInternalId } from "./docId";
import { getItem } from "../../Store";

describe("saveDoc", () => {
  it("should return id and internalId", async () => {
    const { id, internalId } = await newDoc("User", {
      name: "field_id_1",
      age: "field_id_2"
    });

    const expectedInternalId = getInternalId({
      modelName: "User",
      id,
    });

    expect(id).toEqual(expect.any(String));
    expect(internalId).toBe(expectedInternalId);
  });

  it("should reject with error if modelName is empty", async () => {
    let err;
    try {
      await newDoc("", {
        name: "id_1",
        age: "id_2"
      })
    } catch (e) {
      err = e 
    }

    expect(err.message).toBe("Model names cannot be empty.");
  });

  it("should reject with error if fieldIdRecord is empty or it's values are empty", async () => {
    let err1;
    let err2;
    try {
      await newDoc("User", {
        name: "",
        age: "id_2"
      })
    } catch (e) {
      err1 = e; 
    }

    try {
      await newDoc("User", {});
    } catch (e) {
      err2 = e;
    }

    expect(err1.message).toBe("Field ids cannot be empty.");
    expect(err2.message).toBe("A new document must have fields.");
  })

  it("should save the fieldIds", async () => {
    const { internalId } = await newDoc("User", {
      name: "field_id_1",
      age: "field_id_2"
    });

    const item = await getItem(internalId);
    const fieldIdRecord = JSON.parse(item || "null");

    expect(fieldIdRecord.name).toBe("field_id_1");
    expect(fieldIdRecord.age).toBe("field_id_2");
  });
});
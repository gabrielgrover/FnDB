import { getDoc } from "./getDoc";
import { newDoc } from "./newDoc";

describe("getDoc", () => {
  let id: string;

  beforeEach(async () => {
    const { id: _id } = await newDoc("User", {
      name: "field_id_1",
      age: "field_id_2"
    });

    id = _id;
  });

  it("should reject with an error if id is empty", async () => {
    let err;
    try {
      await getDoc({
        modelName: "User",
        id: ""
      });
    } catch (e) {
      err = e;  
    }

    expect(err.message).toBe("Provided model id not found.");
  });

  it("should reject with an error if doc is not found", async () => {
    let err;
    try {
      await getDoc({
        modelName: "User",
        id: "1234"
      })
    } catch (e) {
      err = e;    
    }

    expect(err.message).toBe("No model found for\n{\n\tmodelName: User,\n\tid: 1234\n}\n");
  });

  it("should return a field name to field id record", async () => {
    const fieldIdRecord = await getDoc({
      modelName: "User",
      id
    });

    expect(fieldIdRecord.name).toBe("field_id_1");
    expect(fieldIdRecord.age).toBe("field_id_2");
  });
});
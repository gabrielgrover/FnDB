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

  it("should return a field name to field id record", async () => {
    const fieldIdRecord = await getDoc({
      modelName: "User",
      id
    });

    expect(fieldIdRecord.name).toBe("field_id_1");
    expect(fieldIdRecord.age).toBe("field_id_2");
  });
});
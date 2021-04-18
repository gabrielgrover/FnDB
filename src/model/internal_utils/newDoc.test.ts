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
import { updateField } from "./updateField";
import { getItem, setItem } from "../Store";

describe("updateField", () => {
  beforeEach(async () => {
    await setItem("some internal id", JSON.stringify("some data"));
  });

  it("should return an id data tuple", async () => {
    const { data, internalId } = await updateField({
      internalId: "some internal id",
      data: "new data"
    });

    expect(data).toBe("new data");
    expect(internalId).toBe("some internal id");
  });

  it("should save the new data", async () => {
    await updateField({
      internalId: "some internal id",
      data: "new data"
    });

    const receivedRawData = await getItem("some internal id");
    const receivedData = JSON.parse(receivedRawData || "");

    expect(receivedData).toBe("new data");
  });
});
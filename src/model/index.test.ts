import { createModel } from ".";

describe("createModel", () => {
  it("create model with given name", () => {
    const User = createModel("User", {
      age: Number
    })

    expect(User.modelName).toBe("User");
  });

  it("should create a field meta data for each field given", () => {
    const User = createModel("User", {
      age: Number,
      sex: String
    });

    expect(User.newDoc).toBeTruthy();
    expect(User.updateDoc).toBeTruthy();
    expect(User.getDoc).toBeTruthy();
  });
});

describe("save new model doc", () => {
  it("should return the id of the new doc", async () => {
    const User = createModel("User", {
      age: Number,
      name: String,
      admin: Boolean,
    });

    const id = await User.newDoc({
      admin: true,
      name: "duder",
      age: 12
    });

    const expected = expect.any(String);

    expect(id).toEqual(expected);
  });
});

describe("get model by id", () => {
  const User = createModel("User", {
    age: Number,
    name: String,
    admin: Boolean
  });
  let id: string;

  beforeEach(async () => {
    id = await User.newDoc({
      admin: true,
      name: "duder",
      age: 1
    });
  });

  it("should return the model", async () => {
    const user = await User.getDoc(id);

    expect(user.name).toBe("duder");
    expect(user.admin).toBe(true);
    expect(user.age).toBe(1);
  });
});

describe("update model", () => {
  const User = createModel("User", {
    age: Number,
    name: String,
    admin: Boolean
  });
  let id: string;

  beforeEach(async () => {
    id = await User.newDoc({
      admin: true,
      name: "duder",
      age: 1
    });
  });

  it("should update the given model properties", async () => {
    await User.updateDoc(id, { admin: false, age: 2 });
    const updateUser = await User.getDoc(id);

    expect(updateUser.name).toBe("duder")
    expect(updateUser.admin).toBe(false);
    expect(updateUser.age).toBe(2);
  })
});
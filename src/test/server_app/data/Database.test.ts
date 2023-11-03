import { DataBase } from "../../../app/server_app/data/DataBase";

import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe("DataBase test suite", () => {
  let sut: DataBase<someTypeWithId>;

  const fakeId = "1234";

  const someObj1 = {
    id: "",
    name: "newName",
    color: "red",
  };

  const someObj2 = {
    id: "",
    name: "anotherName",
    color: "red",
  };

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after insert", async () => {
    const actual = await sut.insert({ id: "" } as any);
    expect(actual).toBe(fakeId);
  });

  it("should get element after insert", async () => {
    const id = await sut.insert(someObj1);
    const actual = await sut.getBy("id", id);
    expect(actual).toEqual(someObj1);
  });

  it("should find all elements with the same property", async () => {
    await sut.insert(someObj1);
    await sut.insert(someObj2);

    const expected = [someObj1, someObj2];

    const actual = await sut.findAllBy("color", "red");
    expect(actual).toEqual(expected);
  });

  it("should update the property color", async () => {
    const id = await sut.insert(someObj1);
    const expectedColor = "blue";

    await sut.update(id, "color", expectedColor);
    const updatedObject = await sut.getBy("id", id);

    const actualColor = updatedObject.color;

    expect(actualColor).toBe(expectedColor);
  });

  it("should delete the object", async () => {
    const id = await sut.insert(someObj1);
    await sut.delete(id);

    const actual = await sut.getBy("id", id);

    expect(actual).toBeUndefined();
  });

  it("should get all elements", async () => {
    await sut.insert(someObj1);
    await sut.insert(someObj2);

    const expected = [someObj1, someObj2];

    const actual = await sut.getAllElements();
    expect(actual).toEqual(expected);
  });
});

import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => ({
  DataBase: jest.fn().mockImplementation(() => {
    return {
      insert: insertMock,
      getBy: getByMock,
    };
  }),
}));

describe("UserCredentialsDataAccess test suite", () => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };

  const fakeId = "123";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add user and return accountId", async () => {
    insertMock.mockResolvedValueOnce(fakeId);

    const actualId = await sut.addUser(someAccount);
    expect(actualId).toBe(fakeId);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  });

  it("should return user with specific id", async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualAccount = await sut.getUserById(fakeId);
    expect(actualAccount).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith("id", fakeId);
  });

  it("should return user with specific userName", async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualAccount = await sut.getUserByUserName(someAccount.userName);
    expect(actualAccount).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith("userName", someAccount.userName);
  });
});

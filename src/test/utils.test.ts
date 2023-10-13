import { toUpperCase } from "../app/utils";

describe("Utils tests suite", () => {
  it("should return uppercase of valid string", () => {
    // arrange:
    const sut = toUpperCase;
    const expected = "ABC";

    //act:
    const actual = sut("abc");

    //assert
    expect(actual).toBe(expected);
  });
});

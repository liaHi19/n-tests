import { getStringInfo, toUpperCase } from "../app/utils";

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

  describe.only("ToUpperCase Example", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "my-string", expected: "MY-STRING" },
      { input: "bla", expected: "BLA" },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");

      expect(actual.characters).toHaveLength(9);
    });

    test("return lower case", () => {
      const actual = getStringInfo("My-String");

      expect(actual.lowerCase).toBe("my-string");
    });

    test("return upper case", () => {
      const actual = getStringInfo("My-String");

      expect(actual.upperCase).toBe("MY-STRING");
    });

    test("return right characters", () => {
      const actual = getStringInfo("My-String");

      expect(actual.characters).toHaveLength(9);
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);
      expect(actual.characters).toContain<string>("S");
      expect(actual.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i", "M", "y", "-"])
      );
    });

    test("return defined extra info", () => {
      const actual = getStringInfo("My-String");

      expect(actual.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      const actual = getStringInfo("My-String");

      //  use to Equal for objects
      expect(actual.extraInfo).toEqual({});
    });
  });
});

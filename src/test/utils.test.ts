import { toUpperCase } from "../app/utils";

describe("Utils tests suite", () => {
  test("should return uppercase", () => {
    const result = toUpperCase("abc");
    expect(result).toBe("ABC");
  });
});

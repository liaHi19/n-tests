jest.mock("../../app/doubles/other-utils", () => ({
  ...jest.requireActual("../../app/doubles/other-utils"),
  calculateComplexity: () => {
    return 10;
  },
}));

jest.mock("uuid", () => ({
  v4: () => "123",
}));

import * as otherUtils from "../../app/doubles/other-utils";

describe("module tests", () => {
  // mock calculate complexity
  it("calculate complexity", () => {
    const result = otherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });

  // requireActual
  it("other function should work", () => {
    const result = otherUtils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  // mock external library
  it("string with id", () => {
    const result = otherUtils.toLowerCaseWithId("aBC");
    expect(result).toBe("abc123");
  });
});

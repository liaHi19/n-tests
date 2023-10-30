import { calculateComplexity } from "../../app/doubles/other-utils";

describe("otherUtils test suite", () => {
  it("Calculate comlexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});

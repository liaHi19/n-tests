import {
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/other-utils";

describe("otherUtils test suite", () => {
  describe.only("Tracking callbacks", () => {
    let cbArg = [];
    let timesCalled = 0;

    function callbackMock(arg: string) {
      cbArg.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      //clearing tracking fields
      cbArg = [];
      timesCalled = 0;
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callbackMock);
      expect(actual).toBeUndefined();
      expect(cbArg).toContain("Invalid argument");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callbackMock);
      expect(actual).toBe("ABC");
      expect(cbArg).toContain(`call function with abc`);
      expect(timesCalled).toBe(1);
    });
  });
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

  it("ToUpperCase - calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", () => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });
});

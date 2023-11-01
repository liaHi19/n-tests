import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/other-utils";

describe.skip("otherUtils test suite", () => {
  describe("OtherStringUtils test with spies", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    it("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("abc");
      expect(toUpperCaseSpy).toBeCalledWith("abc");
    });

    it("Use a spy to track calls to other modules", () => {
      const logStringSpy = jest.spyOn(console, "log");
      sut.logString("abc");
      expect(logStringSpy).toBeCalledWith("abc");
    });

    it("Use a spy to replace implementation of a method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation");
      });
      sut.callExternalService();
    });
  });

  describe("Tracking callbacks with Jest mocks", () => {
    const callbackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callbackMock);
      expect(actual).toBeUndefined();
      expect(callbackMock).toBeCalledWith("Invalid argument");
      expect(callbackMock).toBeCalledTimes(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callbackMock);
      expect(actual).toBe("ABC");
      expect(callbackMock).toBeCalledWith(`call function with abc`);
      expect(callbackMock).toBeCalledTimes(1);
    });
  });

  describe("Tracking callbacks", () => {
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

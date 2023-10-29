import { PasswordChecker } from "../../app/password-checker/password-checker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("Password with less than 8 chars is invalid", () => {
    const actual = sut.checkPassword("123456");
    expect(actual).toBe(false);
  });

  it("Password with 8 chars and more is valid", () => {
    const actual = sut.checkPassword("12345678Aa");
    expect(actual).toBe(true);
  });

  it("Password with no uppercase is invalid", () => {
    const actual = sut.checkPassword("12345678");
    expect(actual).toBe(false);
  });
  it("Password with uppercase is valid", () => {
    const actual = sut.checkPassword("1234567Aa");
    expect(actual).toBe(true);
  });

  it("Password with no lowercase is invalid", () => {
    const actual = sut.checkPassword("12345678");
    expect(actual).toBe(false);
  });
  it("Password with lowercase is valid", () => {
    const actual = sut.checkPassword("1234567Aa");
    expect(actual).toBe(true);
  });
});

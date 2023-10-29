import {
  PasswordChecker,
  PasswordErrors,
} from "../../app/password-checker/password-checker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("Password with less than 8 chars is invalid", () => {
    const actual = sut.checkPassword("123456");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it("Password with 8 chars and more is valid", () => {
    const actual = sut.checkPassword("12345678Aa");
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it("Password with no uppercase is invalid", () => {
    const actual = sut.checkPassword("aaaa");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });
  it("Password with uppercase is valid", () => {
    const actual = sut.checkPassword("aaaA");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it("Password with no lowercase is invalid", () => {
    const actual = sut.checkPassword("1234");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });
  it("Password with lowercase is valid", () => {
    const actual = sut.checkPassword("1234567Aa");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it("Complex password is valid", () => {
    const actual = sut.checkPassword("ADVc1234");
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });

  it("Admin password without numbers is invalid", () => {
    const actual = sut.checkAdminPassword("ADVcddcd");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
  });

  it("Admin password with numbers is valid", () => {
    const actual = sut.checkAdminPassword("ADVcddcd123");
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});

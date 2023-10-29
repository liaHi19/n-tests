export enum PasswordErrors {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter is required!",
  NO_LOWER_CASE = "Lower case letter is required!",
  NO_NUMBER = "At least one number is required!",
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];

    this.checkForLength(password, reasons);
    this.checkForLowerCase(password, reasons);
    this.checkForUpperCase(password, reasons);

    if (password === password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }

    return {
      valid: reasons.length > 0 ? false : true,
      reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password);
    this.checkForNumber(password, basicCheck.reasons);

    return {
      valid: basicCheck.reasons.length > 0 ? false : true,
      reasons: basicCheck.reasons,
    };
  }

  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }

  private checkForUpperCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
  }

  private checkForNumber(password: string, reasons: PasswordErrors[]) {
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }
}

import { v4 } from "uuid";

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallback = (arg: string) => void;

export const calculateComplexity = (stringInfo: stringInfo): number => {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
};

export const toUpperCaseWithCb = (
  arg: string,
  callback: LoggerServiceCallback
) => {
  if (!arg) {
    callback("Invalid argument");
    return;
  }
  callback(`call function with ${arg}`);

  return arg.toUpperCase();
};

// for spies
export class OtherStringUtils {
  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }

  public callExternalService() {
    console.log("External service");
  }
}

// testing modules

export const toUpperCase = (arg: string) => {
  return arg.toUpperCase();
};

export const toLowerCaseWithId = (arg: string) => {
  return arg.toLowerCase() + v4();
};

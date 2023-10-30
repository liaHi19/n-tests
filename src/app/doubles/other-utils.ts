export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export const calculateComplexity = (stringInfo: stringInfo): number => {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
};

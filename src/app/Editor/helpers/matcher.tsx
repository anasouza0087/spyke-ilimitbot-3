import {
  STRING_WITH_QUOTES_REGEX,
  ONLY_DIGITS_REGEX,
  DECIMAL_NUMBER_REGEX,
  KEY_VALUE_PAIR_REGEX,
} from "./constants";

const parseValue = (value: string): any => {
  value = value.trim();

  if (STRING_WITH_QUOTES_REGEX.test(value)) {
    return value.slice(1, -1);
  }

  if (value === "true") return true;
  if (value === "false") return false;

  if (ONLY_DIGITS_REGEX.test(value)) return Number(value);
  if (DECIMAL_NUMBER_REGEX.test(value)) return parseFloat(value);

  try {
    const jsonValue = JSON.parse(value);
    if (typeof jsonValue === "object") return jsonValue;
  } catch (e) {}

  return value;
};

export const extractKeyValue = (input: string): [string, any] | [] => {
  const match = input.match(KEY_VALUE_PAIR_REGEX);

  if (match) {
    const key = match[1];
    const value = parseValue(match[2]);
    return [key, value];
  } else {
    return [];
  }
};

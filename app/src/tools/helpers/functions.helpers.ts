import {repeat} from 'lodash';

/**
 * pad the start of any string with a certain sequence of characters
 * @param str
 * @param targetLength
 * @param padString
 */
export const padStart = (
  str: string | number,
  targetLength: number,
  padString: string,
) => {
  if (!padString) {
    padString = ' ';
  }

  str = String(str);

  if (str.length > targetLength) {
    return String(str);
  }

  targetLength = targetLength - str.length;

  if (targetLength > padString.length) {
    padString += repeat(padString, targetLength / padString.length);
  }

  return padString.slice(0, targetLength) + String(str);
};

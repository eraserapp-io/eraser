import {ColorScheme, GetColorProps, TextTypes} from '@types';
import {Fonts} from 'tools';
import {darkColors, lightColors} from 'state';

/**
 * Given a text type, return the relevant size
 * @param type the type of text
 */
export const getFontSize = (type: TextTypes | undefined): number => {
  switch (type) {
    case TextTypes.TEXT:
      return 16;
    case TextTypes.BOLD:
      return 16;
    case TextTypes.DESC:
      return 14;
    case TextTypes.HEADER:
      return 28;
    case TextTypes.LABEL:
      return 12;
    case TextTypes.SUBHEADER:
      return 24;
    default:
      return 14;
  }
};

/**
 * Given a type and a color scheme return the correct color
 * @param type the type of text
 * @param isDarkMode
 * @param invertColor
 * @param forceWhiteText
 */
export const getColor = ({
  type,
  isDarkMode,
  invertColor,
  forceWhiteText,
}: GetColorProps): string => {
  if (forceWhiteText) {
    return '#fff';
  }

  let color: ColorScheme = isDarkMode
    ? invertColor
      ? lightColors
      : darkColors
    : invertColor
    ? darkColors
    : lightColors;

  switch (type) {
    case TextTypes.TEXT:
      return color?.text;
    case TextTypes.HEADER:
      return color?.title;
    case TextTypes.SUBHEADER:
      return color?.title;
    case TextTypes.BOLD:
      return color?.text;
    case TextTypes.DESC:
      return color?.subtitle;
    case TextTypes.LABEL:
      return color?.label;
    default:
      return color?.text;
  }
};

/**
 * Given a type, return the font family
 * @param type the type of text
 */
export const getFontFamily = (type: TextTypes): string => {
  switch (type) {
    case TextTypes.HEADER:
    case TextTypes.BOLD:
      return Fonts.title;
    case TextTypes.DESC:
    case TextTypes.TEXT:
      return Fonts.text;
    case TextTypes.LABEL:
      return Fonts.label;
    case TextTypes.SUBHEADER:
      return Fonts.title;
    default:
      return Fonts.text;
  }
};

/**
 * Hex to rgba converter
 */

const removeHash = (hex: string) =>
  hex.charAt(0) === '#' ? hex.slice(1) : hex;

const parseHex = (nakedHex: string) => {
  const isShort = nakedHex.length === 3 || nakedHex.length === 4;

  const twoDigitHexR = isShort
    ? `${nakedHex.slice(0, 1)}${nakedHex.slice(0, 1)}`
    : nakedHex.slice(0, 2);
  const twoDigitHexG = isShort
    ? `${nakedHex.slice(1, 2)}${nakedHex.slice(1, 2)}`
    : nakedHex.slice(2, 4);
  const twoDigitHexB = isShort
    ? `${nakedHex.slice(2, 3)}${nakedHex.slice(2, 3)}`
    : nakedHex.slice(4, 6);
  const twoDigitHexA =
    (isShort
      ? `${nakedHex.slice(3, 4)}${nakedHex.slice(3, 4)}`
      : nakedHex.slice(6, 8)) || 'ff';

  return {
    r: twoDigitHexR,
    g: twoDigitHexG,
    b: twoDigitHexB,
    a: twoDigitHexA,
  };
};

const hexToDecimal = (hex: string) => parseInt(hex, 16);

const hexesToDecimals = ({
  r,
  g,
  b,
  a,
}: {
  r: string;
  g: string;
  b: string;
  a: string;
}) => ({
  r: hexToDecimal(r),
  g: hexToDecimal(g),
  b: hexToDecimal(b),
  a: +(hexToDecimal(a) / 255).toFixed(2),
});

const isNumeric = (n: any) => !isNaN(parseFloat(n)) && isFinite(n);

const formatRgb = (
  decimalObject: {
    r: number;
    g: number;
    b: number;
    a: number;
  },
  parameterA: any,
) => {
  const {r, g, b, a: parsedA} = decimalObject;
  const a = isNumeric(parameterA) ? parameterA : parsedA;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Turns an old-fashioned css hex color value into a rgb color value.
 *
 * If you specify an alpha value, you'll get a rgba() value instead.
 *
 * @return An rgb or rgba value. ('rgb(11, 22, 33)'. 'rgba(11, 22, 33, 0.5)')
 * @param hex
 * @param a
 */
export const hexToRgba = (hex: string, a: number) => {
  const hashlessHex = removeHash(hex);
  const hexObject = parseHex(hashlessHex);
  const decimalObject = hexesToDecimals(hexObject);

  return formatRgb(decimalObject, a);
};

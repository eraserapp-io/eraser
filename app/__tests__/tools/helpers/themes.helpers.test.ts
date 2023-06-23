/**
 * Test the implementation of helper functions
 */

import {getColor, getFontFamily, getFontSize} from '@tools';
import {TextTypes} from '@types';
import {darkColors, lightColors} from 'state';

describe('Test getColor works', () => {
  it('successfully gets color', async () => {
    expect(
      getColor({
        type: TextTypes.TEXT,
        isDarkMode: false,
      }),
    ).toStrictEqual('#333');

    expect(
      getColor({
        type: TextTypes.TEXT,
        isDarkMode: true,
      }),
    ).toStrictEqual('#fbfbfb');

    expect(
      getColor({
        type: TextTypes.HEADER,
        isDarkMode: false,
      }),
    ).toStrictEqual('#121212');
  });

  it('Successfully changes theme when prompted with invertColor', () => {
    expect(
      getColor({
        type: TextTypes.TEXT,
        isDarkMode: true,
        invertColor: true,
      }),
    ).toStrictEqual('#333');

    expect(
      getColor({
        type: TextTypes.TEXT,
        isDarkMode: false,
        invertColor: true,
      }),
    ).toStrictEqual('#fbfbfb');

    expect(
      getColor({
        type: TextTypes.TEXT,
        isDarkMode: true,
        invertColor: false,
      }),
    ).toStrictEqual('#fbfbfb');

    expect(
      getColor({
        type: TextTypes.HEADER,
        isDarkMode: true,
        invertColor: false,
      }),
    ).toStrictEqual('#fff');
  });

  it('Successfully forces white text', () => {
    expect(
      getColor({
        type: TextTypes.TEXT,
        isDarkMode: false,
        forceWhiteText: true,
      }),
    ).toStrictEqual('#fff');

    expect(
      getColor({
        type: TextTypes.HEADER,
        isDarkMode: false,
        forceWhiteText: true,
      }),
    ).toStrictEqual('#fff');

    expect(
      getColor({
        type: TextTypes.LABEL,
        isDarkMode: true,
        forceWhiteText: true,
      }),
    ).toStrictEqual('#fff');
  });

  it('Overrides everything when forcing white text', () => {
    expect(
      getColor({
        type: TextTypes.TEXT,
        isDarkMode: true,
        invertColor: true,
        forceWhiteText: true,
      }),
    ).toStrictEqual('#fff');

    expect(
      getColor({
        type: TextTypes.HEADER,
        isDarkMode: false,
        forceWhiteText: true,
      }),
    ).toStrictEqual('#fff');

    expect(
      getColor({
        type: TextTypes.LABEL,
        invertColor: false,
        isDarkMode: false,
        forceWhiteText: true,
      }),
    ).toStrictEqual('#fff');
  });
});

describe('Test getFontSize works', () => {
  it('successfully gets font size', async () => {
    expect(getFontSize(TextTypes.HEADER)).toStrictEqual(32);
    expect(getFontSize(TextTypes.TEXT)).toStrictEqual(16);
    expect(getFontSize(TextTypes.BOLD)).toStrictEqual(16);
    expect(getFontSize(TextTypes.LABEL)).toStrictEqual(12);
  });
});

describe('Test getFontFamily works', () => {
  it('successfully gets font size', async () => {
    expect(getFontFamily(TextTypes.HEADER)).toStrictEqual('Nunito-Bold');
    expect(getFontFamily(TextTypes.TEXT)).toStrictEqual('Nunito-Regular');
    expect(getFontFamily(TextTypes.BOLD)).toStrictEqual('Nunito-Bold');
    expect(getFontFamily(TextTypes.LABEL)).toStrictEqual('Nunito-Light');
  });
});

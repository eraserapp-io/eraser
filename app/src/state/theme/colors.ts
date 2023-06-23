import {ColorScheme} from '@types';

import * as colors from '../../../assets/colors/colors.json';

export const lightColors: ColorScheme = {
  primary: colors['color-primary-500'],
  secondary: colors['color-primary-700'],
  info: colors['color-info-500'],
  success: colors['color-success-500'],
  warning: colors['color-warning-500'],
  danger: colors['color-danger-500'],
  text: '#333',
  subtitle: '#52616B',
  title: '#121212',
  background: '#fff',
  backgroundLight: '#f3f3f3',
  border: '#e5e5e5',
  label: '#9daec9',
  create: (lightColor: string, darkColor?: string) =>
    darkColor ? darkColor : lightColor,
};

export const darkColors: ColorScheme = {
  primary: colors['color-primary-500-dark'],
  secondary: colors['color-primary-700'],
  info: colors['color-info-500'],
  success: colors['color-success-500'],
  warning: colors['color-warning-500'],
  danger: colors['color-danger-500'],
  text: '#fbfbfb',
  subtitle: '#aaa',
  title: '#fff',
  background: '#181821',
  backgroundLight: '#212331',
  border: '#363636',
  label: '#9daec9',
  create: (lightColor: string, darkColor?: string) =>
    darkColor ? darkColor : lightColor,
};

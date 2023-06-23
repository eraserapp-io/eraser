export type ThemeProviderProps = {
  userIsUsingSystemTheme: boolean;
  userIsUsingDarkMode: boolean;
};

export interface ColorScheme {
  primary: string;
  secondary: string;
  text: string;
  subtitle: string;
  title: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
  background: string;
  backgroundLight: string;
  border: string;
  label: string;
  create: (lightColor: string, darkColor?: string) => string;
}

export interface ColorChooserType {
  color: string;
  name: string;
}

export type Gutters = {
  xs: number;
  sm: number;
  md: number;
  reg: number;
  lg: number;
  xl: number;
};

export interface ThemeContextInterface {
  theme: ColorScheme;
  spacing: Gutters;
  invertedTheme: ColorScheme;
  isDarkMode: boolean;
  userIsUsingSystemTheme: boolean;
  userIsUsingDarkMode: boolean;
  setUserIsUsingSystemTheme: (isUsingSystem: boolean) => void;
  setUserIsUsingDarkMode: (isUsingDarkMode: boolean) => void;
}

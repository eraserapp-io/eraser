import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
  ThemeContextInterface,
  ThemeProviderProps,
  ColorScheme,
  Gutters,
} from '@types';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors} from './colors';

const SPACING: Gutters = {
  xs: 4,
  sm: 8,
  md: 16,
  reg: 24,
  lg: 32,
  xl: 48,
};

const ThemeContext = React.createContext<
  Partial<ThemeContextInterface> & {spacing: Gutters}
>({
  spacing: SPACING,
});

/**
 * Provide useful hooks for theming
 * @param children
 * @param userIsUsingDarkMode
 * @param userIsUsingSystemTheme
 * @constructor
 */
export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
  userIsUsingDarkMode,
  userIsUsingSystemTheme,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isUsingDarkMode, setIsUsingDarkMode] =
    useState<boolean>(userIsUsingDarkMode);
  const [isUsingSystemTheme, setIsUsingSystemTheme] = useState<boolean>(
    userIsUsingSystemTheme,
  );

  const [currentTheme, setCurrentTheme] = useState<ColorScheme>(
    isDarkMode || (!isUsingSystemTheme && isUsingDarkMode)
      ? darkColors
      : lightColors,
  );

  const [invertedTheme, setInvertedTheme] = useState<ColorScheme>(
    isDarkMode || (!isUsingSystemTheme && isUsingDarkMode)
      ? lightColors
      : darkColors,
  );

  useEffect(() => {
    setCurrentTheme(
      isDarkMode || (!isUsingSystemTheme && isUsingDarkMode)
        ? darkColors
        : lightColors,
    );
  }, [isDarkMode, isUsingSystemTheme, isUsingDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        spacing: SPACING,
        invertedTheme: invertedTheme,
        isDarkMode: isDarkMode,
        userIsUsingDarkMode: isUsingDarkMode,
        userIsUsingSystemTheme: isUsingSystemTheme,
        setUserIsUsingSystemTheme: setIsUsingSystemTheme,
        setUserIsUsingDarkMode: setIsUsingDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export * from './colors';

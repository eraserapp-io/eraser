import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemeProvider, useTheme} from '@state';
import {View, useColorScheme} from 'react-native';
import {renderHook} from '@testing-library/react-hooks';

import * as colors from '../../assets/colors/colors.json';

describe('Theme correctly works', () => {
  it('Renders correctly', () => {
    render(
      <ThemeProvider userIsUsingSystemTheme={false} userIsUsingDarkMode={false}>
        <View />
      </ThemeProvider>,
    );
  });

  it('Renders hook and returns attributes', () => {
    const wrapper = ({children}: any) => (
      <ThemeProvider userIsUsingDarkMode={false} userIsUsingSystemTheme={true}>
        {children}
      </ThemeProvider>
    );

    const {result} = renderHook(() => useTheme(), {wrapper});

    expect(result.current).toBeDefined();
    expect(result.current.theme).toBeDefined();
    expect(result.current.theme?.primary).toStrictEqual(
      colors['color-primary-500'],
    );
    expect(result.current.userIsUsingDarkMode).toStrictEqual(false);
    expect(result.current.userIsUsingSystemTheme).toStrictEqual(true);
  });

  it('Renders correct theme when user.helpers.ts selects dark', () => {
    const wrapper = ({children}: any) => (
      <ThemeProvider userIsUsingDarkMode={true} userIsUsingSystemTheme={false}>
        {children}
      </ThemeProvider>
    );

    const {result} = renderHook(() => useTheme(), {wrapper});

    expect(result.current.theme).toBeDefined();
    expect(result.current.theme?.text).toStrictEqual('#fbfbfb');
  });
});

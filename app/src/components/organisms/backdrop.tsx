import React, {useMemo} from 'react';
import BottomSheet, {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Keyboard, Pressable, useColorScheme} from 'react-native';
import {useTheme} from '@state';
import {useKeyboard} from '@tools';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends BottomSheetBackdropProps {
  sheetRef: React.RefObject<BottomSheet>;
}

/**
 * Standard backdrop for modals
 * @param animatedIndex
 * @param style
 * @param sheetRef
 * @constructor
 */
export const Backdrop = ({animatedIndex, style, sheetRef}: Props) => {
  const {theme} = useTheme();
  const darkMode = useColorScheme() === 'dark';
  const {keyboardShown} = useKeyboard();

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, -0.95, 0],
      [0, 0, 0.6],
      Extrapolate.CLAMP,
    ),
    zIndex: 1,
    display: animatedIndex.value === -1 ? 'none' : 'flex',
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: darkMode ? '#f4f5f9' : '#000',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle, theme],
  );

  return (
    <AnimatedPressable
      onPress={() => {
        if (!keyboardShown) {
          sheetRef?.current?.close();
        } else {
          Keyboard.dismiss();
        }
      }}
      style={containerStyle}
    />
  );
};

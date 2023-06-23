import React, {FunctionComponent, useMemo} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {useDimensions, useTheme} from '@state';
import {Text} from '../atoms';
import {ButtonTypes, TextTypes} from '@types';

type ButtonProps = {
  type: ButtonTypes;
  onPress?: () => void;
  text?: string | React.ReactNode;
  onlyText?: boolean;
  destructive?: boolean;
  isLoading?: boolean;
};

/**
 * Render a pressable button with theme
 * @param type the size of button to render
 * @param onPress callback for when button is pressed
 * @param text text or React component to be rendered in the button
 * @param onlyText whether or not the button is rendering only text (used mainly for destructive buttons)
 * @param destructive whether or not the button is destructive
 * @param isLoading whether or not button is in loading state
 * @constructor
 */
export const Button: FunctionComponent<ButtonProps> = ({
  type,
  onPress,
  text,
  onlyText,
  destructive,
  isLoading,
}) => {
  const {theme} = useTheme();
  const {width} = useDimensions();

  const buttonWidth = useMemo(() => {
    switch (type) {
      case ButtonTypes.SMALL:
        return 70;
      case ButtonTypes.MEDIUM:
        return 140;
      case ButtonTypes.LARGE:
        return width - 64;
    }
  }, [width, type]);

  if (onlyText) {
    return (
      <TouchableOpacity
        style={{
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size={'small'} />
        ) : typeof text === 'string' ? (
          <Text
            style={{
              color: destructive ? theme?.danger : theme?.primary,
            }}
            type={TextTypes.BOLD}>
            {text}
          </Text>
        ) : (
          text
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{
        width: buttonWidth,
        borderRadius: 6,
        height: 40,
        backgroundColor: destructive ? theme?.danger : theme?.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} />
      ) : typeof text === 'string' ? (
        <Text forceWhiteText={true} type={TextTypes.BOLD}>
          {text}
        </Text>
      ) : (
        text
      )}
    </TouchableOpacity>
  );
};

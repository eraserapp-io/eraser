import React, {FunctionComponent, useMemo} from 'react';
import {Text as RNTextComponent, TextStyle} from 'react-native';
import {TextTypes} from '@types';
import {getColor, getFontFamily, getFontSize} from '@tools';
import {useTheme} from '@state';

type TextProps = {
  type: TextTypes;
  forceWhiteText?: boolean;
  invertColor?: boolean;
  style?: TextStyle;
  truncate?: boolean;
};

/**
 * The text component for Eraser
 * @param type REQUIRED the type of text (i.e. is it a header, description, regular text, bold face etc)
 * @param children children to render within the text component (usually just the text)
 * @param invertColor whether to invert the color of the text or not (i.e. if you have text on a colored surface
 *                    you will want white text
 * @param forceWhiteText whether the text component should always have a white color regardless of theme (takes
 *                        precedence over invertColor)
 * @param style
 * @param truncate
 */
export const Text: FunctionComponent<TextProps> = ({
  type,
  children,
  forceWhiteText,
  invertColor,
  style,
  truncate,
}) => {
  const {theme, isDarkMode} = useTheme();

  const fontSize = useMemo(() => {
    return getFontSize(type);
  }, [type]);

  const color = useMemo(() => {
    return getColor({
      type,
      isDarkMode: isDarkMode!,
      invertColor,
      forceWhiteText,
    });
  }, [type, theme, forceWhiteText, invertColor]);

  const fontFamily = useMemo(() => {
    return getFontFamily(type);
  }, [type]);

  return (
    <RNTextComponent
      numberOfLines={truncate ? 1 : undefined}
      style={[
        {
          fontFamily,
          fontSize,
          color,
        },
        style,
      ]}>
      {children}
    </RNTextComponent>
  );
};

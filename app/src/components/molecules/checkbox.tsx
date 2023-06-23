import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';
import React, {FunctionComponent} from 'react';
import {useTheme} from '@state';

type Props = {
  isChecked: boolean;
  onPress?: (isSelected: boolean) => void;
  checkboxColor?: string;
};

/**
 * Render a checkbox component
 * @param isChecked whether or not the checkbox is checked
 * @param checkboxColor the background color of the checked checkbox
 * @param onPress callback when checkbox is pressed
 * @constructor
 */
export const Checkbox: FunctionComponent<Props> = ({
  isChecked,
  checkboxColor,
  onPress,
}) => {
  const {theme, spacing} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.(!isChecked);
      }}
      style={{
        backgroundColor: isChecked
          ? checkboxColor
            ? checkboxColor
            : theme?.primary
          : theme?.border,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        borderRadius: 8,
        marginRight: spacing.reg,
      }}>
      {isChecked && (
        <Feather name={'check'} size={16} color={theme?.create('#fff')} />
      )}
    </TouchableOpacity>
  );
};

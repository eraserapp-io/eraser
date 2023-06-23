import React, {FunctionComponent} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme} from '@state';
import {IconProps} from 'react-native-vector-icons/Icon';

type IconButtonProps = {
  onPress?: () => void;
  iconName: string;
  iconComponent?: React.ReactElement;
  iconProps?: IconProps;
  inverted?: boolean;
  buttonStyle?: ViewStyle;
};

/**
 * Render a button with an icon
 * @param onPress callback for when button is pressed
 * @param iconComponent custom icon component
 * @param iconName Icon name (feather icons)
 * @param iconProps Props to be passed to the default icon component
 * @param buttonStyle style to be applied to root touchable component
 * @param inverted invert the button colors
 * @constructor
 */
export const IconButton: FunctionComponent<IconButtonProps> = ({
  onPress,
  iconComponent,
  iconName,
  iconProps,
  buttonStyle,
  inverted,
}) => {
  const {theme, spacing} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: inverted ? theme?.primary : theme?.background,
          width: 30,
          height: 30,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        buttonStyle,
      ]}>
      {iconComponent ? (
        iconComponent
      ) : (
        <Feather
          size={22}
          name={iconName}
          color={inverted ? theme?.create('#fff') : theme?.primary}
          {...iconProps}
        />
      )}
    </TouchableOpacity>
  );
};

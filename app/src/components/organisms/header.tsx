import React, {FunctionComponent} from 'react';
import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@state';
import {Text} from '@components';
import {TextTypes} from '@types';
import Feather from 'react-native-vector-icons/Feather';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  headerRight?: React.ReactNode;
  overrideBackButtonBehaviour?: () => void;
  titleStyle?: TextStyle;
  headerStyle?: ViewStyle;
};

/**
 * Render the header component
 * @param title title of the screen
 * @param showBackButton whether or not to render the back button
 * @param headerRight components to be rendered on the right side of the header
 * @param titleStyle apply style to the title text
 * @param headerStyle apply style to the root view
 * @param overrideBackButtonBehaviour callback fired when back button is pressed (if supplied)
 * @constructor
 */
export const Header: FunctionComponent<HeaderProps> = ({
  title,
  showBackButton,
  headerRight,
  titleStyle,
  headerStyle,
  overrideBackButtonBehaviour,
}: HeaderProps) => {
  const {theme, spacing} = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: insets.top + spacing.sm,
          paddingBottom: spacing.sm,
          backgroundColor: theme!.background,
        },
        headerStyle,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: showBackButton ? spacing.md : spacing.lg,
          alignItems: 'center',
        }}>
        {showBackButton && (
          <View
            style={{
              marginRight: spacing.md,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                overrideBackButtonBehaviour
                  ? overrideBackButtonBehaviour()
                  : navigation.goBack()
              }
              hitSlop={{top: 8, bottom: 8, right: 16, left: 16}}>
              <Feather name="chevron-left" size={32} color={theme!.primary} />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text type={TextTypes.HEADER} style={titleStyle}>
            {title}
          </Text>
        </View>
      </View>
      <View>{headerRight ? headerRight : null}</View>
    </View>
  );
};

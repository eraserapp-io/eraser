import React, {FunctionComponent} from 'react';
import Animated, {
  AnimatedStyleProp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, ViewStyle} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
};

/**
 * Pressable but scale in/out when press in/out
 * @param children render child components
 * @param onPress when pressable is pressed
 * @param style style to be applied to root pressable
 * @constructor
 */
export const PressableScale: FunctionComponent<Props> = ({
  children,
  onPress,
  style,
}) => {
  const scale = useSharedValue(1);

  //@ts-ignore
  const ScaleInOut: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  }, [scale]);

  return (
    <AnimatedPressable
      style={[style, ScaleInOut]}
      onPressIn={() => {
        scale.value = withTiming(0.92, {
          duration: 125,
        });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, {
          duration: 125,
        });
      }}
      onPress={() => {
        onPress?.();
      }}>
      {children}
    </AnimatedPressable>
  );
};

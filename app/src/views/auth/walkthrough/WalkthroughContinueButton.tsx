import React, {FunctionComponent} from 'react';
import {Button, Text} from 'components';
import {ButtonTypes, TextTypes} from '@types';
import {View} from 'react-native';
import {useDimensions} from 'state';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const NUM_SLIDES = 3;

type Props = {
  scrollX: Animated.SharedValue<number>;
  onButtonPress: () => void;
};

export const WalkthroughContinueButton: FunctionComponent<Props> = ({
  scrollX,
  onButtonPress,
}) => {
  const {width} = useDimensions();

  const TextStyle1 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [width * (NUM_SLIDES - 2), width * (NUM_SLIDES - 1)],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  const TextStyle2 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [width * (NUM_SLIDES - 2), width * (NUM_SLIDES - 1)],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <View style={{position: 'absolute', bottom: 100, left: (width - 140) / 2}}>
      <Button
        type={ButtonTypes.MEDIUM}
        onPress={onButtonPress}
        text={
          <>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                },
                TextStyle1,
              ]}>
              <Text type={TextTypes.BOLD} forceWhiteText={true}>
                Get Started
              </Text>
            </Animated.View>
            <Animated.Text
              style={[
                {
                  position: 'absolute',
                },
                TextStyle2,
              ]}>
              <Text type={TextTypes.BOLD} forceWhiteText={true}>
                Let's Go!
              </Text>
            </Animated.Text>
          </>
        }
      />
    </View>
  );
};

/*

            <Animated.View
              style={{
                opacity: interpolate(
                  scrollX.value,
                  [width * (NUM_SLIDES - 2), width * (NUM_SLIDES - 1)],
                  [1, 0],
                  Extrapolation.CLAMP,
                ),
                position: 'absolute',
              }}>
              <Text type={TextTypes.BOLD} forceWhiteText={true}>
                Get Started
              </Text>
            </Animated.View>
 */

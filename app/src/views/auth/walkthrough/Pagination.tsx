import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {FunctionComponent} from 'react';
import {useDimensions, useTheme} from 'state';
import {View} from 'react-native';

const NUM_SLIDES = 3;

type PaginationProps = {
  scrollX: Animated.SharedValue<number>;
};

const PAGINATION_WIDTH = 120;

export const Pagination: FunctionComponent<PaginationProps> = ({scrollX}) => {
  const {width} = useDimensions();

  return (
    <View
      style={{
        position: 'absolute',
        width: PAGINATION_WIDTH,
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 30,
        bottom: 50,
        left: (width - PAGINATION_WIDTH) / 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 20,
      }}>
      {new Array(NUM_SLIDES).fill(0).map((_, index) => {
        return (
          <PaginationDot
            key={index.toString()}
            scrollX={scrollX}
            index={index}
          />
        );
      })}
    </View>
  );
};

type PaginationDotProps = {
  scrollX: Animated.SharedValue<number>;
  index: number;
};

const PaginationDot: FunctionComponent<PaginationDotProps> = ({
  scrollX,
  index,
}) => {
  const {theme} = useTheme();
  const {width} = useDimensions();

  const DOT_WIDTH = 64 / NUM_SLIDES;

  const style = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, width * (index + 1)],
        [
          DOT_WIDTH,
          (PAGINATION_WIDTH - DOT_WIDTH + 4) / 4 + DOT_WIDTH,
          DOT_WIDTH,
        ],
        Extrapolation.CLAMP,
      ),
      backgroundColor: interpolateColor(
        scrollX.value,
        [(index - 1) * width, index * width, width * (index + 1)],
        [theme!.border, theme!.primary, theme!.border],
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 8,
        },
        style,
      ]}
    />
  );
};

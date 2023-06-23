import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {Text} from '@components';
import {Slide, TextTypes, WalkthroughProps} from '@types';
import {useDimensions, useTheme} from '@state';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Pagination} from './Pagination';
import {WalkthroughContinueButton} from './WalkthroughContinueButton';
import {TasksSVG} from './Tasks-SVG';
import {GiftSVG} from './Gift-SVG';
import {CashSVG} from './Cash-SVG';
import auth from '@react-native-firebase/auth';

const SLIDES: Slide[] = [
  {
    title: 'Track Assignments',
    description:
      'Easily create assignments so that you can track upcoming due dates',
    image: (width: number, height: number) => (
      <TasksSVG width={width} height={height} />
    ),
  },
  {
    title: 'Create Courses',
    description: 'Create all the courses that you may need',
    image: (width: number, height: number) => (
      <GiftSVG width={width} height={height} />
    ),
  },
  {
    title: 'Win.',
    description: 'Never forget your upcoming assignments again',
    image: (width: number, height: number) => (
      <CashSVG width={width} height={height} />
    ),
  },
];

export const Walkthrough: FunctionComponent<WalkthroughProps> = () => {
  const {theme} = useTheme();
  const {width, height} = useDimensions();

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={{flex: 1}}>
      <Animated.ScrollView
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
        horizontal={true}
        onScroll={scrollHandler}>
        {SLIDES.map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={{
                height,
                paddingHorizontal: 32,
                width,
                backgroundColor: theme?.background,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width,
                  height: height / 2 + 100,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: 64,
                }}>
                {item.image(width - 100, 350)}
              </View>
              <Text type={TextTypes.HEADER}>{item.title}</Text>
              <Text
                style={{textAlign: 'center', maxWidth: 240, marginTop: 12}}
                type={TextTypes.DESC}>
                {item.description}
              </Text>
            </View>
          );
        })}
      </Animated.ScrollView>
      <WalkthroughContinueButton
        onButtonPress={async () => {
          await auth().signInWithEmailAndPassword(
            'testuser@test.com',
            'testing_$%',
          );
        }}
        scrollX={scrollX}
      />
      <Pagination scrollX={scrollX} />
    </View>
  );
};

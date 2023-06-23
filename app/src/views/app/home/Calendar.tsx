import isEmpty from 'lodash/isEmpty';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList} from 'react-native-bidirectional-infinite-scroll';
import {
  fetchInitialItems,
  fetchNextItems,
  getKey,
  repopulate,
  useAfterMount,
  useInitializer,
  useOnce,
} from '@tools';
import {
  AgendaItem as AgendaItemType,
  Assignment,
  Tense,
  TextTypes,
} from '@types';
import {AgendaItem} from './CalendarAgendaItem';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Text} from '@components';
import {useAssignments, useTheme} from '@state';
import Feather from 'react-native-vector-icons/Feather';
import {
  TouchableOpacity,
  ViewToken,
  FlatList as FlatListType,
  ActivityIndicator,
  View,
} from 'react-native';
import Day from 'dayjs';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  onItemPress: (item: Assignment) => void;
}

export const Calendar: FunctionComponent<Props> = ({onItemPress}) => {
  const {theme, spacing} = useTheme();
  const {assignments} = useAssignments();

  const [items, setItems] = useState<AgendaItemType[]>([]);
  const listRef = useRef<FlatListType>(null);

  const [shouldShowToday, setShouldShowToday] = useState(false);

  const showTodayOpacity = useSharedValue(0);

  useEffect(() => {
    showTodayOpacity.value = withTiming(shouldShowToday ? 1 : 0);
  }, [shouldShowToday]);

  useInitializer(() => {
    const initialItems = fetchInitialItems(assignments ?? []);
    setItems(initialItems);
  }, assignments);

  useAfterMount(() => {
    if (assignments && assignments?.length >= 0 && items.length > 0) {
      setItems(repopulate(items, assignments));
    }
  }, [assignments]);

  const onStartReached = async () => {
    let pastItems = fetchNextItems(
      {
        tense: Tense.Past,
        referenceDate: items[0].title,
      },
      assignments ?? [],
    );

    await new Promise(resolve => {
      setTimeout(() => resolve(undefined), 2000);
    });

    setItems(oldItems => pastItems.reverse().concat(oldItems));
  };

  const onEndReached = async () => {
    let futureItems = fetchNextItems(
      {
        tense: Tense.Future,
        referenceDate: items[items.length - 1].title,
      },
      assignments ?? [],
    );

    await new Promise(resolve => {
      setTimeout(() => resolve(undefined), 2000);
    });

    setItems(oldItems => oldItems.concat(futureItems));
  };

  const getIndexFromKey = useCallback(
    (key: string) => {
      const index = items.findIndex(item => getKey(item) === key);

      return index;
    },
    [items],
  );

  useOnce(() => {
    setTimeout(() => {
      const index = getIndexFromKey(Day().format('YYYY-MM-DD'));

      if (index !== -1) {
        listRef?.current?.scrollToIndex({
          animated: false,
          index,
          viewOffset: 50,
        });
      }
    }, 15);
  }, items.length !== 0);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      setShouldShowToday(
        viewableItems.findIndex(item => item.item.title.isSame(Day(), 'd')) < 0,
      );
    },
    [],
  );

  const TodayStyle = useAnimatedStyle(() => {
    return {
      opacity: showTodayOpacity.value,
    };
  }, [shouldShowToday]);

  const ViewabilityConfig = useMemo(() => {
    return {
      itemVisiblePercentThreshold: 50,
    };
  }, []);

  if (isEmpty(items)) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <FlatList
        //@ts-ignore
        ref={listRef}
        data={items}
        keyExtractor={item => getKey(item)}
        showDefaultLoadingIndicators={true}
        renderItem={({item}) => (
          <AgendaItem
            onItemPress={onItemPress}
            key={getKey(item)}
            item={item}
          />
        )}
        onStartReached={onStartReached}
        onEndReached={onEndReached}
        onViewableItemsChanged={onViewableItemsChanged}
        onScrollToIndexFailed={() => null}
        viewabilityConfig={ViewabilityConfig}
        activityIndicatorColor={theme?.text}
      />
      <AnimatedTouchableOpacity
        onPress={() => {
          if (shouldShowToday) {
            listRef.current?.scrollToIndex({
              animated: true,
              index: getIndexFromKey(Day().format('YYYY-MM-DD')),
              viewOffset: 50,
            });
          }
        }}
        style={[
          {
            position: 'absolute',
            bottom: 32,
            width: 100,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            flexDirection: 'row',
            right: 32,
            backgroundColor: theme?.primary,
          },
          TodayStyle,
        ]}>
        <Feather
          name={'chevron-left'}
          size={24}
          color={theme?.create('#fff')}
        />
        <Text
          style={{paddingLeft: spacing.sm}}
          forceWhiteText={true}
          type={TextTypes.BOLD}>
          Today
        </Text>
      </AnimatedTouchableOpacity>
    </>
  );
};

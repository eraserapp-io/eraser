import {
  AgendaItem as AgendaItemType,
  Assignment,
  ButtonTypes,
  TextTypes,
} from '@types';
import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {useAssignments, useTheme} from '@state';
import {
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Checkbox, PressableScale, Text} from '@components';
import {Fonts, getCorrespondingWeekString, hexToRgba, padStart} from '@tools';
import isEmpty from 'lodash/isEmpty';
import Day from 'dayjs';
import Feather from 'react-native-vector-icons/Feather';

interface ItemProps {
  item: AgendaItemType;
  onItemPress: (item: Assignment) => void;
}

export const AgendaItem: FunctionComponent<ItemProps> = ({
  item,
  onItemPress,
}) => {
  const {theme, spacing} = useTheme();

  const weekString = useMemo(() => {
    return getCorrespondingWeekString(item.title);
  }, [item.title]);

  return (
    <View
      style={{
        paddingTop: spacing.reg,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme?.border,
        backgroundColor: theme?.backgroundLight,
      }}>
      {item.title.day() === 0 && (
        <Text
          type={TextTypes.SUBHEADER}
          style={{
            fontSize: 12,
            textAlign: 'center',
            color: item.title.isSame(Day(), 'week')
              ? theme?.primary
              : theme?.subtitle,
            textTransform: 'uppercase',
          }}>
          {weekString}
        </Text>
      )}
      <Text
        type={TextTypes.SUBHEADER}
        style={{
          fontSize: 24,
          color: item.title.isSame(Day(), 'day')
            ? theme?.primary
            : theme?.subtitle,
          textTransform: 'uppercase',
        }}>
        {item.title.format('ddd')}{' '}
        <Text
          style={{
            fontSize: 14,
            color: item.title.isSame(Day(), 'day')
              ? theme?.primary
              : theme?.subtitle,
          }}
          type={TextTypes.SUBHEADER}>
          {item.title.format('MMM D')}
        </Text>
      </Text>
      {isEmpty(item.data) ? (
        <View
          style={{
            height: 52,
            justifyContent: 'center',
          }}>
          <Text type={TextTypes.LABEL}>No Assignments Today</Text>
        </View>
      ) : (
        <View style={{marginVertical: spacing.md}}>
          {item.data
            .sort((a, b) => a.dueDate.valueOf() - b.dueDate.valueOf())
            .map((item: Assignment) => {
              return (
                <Item key={item.id} item={item} onItemPress={onItemPress} />
              );
            })}
        </View>
      )}
    </View>
  );
};

type AgendaItemProps = {
  item: Assignment;
  onItemPress: (item: Assignment) => void;
};

const Item: FunctionComponent<AgendaItemProps> = ({item, onItemPress}) => {
  const {updateAssignment} = useAssignments();

  const {spacing, theme} = useTheme();
  const [isLoadingCheckbox, setIsLoadingCheckbox] = useState<boolean>(false);

  return (
    <PressableScale
      key={item.id}
      onPress={() => onItemPress(item)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.sm,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        backgroundColor: theme?.background,
        borderRadius: 8,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            maxWidth: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {isLoadingCheckbox ? (
            <ActivityIndicator
              style={{
                marginRight: spacing.reg,
              }}
              size={'small'}
            />
          ) : (
            <Checkbox
              isChecked={item.completed}
              checkboxColor={item.course.color}
              onPress={async isSelected => {
                setIsLoadingCheckbox(true);
                await updateAssignment!(item.id, {
                  ...item,
                  completed: isSelected,
                });
                setIsLoadingCheckbox(false);
              }}
            />
          )}
        </View>
        <View style={{justifyContent: 'flex-start'}}>
          <Text truncate={true} type={TextTypes.BOLD}>
            {item.title}
          </Text>
          <Text truncate={true} type={TextTypes.DESC}>
            {item.dueDate.format('hh:mma')}
          </Text>
        </View>
      </View>
      <View
        style={{
          maxWidth: 80,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            borderColor: item.course.color,
            borderWidth: 3,
          }}
        />
      </View>
      <View
        pointerEvents={'none'}
        style={{
          position: 'absolute',
          opacity: item.completed ? 0.5 : 0,
          borderRadius: 8,
          backgroundColor: theme?.backgroundLight,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </PressableScale>
  );
};

import React, {FC} from 'react';
import {Platform, View} from 'react-native';

import {useTheme} from '@state';

import {DateTimePickerProps} from '@types';
import DTPickerModal from 'react-native-modal-datetime-picker';
import Day from 'dayjs';

type Props = {
  isVisible: boolean;
  onVisibilityChange?: (isOpen: boolean) => void;
  onBackdropPress: () => void;
  pickerProps?: DateTimePickerProps;
};

/**
 * Choose a datetime based on native modals
 * @param isVisible indicate if modal is open or not
 * @param onBackdropPress callback fired when backdrop is pressed
 * @param pickerProps pass extra props to picker/modal
 * @constructor
 */
export const DateTimePickerModal: FC<Props> = ({
  isVisible,
  onBackdropPress,
  pickerProps,
}) => {
  const {theme} = useTheme();

  return (
    <DTPickerModal
      minimumDate={pickerProps?.minimumDate?.toDate() ?? undefined}
      maximumDate={pickerProps?.maximumDate?.toDate() ?? undefined}
      isVisible={isVisible}
      date={pickerProps?.selectedDate?.toDate() ?? new Date()}
      customHeaderIOS={() => {
        return (
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 4,
              borderColor: theme?.border,
            }}
          />
        );
      }}
      mode="datetime"
      display={Platform.OS === 'ios' ? 'inline' : undefined}
      onConfirm={date => {
        pickerProps?.onDateConfirm?.(Day(date), true);
        onBackdropPress();
      }}
      onCancel={onBackdropPress}
    />
  );
};

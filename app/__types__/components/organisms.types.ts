import Day from 'dayjs';

export type MarkedDateType = {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  backgroundColor?: string;
  selected?: boolean;
};

export type MarkedDatesObject =
  | {
      [key: string]: MarkedDateType;
    }
  | undefined;

export type DateTimePickerProps = {
  showTimePicker?: boolean;
  selectedDate?: Day.Dayjs;
  onDateConfirm?: (date: Day.Dayjs | null, fromConfirm?: boolean) => void;
  minimumDate?: Day.Dayjs;
  maximumDate?: Day.Dayjs;
  onMonthYearChange?: (dateString: string) => void;
  onTimeChange?: (dateString: string) => void;
  initialDate?: Day.Dayjs;
  disableDateChange?: boolean;
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60;
  onDayPress?: (date: Day.Dayjs) => void;
  onDayLongPress?: (date: Day.Dayjs) => void;
  topSelectorButtons?: boolean;
  showsSelectorButtons?: boolean;
  markedDates?: MarkedDatesObject;
  markingType?: 'period' | 'daily';
  closeModal?: () => void;
};

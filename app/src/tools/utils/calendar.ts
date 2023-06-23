import Day from 'dayjs';
import {
  AgendaItem as AgendaItemType,
  AgendaItem,
  Assignment,
  Course,
  FetchNextDateArgs,
  Tense,
} from '@types';
import colors from '../../../assets/colors/colors.json';

/**
 * Generate unique key for message component of FlatList.
 */
export const generateUniqueKey = () =>
  `_${Math.random().toString(36).substring(2, 9)}`;

/**
 * DUMMY DATA
 */
export const DUMMY_COURSES: Course[] = [
  {
    name: 'Course 1',
    id: generateUniqueKey(),
    color: colors['color-primary-500'],
  },
  {
    name: 'Course 2',
    id: generateUniqueKey(),
    color: colors['color-info-500'],
  },
  {
    name: 'Course 3',
    id: generateUniqueKey(),
    color: colors['color-warning-500'],
  },
];

/**
 * Given items and assignments, just repopulate in case there is missing items
 * @param items
 * @param assignments
 */
export const repopulate = (
  items: AgendaItemType[],
  assignments: Assignment[],
): AgendaItemType[] => {
  return new Array(items.length).fill(0).map((_, index) => {
    return getItemForDate(items[index].title, assignments);
  });
};

/**
 * Fetches the next 5 dates in sequence
 * @param tense
 * @param referenceDate
 * @param numberDays
 */
export const fetchNextDates = ({
  tense,
  referenceDate,
  numberDays = 10,
}: FetchNextDateArgs): Day.Dayjs[] => {
  let dates: Day.Dayjs[] = [];

  for (let i = 1; i < numberDays + 1; i++) {
    let newTime =
      tense === Tense.Future
        ? referenceDate.add(i, 'd')
        : referenceDate.subtract(i, 'd');

    dates.push(newTime);
  }
  return dates;
};

/**
 * Fetches an array with length numToFetch of Day object
 * @returns array of Day objects
 */
export const fetchInitialDates = (): Day.Dayjs[] => {
  return fetchNextDates({
    tense: Tense.Future,
    referenceDate: Day().subtract(5, 'd'),
    numberDays: 30,
  });
};

type FetchNextItemsArgs = {
  tense: Tense;
  referenceDate: Day.Dayjs;
  numberDays?: number;
};
export const fetchNextItems = (
  args: FetchNextItemsArgs,
  assignments: Assignment[],
) => {
  const dates = fetchNextDates(args);

  return new Array(dates.length).fill(0).map((_, index) => {
    return getItemForDate(dates[index], assignments);
  });
};

/**
 * Given a min and max, generate random number between
 * @param min
 * @param max
 */
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getItemForDate = (
  date: Day.Dayjs,
  assignments: Assignment[],
): AgendaItem => {
  return {
    title: date,
    data: assignments.filter(assignment =>
      assignment.dueDate.isSame(date, 'day'),
    ),
  };
};

/**
 * Fetch the initial 30 items
 */
export const fetchInitialItems = (assignments: Assignment[]): AgendaItem[] => {
  const initialDates = fetchInitialDates();

  return new Array(initialDates.length).fill(0).map((_, index) => {
    return getItemForDate(initialDates[index], assignments);
  });
};

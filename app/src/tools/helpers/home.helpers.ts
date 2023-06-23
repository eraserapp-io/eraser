import {AgendaItem as AgendaItemType, Greetings} from '@types';
import Day from 'dayjs';

/**
 * Return the correct greeting based off of current time
 */
export const getCurrentGreeting = (): Greetings => {
  const time = Day();
  if ((time.hour() >= 0 && time.hour() <= 3) || time.hour() >= 19) {
    return 'Night';
  } else if (time.hour() > 3 && time.hour() < 12) {
    return 'Morning';
  } else if (time.hour() >= 12 && time.hour() < 17) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

/**
 * Get the key for a given agenda item
 * @param item the item
 * @return the key of the item (yyyy-mm-dd)
 */
export const getKey = (item: AgendaItemType) => item.title.format('YYYY-MM-DD');

/**
 * Returns a string indicating the corresponding week based on the given date.
 * @param date The date to check for the corresponding week.
 * @returns A string indicating the corresponding week.
 */
export const getCorrespondingWeekString = (date: Day.Dayjs): string => {
  const startOfWeek = Day().startOf('week');
  const endOfThisWeek = startOfWeek.add(6, 'day');
  const endOfNextWeek = endOfThisWeek.add(1, 'week');
  const weeksDiff = Math.floor(date.diff(startOfWeek, 'day') / 7);

  if (
    (date.isSame(startOfWeek) || date.isAfter(startOfWeek)) &&
    (date.isSame(endOfThisWeek) || date.isBefore(endOfThisWeek))
  ) {
    return 'this week';
  } else if (
    date.isAfter(endOfThisWeek) &&
    (date.isSame(endOfNextWeek) || date.isBefore(endOfNextWeek))
  ) {
    return 'next week';
  } else if (weeksDiff >= 2) {
    return `in ${weeksDiff + 1} week${weeksDiff - 2 === 1 ? '' : 's'}`;
  } else {
    return `${Math.abs(weeksDiff)} week${weeksDiff === -1 ? '' : 's'} ago`;
  }
};

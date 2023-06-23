import Day from 'dayjs';
import {fetchInitialItems, fetchNextDates} from '@tools';
import MockDate from 'mockdate';
import {Tense} from '@types';

MockDate.reset();

describe('fetchNextDates work', () => {
  beforeEach(() => {
    MockDate.set(Day().hour(12).valueOf());
  });

  it('Returns the future 5 dates from today at noon', () => {
    let expectedDates: Day.Dayjs[] = [
      Day().add(1, 'd'),
      Day().add(2, 'd'),
      Day().add(3, 'd'),
      Day().add(4, 'd'),
      Day().add(5, 'd'),
    ];

    let result = fetchNextDates({
      tense: Tense.Future,
      referenceDate: Day(),
      numberDays: 5,
    });

    expect(result).toEqual(expectedDates);
  });

  it('Returns the future 5 dates from 10 days in the future at noon', () => {
    let expectedDates: Day.Dayjs[] = [
      Day().add(1 + 10, 'd'),
      Day().add(2 + 10, 'd'),
      Day().add(3 + 10, 'd'),
      Day().add(4 + 10, 'd'),
      Day().add(5 + 10, 'd'),
    ];

    let result = fetchNextDates({
      tense: Tense.Future,
      referenceDate: Day().add(10, 'd'),
      numberDays: 5,
    });

    expect(result).toEqual(expectedDates);
  });

  it('Returns the future 5 dates from 28 days in the future at noon', () => {
    let expectedDates: Day.Dayjs[] = [
      Day().add(30, 'd'),
      Day().add(31, 'd'),
      Day().add(32, 'd'),
      Day().add(33, 'd'),
      Day().add(34, 'd'),
    ];

    let result = fetchNextDates({
      tense: Tense.Future,
      referenceDate: Day().add(29, 'd'),
      numberDays: 5,
    });

    expect(result).toEqual(expectedDates);
  });

  it('Returns the initial 5 dates from today at noon', () => {
    let expectedDates: Day.Dayjs[] = [
      Day(),
      Day().add(1, 'd'),
      Day().add(2, 'd'),
      Day().add(3, 'd'),
      Day().add(4, 'd'),
    ];

    let result = fetchNextDates({
      tense: Tense.Future,
      referenceDate: Day().subtract(1, 'd'),
      numberDays: 5,
    });

    expect(result).toEqual(expectedDates);
  });

  it('Returns the past 5 dates from today at noon', () => {
    let expectedDates: Day.Dayjs[] = [
      Day().subtract(1, 'd'),
      Day().subtract(2, 'd'),
      Day().subtract(3, 'd'),
      Day().subtract(4, 'd'),
      Day().subtract(5, 'd'),
    ];

    let result = fetchNextDates({
      tense: Tense.Past,
      referenceDate: Day(),
      numberDays: 5,
    });

    expect(result).toEqual(expectedDates);
  });

  it('Returns the past 5 dates from 5 days ago', () => {
    let expectedDates: Day.Dayjs[] = [
      Day().subtract(6, 'd'),
      Day().subtract(7, 'd'),
      Day().subtract(8, 'd'),
      Day().subtract(9, 'd'),
      Day().subtract(10, 'd'),
    ];

    let result = fetchNextDates({
      tense: Tense.Past,
      referenceDate: Day().subtract(5, 'd'),
      numberDays: 5,
    });

    expect(result).toEqual(expectedDates);
  });

  it('Returns the past 15 dates from today at noon', () => {
    let expectedDates: Day.Dayjs[] = [
      Day().subtract(1, 'd'),
      Day().subtract(2, 'd'),
      Day().subtract(3, 'd'),
      Day().subtract(4, 'd'),
      Day().subtract(5, 'd'),
      Day().subtract(6, 'd'),
      Day().subtract(7, 'd'),
      Day().subtract(8, 'd'),
      Day().subtract(9, 'd'),
      Day().subtract(10, 'd'),
      Day().subtract(11, 'd'),
      Day().subtract(12, 'd'),
      Day().subtract(13, 'd'),
      Day().subtract(14, 'd'),
      Day().subtract(15, 'd'),
    ];

    let result = fetchNextDates({
      tense: Tense.Past,
      referenceDate: Day(),
      numberDays: 15,
    });

    expect(result).toEqual(expectedDates);
  });
});

// describe('fetchInitialItems works', () => {
//   it('Fetches initial items', () => {
//     const initialItems = fetchInitialItems();
//
//     expect(initialItems.length).toEqual(30);
//     expect(initialItems[0].title.toString()).toEqual(Day().toString());
//     expect(initialItems[29].title.toString()).toEqual(
//       Day().add(29, 'd').toString(),
//     );
//   });
// });

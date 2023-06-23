import {getCurrentGreeting} from '@tools';

import MockDate from 'mockdate';
import Day from 'dayjs';

const mockTime = (hr: number, mn: number) => {
  MockDate.set(Day().hour(hr).minute(mn).valueOf());
};

describe('getCurrentGreeting works', () => {
  it('Get morning for morning times', () => {
    mockTime(7, 0);
    expect(getCurrentGreeting()).toEqual('Morning');
    mockTime(11, 59);
    expect(getCurrentGreeting()).toEqual('Morning');
    mockTime(5, 0);
    expect(getCurrentGreeting()).toEqual('Morning');
  });

  it('Get afternoon for afternoon times', () => {
    mockTime(12, 0);
    expect(getCurrentGreeting()).toEqual('Afternoon');
    mockTime(16, 0);
    expect(getCurrentGreeting()).toEqual('Afternoon');
    mockTime(14, 32);
    expect(getCurrentGreeting()).toEqual('Afternoon');
  });

  it('Get Evening for Evening times', () => {
    mockTime(18, 10);
    expect(getCurrentGreeting()).toEqual('Evening');
    mockTime(18, 59);
    expect(getCurrentGreeting()).toEqual('Evening');
    mockTime(17, 0);
    expect(getCurrentGreeting()).toEqual('Evening');
  });

  it('Get Night for Night times', () => {
    mockTime(3, 10);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(3, 59);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(0, 0);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(20, 0);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(19, 0);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(20, 34);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(0, 49);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(23, 34);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(2, 10);
    expect(getCurrentGreeting()).toEqual('Night');
    mockTime(1, 15);
    expect(getCurrentGreeting()).toEqual('Night');
  });
});

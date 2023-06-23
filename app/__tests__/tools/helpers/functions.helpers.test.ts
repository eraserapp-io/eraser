import {padStart} from '@tools';

describe('successfully pads string', () => {
  it('pads the start of a number with zeroes', () => {
    expect(padStart(5, 2, '0')).toEqual('05');
  });
});

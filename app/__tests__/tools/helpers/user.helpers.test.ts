/**
 * Test the implementation of helper functions
 */

import {fetchUserLoggedInStatus, storage} from '@tools';

describe('Test User Auth Status Works', () => {
  it('successfully logs user.helpers.ts in and out', async () => {
    storage.set('@app.user.helpers.ts.isLoggedIn', false);
    expect(await fetchUserLoggedInStatus()).toBe(false);

    storage.set('@app.user.helpers.ts.isLoggedIn', true);
    expect(await fetchUserLoggedInStatus()).toBe(true);

    storage.delete('@app.user.helpers.ts.isLoggedIn');
    expect(await fetchUserLoggedInStatus()).toBe(false);
  });
});

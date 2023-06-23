import {storage} from '@tools';

/**
 * Fetch whether the user.helpers.ts is currently logged in or not
 */
export const fetchUserLoggedInStatus = async (): Promise<boolean> => {
  return Promise.resolve(
    storage.getBoolean('@app.user.helpers.ts.isLoggedIn') ?? false,
  );
};

/**
 * Given whether the user.helpers.ts is logged in or not, set it in local storage
 * @param loggedInStatus whether the user.helpers.ts is logged in or not
 */
export const setUserLoggedInStatus = async (
  loggedInStatus: boolean,
): Promise<void> => {
  storage.set('@app.user.helpers.ts.isLoggedIn', loggedInStatus);
  return Promise.resolve();
};

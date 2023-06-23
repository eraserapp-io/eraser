import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppRoutes} from './app';
import {AuthRoutes} from './auth';

type Props = {
  isLoggedIn?: boolean;
};

/**
 * Given whether the user is logged in or not,
 * render the app (logged in) or the auth pages (not logged in)
 * @param isLoggedIn whether the user is logged in or not
 * @constructor
 */
export const Routes: FunctionComponent<Props> = ({isLoggedIn}) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

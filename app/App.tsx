import React, {useEffect, useState} from 'react';
import {Routes} from '@routes';
import {AssignmentProvider, CourseProvider, ThemeProvider} from '@state';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

/**
 * Setup and configure the app and display the routes
 */
export const App = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean | undefined>(
    undefined,
  );

  // Handle user.helpers.ts state changes
  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback =
    async user => {
      setUserIsLoggedIn(user !== null);
    };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    /**
     * Configure App for readiness
     */
    if (userIsLoggedIn !== undefined) {
      setAppIsReady(true);
    }
  }, [userIsLoggedIn]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#ffffff00'}}>
      <ThemeProvider userIsUsingSystemTheme={false} userIsUsingDarkMode={false}>
        <CourseProvider>
          <AssignmentProvider>
            <Routes isLoggedIn={userIsLoggedIn} />
          </AssignmentProvider>
        </CourseProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

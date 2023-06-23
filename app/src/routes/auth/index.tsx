import React, {FunctionComponent} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Walkthrough} from '@views';
import {AuthStackParamList} from '@types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

type Props = {};

/**
 * Defines the different possible routes for the
 * AUTH portion of Eraser (when user is logged in)
 */
export const AuthRoutes: FunctionComponent<Props> = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'Walkthrough'} component={Walkthrough} />
    </AuthStack.Navigator>
  );
};

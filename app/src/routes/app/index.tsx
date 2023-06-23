import React, {FunctionComponent} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '@views';

const AppStack = createNativeStackNavigator();

type Props = {};

/**
 * Defines the different possibles routes for the
 * APP portion of Eraser (when user is logged in)
 */
export const AppRoutes: FunctionComponent<Props> = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}>
      <AppStack.Screen name={'Home'} component={Home} />
    </AppStack.Navigator>
  );
};

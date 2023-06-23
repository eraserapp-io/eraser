import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type AppStackParamList = {
  Home: HomeScreenProps;
};

/**
 * home screen
 */

export type HomeScreenType = NativeStackNavigationProp<
  AppStackParamList,
  'Home'
>;

export type HomeRouteType = RouteProp<AppStackParamList, 'Home'>;

export type HomeScreenProps = undefined;

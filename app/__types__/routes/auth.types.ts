import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type AuthStackParamList = {
  Walkthrough: WalkthroughScreenProps;
};

/**
 * Walkthrough screen
 */

export type WalkthroughScreenType = NativeStackScreenProps<
  AuthStackParamList,
  'Walkthrough'
>;

export type WalkthroughRouteType = RouteProp<AuthStackParamList, 'Walkthrough'>;

export type WalkthroughScreenProps = undefined;

import {TextTypes} from '../../components';

export type GetColorProps = {
  type: TextTypes;
  isDarkMode: boolean;
  invertColor?: boolean;
  forceWhiteText?: boolean;
};

export type Greetings = 'Morning' | 'Afternoon' | 'Evening' | 'Night';
export * from './calendar.types';

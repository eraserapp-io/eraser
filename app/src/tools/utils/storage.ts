import {MMKV} from 'react-native-mmkv';
import {Listener, Storage} from '@types';

const mmkv = new MMKV();

/**
 * interface for storage (if swapping in the future, allows for simpler swapping)
 */
export const storage: Storage = {
  set: (key: string, value: boolean | string | number): void => {
    mmkv.set(key, value);
  },
  get: (key: string): number | boolean | string | undefined => {
    return mmkv.getString(key);
  },
  getBoolean: (key: string): boolean | undefined => {
    return mmkv.getBoolean(key);
  },
  getString: (key: string): string | undefined => {
    return mmkv.getString(key);
  },
  getNumber: (key: string): number | undefined => {
    return mmkv.getNumber(key);
  },
  delete: (key: string): void => {
    mmkv.delete(key);
  },
  contains: (key: string): boolean => {
    return mmkv.contains(key);
  },
  getAllKeys: (): string[] | undefined => {
    return mmkv.getAllKeys();
  },
  clearAll: (): void => {
    mmkv.clearAll();
  },
  addOnValueChangedListener: (
    onValueChanged: (key: string) => void,
  ): Listener => {
    return mmkv.addOnValueChangedListener(onValueChanged);
  },
};

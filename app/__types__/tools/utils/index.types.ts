export interface Listener {
  remove: () => void;
}

export type Storage = {
  set: (key: string, value: boolean | string | number) => void;
  get: (key: string) => number | boolean | string | undefined;
  getBoolean: (key: string) => boolean | undefined;
  getString: (key: string) => string | undefined;
  getNumber: (key: string) => number | undefined;
  delete: (key: string) => void;
  contains: (key: string) => boolean;
  getAllKeys: () => string[] | undefined;
  clearAll: () => void;
  addOnValueChangedListener: (
    onValueChanged: (key: string) => void,
  ) => Listener;
};

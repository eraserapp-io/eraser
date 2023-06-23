import {useRef} from 'react';

/**
 * Call a function only once, returns the function that will be called only once.
 * @param callback
 */
export function useOneTimeFunction(callback: () => void) {
  const hasRan = useRef(false);

  function wrapper() {
    if (!hasRan.current) {
      hasRan.current = true;
      callback();
    }
  }

  return wrapper;
}

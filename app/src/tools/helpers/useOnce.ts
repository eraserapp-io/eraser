import React, {useEffect, useRef} from 'react';

/**
 * Helper function. UseEffect but only once when condition is met
 * Usually used for loading or initializing things
 * @param func function to run in the useEffect
 * @param condition condition to meet to run func once
 */
export const useOnce = (callback: () => void, condition: boolean = true) => {
  const isCalledRef = useRef(false);

  useEffect(() => {
    if (condition && !isCalledRef.current) {
      isCalledRef.current = true;
      callback();
    }
  }, [callback, condition]);
};

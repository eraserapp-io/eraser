/**
 * Helper function. UseEffect but only after mounted once
 * @param func function to run in the useEffect
 * @param deps array of dependencies that should update the useEffect
 */
import React, {useEffect, useRef} from 'react';

export const useAfterMount = (
  func: () => void,
  deps?: React.DependencyList,
) => {
  let hasMounted = useRef<undefined | boolean>();
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      func();
    }
  }, deps);
};

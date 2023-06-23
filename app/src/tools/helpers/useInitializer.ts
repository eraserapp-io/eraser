import React, {useEffect, useRef} from 'react';

/**
 * Function to wait for an array to be initialized (i.e. fetching items from backend)
 * @param func callback to fetch items to initialize
 * @param initializer items to be initialized
 */
export const useInitializer = (
  func: () => void,
  initializer: any[] | null | undefined,
) => {
  const isInitialized = useRef<boolean>(
    initializer && initializer?.length >= 0 ? true : false,
  );

  return useEffect(() => {
    if (!isInitialized.current && initializer && initializer?.length >= 0) {
      isInitialized.current = true;
      func();
    }
  }, [initializer]);
};

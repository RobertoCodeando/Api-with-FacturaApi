import { useCallback, useLayoutEffect, useState } from 'react';

type WindowSize = () => Array<number>;

export const useWindowSize: WindowSize = () => {
  const [size, setSize] = useState<Array<number>>([0, 0]);

  const updateSize = useCallback(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return size;
};

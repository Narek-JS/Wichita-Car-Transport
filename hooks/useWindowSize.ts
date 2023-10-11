import { useState, useEffect } from 'react';

interface WindowSize {
  width?: number;
  height?: number;
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedHandleResize = debounce(handleResize, 250);

    window.addEventListener('resize', debouncedHandleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;

import { useState, useEffect, RefObject } from 'react';

export const useScrollPosition = (elementRef: RefObject<HTMLElement>): number => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const element = elementRef?.current!

    const handleScroll = () => {
      if (element instanceof HTMLElement && element.scrollTop !== scrollPosition) {
        setScrollPosition(element.scrollTop);
      };
    };

    element && element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return scrollPosition;
};
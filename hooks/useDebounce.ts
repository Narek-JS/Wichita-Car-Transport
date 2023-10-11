import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const id = setTimeout(_ => setDebouncedValue(value), delay);

        return () => clearTimeout(id);
    }, [value, delay]);

    return debouncedValue;
};

export { useDebounce };

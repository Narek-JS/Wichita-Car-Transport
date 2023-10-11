import { useEffect } from 'react';

function useLocalStorageListener(key: string, onChange: (newValue: any) => void) {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        onChange(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, onChange]);
}

export { useLocalStorageListener };

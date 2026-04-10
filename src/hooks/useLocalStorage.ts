import { useState, useCallback } from 'react';
import { readStorage, writeStorage } from '@/lib/storage';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => readStorage(key, initialValue));

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        writeStorage(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}

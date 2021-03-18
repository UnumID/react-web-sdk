import { useState } from 'react';

interface UseTimeoutResult extends Array<() => void> {
  0: () => void;
  1: () => void;
}

export const useTimeout = (
  callback: () => void,
  delay: number,
): UseTimeoutResult => {
  const [isActive, setIsActive] = useState(false);

  let timeout: NodeJS.Timeout;
  const start = () => {
    if (!isActive) {
      setIsActive(true);
      setTimeout(callback, delay);
    }
  };

  const stop = () => {
    if (isActive) {
      clearTimeout(timeout);
    }
  };

  return [start, stop];
};

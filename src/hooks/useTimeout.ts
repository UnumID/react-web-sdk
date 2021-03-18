import { useState } from 'react';

type UseTimeoutResult = [(delay: number) => void, () => void];

export const useTimeout = (
  callback: () => void,
): UseTimeoutResult => {
  const [isActive, setIsActive] = useState(false);

  let timeout: NodeJS.Timeout;
  const start = (delay: number) => {
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

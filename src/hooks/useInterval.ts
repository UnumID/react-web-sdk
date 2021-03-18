import { useState, useEffect } from 'react';

interface UseIntervalResult extends Array<() => void> {
  0: () => void;
  1: () => void;
}

export const useInterval = (
  callback: () => unknown,
  intervalDuration: number,
): UseIntervalResult => {
  const [isActive, setIsActive] = useState(false);

  const start = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const stop = () => {
    if (isActive) {
      setIsActive(false);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect((): () => void => {
    const tick = async () => {
      await callback();
    };

    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(tick, intervalDuration);
    }

    return () => { clearInterval(interval); };
  }, [intervalDuration, isActive, callback]);

  return [start, stop];
};

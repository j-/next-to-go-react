import { useEffect, useState } from 'react';

const initNow = () => new Date();

/**
 * Triggers a rerender every `intervalMs` milliseconds and returns the current
 * time as a `Date` object. Cleans itself up on unmount.
 */
export const useNow = (intervalMs = 1_000) => {
  const [now, setNow] = useState(initNow);

  useEffect(() => {
    const clock = setInterval(() => {
      setNow(initNow);
    }, intervalMs);

    return () => {
      clearInterval(clock);
    };
  }, [intervalMs]);

  return now;
};

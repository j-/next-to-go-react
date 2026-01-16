import { useEffect, useState } from 'react';

const initNow = () => new Date();

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

import { useEffect, useState } from 'react';

export const useNow = (intervalMs = 1_000) => {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const clock = setInterval(() => {
      setNow(Date.now);
    }, intervalMs);

    return () => {
      clearInterval(clock);
    };
  }, [intervalMs]);

  return now;
};

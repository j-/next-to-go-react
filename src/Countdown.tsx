import { formatDistanceStrict } from 'date-fns';
import { useMemo, type FC } from 'react';
import { useNow } from './use-now';

export type CountdownProps = {
  time: Date;
  intervalMs?: number;
};

export const Countdown: FC<CountdownProps> = ({
  time,
  intervalMs,
}) => {
  const now = useNow(intervalMs);

  const formatted = useMemo(() => {
    return formatDistanceStrict(time, now, {
      addSuffix: true,
    });
  }, [time, now]);

  return <time dateTime={time.toISOString()}>{formatted}</time>;
};

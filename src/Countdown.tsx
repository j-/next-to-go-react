import { formatDistanceStrict } from 'date-fns';
import { useMemo, type FC } from 'react';

export type CountdownProps = {
  time: Date;
  now: Date;
};

export const Countdown: FC<CountdownProps> = ({
  time,
  now,
}) => {
  const formatted = useMemo(() => {
    return formatDistanceStrict(time, now, {
      addSuffix: true,
    });
  }, [time, now]);

  return <time dateTime={time.toISOString()}>{formatted}</time>;
};

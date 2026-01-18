import { formatDistanceStrict, type RoundingMethod } from 'date-fns';
import { useMemo, type FC } from 'react';

export type CountdownProps = {
  time: Date;
  now: Date;
  roundingMethod?: RoundingMethod;
};

export const Countdown: FC<CountdownProps> = ({
  time,
  now,
  roundingMethod,
}) => {
  const formatted = useMemo(() => {
    return formatDistanceStrict(time, now, {
      addSuffix: true,
      roundingMethod,
    });
  }, [time, now, roundingMethod]);

  return <time dateTime={time.toISOString()}>{formatted}</time>;
};

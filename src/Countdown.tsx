import { formatDistanceStrict, type RoundingMethod } from 'date-fns';
import { useMemo, type FC } from 'react';

export type CountdownProps = {
  time: Date;
  now: Date;
  roundingMethod?: RoundingMethod;
};

/**
 * Renders a simple countdown (or countup when the delta is negative) as a
 * semantic `<time />` element. Output has the format "in 5 minutes", "in 2
 * seconds", "1 second ago" etc. Note that the formatting is deferred to
 * `date-fns` and could be switched out for another lib or even a bespoke
 * implementation rendering a shorter ("5m"/"2s"/"-1s") label.
 */
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

import classNames from 'classnames';
import type { FC } from 'react';
import type { RaceSummary } from './api';
import { CategoryIcon } from './CategoryIcon';
import { Countdown } from './Countdown';

export type RaceSummaryViewProps = {
  race: RaceSummary;
  now: Date;
};

/**
 * A simple view describing a race that is ready to jump. Displays the category
 * of race as an icon, the meeting name, and the race number, as well as a
 * countdown to the advertised start time of the race.
 */
export const RaceSummaryView: FC<RaceSummaryViewProps> = ({ race, now }) => {
  const isNegative = now > race.advertised_start;

  return (
    <div data-testid="RaceSummaryView">
      <div className="flex flex-row gap-2 truncate items-center flex-wrap">
        <CategoryIcon categoryId={race.category_id} className="w-6 h-6" />

        <strong>{race.meeting_name} R{race.race_number}</strong>

        <span className={
          classNames(
            'ml-auto min-w-full sm:min-w-fit',
            isNegative ? 'text-red-400' : 'text-inherit',
          )
        }>
          <Countdown
            time={race.advertised_start}
            now={now}
            // Ensure counter never shows "60 seconds ago"
            // i.e. disappears from the list at 59 seconds.
            roundingMethod="floor"
          />
        </span>
      </div>
    </div>
  );
};

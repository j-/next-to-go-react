import { useMemo, type FC } from 'react';
import type { RaceSummary } from './api';
import { NextToGoListItem } from './NextToGoListItem';
import { RaceSummaryPlaceholder } from './RaceSummaryPlaceholder';
import { RaceSummaryView } from './RaceSummaryView';

export type NextToGoProps = {
  nextToGo: RaceSummary[];
  limit: number;
  now: Date;
};

/**
 * Pure presentational component which takes a list of races which are next to
 * jump as well as the total number of races to show and the current time. The
 * limit is used to truncate the list when there are too many races to show, and
 * pad the list when there are too few. The `now` prop is used to keep countdown
 * timers in sync.
 */
export const NextToGo: FC<NextToGoProps> = ({
  nextToGo,
  limit,
  now,
}) => {
  /**
   * Renders a fixed length array (where length = `limit`) of race summary view
   * components, filling blank spaces with placeholders such that if the list is
   * still loading or the number of races is less than the limit then the total
   * number of list items will still be `limit` but filled with placeholders
   * instead.
   */
  const children = useMemo(() => {
    // Construct fixed length array.
    return Array.from({ length: limit })
      // Fill with next-to-go races.
      .map((_, i) => nextToGo[i])
      // Always render X summary views + placeholders.
      .map((race, i) => (
        race ?
          <li key={race.race_id}>
            <NextToGoListItem>
              <RaceSummaryView race={race} now={now} />
            </NextToGoListItem>
          </li> :
          <li key={`placeholder-${i}`}>
            <NextToGoListItem placeholder>
              <RaceSummaryPlaceholder />
            </NextToGoListItem>
          </li>
      ));
  }, [limit, nextToGo, now]);

  return (
    <ol data-testid="NextToGo">
      {children}
    </ol>
  );
};

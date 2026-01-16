import { useMemo, type FC } from 'react';
import type { RaceSummary } from './api';
import { RaceSummaryView } from './RaceSummaryView';

export type NextToGoProps = {
  nextToGo: RaceSummary[];
  limit: number;
};

export const NextToGo: FC<NextToGoProps> = ({
  nextToGo,
  limit,
}) => {
  const slice = useMemo(() => {
    return nextToGo.slice(0, limit);
  }, [nextToGo, limit]);

  return (
    <ol>
      {slice?.map((race) => (
        <li key={race.race_id}>
          <RaceSummaryView race={race} />
        </li>
      ))}
    </ol>
  );
};

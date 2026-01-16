import type { FC } from 'react';
import type { RaceSummary } from './api';

export type RaceSummaryViewProps = {
  race: RaceSummary;
};

export const RaceSummaryView: FC<RaceSummaryViewProps> = ({ race }) => {
  return (
    <div>
      <strong>{race.meeting_name} R{race.race_number}</strong>
      <br />
      <span>Starts at {race.advertised_start.toLocaleTimeString()}</span>
      <br />
      <em>{race.race_id}</em>
    </div>
  );
};

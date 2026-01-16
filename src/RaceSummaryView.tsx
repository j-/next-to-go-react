import type { FC } from 'react';
import type { RaceSummary } from './api';
import { Countdown } from './Countdown';

export type RaceSummaryViewProps = {
  race: RaceSummary;
};

export const RaceSummaryView: FC<RaceSummaryViewProps> = ({ race }) => {
  return (
    <div>
      <strong>{race.meeting_name} R{race.race_number}</strong>
      <br />
      <Countdown time={race.advertised_start} />
      <br />
      <em>{race.race_id}</em>
    </div>
  );
};

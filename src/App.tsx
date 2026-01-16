import { useQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { getNextRacesOptions } from './api';

export const App: FC = () => {
  const {
    error,
    data,
  } = useQuery({
    ...getNextRacesOptions(),

    // Invalidate and refresh every 30 seconds.
    refetchInterval: 30_000,
  });

  if (error) {
    return (
      <div>
        <h1>Request failed</h1>
        <pre>{String(error)}</pre>
      </div>
    );
  }

  return (
    <div>
      <ol>
        {data?.map((race) => (
          <li key={race.race_id}>
            <strong>{race.meeting_name} R{race.race_number}</strong>
            <br />
            <em>{race.race_id}</em>
          </li>
        ))}
      </ol>

      <hr />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

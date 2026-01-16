import { useQuery } from '@tanstack/react-query';
import { useMemo, useState, type FC } from 'react';
import {
  CATEGORY_ID_GREYHOUND,
  CATEGORY_ID_HARNESS,
  CATEGORY_ID_HORSE,
  getNextRacesOptions,
} from './api';

export const App: FC = () => {
  /**
   * Number of results to request from the API. Should be greater than
   * {@link limit}. Need to overfetch to account for category filtering.
   */
  const count = 30;

  /**
   * Number of results to show in the UI.
   */
  const limit = 5;

  const [categoryId, setCategoryId] = useState<string | null>(null);

  const {
    error,
    data,
  } = useQuery({
    ...getNextRacesOptions({ count }),

    // Invalidate and refresh every 30 seconds.
    refetchInterval: 30_000,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!categoryId) return data.slice(0, limit);

    return data.filter((race) => (
      race.category_id === categoryId
    )).slice(0, limit);
  }, [categoryId, data]);

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
      <select value={categoryId ?? ''} onChange={(e) => {
        setCategoryId(e.currentTarget.value || null);
      }}>
        <option value="">All categories</option>
        <option value={CATEGORY_ID_GREYHOUND}>Greyhound</option>
        <option value={CATEGORY_ID_HARNESS}>Harness</option>
        <option value={CATEGORY_ID_HORSE}>Horse</option>
      </select>

      <ol>
        {filteredData?.map((race) => (
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

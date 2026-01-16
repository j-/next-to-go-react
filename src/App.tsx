import { useQuery } from '@tanstack/react-query';
import { useMemo, useState, type FC } from 'react';
import { getNextRacesOptions } from './api';
import { CategorySelector } from './CategorySelector';
import { NextToGo } from './NextToGo';

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
    if (!categoryId) return data;

    return data.filter((race) => (
      race.category_id === categoryId
    ));
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
      <CategorySelector categoryId={categoryId} setCategoryId={setCategoryId} />
      <NextToGo nextToGo={filteredData} limit={limit} />

      <hr />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

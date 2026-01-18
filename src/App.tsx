import { useQuery } from '@tanstack/react-query';
import { useMemo, useState, type FC } from 'react';
import { getNextRacesOptions } from './api';
import { CategorySelector } from './CategorySelector';
import { filterRaces } from './filter-races';
import { NextToGo } from './NextToGo';
import { useNow } from './use-now';

export const App: FC = () => {
  const now = useNow();

  /**
   * The maximum time in milliseconds to show a race after the advertised jump.
   */
  const maxAgeMs = 60_000;

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

  const filterPredicate = useMemo(() => {
    return filterRaces({
      categoryId,
      maxAgeMs,
      now,
    });
  }, [categoryId, now]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(filterPredicate);
  }, [data, filterPredicate]);

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
      <NextToGo nextToGo={filteredData} limit={limit} now={now} />
    </div>
  );
};

import { useQuery } from '@tanstack/react-query';
import { useMemo, type FC } from 'react';
import { getNextRacesOptions } from './api';
import { filterRaces } from './filter-races';
import { NextToGo } from './NextToGo';
import { useNow } from './use-now';

export type NextToGoLiveProps = {
  categoryId: string | null;
};

/**
 * Stateful component which manages the "get next races" query and composes the
 * {@link NextToGo} component for rendering those results.
 */
export const NextToGoLive: FC<NextToGoLiveProps> = ({ categoryId }) => {
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

  const {
    error,
    data,
    refetch,
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
        <h1 className="text-xl font-bold">Request failed</h1>
        <pre className="my-4">{String(error)}</pre>

        <button
          type="button"
          onClick={() => refetch()}
          className="cursor-pointer py-2 px-4 rounded bg-gray-700 text-gray-50 opacity-90 hover:opacity-100 active:bg-gray-800"
        >
          Reload&hellip;
        </button>
      </div>
    );
  }

  return (
    <NextToGo nextToGo={filteredData} limit={limit} now={now} />
  );
};

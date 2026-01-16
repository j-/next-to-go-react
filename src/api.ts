import { queryOptions } from '@tanstack/react-query';

export type GetNextRacesParams = {
  count: number;
};

export const getNextRacesDefaults = {
  count: 10,
} as const satisfies GetNextRacesParams;

export const getNextRacesQueryKey = (params = getNextRacesDefaults) => (
  ['nextraces', params]
);

export const getNextRacesOptions = (params = getNextRacesDefaults) => (
  queryOptions({
    queryKey: getNextRacesQueryKey(params),
    queryFn: async ({ signal }) => {
      const url = new URL(
        '/rest/v1/racing/?method=nextraces',
        process.env.BUN_PUBLIC_API_HOST,
      );

      url.searchParams.set('count', String(params.count));

      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error('Response was not OK');

      return res.json();
    },
  })
);

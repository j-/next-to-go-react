import { queryOptions } from '@tanstack/react-query';
import z from 'zod';

export const CATEGORY_ID_GREYHOUND = '9daef0d7-bf3c-4f50-921d-8e818c60fe61';
export const CATEGORY_ID_HARNESS = '161d9be2-e909-4326-8c2c-35ed71fb460b';
export const CATEGORY_ID_HORSE = '4a2788f8-e825-4d36-9894-efd4baf1cfae';

export type GetNextRacesParams = {
  count: number;
};

export const getNextRacesDefaults = {
  count: 10,
} as const satisfies GetNextRacesParams;

export const getNextRacesQueryKey = (
  params: GetNextRacesParams = getNextRacesDefaults,
) => ['nextraces', params];

// We can be more specific here and declare IDs as `z.uuid()`, however
// the application doesn't care about the format of these IDs.
export const raceIdSchema = z.string();

// Deserialize by converting object with seconds property
// into a native JS Date object.
export const timeStampSchema = z.object({ seconds: z.number() })
  .transform(({ seconds }) => new Date(seconds * 1_000));

// We only declare fields we care about since any mistake in correctly typing
// fields we DON'T care about will lead to the entire payload failing to parse.
export const raceSummarySchema = z.object({
  race_id: raceIdSchema,
  race_name: z.string(),
  race_number: z.number(),
  meeting_name: z.string(),
  category_id: z.string(),
  advertised_start: timeStampSchema,
});

export const getNextRacesSchema = z.object({
  data: z.object({
    next_to_go_ids: z.array(raceIdSchema),
    race_summaries: z.record(raceIdSchema, raceSummarySchema),
  }),
});

export const getNextRacesOptions = (
  params: GetNextRacesParams = getNextRacesDefaults,
) => (
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

      const payload = await res.json();
      return getNextRacesSchema.parse(payload);
    },

    // Denormalizes the payload so that we just get a
    // simple array of races that are next to jump.
    select: ({ data }) => {
      return data.next_to_go_ids.map((raceId) => {
        return data.race_summaries[raceId];
      }).filter((race) => race != null);
    },
  })
);

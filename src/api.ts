import { queryOptions } from '@tanstack/react-query';
import z from 'zod';

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

export type RaceSummary = z.output<typeof raceSummarySchema>;

export const getNextRacesSchema = z.object({
  data: z.object({
    next_to_go_ids: z.array(raceIdSchema),
    race_summaries: z.record(raceIdSchema, raceSummarySchema),
  }),
}).transform(({ data }) => (
  // Denormalizes the payload so that we just get a
  // simple array of races that are next to jump.
  data.next_to_go_ids.map((raceId) => {
    return data.race_summaries[raceId];
  }).filter((race) => race != null)
));

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
      if (!res.ok) throw new Error(res.statusText);

      const payload = await res.json();
      return getNextRacesSchema.parse(payload);
    },
  })
);

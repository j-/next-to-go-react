import { describe, expect, it } from 'bun:test';
import { getNextRacesSchema } from './api';
import { RacingCategory } from './categories';
import { filterRaces } from './filter-races';
import payload from './mocks/nextraces/payload-1768438793569.json';

const allRaces = getNextRacesSchema.safeParse(payload).data!;

describe('filterRaces()', () => {
  it('returns a function', () => {
    const predicate = filterRaces({
      categoryId: null,
      maxAgeMs: Infinity,
      now: new Date(0),
    });
    expect(predicate).toBeFunction();
  });

  it('returns all races when category ID filter is `null`', () => {
    const predicate = filterRaces({
      categoryId: null,
      maxAgeMs: Infinity,
      now: new Date(0),
    });
    expect(allRaces).toHaveLength(10);
    const actual = allRaces.filter(predicate);
    expect(actual).toHaveLength(10);
  });

  it('can filter by horse races', () => {
    const predicate = filterRaces({
      categoryId: RacingCategory.HORSE,
      maxAgeMs: Infinity,
      now: new Date(0),
    });
    expect(allRaces).toHaveLength(10);
    const actual = allRaces.filter(predicate);
    expect(actual).toHaveLength(2);
    expect(actual).toEqual([
      expect.objectContaining({ race_id: '498d47cc-168b-40b7-8faf-d8510b5c5ef1' }),
      expect.objectContaining({ race_id: '5aca2946-455a-4c57-9906-97c46a31a1aa' }),
    ]);
  });

  it('can filter by greyhound races', () => {
    const predicate = filterRaces({
      categoryId: RacingCategory.GREYHOUND,
      maxAgeMs: Infinity,
      now: new Date(0),
    });
    expect(allRaces).toHaveLength(10);
    const actual = allRaces.filter(predicate);
    expect(actual).toHaveLength(5);
    expect(actual).toEqual([
      expect.objectContaining({ race_id: '255c47b6-158e-4439-b977-babe9a74314a' }),
      expect.objectContaining({ race_id: '54e5fc88-3f92-44a1-a294-cf1d89983d40' }),
      expect.objectContaining({ race_id: '4f84d879-2506-442f-8a3e-577b7e74de9f' }),
      expect.objectContaining({ race_id: '5313c543-439c-4055-8a7c-225edabd34a8' }),
      expect.objectContaining({ race_id: 'bd964ac0-7c27-475a-897a-cd8d41398538' }),
    ]);
  });

  it('can filter by harness races', () => {
    const predicate = filterRaces({
      categoryId: RacingCategory.HARNESS,
      maxAgeMs: Infinity,
      now: new Date(0),
    });
    expect(allRaces).toHaveLength(10);
    const actual = allRaces.filter(predicate);
    expect(actual).toHaveLength(3);
    expect(actual).toEqual([
      expect.objectContaining({ race_id: 'd180d083-954b-4844-80e9-0b51f3240308' }),
      expect.objectContaining({ race_id: '51a1a178-4d94-4970-9fae-64a1d8dc03a3' }),
      expect.objectContaining({ race_id: '0a715512-e667-4ad3-b892-059b9b68f5a1' }),
    ]);
  });

  it('can filter by max age of 1 minute', () => {
    const predicate = filterRaces({
      categoryId: null,
      maxAgeMs: 60_000,
      now: new Date(1768438793569), // Data fetch time
    });
    expect(allRaces).toHaveLength(10);
    const actual = allRaces.filter(predicate);
    expect(actual).toHaveLength(9);
    expect(actual).not.toContain(
      expect.objectContaining({ race_id: 'd180d083-954b-4844-80e9-0b51f3240308' }),
    );
  });

  it('can filter by max age of 30 seconds', () => {
    const predicate = filterRaces({
      categoryId: null,
      maxAgeMs: 30_000,
      now: new Date(1768438793569 + 60_000), // 60 seconds after data fetched
    });
    expect(allRaces).toHaveLength(10);
    const actual = allRaces.filter(predicate);
    expect(actual).toHaveLength(8);
    expect(actual).not.toContain(
      expect.objectContaining({ race_id: 'd180d083-954b-4844-80e9-0b51f3240308' }),
    );
    expect(actual).not.toContain(
      expect.objectContaining({ race_id: '255c47b6-158e-4439-b977-babe9a74314a' }),
    );
  });

  it('can filter by max age of 0 seconds', () => {
    const predicate = filterRaces({
      categoryId: null,
      maxAgeMs: 0,
      now: new Date(1768438793569 + 300_000), // 5 mins after data fetched
    });
    expect(allRaces).toHaveLength(10);
    const actual = allRaces.filter(predicate);
    expect(actual).toHaveLength(7);
    expect(actual).not.toContain(
      expect.objectContaining({ race_id: 'd180d083-954b-4844-80e9-0b51f3240308' }),
    );
    expect(actual).not.toContain(
      expect.objectContaining({ race_id: '255c47b6-158e-4439-b977-babe9a74314a' }),
    );
    expect(actual).not.toContain(
      expect.objectContaining({ race_id: '54e5fc88-3f92-44a1-a294-cf1d89983d40' }),
    );
  });
});

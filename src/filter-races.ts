import { differenceInMilliseconds } from 'date-fns';
import type { RaceSummary } from './api';

/**
 * Create a filter predicate to limit races shown to the user based on some
 * given criteria.
 *
 * @param options.categoryId `null` to show all categories, otherwise the ID of
 *   the category to use when filtering to allow only races from this category
 *   to be shown.
 *
 * @param options.maxAgeMs Show results past their advertised start time until
 *   this threshold is passed (in milliseconds).
 *
 * @param options.now Reference time to use when calculating race age.
 *
 * @returns Predicate which can be passed to {@link Array.filter} which
 *   filters on race summaries in a result set. Predicate returns `true` if the
 *   race matches the filter criteria else `false`.
 */
export const filterRaces = (options: {
  categoryId: string | null;
  maxAgeMs: number;
  now: Date;
}) => {
  const {
    categoryId,
    now,
    maxAgeMs,
  } = options;

  return (race: RaceSummary) => {
    if (categoryId != null && race.category_id !== categoryId) {
      // We are filtering by category and this
      // race is not in the desired category.
      return false;
    }

    const ageMs = differenceInMilliseconds(now, race.advertised_start);
    if (ageMs > maxAgeMs) {
      // Race has exceeded the threshold for maximum time past jump.
      return false;
    }

    // We could have returned the above as a single conditional but this is
    // explicitly written this way to allow all `true` cases to fall through
    // thus making it easier to add more conditions in the future.
    return true;
  };
};

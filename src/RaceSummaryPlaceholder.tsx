import type { FC } from 'react';

/**
 * Simply indicates there are too few races to show at the moment.
 */
export const RaceSummaryPlaceholder: FC = () => {
  return (
    <div data-testid="RaceSummaryPlaceholder">
      <strong className="select-none">&mdash;</strong>
    </div>
  );
};

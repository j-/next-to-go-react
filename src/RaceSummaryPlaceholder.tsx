import type { FC } from 'react';

export const RaceSummaryPlaceholder: FC = () => {
  return (
    <div data-testid="RaceSummaryPlaceholder">
      <strong className="select-none">&mdash;</strong>
    </div>
  );
};

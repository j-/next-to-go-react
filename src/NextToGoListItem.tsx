import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

export type NextToGoListItemProps = PropsWithChildren<{
  placeholder?: boolean;
}>;

/**
 * Container for a single race in the "next to go" list. Ensures a consistent
 * presentation for both races and race placeholders.
 */
export const NextToGoListItem: FC<NextToGoListItemProps> = ({
  placeholder = false,
  children,
}) => {
  return (
    <div data-testid="NextToGoListItem" className={
      classNames(
        'bg-amber-50 rounded p-4 mb-2 shadow shadow-green-950/20 min-h-14',
        placeholder && 'opacity-50',
      )
    }>
      {children}
    </div>
  );
};

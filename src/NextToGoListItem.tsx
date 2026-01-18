import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

export type NextToGoListItemProps = PropsWithChildren<{
  placeholder?: boolean;
}>;

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

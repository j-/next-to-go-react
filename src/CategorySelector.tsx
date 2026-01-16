import type { FC } from 'react';
import {
  CATEGORY_ID_GREYHOUND,
  CATEGORY_ID_HARNESS,
  CATEGORY_ID_HORSE,
} from './api';

export type CategorySelectorProps = {
  categoryId: string | null;
  setCategoryId: (categoryId: string | null) => void;
};

export const CategorySelector: FC<CategorySelectorProps> = ({
  categoryId,
  setCategoryId,
}) => {
  return (
    <select value={categoryId ?? ''} onChange={(e) => {
      setCategoryId(e.currentTarget.value || null);
    }}>
      <option value="">All categories</option>
      <option value={CATEGORY_ID_GREYHOUND}>Greyhound</option>
      <option value={CATEGORY_ID_HARNESS}>Harness</option>
      <option value={CATEGORY_ID_HORSE}>Horse</option>
    </select>
  );
};

import { useId, type FC } from 'react';
import { RacingCategory } from './categories';
import { CategoryIcon } from './CategoryIcon';
import { CategorySelectorRadio } from './CategorySelectorRadio';

export type CategorySelectorProps = {
  categoryId: string | null;
  setCategoryId: (categoryId: string | null) => void;
};

export const CategorySelector: FC<CategorySelectorProps> = ({
  categoryId,
  setCategoryId,
}) => {
  const id = `CategorySelector-${useId()}`;
  const name = `${id}-category`;

  return (
    <fieldset data-testid="CategorySelector" onChange={(e) => {
      setCategoryId((e.target as HTMLInputElement).value || null);
    }}>
      <legend className="sr-only">Select category</legend>

      <ul className="select-none grid gap-2 md:grid-cols-[1fr_auto_auto_auto]">
        <li>
          <CategorySelectorRadio
            name={name}
            value=""
            defaultChecked={categoryId === null}
          >
            <strong>All categories</strong>
          </CategorySelectorRadio>
        </li>

        <li>
          <CategorySelectorRadio
            name={name}
            value={RacingCategory.HORSE}
            defaultChecked={categoryId === RacingCategory.HORSE}
          >
            <CategoryIcon
              categoryId={RacingCategory.HORSE}
              className="w-6 h-6"
              aria-label="Horse racing"
            />
          </CategorySelectorRadio>
        </li>

        <li>
          <CategorySelectorRadio
            name={name}
            value={RacingCategory.GREYHOUND}
            defaultChecked={categoryId === RacingCategory.GREYHOUND}
          >
            <CategoryIcon
              categoryId={RacingCategory.GREYHOUND}
              className="w-6 h-6"
              aria-label="Greyhound racing"
            />
          </CategorySelectorRadio>
        </li>

        <li>
          <CategorySelectorRadio
            name={name}
            value={RacingCategory.HARNESS}
            defaultChecked={categoryId === RacingCategory.HARNESS}
          >
            <CategoryIcon
              categoryId={RacingCategory.HARNESS}
              className="w-6 h-6"
              aria-label="Harness racing"
            />
          </CategorySelectorRadio>
        </li>
      </ul>
    </fieldset>
  );
};

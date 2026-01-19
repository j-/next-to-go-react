import { useState, type FC } from 'react';
import { CategorySelector } from './CategorySelector';
import { NextToGoLive } from './NextToGoLive';

export const App: FC = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <div className="mx-auto my-10 flex flex-col gap-4 max-w-[60ch]">
      <CategorySelector categoryId={categoryId} setCategoryId={setCategoryId} />
      <NextToGoLive categoryId={categoryId} />
    </div>
  );
};

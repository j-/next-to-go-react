import { useQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { getNextRacesOptions } from './api';

export const App: FC = () => {
  const {
    data,
  } = useQuery(
    getNextRacesOptions(),
  );

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

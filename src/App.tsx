import { useEffect, type FC } from 'react';

export const App: FC = () => {
  useEffect(() => {
    const url = new URL(
      '/rest/v1/racing/?method=nextraces&count=10',
      process.env.BUN_PUBLIC_API_HOST,
    );

    fetch(url)
      .then((res) => res.json())
      .then((json) => console.log('Next to go', json));
  }, []);

  return (
    <div>Next to go (React)</div>
  );
};

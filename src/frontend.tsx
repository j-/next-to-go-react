import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const queryClient = new QueryClient();

const elem = document.getElementById('root')!;
const app = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

const initMocks = async () => {
  // Only enable MSW mocks in dev mode.
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }
};

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  import.meta.hot.data.mockWorker ??= await initMocks();
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  const root = createRoot(elem);
  root.render(app);
}

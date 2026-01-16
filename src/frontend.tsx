import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const queryClient = new QueryClient();

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const elem = document.getElementById('root')!;
const app = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

const initMocks = async () => {
  if (
    // Only enable MSW mocks in dev mode.
    process.env.NODE_ENV === 'development' &&
    // Allow mocks to be disabled with environment variable.
    ['1', 'true'].includes(process.env.BUN_PUBLIC_ENABLE_MOCKS)
  ) {
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

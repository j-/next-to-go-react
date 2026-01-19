import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, waitFor, type RenderOptions } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, mock, setSystemTime } from 'bun:test';
import { http, HttpResponse } from 'msw';
import { App } from './App';
import payload from './mocks/nextraces/payload-1768438793569.json';
import { server } from './mocks/node';

let wrapper: RenderOptions['wrapper'];

const url = new URL('/rest/v1/racing/', process.env.BUN_PUBLIC_API_HOST).toString();
const testEpoch = 1768438793569;

beforeEach(() => {
  setSystemTime(testEpoch);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
});

describe('<App />', () => {
  it('renders the category selector and the next races to go', () => {
    render(<App />, { wrapper });
    expect(screen.getByTestId('CategorySelector')).toBeInTheDocument();
    expect(screen.getByTestId('NextToGo')).toBeInTheDocument();
  });

  it('can change the category filter', async () => {
    render(<App />, { wrapper });
    // Show all races. Next to jump: 1 horse, 1 harness, 3 greyhounds.
    expect(await screen.findAllByTestId('RaceSummaryView')).toHaveLength(5);
    expect(screen.getAllByRole('img', { name: /Horse/ })).toHaveLength(1);
    expect(screen.getAllByRole('img', { name: /Harness/ })).toHaveLength(1);
    expect(screen.getAllByRole('img', { name: /Greyhound/ })).toHaveLength(3);
    expect(screen.queryAllByTestId('RaceSummaryPlaceholder')).toHaveLength(0);
    // Show horse races. Next to jump: 2 horse. 3 placeholders.
    await userEvent.click(screen.getByRole('radio', { name: /Horse/ }));
    expect(screen.getAllByRole('img', { name: /Horse/ })).toHaveLength(2);
    expect(screen.queryAllByRole('img', { name: /Harness/ })).toHaveLength(0);
    expect(screen.queryAllByRole('img', { name: /Greyhound/ })).toHaveLength(0);
    expect(screen.getAllByTestId('RaceSummaryPlaceholder')).toHaveLength(3);
    // Show harness races. Next to jump: 2 harness. 3 placeholders.
    await userEvent.click(screen.getByRole('radio', { name: /Harness/ }));
    expect(screen.getAllByRole('img', { name: /Harness/ })).toHaveLength(2);
    expect(screen.queryAllByRole('img', { name: /Horse/ })).toHaveLength(0);
    expect(screen.queryAllByRole('img', { name: /Greyhound/ })).toHaveLength(0);
    expect(screen.getAllByTestId('RaceSummaryPlaceholder')).toHaveLength(3);
    // Show greyhound races. Next to jump: 5 greyhound. 0 placeholders.
    await userEvent.click(screen.getByRole('radio', { name: /Greyhound/ }));
    expect(screen.getAllByRole('img', { name: /Greyhound/ })).toHaveLength(5);
    expect(screen.queryAllByRole('img', { name: /Horse/ })).toHaveLength(0);
    expect(screen.queryAllByRole('img', { name: /Harness/ })).toHaveLength(0);
    expect(screen.queryAllByTestId('RaceSummaryPlaceholder')).toHaveLength(0);
  });

  it('shows placeholders while awaiting results', async () => {
    const { promise, resolve } = Promise.withResolvers();
    // Mock slow response and assert UI shown.
    const handler = mock(() => promise.then(() => HttpResponse.json(payload)));
    server.resetHandlers(http.get(url, handler));
    render(<App />, { wrapper });
    await waitFor(() => expect(handler).toBeCalledTimes(1));
    // UI is in pending state, 5 placeholder shown.
    expect(screen.getAllByTestId('RaceSummaryPlaceholder')).toHaveLength(5);
    act(resolve);
    // UI is in resolved state, 0 placeholders shown.
    expect(await screen.findAllByTestId('RaceSummaryView')).toHaveLength(5);
    expect(screen.queryAllByTestId('RaceSummaryPlaceholder')).toHaveLength(0);
  });

  it('handles server errors', async () => {
    // Mock error response and assert feedback.
    const handler = mock(() => HttpResponse.text('Error', { status: 500 }));
    server.resetHandlers(http.get(url, handler));
    render(<App />, { wrapper });
    await waitFor(() => expect(handler).toBeCalledTimes(1));
    expect(screen.getByText(/Request failed/)).toBeInTheDocument();
    expect(screen.getByText(/Internal Server Error/)).toBeInTheDocument();
    // Simulate "Reload" user event and assert retry occurs.
    await userEvent.click(screen.getByRole('button', { name: /Reload/ }));
    await waitFor(() => expect(handler).toBeCalledTimes(2));
  });
});

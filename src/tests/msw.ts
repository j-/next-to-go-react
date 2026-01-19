/* Set up MSW mock server. Can be loaded at any time. */
import { afterAll, afterEach, beforeAll } from 'bun:test';
import { server } from '../mocks/node';

// See https://mswjs.io/docs/quick-start
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

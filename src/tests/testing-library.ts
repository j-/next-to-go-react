/* Set up Testing Library matchers. MUST be loaded after Happy DOM. */
import '@testing-library/jest-dom';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'bun:test';

// See https://bun.com/docs/guides/test/testing-library
declare module 'bun:test' {
  /* eslint-disable */
  interface Matchers<T> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers<any, any> {}
  /* eslint-enable */
}

expect.extend(matchers);

afterEach(() => cleanup());

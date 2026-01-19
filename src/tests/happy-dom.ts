/* Set up Happy DOM environment. MUST be loaded before Testing Library. */
import { GlobalRegistrator } from '@happy-dom/global-registrator';

// See https://bun.sh/docs/test/dom
GlobalRegistrator.register();

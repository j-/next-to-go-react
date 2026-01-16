import { http, HttpResponse } from 'msw';
import payload from './nextraces/payload-1768438793569.json';

export const handlers = [
  http.get(new URL('/rest/v1/racing/', process.env.BUN_PUBLIC_API_HOST).toString(), () => {
    return HttpResponse.json(payload);
  }),
];

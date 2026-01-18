FROM oven/bun:1-slim AS builder
WORKDIR /tmp

ARG BUN_PUBLIC_API_HOST='https://example.com/'
ENV BUN_PUBLIC_API_HOST=$BUN_PUBLIC_API_HOST

ARG BUN_PUBLIC_ENABLE_MOCKS='1'
ENV BUN_PUBLIC_ENABLE_MOCKS=$BUN_PUBLIC_ENABLE_MOCKS

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM nginx:stable-alpine
COPY --from=builder /tmp/dist /usr/share/nginx/html

FROM node:24.13.1-alpine3.23 AS base

ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS prune

WORKDIR /app
COPY . .
RUN npx turbo prune @repo/event-storming-ui --docker

FROM base AS build

WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN pnpm install --frozen-lockfile
ARG VITE_API_WS_URL
ENV VITE_API_WS_URL=$VITE_API_WS_URL

COPY --from=prune /app/out/full/ .
RUN pnpm run build --filter="@repo/event-storming-ui"

FROM nginx:1.29.5-alpine3.23

COPY --from=build /app/event-storming/ui/dist /usr/share/nginx/html

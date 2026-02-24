FROM node:24.13.1-alpine3.23 AS build

ARG TURBO_TEAM
ARG TURBO_TOKEN

ENV DO_NOT_TRACK=1
ENV TURBO_TEAM=$TURBO_TEAM
ENV TURBO_TOKEN=$TURBO_TOKEN

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
COPY . /app

RUN pnpm install --frozen-lockfile --filter="@repo/event-storming-ui" && \
    pnpm run build --filter="@repo/event-storming-ui"

FROM nginx:1.29.5-alpine3.23

COPY --from=build /app/event-storming/ui/dist /usr/share/nginx/html

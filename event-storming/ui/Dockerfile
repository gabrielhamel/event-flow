FROM node:24.13.1-alpine3.23 AS build

ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
COPY . /app

RUN --mount=type=secret,id=turbo_team export TURBO_TEAM=$(cat /run/secrets/turbo_team) && \
    --mount=type=secret,id=turbo_token export TURBO_TOKEN=$(cat /run/secrets/turbo_token) && \
    pnpm install --frozen-lockfile --filter="@repo/event-storming-ui" && \
    pnpm run build --filter="@repo/event-storming-ui"

FROM nginx:1.29.5-alpine3.23

COPY --from=build /app/event-storming/ui/dist /usr/share/nginx/html

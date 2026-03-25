# syntax=docker/dockerfile:1
FROM node:25.8.0-alpine3.23 AS base

ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@10.33.0

FROM base AS prune

WORKDIR /app
COPY . .
RUN npx turbo prune @repo/ui --docker

FROM base AS build

WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN apk add --update --no-cache curl python3 make g++ pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev librsvg-dev && \
    ln -sf python3 /usr/bin/python
ENV PYTHONUNBUFFERED=1

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ .
RUN pnpm run build --filter="@repo/ui"

FROM nginx:1.29.5-alpine3.23

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

COPY --from=build /app/apps/ui/dist /usr/share/nginx/html

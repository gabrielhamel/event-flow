FROM node:24.13.1-alpine3.23 AS base

ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PYTHONUNBUFFERED=1

RUN apk add --update --no-cache python3 && \
    ln -sf python3 /usr/bin/python && \
    python3 -m ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools && \
    corepack enable && \
    pnpm i -g turbo@2.8.12

FROM base AS prune

WORKDIR /app
COPY . .
RUN npx turbo prune @repo/event-storming-api --docker

FROM base AS build

WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ .
RUN pnpm run build --filter="@repo/event-storming-api" && \
    pnpm deploy --filter="@repo/event-storming-api" --prod /build

FROM node:24.13.1-alpine3.23

WORKDIR /app

COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /app/event-storming/api/dist /app/dist

EXPOSE 8080

CMD ["node", "dist/index.js"]

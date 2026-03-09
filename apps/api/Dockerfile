# syntax=docker/dockerfile:1
FROM node:25.8.0-alpine3.23 AS base

ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@10.31.0

FROM base AS prune

WORKDIR /app
COPY . .
RUN npx turbo prune @repo/api --docker

FROM base AS build

WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ .
RUN pnpm run build --filter="@repo/api" && \
    pnpm deploy --filter="@repo/api" --prod /build

FROM node:25.8.0-alpine3.23

WORKDIR /app

COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /app/apps/api/dist /app/dist

EXPOSE 8080

CMD ["node", "dist/index.js"]

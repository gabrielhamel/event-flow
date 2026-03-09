# syntax=docker/dockerfile:1
FROM node:25.8.0-alpine3.23 AS base

ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g pnpm@10.31.0 prisma@7.4.2

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

FROM base

WORKDIR /app

COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /app/apps/api/dist /app/dist
COPY --from=build /app/packages/core/prisma.config.ts /app/prisma.config.ts
COPY --from=build /app/packages/core/src/infra/prisma/migrations /app/src/infra/prisma/migrations
COPY --from=build /app/packages/core/src/infra/prisma/schema.prisma /app/src/infra/prisma/schema.prisma

# Link globally installed prisma into app node_modules so prisma.config.ts can resolve "prisma/config"
RUN ln -s $(realpath $(npm root -g)/prisma) /app/node_modules/prisma

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/api/healthcheck || exit 1

CMD ["sh", "-c", "prisma migrate deploy && node dist/apps/api/src/index.js"]

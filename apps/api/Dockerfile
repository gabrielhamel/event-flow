FROM node:25.8.1 AS vite-plus

ENV PATH=/root/.vite-plus/bin:$PATH
RUN curl -fsSL https://vite.plus | bash && vp env setup

FROM vite-plus AS build

WORKDIR /app

COPY . .

RUN vp install --frozen-lockfile --filter @repo/api --filter @repo/core && vpr --filter="@repo/api" build

FROM node:25.8.1-alpine3.23

WORKDIR /app

COPY --from=build /app/apps/api/dist /app/dist

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/api/healthcheck || exit 1

CMD ["sh", "-c", "cd apps/api && node dist/index.mjs"]
FROM node:24.13.1-alpine3.23 AS build

ENV DO_NOT_TRACK=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
COPY . /app

RUN pnpm install --frozen-lockfile --filter="@repo/event-storming-api" && \
    pnpm run build --filter="@repo/event-storming-api" && \
    pnpm deploy --filter="@repo/event-storming-api" --prod /build

FROM node:24.13.1-alpine3.23

WORKDIR /app

COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /app/event-storming/api/dist /app/dist

EXPOSE 6123

CMD ["node", "dist/index.js"]

FROM node:25.8.1 AS vite-plus

ENV PATH=/root/.vite-plus/bin:$PATH
RUN curl -fsSL https://vite.plus | bash && vp env setup

FROM vite-plus AS build

WORKDIR /app

COPY . .

RUN vp install --frozen-lockfile --filter @repo/ui... && vpr --filter="@repo/ui" build

FROM nginx:1.29.5-alpine3.23

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

COPY --from=build /app/apps/ui/dist /usr/share/nginx/html
COPY --from=build /app/tools/deployment/apps/ui/nginx.conf /etc/nginx/conf.d/default.conf

FROM node:22-alpine AS build

RUN corepack enable
WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json api/package.json
COPY vue-app/package.json vue-app/package.json
RUN pnpm install --frozen-lockfile --filter vue-product-app...

COPY vue-app vue-app
ARG VITE_API_BASE_URL=
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN pnpm --dir vue-app build

FROM nginx:alpine AS runtime
COPY vue-app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/vue-app/dist /usr/share/nginx/html

EXPOSE 8080

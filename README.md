# Vue Prisma Product App

Typed full-stack product and category management application built with Vue 3, Fastify, Prisma and MySQL.

## Architecture

- `api/`: Fastify HTTP API, Prisma data access and image handling
- `vue-app/`: Vue 3 frontend with Vue Router, Vuex and i18n
- `docker-compose.yml`: local MySQL, API and frontend services
- `api/test/`: API integration tests using Fastify injection

The repository is managed as a workspace. Node.js 22 is the supported runtime.

## Run locally

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Or run the complete containerized stack:

```bash
docker compose up --build
```

The frontend is available at `http://localhost:8080` and the API at `http://localhost:5001`.

## Quality checks

```bash
pnpm typecheck
pnpm test
pnpm lint
pnpm build
```

The API and frontend both pass strict TypeScript checks. The frontend SFC check is available as `pnpm --dir vue-app typecheck:strict`.

## API health endpoints

- `GET /health/live`: process liveness
- `GET /health/ready`: database readiness
- `GET /ping`: backwards-compatible smoke endpoint

## Database

```bash
pnpm db:generate
pnpm db:migrate
```

Database credentials are supplied through `DATABASE_URL`; do not commit `.env` files or production secrets.

## Roadmap

1. Replace Vue CLI with Vite/Nuxt 4 and Vuex with Pinia/TanStack Query.
2. Introduce shared API contracts and generated client types.
3. Migrate the database layer to the selected production database strategy.
4. Add product/category E2E tests, authentication and authorization.
5. Harden image storage, observability, container images and production deployment.

# Vue Prisma Product App

Typed full-stack product and category management application built with Vue 3, Fastify, Prisma and MySQL.

## Architecture

- `api/`: Fastify HTTP API, Prisma data access and image handling
- `vue-app/`: Vue 3 frontend with Vite, Pinia, Vue Router and i18n
- `docker-compose.yml`: local MySQL, API and frontend services
- `api/test/`: API integration tests using Fastify injection
- `vue-app/src/stores/`: Pinia state and focused store behavior tests

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
CI also validates the Prisma schema and compiles the production API bundle.

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
Apply database migrations with `pnpm db:migrate` before starting a deployed API.

## Roadmap

### Completed

- Replaced Vue CLI/Webpack and Vuex with Vite and Pinia.
- Added Pinia store tests and retained strict Vue SFC type checking.
- Built the frontend image from the workspace lockfile and added same-origin API proxying plus SPA route fallback.
- Aligned API request validation and TypeScript request types on shared TypeBox schemas.

### Next

1. Introduce shared API contracts and generated client types.
2. Add product/category E2E tests, authentication and authorization.
3. Harden image storage and observability.
4. Evaluate Nuxt 4 and a production database strategy when deployment requirements are defined.

### Image updates

Product and category images replaced with the same filename are retained. A differently named old image is removed after the database update succeeds. Database failures preserve the old image; a newly saved replacement may require cleanup after such a failure.

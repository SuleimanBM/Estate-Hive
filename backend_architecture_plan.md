# Backend System & Architecture Plan for Your Project

> Generated from the codebases you uploaded (two Express+TypeScript repos: one with Mongoose, one with Prisma).
> This document consolidates findings, recommendations, data models, API flows, infra, and a step-by-step roadmap — packaged for download.

---

## Table of contents
1. Quick summary of what I found
2. Recommendation (big-picture)
3. High-level architecture (diagram & components)
4. Data model (relational schema & Prisma snippet)
5. Key API flows (Auth, Property → Application → Lease → Payment)
6. Media handling, storage & background jobs
7. Caching, search & indexing
8. Security & best practices
9. Observability & operations
10. Testing strategy
11. CI/CD and deployment
12. Suggested folder structure
13. Priority implementation roadmap
14. Potential pitfalls & mitigations
15. Example endpoints & Prisma model snippet (appendix)
16. Next steps and optional artifacts I can produce

---

# 1) Quick summary of what I found
- Two uploaded archives:
  - `backend - Copy`: Express + TypeScript using **Mongoose (MongoDB)**. Contains controllers, models, routes, Cloudinary usage, Paystack routes, multer, nodemailer, JWT auth, etc.
  - `server - Copy`: Express + TypeScript using **Prisma** (SQL). Contains `prisma/schema.prisma`, migrations, seeds, controllers for tenants/managers/properties/leases/applications, `public/uploads`, auth middleware.
- Functional pieces present: uploads, payments (Paystack), email (nodemailer), auth middleware, controllers and routes for core domain entities.
- Recommendation: consolidate into **one** backend stack for maintainability. Prefer Prisma + PostgreSQL.

---

# 2) Recommendation (big-picture)
**Use Node + TypeScript + Express + Prisma + PostgreSQL.**  
Rationale:
- Relational DB provides stronger transactional guarantees for payments & leases.
- Prisma gives type-safe queries, migrations, and good DX with TypeScript.
- Continue using Cloudinary (or S3) for media, Redis for caching/queues, and Paystack for payments.

---

# 3) High-level architecture

```
Clients (Web SPA / Mobile)  --HTTPS-->  Load Balancer (NGINX / Cloud LB)
                                       |
                                 API Servers (stateless)
                                 - Express + TypeScript + Prisma
                                 - Auth, Properties, Applications, Leases, Payments
                                       |
                  ---------------------------------------------
                  |                  |                       |
                Postgres           Redis                Cloudinary / S3
             (Primary + replica)   (cache + queues)     (media storage)
                  |
             Background Workers (BullMQ) -> email, image processing, reconciliation
                  |
             Monitoring: Prometheus + Grafana, Logging: ELK/Loki, Errors: Sentry
```

### Notes
- Stateless API servers => horizontal autoscaling.
- Background workers handle slow/async jobs.
- Webhooks (Paystack) handled securely and idempotently in payments service.

---

# 4) Data model (recommended relational schema — high level)
Main tables:
- `users` (id uuid, email, password_hash, name, phone, role, is_verified, created_at)
- `profiles` (profile details)
- `properties` (id, manager_id, title, description, address JSON, geo, status)
- `units` (property_id, unit_number, rent_amount, deposit_amount, availability_status, images JSON)
- `applications` (unit_id, tenant_id, status, attachments JSON)
- `leases` (tenant_id, unit_id, start_date, end_date, rent_amount, status, terms)
- `payments` (user_id, lease_id, provider, provider_payment_id, amount, currency, status, metadata)
- `documents`, `notifications`, `audit_logs`

Use `uuid` PKs. Use JSONB for flexible fields (amenities, images). Add indexes for search fields.

---

# 5) Key API flows (detailed)

## Auth
- `POST /auth/register` — create user; send email verification token.
- `POST /auth/login` — return `accessToken` (JWT short-lived) and `refreshToken`.
- `POST /auth/refresh` — exchange refresh token for a new access token.
- `POST /auth/logout` — revoke refresh token.
- Use short-lived JWTs (15m) with refresh tokens stored hashed in DB.

## Property & Units
- `GET /properties` — public listing, filters, pagination, geo-filtering.
- `POST /properties` — manager/admin creates property and units.
- `GET /properties/:id` — property detail with units.

## Application flow
1. Tenant views unit -> `GET /units/:id`.
2. Tenant applies -> `POST /applications` (creates `pending` application; notify manager).
3. Manager reviews -> `PATCH /applications/:id` to approve/deny.
4. On approval, create lease draft and request deposit payment.

## Payment & Lease activation
- `POST /payments/initialize` — create payment record and return Paystack init URL.
- Paystack redirects/completes -> Paystack calls `POST /payments/webhook`.
- Webhook verifies signature; server re-verifies transaction via Paystack API; mark payment `confirmed`.
- On confirmed deposit: mark lease `active`, store payment receipt, send notifications.

### Important: Payment safety
- Always verify provider transaction server-side before marking `confirmed`.
- Design webhook handler idempotently.

---

# 6) Media handling & background jobs
- Use **presigned uploads (S3)** or **Cloudinary with signed tokens** for direct client uploads.
- Background workers (Bull/BullMQ + Redis) for:
  - Image resizing & thumbnails
  - Sending transactional emails (nodemailer)
  - Payment reconciliation & retries
  - Reports generation

---

# 7) Caching & search
- Redis for short-lived caches (popular properties) & rate limiting.
- Postgres full-text search (`tsvector`) for `properties` or ElasticSearch for advanced needs (geo-ranking, faceted search).

---

# 8) Security & best practices
- `helmet`, secure `CORS` rules, rate limiting on auth endpoints.
- Store secrets in secrets manager (AWS Secrets Manager / Vault).
- Validate file uploads by MIME and size; use presigned uploads to avoid server bandwidth.
- Use RBAC middleware: `role` checks on protected routes.
- DB access through Prisma prepared statements — safe from SQL injection.
- TLS enforced. Strong password hashing (bcrypt/argon2).

---

# 9) Observability & operations
- Structured JSON logging (pino/winston) -> log aggregator (ELK or Loki).
- Sentry for error monitoring.
- Prometheus metrics + Grafana dashboards.
- `/healthz` and `/ready` endpoints for orchestration.
- Alerts for errors, latency, DB connection saturation.

---

# 10) Testing
- Unit tests: Jest for services and small modules.
- Integration tests: spin up test Postgres with Docker Compose; test controllers & database interactions.
- E2E tests: Playwright or Postman collections to verify key user flows (register, apply, pay webhook).
- CI to run tests in GitHub Actions.

---

# 11) CI/CD & deployment
- Dockerize app with multi-stage build:
  - Build: compile TypeScript to JS
  - Run: `node dist/index.js`
- GitHub Actions pipeline:
  - lint, test, build
  - build/push Docker image
  - deploy to Kubernetes / ECS / DigitalOcean / Heroku
- Database migrations:
  - Use Prisma migrations; apply via deploy job or migration pod; prefer non-destructive changes for zero-downtime.

---

# 12) Suggested repo layout (monorepo / single server)
```
/server
  /src
    /controllers
    /services        # business logic (DB calls, no HTTP)
    /routes
    /middleware
    /workers         # background job handlers
    /utils
    /config
    index.ts
  /prisma
    schema.prisma
    migrations/
  package.json
  Dockerfile
  .github/workflows/ci.yml
```

---

# 13) Priority roadmap (concrete steps)
**Phase 0 — Decision & consolidation**
- Choose DB: Prisma + Postgres recommended.
- Merge the two repos into a single consolidated server repo.

**Phase 1 — Core**
- Implement & test auth flows (register/login/refresh).
- Implement Users, Properties, Units CRUD with RBAC.
- Implement Applications (tenant flow) and manager actions.

**Phase 2 — Payments & Media**
- Implement Paystack initialize + secure webhook + server-side verify.
- Set up Cloudinary or S3 presigned uploads.
- Add Redis + Bull worker for email & image processing.

**Phase 3 — Ops & Quality**
- Add logging, Sentry, Prometheus/Grafana.
- Add CI/CD (GitHub Actions).
- Add tests (unit/integration/E2E).
- Deploy to staging and run smoke tests.

---

# 14) Potential pitfalls & mitigations
- **Payment race conditions**: mitigate with server-side provider verification and DB transactions.
- **Migration complexity**: avoid mixed Mongo/SQL in production; plan incremental data migration if needed.
- **Upload abuse**: validate uploads, limit sizes, and use presigned URLs.
- **Secrets leakage**: keep secrets out of repo, use secret manager.

---

# 15) Example endpoints (quick list)
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- GET /properties
- POST /properties (manager)
- POST /applications
- PATCH /applications/:id
- POST /payments/initialize
- POST /payments/webhook

---

# 16) Appendix — Prisma model snippet (simplified)
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  applications Application[]
  leases     Lease[]
  payments   Payment[]
}

enum Role { TENANT MANAGER ADMIN SUPERADMIN }

model Property {
  id        String   @id @default(uuid())
  managerId String
  title     String
  description String?
  address   Json
  units     Unit[]
  createdAt DateTime @default(now())
}

model Unit {
  id        String @id @default(uuid())
  property  Property @relation(fields: [propertyId], references: [id])
  propertyId String
  unitNumber String
  rentAmount Decimal
  images    Json
}
```

---

# 17) Next steps I can generate for you (select one)
- Full **OpenAPI (Swagger)** spec for all routes (I can auto-generate based on the doc).
- **ER diagram** in PNG or SVG.
- **Prisma migration plan** and example scripts to migrate from the Mongoose models to Prisma.
- **Dockerfile + GitHub Actions** CI template tailored to your repo.
- **Payment webhook** implementation example (secure + idempotent).
- A zipped project scaffold with the recommended folder structure and template files.

---

## Contact / Notes
If you want the optional artifacts above, tell me which one(s) and I'll add them to the package. This file includes all recommendations and the step-by-step roadmap you can share with teammates.

---

*Generated by ChatGPT — consolidated from your uploaded codebases.*

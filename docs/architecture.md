# Architecture

## High-Level

SehaTalk is a Next.js App Router application with a bilingual UI (Arabic RTL / English LTR) and a MongoDB backend accessed through Mongoose models. The structure separates presentation (`components/`, `app/`) from domain logic (`models/`, `lib/controllers/`).

## Core Folders

- `app/`: Route segments and pages. API routes under `app/api/*` use Next.js App Router handlers.
- `components/`: Reusable UI + page-specific components.
- `lib/`: Shared logic (database connection, i18n, controllers, utilities).
- `models/`: Mongoose schemas defining persistent domain entities.
- `public/`: Static assets (images, icons).

## Data Flow

1. Request hits `app/api/<resource>` handler.
2. Handler calls `connectDB()` then a controller function.
3. Controller performs CRUD via Mongoose model.
4. Response serialized using `json()` or `error()` from `lib/utils/apiResponses.js`.
5. Frontend consumes JSON, renders UI components with language context.

## Internationalization (i18n)

- `lib/i18n/LanguageProvider.jsx` supplies translation context.
- `lib/i18n/translations.js` holds key-value pairs.
- Direction managed by `DocumentDirection.jsx` + `globals.css`.

## Potential Improvements

- Central validation middleware.
- Auth layer (JWT/session) and role guards.
- Caching + indexing for performance on questions/answers.
- Logging & monitoring (e.g., Winston / OpenTelemetry).

## Non-Goals (Current)

- Real-time updates (websockets) not yet implemented.
- File storage beyond simple URL references.

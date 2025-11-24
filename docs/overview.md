# SehaTalk Documentation Overview

This folder contains internal technical documentation complementing the main `README.md`.

## Documents

- `overview.md`: This index and purpose of docs.
- `architecture.md`: High-level system and folder responsibilities.
- `models.md`: Mongoose schema summary for domain entities.
- `api.md`: REST-like App Router endpoints and their operations.

## Conventions

- All server code uses async/await.
- Database connection via `connectDB` in `lib/mongodb.js` before model operations.
- Controllers encapsulate CRUD logic (see `lib/controllers`).
- API routes return JSON shape: `{ data: ... }` or `{ error: message }`.
- Internationalization logic lives under `lib/i18n/` and UI direction toggles via `DocumentDirection` component.

## Next Additions (Potential)

- Authentication middleware
- Request validation layer (Zod / Joi)
- Role-based access control
- Caching layer for frequently accessed questions

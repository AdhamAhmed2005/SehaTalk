# API Endpoints

Base Path: `/api`
All responses: `{ data: <payload> }` or `{ error: <message> }`.

## Doctors

- `GET /api/doctors` list
- `POST /api/doctors` create
- `GET /api/doctors/:id` fetch one
- `PUT /api/doctors/:id` update
- `DELETE /api/doctors/:id` delete

## Patients

- `GET /api/patients` list
- `POST /api/patients` create
- `GET /api/patients/:id` fetch one
- `PUT /api/patients/:id` update
- `DELETE /api/patients/:id` delete

## Categories

- `GET /api/categories` list
- `POST /api/categories` create
- `GET /api/categories/:id` fetch one
- `PUT /api/categories/:id` update
- `DELETE /api/categories/:id` delete

## Questions

- `GET /api/questions` list (populates refs)
- `POST /api/questions` create
- `GET /api/questions/:id` fetch one + its answers
- `PUT /api/questions/:id` update
- `DELETE /api/questions/:id` delete

## Answers

- `GET /api/answers` list
- `POST /api/answers` create
- `GET /api/answers/:id` fetch one
- `PUT /api/answers/:id` update
- `DELETE /api/answers/:id` delete

## Posts

- `GET /api/posts` list
- `POST /api/posts` create
- `GET /api/posts/:id` fetch one
- `PUT /api/posts/:id` update
- `DELETE /api/posts/:id` delete

## Status Codes

- 200 success
- 201 created
- 404 not found
- 500 server error

## Pending Enhancements

- Auth & role guards (doctor vs patient actions)
- Validation layer (Zod/Joi) for payloads
- Pagination & filtering (e.g., `/api/questions?status=open`)
- Rate limiting for write operations

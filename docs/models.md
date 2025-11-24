# Domain Models

All schemas use Mongoose with timestamps (`createdAt`, `updatedAt`). Below is a summary; see actual schema files in `models/` for source of truth.

## Doctor

Fields: `name`, `email (unique)`, `password`, `specialty`, `bio`, `verified`, `avatarUrl`

## Patient

Fields: `name`, `email (unique)`, `password`, `age`, `gender (enum)`, `medicalHistory[]`, `avatarUrl`

## Category

Fields: `name`, `slug (unique)`, `description`

## Question

Relations: `patient (ref Patient)`, optional `doctor (ref Doctor)` for assigned/answered, `category (ref Category)`
Fields: `title`, `description`, `status (open|answered|closed)`

## Answer

Relations: `question (ref Question)`, `doctor (ref Doctor)`
Fields: `content`

## Post

Relations: `doctor (ref Doctor)`, `categories[] (ref Category)`
Fields: `title`, `content`, `published`, `publishedAt`

## Notes

- Passwords currently stored in plaintext (needs hashing step).
- No soft-delete fields; deletions are permanent.
- Add indexes later for `Question.status`, `Category.slug`, `Doctor.specialty`.

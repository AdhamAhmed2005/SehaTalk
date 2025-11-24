import { z } from "zod";

export const doctorCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  specialty: z.string().min(2),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export const doctorUpdateSchema = doctorCreateSchema.partial().extend({
  password: z.string().min(6).optional(),
});

export const patientCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().nonnegative().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  medicalHistory: z.array(z.string()).optional(),
  avatarUrl: z.string().url().optional(),
});

export const patientUpdateSchema = patientCreateSchema.partial().extend({
  password: z.string().min(6).optional(),
});

export const categoryCreateSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

export const questionCreateSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  category: z.string(),
  isAnonymous: z.boolean().optional(),
});

export const questionUpdateSchema = questionCreateSchema.partial();

export const answerCreateSchema = z.object({
  question: z.string(),
  content: z.string().min(2),
});

export const answerUpdateSchema = answerCreateSchema.partial();

export const postCreateSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  categories: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export const postUpdateSchema = postCreateSchema.partial();

export function validate(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: result.error.issues.map((i) => i.message).join(", ") };
  }
  return { data: result.data };
}

// Auth schemas
export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authRefreshSchema = z.object({
  refreshToken: z.string().min(10),
});

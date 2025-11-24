import { withApi } from "@/lib/api/withApi";
import { listAnswers, createAnswer } from "@/lib/controllers/answerController";
import { answerCreateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async () => {
    return await listAnswers();
  },
  { auth: true, rateLimit: { limit: 120, windowMs: 60_000 } }
);

export const POST = withApi(
  async ({ body, user }) => {
    const data = { ...body, doctor: user.id };
    const created = await createAnswer(data);
    return created;
  },
  {
    auth: true,
    roles: ["doctor"],
    validate: { schema: answerCreateSchema },
    rateLimit: { limit: 30, windowMs: 60_000 },
  }
);

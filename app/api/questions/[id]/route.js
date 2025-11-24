import { withApi } from "@/lib/api/withApi";
import {
  getQuestion,
  updateQuestion,
  deleteQuestion,
  listAnswersForQuestion,
} from "@/lib/controllers/questionController";
import { questionUpdateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async ({ context }) => {
    const { params } = context;
    const doc = await getQuestion(params.id);
    if (!doc) throw new Error("Not found");
    const answers = await listAnswersForQuestion(params.id);
    return { question: doc, answers };
  },
  { auth: true, rateLimit: { limit: 120, windowMs: 60_000 } }
);

export const PUT = withApi(
  async ({ context, body }) => {
    const { params } = context;
    const updated = await updateQuestion(params.id, body);
    if (!updated) throw new Error("Not found");
    return updated;
  },
  {
    auth: true,
    validate: { schema: questionUpdateSchema },
    rateLimit: { limit: 40, windowMs: 60_000 },
  }
);

export const DELETE = withApi(
  async ({ context }) => {
    const { params } = context;
    const deleted = await deleteQuestion(params.id);
    if (!deleted) throw new Error("Not found");
    return deleted;
  },
  { auth: true, rateLimit: { limit: 25, windowMs: 60_000 } }
);

import { withApi } from "@/lib/api/withApi";
import {
  getAnswer,
  updateAnswer,
  deleteAnswer,
} from "@/lib/controllers/answerController";
import { answerUpdateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async ({ context }) => {
    const { params } = context;
    const doc = await getAnswer(params.id);
    if (!doc) throw new Error("Not found");
    return doc;
  },
  { auth: true, rateLimit: { limit: 120, windowMs: 60_000 } }
);

export const PUT = withApi(
  async ({ context, body }) => {
    const { params } = context;
    const updated = await updateAnswer(params.id, body);
    if (!updated) throw new Error("Not found");
    return updated;
  },
  {
    auth: true,
    roles: ["doctor"],
    validate: { schema: answerUpdateSchema },
    rateLimit: { limit: 40, windowMs: 60_000 },
  }
);

export const DELETE = withApi(
  async ({ context }) => {
    const { params } = context;
    const deleted = await deleteAnswer(params.id);
    if (!deleted) throw new Error("Not found");
    return deleted;
  },
  { auth: true, roles: ["doctor"], rateLimit: { limit: 25, windowMs: 60_000 } }
);

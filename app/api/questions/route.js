import { connectDB } from "@/lib/mongodb";
import { json, error } from "@/lib/utils/apiResponses";
import {
  listQuestions,
  createQuestion,
} from "@/lib/controllers/questionController";
import { withApi } from "@/lib/api/withApi";
import { questionCreateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async () => {
    return await listQuestions();
  },
  { auth: true, rateLimit: { limit: 150, windowMs: 60_000 } }
);

export const POST = withApi(
  async ({ body, user }) => {
    const data = { ...body };
    if (user.role === "patient") data.patient = user.id;
    const created = await createQuestion(data);
    return created;
  },
  {
    auth: true,
    roles: ["patient", "doctor"],
    validate: { schema: questionCreateSchema },
    rateLimit: { limit: 40, windowMs: 60_000 },
  }
);

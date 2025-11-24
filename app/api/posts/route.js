import { withApi } from "@/lib/api/withApi";
import { listPosts, createPost } from "@/lib/controllers/postController";
import { postCreateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async () => {
    return await listPosts();
  },
  { auth: true, rateLimit: { limit: 120, windowMs: 60_000 } }
);

export const POST = withApi(
  async ({ body, user }) => {
    const data = { ...body, doctor: user.id };
    const created = await createPost(data);
    return created;
  },
  {
    auth: true,
    roles: ["doctor"],
    validate: { schema: postCreateSchema },
    rateLimit: { limit: 30, windowMs: 60_000 },
  }
);

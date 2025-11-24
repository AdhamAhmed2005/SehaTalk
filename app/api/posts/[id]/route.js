import { withApi } from "@/lib/api/withApi";
import {
  getPost,
  updatePost,
  deletePost,
} from "@/lib/controllers/postController";
import { postUpdateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async ({ context }) => {
    const { params } = context;
    const doc = await getPost(params.id);
    if (!doc) throw new Error("Not found");
    return doc;
  },
  { auth: true, rateLimit: { limit: 120, windowMs: 60_000 } }
);

export const PUT = withApi(
  async ({ context, body, user }) => {
    const { params } = context;
    const updated = await updatePost(params.id, body);
    if (!updated) throw new Error("Not found");
    return updated;
  },
  {
    auth: true,
    roles: ["doctor"],
    validate: { schema: postUpdateSchema },
    rateLimit: { limit: 40, windowMs: 60_000 },
  }
);

export const DELETE = withApi(
  async ({ context }) => {
    const { params } = context;
    const deleted = await deletePost(params.id);
    if (!deleted) throw new Error("Not found");
    return deleted;
  },
  { auth: true, roles: ["doctor"], rateLimit: { limit: 25, windowMs: 60_000 } }
);

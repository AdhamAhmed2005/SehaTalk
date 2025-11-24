import { withApi } from "@/lib/api/withApi";
import {
  getCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/controllers/categoryController";
import { categoryUpdateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async ({ context }) => {
    const { params } = context;
    const doc = await getCategory(params.id);
    if (!doc) throw new Error("Not found");
    return doc;
  },
  { auth: true, rateLimit: { limit: 60, windowMs: 60_000 } }
);

export const PUT = withApi(
  async ({ context, body }) => {
    const { params } = context;
    const updated = await updateCategory(params.id, body);
    if (!updated) throw new Error("Not found");
    return updated;
  },
  {
    auth: true,
    validate: { schema: categoryUpdateSchema },
    rateLimit: { limit: 30, windowMs: 60_000 },
  }
);

export const DELETE = withApi(
  async ({ context }) => {
    const { params } = context;
    const deleted = await deleteCategory(params.id);
    if (!deleted) throw new Error("Not found");
    return deleted;
  },
  { auth: true, rateLimit: { limit: 20, windowMs: 60_000 } }
);

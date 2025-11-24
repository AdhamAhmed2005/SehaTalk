import { withApi } from "@/lib/api/withApi";
import {
  listCategories,
  createCategory,
} from "@/lib/controllers/categoryController";
import { categoryCreateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async () => {
    return await listCategories();
  },
  { auth: true, rateLimit: { limit: 150, windowMs: 60_000 } }
);

export const POST = withApi(
  async ({ body }) => {
    const created = await createCategory(body);
    return created;
  },
  {
    auth: true,
    validate: { schema: categoryCreateSchema },
    rateLimit: { limit: 40, windowMs: 60_000 },
  }
);

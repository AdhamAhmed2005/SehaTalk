import { withApi } from "@/lib/api/withApi";
import { listDoctors, createDoctor } from "@/lib/controllers/doctorController";
import { doctorCreateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async () => {
    return await listDoctors();
  },
  { auth: true, rateLimit: { limit: 150, windowMs: 60_000 } }
);

// Registration (not auth-protected)
export const POST = withApi(
  async ({ body }) => {
    const created = await createDoctor(body);
    return created;
  },
  {
    validate: { schema: doctorCreateSchema },
    rateLimit: { limit: 20, windowMs: 60_000 },
  }
);

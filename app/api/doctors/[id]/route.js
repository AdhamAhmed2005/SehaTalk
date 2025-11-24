import { withApi } from "@/lib/api/withApi";
import { doctorUpdateSchema } from "@/lib/validation/schemas";
import {
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "@/lib/controllers/doctorController";
import { hashPassword } from "@/lib/auth";

export const GET = withApi(
  async ({ context }) => {
    const { params } = context;
    const doc = await getDoctor(params.id);
    if (!doc) throw new Error("Not found");
    return doc;
  },
  { auth: true, rateLimit: { limit: 60, windowMs: 60_000 } }
);

export const PUT = withApi(
  async ({ context, body }) => {
    const { params } = context;
    if (body.password) body.password = await hashPassword(body.password);
    const updated = await updateDoctor(params.id, body);
    if (!updated) throw new Error("Not found");
    return updated;
  },
  {
    auth: true,
    validate: { schema: doctorUpdateSchema },
    rateLimit: { limit: 30, windowMs: 60_000 },
  }
);

export const DELETE = withApi(
  async ({ context }) => {
    const { params } = context;
    const deleted = await deleteDoctor(params.id);
    if (!deleted) throw new Error("Not found");
    return deleted;
  },
  { auth: true, rateLimit: { limit: 20, windowMs: 60_000 } }
);

import { withApi } from "@/lib/api/withApi";
import {
  listPatients,
  createPatient,
} from "@/lib/controllers/patientController";
import { patientCreateSchema } from "@/lib/validation/schemas";

export const GET = withApi(
  async () => {
    return await listPatients();
  },
  { auth: true, rateLimit: { limit: 150, windowMs: 60_000 } }
);

export const POST = withApi(
  async ({ body }) => {
    const created = await createPatient(body);
    return created;
  },
  {
    validate: { schema: patientCreateSchema },
    rateLimit: { limit: 25, windowMs: 60_000 },
  }
);

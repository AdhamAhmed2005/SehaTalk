import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import { withApi } from "@/lib/api/withApi";

export const POST = withApi(
  async ({ user }) => {
    const { id, role } = user;
    const Model = role === "doctor" ? Doctor : Patient;
    await Model.findByIdAndUpdate(id, { refreshTokenHash: null });
    return { success: true };
  },
  { auth: true, rateLimit: { limit: 30, windowMs: 60_000 } }
);

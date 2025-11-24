import { withApi } from "@/lib/api/withApi";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import { comparePassword, signToken, rotateRefreshToken } from "@/lib/auth";
import { authLoginSchema } from "@/lib/validation/schemas";

export const POST = withApi(
  async ({ body }) => {
    const { email, password } = body;
    let user = await Doctor.findOne({ email });
    let role = "doctor";
    if (!user) {
      user = await Patient.findOne({ email });
      role = "patient";
    }
    if (!user) throw new Error("Invalid credentials");
    const passMatch = await comparePassword(password, user.password);
    if (!passMatch) throw new Error("Invalid credentials");
    const userId = user._id.toString();
    const token = signToken({ id: userId, role });
    const refreshToken = await rotateRefreshToken(userId, role);
    return { token, refreshToken, role };
  },
  {
    validate: { schema: authLoginSchema },
    rateLimit: { limit: 10, windowMs: 60_000 },
  }
);

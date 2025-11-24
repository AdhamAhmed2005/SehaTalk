import { withApi } from "@/lib/api/withApi";
import { verifyRefreshToken, signToken, rotateRefreshToken } from "@/lib/auth";
import { authRefreshSchema } from "@/lib/validation/schemas";

export const POST = withApi(
  async ({ body }) => {
    const { refreshToken } = body;
    const decoded = await verifyRefreshToken(refreshToken);
    if (!decoded) throw new Error("Invalid refresh token");
    const { id, role } = decoded;
    const newAccess = signToken({ id, role });
    const newRefresh = await rotateRefreshToken(id, role);
    return { token: newAccess, refreshToken: newRefresh, role };
  },
  {
    validate: { schema: authRefreshSchema },
    rateLimit: { limit: 60, windowMs: 60_000 },
  }
);

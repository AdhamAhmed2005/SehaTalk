import { connectDB } from "@/lib/mongodb";
import { json, error } from "@/lib/utils/apiResponses";
import { requireAuth } from "@/lib/auth";
import { checkRateLimit } from "@/lib/middleware/rateLimit";
import { logger } from "@/lib/utils/logger";

export function withApi(handler, opts = {}) {
  return async (request, context = {}) => {
    const method = request.method;
    try {
      await connectDB();
      const identifier = request.headers.get("x-forwarded-for") || "local";
      if (opts.rateLimit) {
        const ok = checkRateLimit(identifier, opts.rateLimit);
        if (!ok) return error("Too many requests", 429);
      }
      let authUser = null;
      if (opts.auth) {
        const auth = requireAuth(request);
        if (auth.error) return error(auth.error, 401);
        authUser = auth.user;
        if (opts.roles && !opts.roles.includes(authUser.role)) {
          return error("Forbidden", 403);
        }
      }
      let body = null;
      if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        try {
          body = await request.json();
        } catch {
          body = null;
        }
      }
      if (opts.validate && body) {
        const { schema } = opts.validate;
        const result = schema.safeParse(body);
        if (!result.success) {
          return error(
            result.error.issues.map((i) => i.message).join(", "),
            400
          );
        }
        body = result.data;
      }
      const result = await handler({ request, context, user: authUser, body });
      if (result instanceof Response) return result;
      return json({ data: result });
    } catch (e) {
      logger.error(e);
      return error(e.message || "Server error");
    }
  };
}

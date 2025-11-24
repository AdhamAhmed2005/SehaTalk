export const logger = {
  info: (msg, meta = {}) =>
    console.log(`[INFO ${new Date().toISOString()}]`, msg, meta),
  warn: (msg, meta = {}) =>
    console.warn(`[WARN ${new Date().toISOString()}]`, msg, meta),
  error: (err, meta = {}) =>
    console.error(
      `[ERROR ${new Date().toISOString()}]`,
      err?.message || err,
      meta
    ),
};

/**
 * The site lives at mohibali.com/omid in production (served through the portfolio's rewrite),
 * and at the root in local development. Next.js adds this to <Link> and router navigation itself;
 * use `asset()` for anything it doesn't: image paths, plain <a> links and full URLs.
 * Keep in step with `basePath` in next.config.ts.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/omid" : "";

/** Prefixes a root-relative path ("/images/x.jpg") with the base path. */
export const asset = (path: string) => `${BASE_PATH}${path}`;

/** Log order-database failures without tokens, credentials, URLs, or customer fields. */

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const BEARER = /Bearer\s+[A-Za-z0-9._\-+=/]+/gi;
const JWT = /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9._-]+/g;
const URL_LIKE = /\b(?:libsql|turso|https?|wss?):\/\/[^\s"'\\]+/gi;
const AUTH_QUERY = /(?:authToken|token|secret|password)\s*[=:]\s*\S+/gi;

export function sanitizeStoreErrorMessage(message) {
  if (typeof message !== "string" || message.length === 0) {
    return undefined;
  }
  return message
    .replace(BEARER, "Bearer [redacted]")
    .replace(JWT, "[token]")
    .replace(URL_LIKE, "[url]")
    .replace(AUTH_QUERY, "[credential]")
    .replace(EMAIL, "[email]")
    .slice(0, 240);
}

export function describeTursoUrl(rawUrl) {
  const url = typeof rawUrl === "string" ? rawUrl.trim() : "";
  if (!url) {
    return { urlPresent: false, urlScheme: "missing", urlHostKind: "missing" };
  }
  let scheme = "other";
  const schemeMatch = url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
  if (schemeMatch) {
    scheme = schemeMatch[1].toLowerCase();
  }
  let hostKind = "other";
  try {
    const parsed = new URL(url.replace(/^(libsql|turso):\/\//i, "https://"));
    if (parsed.hostname.endsWith(".turso.io") || parsed.hostname === "turso.io") {
      hostKind = "turso.io";
    }
  } catch {
    hostKind = "unparseable";
  }
  return { urlPresent: true, urlScheme: scheme, urlHostKind: hostKind };
}

export function describeOrderStoreError(phase, error) {
  const cause = error?.cause;
  return {
    phase,
    store: process.env.TURSO_DATABASE_URL ? "turso" : "sqlite",
    driver: process.env.TURSO_DATABASE_URL ? "tursodatabase-serverless" : "node-sqlite",
    name: typeof error?.name === "string" ? error.name : undefined,
    code: typeof error?.code === "string" ? error.code : undefined,
    extendedCode: typeof error?.extendedCode === "string" ? error.extendedCode : undefined,
    errno: error?.errno,
    syscall: error?.syscall,
    message: sanitizeStoreErrorMessage(error?.message),
    causeName: typeof cause?.name === "string" ? cause.name : undefined,
    causeCode: typeof cause?.code === "string" ? cause.code : undefined,
    causeMessage: sanitizeStoreErrorMessage(cause?.message),
    ...describeTursoUrl(process.env.TURSO_DATABASE_URL),
    tokenPresent: Boolean(process.env.TURSO_AUTH_TOKEN?.trim()),
  };
}

export function logOrderStoreError(phase, error) {
  console.error("[afordz:orders]", JSON.stringify(describeOrderStoreError(phase, error)));
}

export function blockedHint(phase) {
  if (phase === "schema") {
    return "Turso blocked schema setup. Use a full-access database token on a regular database (not read-only, not a schema-child). Redeploy after rotating the token.";
  }
  if (phase === "connect") {
    return "Turso blocked the connection. Confirm TURSO_DATABASE_URL and a full-access TURSO_AUTH_TOKEN, then redeploy.";
  }
  return "Turso blocked the database operation. Use a full-access token on a regular Turso database and redeploy.";
}

/** Log order-database failures without customer fields or secrets. */
export function logOrderStoreError(phase, error) {
  const message =
    typeof error?.message === "string"
      ? error.message
          .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
          .slice(0, 240)
      : undefined;

  console.error(
    "[afordz:orders]",
    JSON.stringify({
      phase,
      store: process.env.TURSO_DATABASE_URL ? "turso" : "sqlite",
      name: error?.name,
      code: error?.code,
      errno: error?.errno,
      syscall: error?.syscall,
      message,
    }),
  );
}

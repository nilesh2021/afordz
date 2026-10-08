import path from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

const projectDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvConfig(projectDir);

const { probeOrderStore, closeDb } = await import("../src/lib/db.js");

const status = await probeOrderStore();
closeDb();

console.log(JSON.stringify(status, null, 2));
process.exit(status.ok ? 0 : 1);

import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({
  path: ".env.local",
})

// export default {
//   schema: "./server/schema.ts",
//   out: "./server/migrations",
//   driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
//   dbCredentials: {
//     connectionString: process.env.AUTH_DRIZZLE_URL!,
//   },
//   verbose: true,
//   strict: true,
// } satisfies Config

export default ({
  schema: "./server/schema.ts",
  out: "./server/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
})
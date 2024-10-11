import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "@/server/schema"
import { config } from "dotenv"

config({ path: ".env" })

const sql = neon(process.env.AUTH_DRIZZLE_URL!)
export const db = drizzle(sql,{schema, logger: true})


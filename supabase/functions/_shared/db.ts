// import { and, eq } from "drizzle-orm";

// import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

//  DB Client
let connectionString = Deno.env.get("FIXED_DB_URL")!;
if (!connectionString) {
    connectionString = Deno.env.get("SUPABASE_DB_URL")!;
}
const client = postgres(connectionString, { prepare: false });
export const dbClient = drizzle(client);

// ===============================
// ===============================
//
//       Database Functions
//
// ===============================
// ===============================

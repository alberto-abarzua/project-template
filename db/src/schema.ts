// schema.ts
import {
  // varchar,
  // boolean,
  // integer,
  // doublePrecision,
  // json,
  // timestamp,
  pgSchema,
  uuid,
} from 'drizzle-orm/pg-core';

// import {relations} from 'drizzle-orm';

export const peridashSchema = pgSchema("schema");

// ---------------------
// --- Users
// ---------------------

export const users = peridashSchema.table('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  supabase_user_id: uuid('supabase_user_id'),
});



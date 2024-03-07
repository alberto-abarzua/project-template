CREATE SCHEMA "schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schema"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supabase_user_id" uuid
);

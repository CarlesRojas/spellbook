CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"email" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "spell" (
	"index" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text[] NOT NULL,
	"high_level_description" text[] NOT NULL,
	"range" text NOT NULL,
	"components" json NOT NULL,
	"material" text,
	"area_of_effect" json,
	"ritual" boolean NOT NULL,
	"duration" text NOT NULL,
	"concentration" boolean NOT NULL,
	"casting_time" text NOT NULL,
	"attack_type" text,
	"school" json NOT NULL,
	"classes" json[] NOT NULL,
	"subclasses" json[] NOT NULL,
	"damage" json,
	"difficulty_class" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"email" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);

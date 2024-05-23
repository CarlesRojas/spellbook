CREATE TABLE IF NOT EXISTS "character" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL,
	"class" text NOT NULL,
	"ability" integer NOT NULL,
	"spellSlotsAvailableId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spellSlots" (
	"id" serial PRIMARY KEY NOT NULL,
	"level1" integer NOT NULL,
	"level2" integer NOT NULL,
	"level3" integer NOT NULL,
	"level4" integer NOT NULL,
	"level5" integer NOT NULL,
	"level6" integer NOT NULL,
	"level7" integer NOT NULL,
	"level8" integer NOT NULL,
	"level9" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character" ADD CONSTRAINT "character_spellSlotsAvailableId_spellSlots_id_fk" FOREIGN KEY ("spellSlotsAvailableId") REFERENCES "public"."spellSlots"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "spell" (
	"index" text PRIMARY KEY NOT NULL,
	"nameId" integer NOT NULL,
	"descriptionId" integer NOT NULL,
	"highLevelDescriptionId" integer,
	"range" text NOT NULL,
	"components" json NOT NULL,
	"materialId" integer,
	"areaOfEffect" json,
	"ritual" boolean NOT NULL,
	"duration" text NOT NULL,
	"concentration" boolean NOT NULL,
	"castingTime" text NOT NULL,
	"attackType" text,
	"school" text NOT NULL,
	"classes" json NOT NULL,
	"subclasses" json NOT NULL,
	"damage" json,
	"difficultyClass" json,
	"level" integer NOT NULL,
	"icon" text NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "translation" (
	"id" serial PRIMARY KEY NOT NULL,
	"en" text NOT NULL,
	"es" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"email" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spell" ADD CONSTRAINT "spell_nameId_translation_id_fk" FOREIGN KEY ("nameId") REFERENCES "public"."translation"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spell" ADD CONSTRAINT "spell_descriptionId_translation_id_fk" FOREIGN KEY ("descriptionId") REFERENCES "public"."translation"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spell" ADD CONSTRAINT "spell_highLevelDescriptionId_translation_id_fk" FOREIGN KEY ("highLevelDescriptionId") REFERENCES "public"."translation"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spell" ADD CONSTRAINT "spell_materialId_translation_id_fk" FOREIGN KEY ("materialId") REFERENCES "public"."translation"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

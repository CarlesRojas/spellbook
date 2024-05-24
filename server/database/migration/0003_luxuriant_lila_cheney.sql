CREATE TABLE IF NOT EXISTS "knownCantrips" (
	"characterId" integer,
	"spellIndex" text,
	CONSTRAINT "knownCantrips_characterId_spellIndex_pk" PRIMARY KEY("characterId","spellIndex")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knownCantrips" ADD CONSTRAINT "knownCantrips_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knownCantrips" ADD CONSTRAINT "knownCantrips_spellIndex_spell_index_fk" FOREIGN KEY ("spellIndex") REFERENCES "public"."spell"("index") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

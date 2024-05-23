CREATE TABLE IF NOT EXISTS "characters" (
	"characterId" integer,
	"userEmail" text,
	CONSTRAINT "characters_characterId_userEmail_pk" PRIMARY KEY("characterId","userEmail")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "knownSpells" (
	"characterId" integer,
	"spellIndex" text,
	CONSTRAINT "knownSpells_characterId_spellIndex_pk" PRIMARY KEY("characterId","spellIndex")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "preparedSpells" (
	"characterId" integer,
	"spellIndex" text,
	CONSTRAINT "preparedSpells_characterId_spellIndex_pk" PRIMARY KEY("characterId","spellIndex")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_userEmail_user_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knownSpells" ADD CONSTRAINT "knownSpells_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "knownSpells" ADD CONSTRAINT "knownSpells_spellIndex_spell_index_fk" FOREIGN KEY ("spellIndex") REFERENCES "public"."spell"("index") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "preparedSpells" ADD CONSTRAINT "preparedSpells_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "preparedSpells" ADD CONSTRAINT "preparedSpells_spellIndex_spell_index_fk" FOREIGN KEY ("spellIndex") REFERENCES "public"."spell"("index") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

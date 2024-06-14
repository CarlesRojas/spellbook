ALTER TABLE "character"
DROP CONSTRAINT "character_concentratingOnId_spell_index_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character" ADD CONSTRAINT "character_concentratingOnId_spell_index_fk" FOREIGN KEY ("concentratingOnId") REFERENCES "public"."spell"("index") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
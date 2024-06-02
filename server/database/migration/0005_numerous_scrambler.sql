ALTER TABLE "character" ADD COLUMN "concentratingOnId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character" ADD CONSTRAINT "character_concentratingOnId_spell_index_fk" FOREIGN KEY ("concentratingOnId") REFERENCES "public"."spell"("index") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
